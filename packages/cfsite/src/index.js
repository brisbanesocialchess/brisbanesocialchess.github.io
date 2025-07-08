const JSON_HEADERS = { 'Content-Type': 'application/json' };

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function createJsonResponse(data, request, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...getCorsHeaders(request),
    },
  });
}

function handleOptions(request) {
  // Handle CORS preflight request
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

async function handleContact(request) {
  const { name, email, message } = await request.json();
  console.log(`Contact form from ${name} <${email}>: ${message}`);
  return createJsonResponse({ status: 'ok', message: 'Thanks for contacting us!' }, request);
}

async function handleRegister(request) {
  const { username, email } = await request.json();
  console.log(`Register: ${username} / ${email}`);
  return createJsonResponse({ status: 'ok', message: 'Registration complete!' }, request);
}

async function handleGetRoot(request) {
  return new Response('Hello World!', {
    status: 200,
    headers: getCorsHeaders(request),
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;
    console.log('Request:', method, pathname);

    if (method === 'OPTIONS') {
      return handleOptions(request);
    }

    if (method === 'POST') {
      if (pathname === '/api/contact') return handleContact(request);
      if (pathname === '/api/register') return handleRegister(request);
    }

    if (method === 'GET' && pathname === '/') {
      return handleGetRoot(request);
    }

    return new Response('Not Found', {
      status: 404,
      headers: getCorsHeaders(request),
    });
  },
};
