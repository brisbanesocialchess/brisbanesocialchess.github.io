import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
  SELF,
} from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Hello World worker', () => {
  it('responds with Hello World! (unit style)', async () => {
    const request = new Request('http://example.com/');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
  });

  it('responds with Hello World! (integration style)', async () => {
    const response = await SELF.fetch('http://example.com/');
    expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
  });
});

describe('API endpoints', () => {
  it('handles contact form submission', async () => {
    const body = JSON.stringify({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hello from contact form!',
    });

    const request = new Request('http://example.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(await response.json()).toMatchInlineSnapshot(`
      {
        "message": "Thanks for contacting us!",
        "status": "ok",
      }
    `);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
  });

  it('handles user registration', async () => {
    const body = JSON.stringify({
      username: 'BaseMax',
      email: 'max@example.com',
      password: 'secret123',
    });

    const request = new Request('http://example.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(await response.json()).toMatchInlineSnapshot(`
      {
        "message": "Registration complete!",
        "status": "ok",
      }
    `);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
  });

  it('responds with 404 for unknown routes', async () => {
    const request = new Request('http://example.com/api/unknown', {
      method: 'GET',
    });
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe('Not Found');
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
  });

  it('responds to OPTIONS preflight request', async () => {
    const request = new Request('http://example.com/api/contact', {
      method: 'OPTIONS',
      headers: {
        Origin: 'http://example.com',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('http://example.com');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
  });
});
