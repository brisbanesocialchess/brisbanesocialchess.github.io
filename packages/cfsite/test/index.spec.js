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
    const request = new Request('http://example.com');
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
  });

  it('responds with Hello World! (integration style)', async () => {
    const response = await SELF.fetch('http://example.com');
    expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
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
  });
});
