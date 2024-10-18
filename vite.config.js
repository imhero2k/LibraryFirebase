import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: false, // Disable CORS in the dev server
    proxy: {
      '/weather': {
        target: 'https://api.openweathermap.org/', // The OpenWeather API endpoint
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: true, // Ensure SSL verification is enabled
        rewrite: (path) => path.replace(/^\/weather/, ''), // Remove '/weather' from the path
      },
    }
  },
  
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
