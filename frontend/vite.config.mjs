import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        navigateFallback: '/offline.html',
        additionalManifestEntries: ['/', '/login', '/signup', '/admin/roster']
      }
    })
  ],
  server: { port: 3000 },
  resolve: { alias: { '@': '/src' } },
})

