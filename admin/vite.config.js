import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['*/.mp3'], // Allow Vite to handle .mp3 files as static assets
  server: {
    port: 5178,
    hmr: {
      overlay: false, // Disable the error overlay in development
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});