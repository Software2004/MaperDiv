import { useEffect } from "react";
import { SITE_NAME, SITE_TITLE, SITE_DESC, abs } from "../siteConfig";

function upsertMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (value == null) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(data) {
  document.head
    .querySelectorAll('script[data-seo-jsonld="route"]')
    .forEach((n) => n.remove());
  if (!data) return;
  const list = Array.isArray(data) ? data : [data];
  for (const obj of list) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-seo-jsonld", "route");
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
}

/**
 * Per-route <head>. Sets title, description, canonical, Open Graph / Twitter
 * tags and (optionally) route-level JSON-LD. Site-wide Organization / WebSite
 * JSON-LD lives statically in index.html so crawlers see it without JS.
 */
export default function Seo({
  title,
  description = SITE_DESC,
  image,
  path,
  noindex = false,
  jsonLd,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_TITLE;
    document.title = fullTitle;

    const url = abs(path ?? window.location.pathname);
    const img = image ? (image.startsWith("http") ? image : abs(image)) : null;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:card", img ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    upsertLink("canonical", url);
    upsertJsonLd(jsonLd);
  }, [title, description, image, path, noindex, jsonLd]);

  return null;
}
