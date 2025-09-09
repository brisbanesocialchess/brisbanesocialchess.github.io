import { defineConfig } from 'vite';
import postcssImport from 'postcss-import';

export default defineConfig({
  root: './_site',
  build: {
    emptyOutDir: true,
    outDir: '../_build/',
  },
  css: {
    postcss: {
      plugins: [postcssImport()],
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
