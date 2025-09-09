import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: '../_build',
  },
  root: './_site',
  server: {
    port: 5173,
    strictPort: true,
  },
});
