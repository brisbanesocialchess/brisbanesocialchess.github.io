import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	build: {
		emptyOutDir: false,
		outDir: '../_deploy',
		rollupOptions: {
			input: path.resolve(__dirname, 'frontend/assets/main-entry.js'),
			output: {
		        manualChunks: undefined,
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'assets/styles/style.css';
					}
					else if (assetInfo.originalFileNames?.some(name => name.includes('assets/images/'))) {
						return `assets/images/${assetInfo.name}`;
					}
					else if (assetInfo.originalFileNames?.some(name => name.includes('assets/pictures/'))) {
						return `assets/pictures/${assetInfo.name}`;
					}
					return 'assets/[name][extname]';
				},
				entryFileNames: 'assets/scripts/[name].js',
				chunkFileNames: 'assets/scripts/[name].js',
			},
		},
		assetsInlineLimit: 0,
	},
	css: {
		postcss: {
			plugins: [postcssImport()],
		},
	},
	plugins: [
		ViteImageOptimizer({
			png: { quality: 90 },
			jpg: { quality: 80 },
			svg: { multipass: true },
		}),
	],
	root: './_site',
	server: {
		port: 5173,
		strictPort: true,
	},
});
