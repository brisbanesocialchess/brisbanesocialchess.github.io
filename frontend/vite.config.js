import { defineConfig } from "vite";

export default defineConfig({
  root: './frontend',
  build: {
    outDir: './frontend/assets',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
