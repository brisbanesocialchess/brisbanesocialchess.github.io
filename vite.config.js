import path from 'path';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import postcssImport from 'postcss-import';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
			ansiColors: true,
			avif: { lossless: true },
			gif: {},
			includePublic: true,
			jpeg: { quality: 80 },
			jpg: { quality: 80 },
			logStats: true,
			png: { quality: 90 },
			svg: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								cleanupIds: {
									minify: false,
									remove: false,
								},
								cleanupNumericValues: false,
								convertPathData: false,
							},
						},
					},
					'sortAttrs',
					{
						name: 'addAttributesToSVGElement',
						params: {
							attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
						},
					},
				],
			},
			test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
			tiff: { quality: 100 },
			webp: { lossless: true },
		}),
	],
	root: './_site',
	server: {
		port: 5173,
		strictPort: true,
	},
	test: {
		coverage: {
			all: true,
			exclude: ['**/packages/cfsite/**', '**/_site/**', ...coverageConfigDefaults.exclude],
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'cobertura'],
			reportsDirectory: '../coverage',
		},
	},
});
