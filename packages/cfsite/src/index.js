/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

async function handleContact(request) {
  const body = await request.json();
  const { name, email, message } = body;

  console.log(`Contact form from ${name} <${email}>: ${message}`);

  return new Response(JSON.stringify({ status: 'ok', message: 'Thanks for contacting us!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleRegister(request) {
  const body = await request.json();
  const { username, email, password } = body;

  console.log(`Register: ${username} / ${email}`);

  return new Response(JSON.stringify({ status: 'ok', message: 'Registration complete!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (request.method === 'POST') {
      if (pathname === '/api/contact') {
        return handleContact(request);
      }

      if (pathname === '/api/register') {
        return handleRegister(request);
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};
