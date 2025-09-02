import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const enablePWADuringDev = process.env.VITE_ENABLE_PWA_DEV === 'true';

export default defineConfig(({ command }) => {
  const plugins = [react()];

  if (command === 'build' || enablePWADuringDev) {
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Time Team Roster',
          short_name: 'Roster',
          theme_color: '#111827',
          background_color: '#111827',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: '/pwa-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
            { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          navigateFallback: '/offline.html',
          additionalManifestEntries: ['/', '/login', '/signup', '/admin/roster']
          // runtimeCaching … (keep your existing entries)
        }
      })
    );
  }

  return {
    plugins,
    server: { port: 3000 },
    resolve: { alias: { '@': '/src' } }
  };
});

