import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
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
			email: 'alice@example.com',
			message: 'Hello from contact form!',
			name: 'Alice',
			subject: 'Subject',
		});

		const request = new Request('http://example.com/api/contact', {
			body,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(await response.json()).toEqual({
			message: 'Thanks for contacting us!',
			status: 'ok',
		});
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
	});

	it('handles user registration', async () => {
		const body = JSON.stringify({
			birthyear: '1990',
			discordusername: '',
			email: 'max@example.com',
			fname: '',
			gender: 'male',
			lname: '',
		});

		const request = new Request('http://example.com/api/register', {
			body,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(await response.json()).toEqual({
			message: 'Registration complete!',
			status: 'ok',
		});
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
		expect(await response.json()).toEqual({
			message: 'Not Found',
			status: 'error',
		});
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
	});

	it('responds to OPTIONS preflight request', async () => {
		const request = new Request('http://example.com/api/contact', {
			headers: {
				'Access-Control-Request-Headers': 'Content-Type',
				'Access-Control-Request-Method': 'POST',
				Origin: 'http://example.com',
			},
			method: 'OPTIONS',
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
