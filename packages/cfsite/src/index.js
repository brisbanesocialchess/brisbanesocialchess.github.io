// Const variables
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const corsHeadersCache = new Map();
const routes = {
	'GET /': handleGetRoot,
	'GET /health': handleHealthCheck,
	'POST /api/contact': handleContact,
	'POST /api/register': handleRegister,
};

/**
 * Generates a UUID v4 string.
 * @returns {string} A randomly generated UUID v4.
 */
function uuidv4() {
	return crypto.randomUUID();
}

/**
 * Verifies a Cloudflare Turnstile captcha token with optional retry logic.
 *
 * @param {string} token - The captcha token to verify.
 * @param {Object} env - The Cloudflare Worker environment object containing secrets.
 * @param {number} [maxRetries=3] - Maximum number of retry attempts.
 * @param {number} [delayMs=500] - Delay in milliseconds between retries.
 * @returns {Promise<boolean>} True if captcha is valid, false otherwise.
 */
async function verifyTurnstile(token, env, maxRetries = 3, delayMs = 500) {
	if (!token) return false;

	const SECRET_KEY = env.TURNSTILE_SECRET;

	const formData = new URLSearchParams();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
				body: formData,
				method: 'POST',
			});

			if (!res.ok) throw new Error(`HTTP ${res.status}`);

			const data = await res.json();
			return data.success === true;
		} catch (err) {
			console.warn(`Turnstile verification attempt ${attempt} failed:`, err);

			if (attempt === maxRetries) return false;

			await new Promise((resolve) => setTimeout(resolve, delayMs));
		}
	}

	return false;
}

/**
 * Returns CORS headers for the given request's origin.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Object<string, string>} A map of CORS headers.
 */
function getCorsHeaders(request) {
	const origin = request.headers.get('Origin') || '*';
	if (!corsHeadersCache.has(origin)) {
		corsHeadersCache.set(origin, {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Origin': origin,
			'Access-Control-Max-Age': '86400',
		});
	}
	return corsHeadersCache.get(origin);
}

/**
 * Returns security headers to enhance response security.
 * @returns {Object<string, string>} An object mapping header names to their security policies.
 */
function getSecurityHeaders() {
	return {
		'Referrer-Policy': 'no-referrer',
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
	};
}

/**
 * Creates a JSON HTTP response with appropriate headers.
 * @param {any} data - The data to be JSON-serialized and sent as the response body.
 * @param {Request} request - The request object used to generate CORS headers.
 * @param {number} [status=200] - The HTTP status code for the response.
 * @returns {Response} The constructed Response object with JSON body and headers.
 */
function createJsonResponse(data, request, status = 200) {
	return new Response(JSON.stringify(data), {
		headers: {
			...JSON_HEADERS,
			...getCorsHeaders(request),
			...getSecurityHeaders(),
		},
		status,
	});
}

/**
 * Creates a JSON error response with the specified message and HTTP status code.
 *
 * @param {string} message - The error message to include in the response.
 * @param {Request} request - The original request object.
 * @param {number} [status=400] - The HTTP status code for the error response.
 * @returns {Response} The generated JSON error response.
 */
function createErrorResponse(message, request, status = 400) {
	return createJsonResponse({ message, status: 'error' }, request, status);
}

/**
 * Handles HTTP OPTIONS requests by returning a 204 No Content response with CORS and security headers.
 *
 * @param {Request} request - The incoming HTTP request.
 * @returns {Response} The HTTP response with appropriate headers and status.
 */
function handleOptions(request) {
	return new Response(null, {
		headers: {
			...getCorsHeaders(request),
			...getSecurityHeaders(),
		},
		status: 204,
	});
}

/**
 * Parses the JSON payload from the given request, ensuring it does not exceed the maximum allowed size.
 *
 * @param {Request} request - The HTTP request containing the JSON payload.
 * @returns {Promise<any>} The parsed JSON object.
 * @throws {Error} If the payload is too large or invalid JSON.
 */
async function parseJson(request) {
	const maxBodySize = 1_000_000;
	const contentLength = request.headers.get('content-length');
	if (contentLength && Number(contentLength) > maxBodySize) {
		throw new Error('Payload too large');
	}

	const body = await request.clone().text();
	if (body.length > maxBodySize) {
		throw new Error('Payload too large');
	}

	try {
		return JSON.parse(body);
	} catch {
		throw new Error('Invalid JSON payload');
	}
}

/**
 * Handles contact form submissions by validating required fields and captcha verification.
 *
 * @param {Request} request - The HTTP request containing contact form data.
 * @param {Object} env - The Cloudflare Worker environment object containing secrets.
 * @returns {Promise<Response>} JSON response indicating success or error.
 */
async function handleContact(request, env) {
	try {
		const { name, email, subject, message, 'cf-turnstile-response': token } = await parseJson(request);

		if (!name || !email || !subject || !message) {
			return createErrorResponse('Missing required fields: name, email, subject, message', request, 422);
		}

		const captchaValid = await verifyTurnstile(token, env);
		if (!captchaValid) {
			return createErrorResponse('Captcha verification failed', request, 400);
		}

		console.log(`[Contact] from ${name} <${email}>: ${message}`);

		return createJsonResponse({ message: 'Thanks for contacting us!', status: 'ok' }, request);
	} catch (err) {
		return createErrorResponse(err.message, request, 400);
	}
}

/**
 * Handles user registration by parsing the request payload and returning a JSON or error response.
 * @param {Request} request - The incoming request object containing registration data.
 * @param {Object} env - The Cloudflare Worker environment object containing secrets.
 * @returns {Promise<Response>} A promise resolving to the JSON response or error response.
 */
async function handleRegister(request, env) {
	try {
		const { fname, lname, birthyear, gender, email, 'cf-turnstile-response': token } = await parseJson(request);

		if (!fname || !lname || !birthyear || !gender || !email) {
			return createErrorResponse('Missing required fields: fname, lname, birthyear, gender, email', request, 422);
		}

		const captchaValid = await verifyTurnstile(token, env);
		if (!captchaValid) {
			return createErrorResponse('Captcha verification failed', request, 400);
		}

		console.log(`[Register] fname: ${fname}, lname: ${lname}`);

		return createJsonResponse({ message: 'Registration complete!', status: 'ok' }, request);
	} catch (err) {
		return createErrorResponse(err.message, request, 400);
	}
}

/**
 * Handles GET requests to the root endpoint by returning a "Hello World!" response.
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Response} The HTTP response containing "Hello World!" message with CORS and security headers.
 */
function handleGetRoot(request) {
	return new Response('Hello World!', {
		headers: {
			...getCorsHeaders(request),
			...getSecurityHeaders(),
			'Content-Type': 'text/plain',
		},
		status: 200,
	});
}

/**
 * Handles the health check endpoint by returning a JSON response with status and uptime.
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Response} JSON response containing the status and server uptime.
 */
function handleHealthCheck(request) {
	return createJsonResponse({ status: 'ok', uptime: Date.now() }, request);
}

export default {
	/**
	 * Main entry point for the Cloudflare Worker fetch event.
	 * Routes incoming requests to the appropriate handler.
	 *
	 * @param {Request} request - The incoming HTTP request object.
	 * @param {Object} env - The Cloudflare Worker environment object containing secrets.
	 * @returns {Promise<Response>} The response returned from the matched route or an error response.
	 */
	async fetch(request, env) {
		const requestId = uuidv4();
		const url = new URL(request.url);
		const routeKey = `${request.method.toUpperCase()} ${url.pathname}`;

		console.log(`[${requestId}] Incoming request: ${routeKey}`);

		request.requestId = requestId;

		if (request.method.toUpperCase() === 'OPTIONS') {
			return handleOptions(request);
		}

		const handler = routes[routeKey];
		if (handler) {
			try {
				return await handler(request, env);
			} catch (err) {
				console.error(`[${requestId}] Error:`, err);
				return createErrorResponse('Internal Server Error', request, 500);
			}
		}

		return createErrorResponse('Not Found', request, 404);
	},
};
