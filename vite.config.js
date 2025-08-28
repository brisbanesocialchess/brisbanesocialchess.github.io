import { defineConfig } from "vite";

export default defineConfig({
  root: './frontend',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: './frontend/assets',
    emptyOutDir: true,
  },
});
