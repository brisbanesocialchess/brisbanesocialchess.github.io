function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

const corsHeadersCache = new Map();

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  if (!corsHeadersCache.has(origin)) {
    corsHeadersCache.set(origin, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Access-Control-Allow-Credentials': 'true',
    });
  }
  return corsHeadersCache.get(origin);
}

function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
  };
}

function createJsonResponse(data, request, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...getCorsHeaders(request),
      ...getSecurityHeaders(),
    },
  });
}

function createErrorResponse(message, request, status = 400) {
  return createJsonResponse({ status: 'error', message }, request, status);
}

function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...getCorsHeaders(request),
      ...getSecurityHeaders(),
    },
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

async function handleContact(request) {
  try {
    const { name, email, message } = await parseJson(request);

    if (!name || !email || !message) {
      return createErrorResponse('Missing required fields: name, email, message', request, 422);
    }

    console.log(`[Contact] from ${name} <${email}>: ${message}`);

    return createJsonResponse({ status: 'ok', message: 'Thanks for contacting us!' }, request);
  } catch (err) {
    return createErrorResponse(err.message, request, 400);
  }
}

async function handleRegister(request) {
  try {
    const { username, email } = await parseJson(request);

    if (!username || !email) {
      return createErrorResponse('Missing required fields: username, email', request, 422);
    }

    console.log(`[Register] username: ${username}, email: ${email}`);

    return createJsonResponse({ status: 'ok', message: 'Registration complete!' }, request);
  } catch (err) {
    return createErrorResponse(err.message, request, 400);
  }
}

function handleGetRoot(request) {
  return new Response('Hello World!', {
    status: 200,
    headers: {
      ...getCorsHeaders(request),
      ...getSecurityHeaders(),
      'Content-Type': 'text/plain',
    },
  });
}

async function handleHealthCheck(request) {
  return createJsonResponse({ status: 'ok', uptime: Date.now() }, request);
}

const routes = {
  'POST /api/contact': handleContact,
  'POST /api/register': handleRegister,
  'GET /': handleGetRoot,
  'GET /health': handleHealthCheck,
};

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
