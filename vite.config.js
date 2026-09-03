import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.mappirdev.com').replace(/\/$/, '')

// Replace the __SITE_URL__ token in index.html (canonical / OG / JSON-LD).
const htmlSiteUrl = {
  name: 'html-site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
}

// https://vite.dev/config/
//
// `base` must be an ABSOLUTE path now that the site uses client-side routing —
// a relative base ("./") breaks asset URLs on nested routes like /services/x.
//   • custom domain or user page  → "/"        (default)
//   • project page (user.github.io/<repo>/) → set VITE_BASE="/<repo>/" at build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), htmlSiteUrl],
})
