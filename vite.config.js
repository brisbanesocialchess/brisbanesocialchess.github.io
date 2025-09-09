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
				assetFileNames: 'assets/style.css',
				entryFileNames: 'assets/bundle.js',
			},
		},
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
