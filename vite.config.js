import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const isTest = process.env.VITEST === 'true';

export default defineConfig({
	build: {
		assetsInlineLimit: 0,
		emptyOutDir: false,
		outDir: '../_deploy',
		rollupOptions: {
			input: path.resolve(__dirname, 'frontend/assets/main-entry.js'),
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'assets/styles/[name].css';
					} else if (assetInfo.originalFileNames?.some((name) => name.includes('assets/avatars/'))) {
						return `assets/avatars/${assetInfo.name}`;
					} else if (assetInfo.originalFileNames?.some((name) => name.includes('assets/images/'))) {
						return `assets/images/${assetInfo.name}`;
					} else if (assetInfo.originalFileNames?.some((name) => name.includes('assets/pictures/'))) {
						return `assets/pictures/${assetInfo.name}`;
					}
					return 'assets/[name][extname]';
				},
				chunkFileNames: 'assets/scripts/[name].js',
				entryFileNames: 'assets/scripts/[name].js',
				manualChunks: undefined,
			},
		},
	},
	css: {
		postcss: {
			plugins: [postcssImport()],
		},
	},
	plugins: [
		ViteImageOptimizer({
			jpeg: { quality: 80 },
			jpg: { quality: 80 },
			png: { quality: 90 },
			svg: { multipass: true },
		}),
	],
	root: isTest ? '.' : './_site',
	server: {
		port: 5173,
		strictPort: true,
	},
	test: {
		coverage: {
			all: true,
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/cypress/**',
				'**/.{idea,git,cache,output,temp}/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
				'**/coverage/**',
				'**/_site/**',
				'**/_deploy/**',
			],
			provider: 'v8',
			reporter: ['text', 'html', 'cobertura'],
			reportsDirectory: './coverage',
		},
	},
});
