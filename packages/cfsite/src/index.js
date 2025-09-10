// Const variables
const JSON_HEADERS = { 'Content-Type': 'application/json' };

const corsHeadersCache = new Map();

const routes = {
	'GET /': handleGetRoot,
	'GET /health': handleHealthCheck,
	'POST /api/contact': handleContact,
	'POST /api/register': handleRegister,
};

// Functions
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (matchedChar) => {
		const hexValue = matchedChar === 'x' ? matchedChar : (matchedChar & 0x3) | 0x8;
		return hexValue.toString(16);
	});
}

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

function getSecurityHeaders() {
	return {
		'Referrer-Policy': 'no-referrer',
		'X-Content-Type-Options': 'nosniff',
		'X-Frame-Options': 'DENY',
	};
}

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

function createErrorResponse(message, request, status = 400) {
	return createJsonResponse({ message, status: 'error' }, request, status);
}

function handleOptions(request) {
	return new Response(null, {
		headers: {
			...getCorsHeaders(request),
			...getSecurityHeaders(),
		},
		status: 204,
	});
}

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

// Route functions
async function handleContact(request) {
	try {
		const { name, email, subject, message } = await parseJson(request);

		if (!name || !email || !subject || !message) {
			return createErrorResponse('Missing required fields: name, email, subject, message', request, 422);
		}

		console.log(`[Contact] from ${name} <${email}>: ${message}`);

		return createJsonResponse({ message: 'Thanks for contacting us!', status: 'ok' }, request);
	} catch (err) {
		return createErrorResponse(err.message, request, 400);
	}
}

async function handleRegister(request) {
	try {
		// discordusername
		const { fname, lname, birthyear, gender, email } = await parseJson(request);

		if (!fname || !lname || !birthyear || !gender || !email) {
			return createErrorResponse('Missing required fields: fname, lname, birthyear, gender, email', request, 422);
		}

		console.log(`[Register] fname: ${fname}, lname: ${lname}`);

		return createJsonResponse({ message: 'Registration complete!', status: 'ok' }, request);
	} catch (err) {
		return createErrorResponse(err.message, request, 400);
	}
}

async function handleGetRoot(request) {
	return new Response('Hello World!', {
		headers: {
			...getCorsHeaders(request),
			...getSecurityHeaders(),
			'Content-Type': 'text/plain',
		},
		status: 200,
	});
}

async function handleHealthCheck(request) {
	return createJsonResponse({ status: 'ok', uptime: Date.now() }, request);
}

export default {
	async fetch(request, env, ctx) {
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
				return await handler(request, env, ctx);
			} catch (err) {
				console.error(`[${requestId}] Error:`, err);
				return createErrorResponse('Internal Server Error', request, 500);
			}
		}

		return createErrorResponse('Not Found', request, 404);
	},
};
