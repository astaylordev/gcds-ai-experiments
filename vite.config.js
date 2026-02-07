import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Use string instead of true
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173 // Important for devcontainer HMR
    },
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
