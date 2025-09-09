import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';

export default defineConfig({
  root: './_site',
  build: {
    emptyOutDir: true,
    outDir: '../_deploy',
    rollupOptions: {
      input: path.resolve(__dirname, 'frontend/assets/main-entry.js'),
      output: {
        entryFileNames: 'assets/bundle.js',
        assetFileNames: 'assets/style.css',
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssImport()],
    },
  },
  plugins: [],
  server: {
    port: 5173,
    strictPort: true,
  },
});
