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
				assetFileNames: (assetInfo) => {
					console.log(assetInfo);
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'assets/style.css';
					}
					else if (assetInfo.originalFileNames?.includes('assets/images/')) {
						const name = assetInfo.name.replace('images/', '');
						return `assets/images/${name}`;
					}
					else if (assetInfo.originalFileNames?.includes('assets/pictures/')) {
						const name = assetInfo.name.replace('pictures/', '');
						return `assets/pictures/${name}`;
					}
					return 'assets/[name][extname]';
				},
				entryFileNames: 'assets/bundle.js',
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
