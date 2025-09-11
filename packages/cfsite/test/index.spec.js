import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

const BASE_URL = 'http://example.com'; // This should be 'example.com' as that is how Cloudflare emulates and tests the project in test mode.

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new Request(BASE_URL);
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		expect(await response.text()).toMatchInlineSnapshot('"Hello World!"');
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
	});

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch(BASE_URL);
		expect(await response.text()).toMatchInlineSnapshot('"Hello World!"');
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

		const request = new Request(`${BASE_URL}/api/contact`, {
			body,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(await response.json()).toEqual({
			message: 'Captcha verification failed',
			status: 'error',
		});
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
	});

	it('handles user registration', async () => {
		const body = JSON.stringify({
			birthyear: '1990',
			discordusername: '',
			email: 'maxbasecode@gmail.com',
			fname: 'Max',
			gender: 'male',
			lname: 'Base',
		});

		const request = new Request(`${BASE_URL}/api/register`, {
			body,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(await response.json()).toEqual({
			message: 'Captcha verification failed',
			status: 'error',
		});
		expect(response.headers.get('Access-Control-Allow-Origin')).toBeDefined();
	});

	it('responds with 404 for unknown routes', async () => {
		const request = new Request(`${BASE_URL}/api/unknown`, {
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
		const request = new Request(`${BASE_URL}/api/contact`, {
			headers: {
				'Access-Control-Request-Headers': 'Content-Type',
				'Access-Control-Request-Method': 'POST',
				Origin: BASE_URL,
			},
			method: 'OPTIONS',
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Origin')).toBe(BASE_URL);
		expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
		expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
	});
});
