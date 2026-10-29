import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    target: ['es2019', 'chrome80', 'safari13'],
    cssTarget: ['chrome80', 'safari13'],
  },
});
