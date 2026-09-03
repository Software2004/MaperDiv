/* ────────────────────────────────────────────────────────────────
   SITE CONFIG — navigation, footer, organisation details.
   The nav mega-menu is generated from `NAV`.
   ──────────────────────────────────────────────────────────────── */
import { SERVICES } from "./services.js";
import { SURVEYS } from "./surveys.js";
import { CADASTRAL } from "./cadastral.js";
import { INDUSTRIES } from "./industries.js";

export const ORG = {
  name: "Mappir Dev",
  tagline: "Geospatial Intelligence & Technology",
  since: 2012,
  location: "PWD, Rawalpindi, Pakistan",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=PWD%2C%20Rawalpindi%2C%20Pakistan",
  email: "mappirdev@gmail.com",
  phone: "+92 334 5017980",
  phoneHref: "tel:+923345017980",
  socials: [
    { icon: "linkedin", label: "LinkedIn", href: "#" },
    { icon: "x", label: "X", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "github", label: "GitHub", href: "#" },
  ],
};

/**
 * NAV — top-level items. `menu` renders a mega-menu panel.
 *   { label, to?, menu?: { columns: [{ head, to?, links: [{label, to, desc?}] }], feature? } }
 */
export const NAV = [
  {
    label: "Services",
    to: "/services",
    menu: {
      columns: [
        {
          head: "Technology services",
          to: "/services",
          links: SERVICES.map((s) => ({
            label: s.title,
            to: `/services/${s.slug}`,
            icon: s.icon,
            desc: s.tagline,
          })),
        },
      ],
      feature: {
        eyebrow: "Featured",
        title: "GIS-integrated land information systems",
        body: "Legacy revenue records digitised, geo-referenced and migrated into a live GIS registry.",
        to: "/work",
        cta: "See the work",
      },
    },
  },
  {
    label: "Surveys",
    to: "/surveys",
    menu: {
      columns: [
        {
          head: "Survey & data acquisition",
          to: "/surveys",
          links: SURVEYS.map((s) => ({
            label: s.title,
            to: `/surveys/${s.slug}`,
            desc: s.tagline,
          })),
        },
      ],
      feature: {
        eyebrow: "Featured capability",
        title: "Sub-centimetre drone mapping with RTK/PPK",
        body: "Photogrammetry and LiDAR processed into contours, DTMs and 3D models.",
        to: "/surveys/drone",
        cta: "Request a survey",
      },
    },
  },
  {
    label: "Cadastral",
    to: "/cadastral",
    menu: {
      columns: [
        {
          head: "Land administration",
          to: "/cadastral",
          links: CADASTRAL.filter((c) => c.detail)
            .slice(0, 8)
            .map((c) => ({ label: c.label, to: `/cadastral/${c.slug}` })),
        },
      ],
      feature: {
        eyebrow: "Track record",
        title: "2.4M+ parcels in a live GIS registry",
        body: "Delivered for a provincial land authority with full legal traceability.",
        to: "/cadastral",
        cta: "Explore cadastral",
      },
    },
  },
  {
    label: "Industries",
    to: "/industries",
    menu: {
      columns: [
        {
          head: "Who we serve",
          to: "/industries",
          links: INDUSTRIES.map((i) => ({
            label: i.title,
            to: `/industries/${i.slug}`,
            icon: i.icon,
            desc: i.tagline,
          })),
        },
      ],
    },
  },
  { label: "Work", to: "/work" },
  {
    label: "Insights",
    to: "/insights",
    menu: {
      columns: [
        {
          head: "From the field notes",
          to: "/insights",
          links: [
            { label: "Articles", to: "/insights" },
            { label: "Guides & explainers", to: "/insights/guides" },
            { label: "News", to: "/insights/news" },
          ],
        },
      ],
    },
  },
  {
    label: "About",
    to: "/about",
    menu: {
      columns: [
        {
          head: "Company",
          links: [
            { label: "Our story", to: "/about" },
            { label: "Team", to: "/about/team" },
            { label: "Partners", to: "/about/partners" },
            { label: "Careers", to: "/careers" },
          ],
        },
      ],
    },
  },
];

export const FOOTER_COLS = [
  {
    head: "Services",
    links: SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` })),
  },
  {
    head: "Surveys",
    links: SURVEYS.map((s) => ({ label: s.title, to: `/surveys/${s.slug}` })),
  },
  {
    head: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Work", to: "/work" },
      { label: "Insights", to: "/insights" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
      { label: "Request a quote", to: "/request-a-quote" },
    ],
  },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];
