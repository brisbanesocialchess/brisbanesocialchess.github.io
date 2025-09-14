export const env = {};

export function createExecutionContext() {
  return {
    passThroughOnException: () => {},
    waitUntil: async (promise) => await promise,
  };
}

export function waitOnExecutionContext() {
  return Promise.resolve();
}

export const SELF = {
  fetch: async (req) => {
    const { default: worker } = await import('../src/index.js');

    if (typeof worker.fetch === 'function') {
      return worker.fetch(req, env, createExecutionContext());
    }

    return new Response('No fetch() defined', { status: 500 });
  },
};
