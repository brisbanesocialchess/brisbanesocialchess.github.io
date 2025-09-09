import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: '../_deploy',
		rollupOptions: {
			input: path.resolve(__dirname, 'frontend/assets/main-entry.js'),
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'assets/style.css';
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
	plugins: [],
	root: './_site',
	server: {
		port: 5173,
		strictPort: true,
	},
});
