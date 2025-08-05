import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/study-reboot/', // Para GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
