import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// NOTE: trycloudflare.com uses a random subdomain each run.
// We allow it for preview-only demos (not production).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
