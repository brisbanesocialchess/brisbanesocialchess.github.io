import { defineConfig } from 'vite';
import path from 'path';
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
			jpg: { quality: 80 },
			png: { quality: 90 },
			svg: { multipass: true },
		}),
	],
	root: './_site',
	server: {
		port: 5173,
		strictPort: true,
	},
});
