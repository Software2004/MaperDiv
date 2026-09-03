/* ────────────────────────────────────────────────────────────────
   Deploy-time configuration. Override with a .env file (see
   .env.example) — every value here has a safe default so the site
   builds and runs without one.
   ──────────────────────────────────────────────────────────────── */

/** Canonical origin — used for <link rel="canonical">, OG URLs, JSON-LD and sitemap.xml. No trailing slash. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.mappirdev.com"
).replace(/\/$/, "");

/** Contact / quote form endpoint (Formspree, Basin, Web3Forms, or your own). Empty = not wired yet. */
export const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || "";

export const SITE_NAME = "Mappir Dev";
export const SITE_TITLE = "Mappir Dev — Geospatial Intelligence & Technology";
export const SITE_DESC =
  "Mappir Dev delivers end-to-end GIS development, precision drone and land surveys, cadastral mapping and intelligent software for governments, infrastructure firms and enterprises.";

export const abs = (path = "/") => SITE_URL + (path.startsWith("/") ? path : `/${path}`);
