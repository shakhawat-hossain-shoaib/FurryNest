import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward API calls to backend during development
      '/api': 'http://localhost:5000',
      '/upload': 'http://localhost:3000',
    },
  },
})
