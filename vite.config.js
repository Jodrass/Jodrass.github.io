import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dating App Platform',
        short_name: 'Dating',
        theme_color: '#fb6f92',
        icons: [{ src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' }]
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
})
