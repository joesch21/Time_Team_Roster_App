import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Minimal Vite configuration for the roster app.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});