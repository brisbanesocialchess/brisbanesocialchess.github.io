import { defineConfig } from 'vite';
import path from 'path';
import postcssImport from 'postcss-import';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: './_site',
  build: {
    emptyOutDir: true,
    outDir: './_build',
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
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '_site/**/*.html',
          dest: '.',
          flatten: false,
        },
      ],
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
});
