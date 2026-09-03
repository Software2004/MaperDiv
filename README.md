# Mappir Dev — website

Multi-page marketing site for Mappir Dev (GIS development, surveys, cadastral
mapping, IoT). React 19 + Vite, client-side routing with React Router 7,
deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/  (also writes sitemap.xml + robots.txt)
npm run lint
```

Copy `.env.example` → `.env` to set the canonical URL and the contact-form
endpoint. Everything has a default so it builds without one.

## Structure

```
src/
  siteConfig.js        deploy-time config (SITE_URL, CONTACT_ENDPOINT) from env
  main.jsx             BrowserRouter setup (basename from Vite `base`)
  App.jsx              layout: <Nav> + <Routes> + <Footer> + <ScrollToTop>
  styles/global.css    whole stylesheet (design system + page styles)
  lib/
    icons.jsx          <Icon>            icon-data.jsx   paths + brand marks
    hooks.js           useInView / useMediaQuery / useCountUp / useScrolled
    Seo.jsx            per-route <title> + meta/OG/canonical/robots
    jsonld.js          Service / Article / BreadcrumbList builders → <Seo jsonLd=…>
  data/                all site content as JS modules — edit these to change copy
    site.js            nav mega-menu + footer + org details
    services.js surveys.js cadastral.js industries.js work.js insights.js company.js
  components/           Nav, Footer, HeroMap, ContactForm, primitives, page-parts
  pages/               one file per route (see App.jsx for the full map)
scripts/gen-sitemap.mjs  build sitemap.xml + robots.txt from the route data
```

Content lives in `src/data/*` — adding a service, survey, case study or article
is a matter of adding an object there (the sitemap picks it up automatically).
The next step is to move these to MDX / a CMS.

## Routes

`/` · `/services` + `/services/:slug` · `/surveys` + `/surveys/:slug` ·
`/cadastral` + `/cadastral/:slug` · `/industries` + `/industries/:slug` ·
`/work` + `/work/:slug` · `/insights` (+ `/guides`, `/news`) + `/insights/:slug` ·
`/about` · `/about/team` · `/about/partners` · `/careers` + `/careers/:slug` ·
`/contact` · `/request-a-quote` · `/privacy` · `/terms` · `*` (404)

## SEO

- Per-route `<title>`, description, canonical, Open Graph and Twitter tags via
  `src/lib/Seo.jsx`.
- Site-wide `Organization` + `WebSite` JSON-LD is static in `index.html` (crawlable
  without JS). Detail pages add `Service` / `Article` / `BreadcrumbList` JSON-LD.
- `npm run build` runs `scripts/gen-sitemap.mjs` → `dist/sitemap.xml` (all 50+
  routes, derived from `src/data/*`) and `dist/robots.txt`.
- URLs use `VITE_SITE_URL` (default `https://www.mappirdev.com`) — set it before
  building for production.

## Contact form

`src/components/ContactForm.jsx` POSTs JSON to `VITE_CONTACT_ENDPOINT`
(Formspree / Basin / Web3Forms / your own function). With no endpoint set it
falls back to a `mailto:` link. A hidden honeypot field drops obvious bot
submissions client-side.

## Deploy notes

- `vite.config.js` `base` is **`/`** by default (custom domain / user page).
  For a project-page deploy at `user.github.io/<repo>/`, build with
  `VITE_BASE="/<repo>/" npm run build` **and** set `segmentsToKeep = 1` in
  `public/404.html`.
- `public/404.html` + the inline script in `index.html` restore deep links on
  GitHub Pages (SPA fallback). `.nojekyll` is already in `public/`.

## Remaining follow-ups

- **Static prerendering.** The site is still client-rendered, so social-preview
  scrapers and non-JS crawlers see the shell. To fix, migrate to `vite-react-ssg`:
  convert `App.jsx`'s `<Routes>` to a `routes` array with `getStaticPaths` for the
  dynamic segments, and swap `Seo.jsx`'s imperative head writes for `@unhead/react`
  (bundled with vite-react-ssg). The route list in `scripts/gen-sitemap.mjs` is the
  same one SSG needs.
- **Real copy** for the legal pages, team member bios, partner logos and the full
  article bodies (current text is drafted placeholder).
- **Analytics + cookie consent** (GA4 / Plausible behind a consent banner) once
  there's EU traffic.
