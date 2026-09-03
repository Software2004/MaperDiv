/*
 * Generates dist/sitemap.xml and dist/robots.txt from the route data.
 * Runs automatically after `npm run build` (see package.json "postbuild").
 *
 * Route data is the single source of truth — src/data/*. Static routes are
 * listed here; dynamic ones are derived from the same arrays the app renders.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { SERVICES } from "../src/data/services.js";
import { SURVEYS } from "../src/data/surveys.js";
import { CADASTRAL } from "../src/data/cadastral.js";
import { INDUSTRIES } from "../src/data/industries.js";
import { WORK } from "../src/data/work.js";
import { INSIGHTS } from "../src/data/insights.js";
import { OPEN_ROLES } from "../src/data/company.js";

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.mappirdev.com").replace(/\/$/, "");
const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");

const today = new Date().toISOString().slice(0, 10);

// [path, changefreq, priority, lastmod?]
const staticRoutes = [
  ["/", "weekly", "1.0"],
  ["/services", "monthly", "0.9"],
  ["/surveys", "monthly", "0.9"],
  ["/cadastral", "monthly", "0.9"],
  ["/industries", "monthly", "0.8"],
  ["/work", "weekly", "0.8"],
  ["/insights", "weekly", "0.7"],
  ["/insights/guides", "weekly", "0.6"],
  ["/insights/news", "weekly", "0.6"],
  ["/about", "yearly", "0.5"],
  ["/about/team", "yearly", "0.4"],
  ["/about/partners", "yearly", "0.4"],
  ["/careers", "weekly", "0.6"],
  ["/contact", "yearly", "0.6"],
  ["/request-a-quote", "yearly", "0.7"],
  ["/privacy", "yearly", "0.2"],
  ["/terms", "yearly", "0.2"],
];

const dynamicRoutes = [
  ...SERVICES.map((s) => [`/services/${s.slug}`, "monthly", "0.8"]),
  ...SURVEYS.map((s) => [`/surveys/${s.slug}`, "monthly", "0.8"]),
  ...CADASTRAL.filter((c) => c.detail).map((c) => [`/cadastral/${c.slug}`, "monthly", "0.7"]),
  ...INDUSTRIES.map((i) => [`/industries/${i.slug}`, "monthly", "0.7"]),
  ...WORK.map((w) => [`/work/${w.slug}`, "monthly", "0.7"]),
  ...INSIGHTS.map((p) => [`/insights/${p.slug}`, "monthly", "0.6", p.date]),
  ...OPEN_ROLES.map((r) => [`/careers/${r.slug}`, "weekly", "0.5"]),
];

const routes = [...staticRoutes, ...dynamicRoutes];

const urls = routes
  .map(([path, changefreq, priority, lastmod]) => {
    const loc = `${SITE_URL}${path}`;
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod || today}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
writeFileSync(resolve(distDir, "robots.txt"), robots);

console.log(`sitemap.xml — ${routes.length} URLs @ ${SITE_URL}`);
console.log("robots.txt  — written");
