import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both at a domain root
  // (user page / custom domain) and under a subpath
  // (project page: https://<user>.github.io/<repo>/).
  base: './',
  plugins: [react()],
})
