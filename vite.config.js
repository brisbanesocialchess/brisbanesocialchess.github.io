import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: '../frontend/assets',
  },
  root: './frontend',
  server: {
    port: 5173,
    strictPort: true,
  },
});
