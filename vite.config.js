import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.loca.lt', // This will allow all localtunnel subdomains
      '8f06-49-36-27-127.ngrok-free.app',
      'localhost:5173'
    ]
  }
})
