import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	assetsInclude: [],
	build: {
		assetsInlineLimit: 0,
		emptyOutDir: false,
		outDir: '../_deploy',
		rollupOptions: {
			input: path.resolve(__dirname, 'frontend/assets/main-entry.js'),
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'assets/styles/style.css';
					} else if (assetInfo.originalFileNames?.some((name) => name.includes('assets/images/'))) {
						return `assets/images/${assetInfo.name}`;
					} else if (assetInfo.originalFileNames?.some((name) => name.includes('assets/pictures/'))) {
						return `assets/pictures/${assetInfo.name}`;
					}
					return 'assets/[name][extname]';
				},
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e56a6bc (Max updates 09 09 2025 (#593))
				chunkFileNames: 'assets/scripts/[name].js',
				entryFileNames: 'assets/scripts/[name].js',
				manualChunks: undefined,
			},
<<<<<<< HEAD
		},
=======
				chunkFileNames: 'chunks/[name].js',
				entryFileNames: 'script.js',
			}
		},
	},
	assetsInclude: [],
	optimizeDeps: {
		exclude: ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.webp']
>>>>>>> 987469a (chore(vite): reorder keys to satisfy sort-keys and prevent image JS output)
	},
	css: {
		postcss: {
			plugins: [postcssImport()],
		},
	},
=======
		},
	},
	css: {
		postcss: {
			plugins: [postcssImport()],
		},
	},
>>>>>>> e56a6bc (Max updates 09 09 2025 (#593))
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
	assetsInclude: [],
	optimizeDeps: {
		exclude: ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.webp']
	}
});
