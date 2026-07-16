import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom domain (justindavidperez.com) serves from the root, so no repo-name base path.
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    // Vite's default. Not 3000 — the DynastyFutures backend lives there, and a
    // collision hands you its JSON 404 instead of this site.
    port: 5173,
    strictPort: true,
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: true,
  },
})
