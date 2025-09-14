import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';
import { coverageConfigDefaults } from 'vitest/config'

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
		coverage: {
			all: true,
			exclude: [
				...coverageConfigDefaults.exclude
			],
			provider: 'istanbul',
			reporter: ['text', 'html', 'cobertura'],
			reportsDirectory: './coverage',
		},
	},
});
