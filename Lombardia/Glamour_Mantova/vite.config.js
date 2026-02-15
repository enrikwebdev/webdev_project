import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Allow trycloudflare demo hosts for vite preview (dev/demo only).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
