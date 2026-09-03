import { SITE_NAME, SITE_URL, abs } from "../siteConfig";

/* JSON-LD builders for route-level structured data. Passed to <Seo jsonLd=…>. */

export const breadcrumbLd = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ label: "Home", to: "/" }, ...trail].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label || c.name,
    item: c.to ? abs(c.to) : undefined,
  })),
});

export const serviceLd = ({ name, description, path, serviceType }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType: serviceType || name,
  url: abs(path),
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: "Worldwide",
});

export const articleLd = ({ headline, description, image, path, datePublished }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  image: image ? (image.startsWith("http") ? image : abs(image)) : undefined,
  datePublished,
  dateModified: datePublished,
  mainEntityOfPage: abs(path),
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs("/favicon.ico") },
  },
});
