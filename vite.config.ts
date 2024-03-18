import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import vitePluginChecker from 'vite-plugin-checker'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mockServer from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    vitePluginChecker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"'
      }
    }),
    mockServer()
  ],
  server: {
    proxy: {
      '^/api': { target: 'http://localhost/3000' }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
