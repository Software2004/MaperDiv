/* ────────────────────────────────────────────────────────────────
   ICON SYSTEM — single stroke set, currentColor, 24px grid
   ──────────────────────────────────────────────────────────────── */
export const ICONS = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 18l9 5 9-5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.6 2.7 4 6 4 9s-1.4 6.3-4 9c-2.6-2.7-4-6-4-9s1.4-6.3 4-9Z",
  smartphone: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM10.5 18h3",
  code: "m8 6-6 6 6 6M16 6l6 6-6 6",
  barChart: "M3 3v18h18M8 17v-5M13 17V8M18 17v-9",
  wifi: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  cpu: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3",
  mapPin: "M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12ZM12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clipboard: "M9 4h6v3H9zM8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2",
  penLine: "M4 20h16M6 16 16.5 5.5a2.1 2.1 0 0 1 3 3L9 19l-4 1 1-4Z",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  monitor: "M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM8 21h8M12 17v4",
  building: "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M3 21h18M9 7h2M9 11h2M9 15h2M14 21v-4h2v4",
  leaf: "M11 20A7 7 0 0 1 4 13C4 7 9 4 20 3c1 11-4 16-9 17ZM4 20c3-4 6-6 10-7",
  box3d: "M12 2 3 7v10l9 5 9-5V7l-9-5ZM3 7l9 5 9-5M12 12v10",
  refresh: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  ruler: "M4 16 16 4l4 4L8 20zM8.5 11.5l1.5 1.5M11.5 8.5l1.5 1.5M14.5 5.5 16 7",
  shield: "M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10Z",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM3 7l9 6 9-6",
  phone: "M15.5 21C8 21 3 16 3 8.5 3 5 5 3 7 3c1 0 1.7.6 2 1.5l1 3c.3.9 0 1.6-.6 2L9 12c1 2 2 3 4 4l1.5-1.4c.6-.6 1.3-.9 2-.6l3 1c.9.3 1.5 1 1.5 2 0 2-2 4-5.5 4Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  quote: "M9 11H6a1 1 0 0 1-1-1V8a3 3 0 0 1 3-3M19 11h-3a1 1 0 0 1-1-1V8a3 3 0 0 1 3-3M5 11v3a3 3 0 0 0 3 3M15 11v3a3 3 0 0 0 3 3",
  check: "M20 6 9 17l-5-5",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01",
  workflow: "M4 4h6v6H4zM14 14h6v6h-6zM10 7h4a3 3 0 0 1 3 3v4",
  linkedin: "M4.5 9H8v11H4.5zM6.25 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM11 9h3.3v1.6c.5-.9 1.7-1.9 3.5-1.9 3 0 4.2 2 4.2 5.2V20H21.5v-5.4c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.5-.1.2-.1.6-.1.9V20H12s.04-9.9 0-11Z",
  x: "M4 4l7 8.5L4 20h2l6-6.7L17 20h3l-7.4-9L19.5 4h-2l-5.2 5.8L7.5 4z",
  youtube: "M23 12s0-3.4-.4-5c-.3-1-1-1.8-2-2C18.7 4.5 12 4.5 12 4.5s-6.7 0-8.6.5c-1 .3-1.8 1-2 2C1 8.6 1 12 1 12s0 3.4.4 5c.3 1 1 1.8 2 2 1.9.5 8.6.5 8.6.5s6.7 0 8.6-.5c1-.3 1.7-1 2-2 .4-1.6.4-5 .4-5ZM10 15.5v-7l6 3.5-6 3.5Z",
  github: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.5-1.4.1-2.8 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.5.1 2.8.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  play: "M8 5v14l11-7z",
  sparkles: "M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3ZM19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM16 8l-2 6-6 2 2-6 6-2Z",
  satellite: "M4 13l3-3 4 4-3 3a2.8 2.8 0 0 1-4-4ZM11 6l2-2 4 4-2 2M14 3l1-1 6 6-1 1M14 14l3 3M17 14a4 4 0 0 1-3 3",
  users: "M16 19a4 4 0 0 0-8 0M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19a3.5 3.5 0 0 0-5-3.2M17.5 11a3 3 0 0 0 0-6",
  award: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM8.5 13.5 7 22l5-3 5 3-1.5-8.5",
  briefcase: "M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1ZM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18",
  fileText: "M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4ZM14 3v4h4M9 13h6M9 17h6",
  gauge: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 12l4-4M5.5 18a9 9 0 1 1 13 0",
};

/* ── Brand marks (placeholder clients / partners — swap for real logos) ── */
export const BRAND_SHAPES = {
  stack: (
    <>
      <path d="M13 2 3 8l10 6 10-6-10-6Z" fill="currentColor" opacity=".9" />
      <path d="M3 13l10 6 10-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 18l10 6 10-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" opacity=".45" />
    </>
  ),
  orbit: (
    <>
      <circle cx="13" cy="13" r="4.8" fill="currentColor" />
      <ellipse cx="13" cy="13" rx="11" ry="4.6" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(-24 13 13)" />
    </>
  ),
  hex: (
    <>
      <path d="M13 2.2l9.4 5.4v10.8L13 23.8 3.6 18.4V7.6L13 2.2Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <circle cx="13" cy="13" r="3.3" fill="currentColor" />
    </>
  ),
  pin: (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13 2c-4.4 0-8 3.4-8 7.7 0 5.5 8 14.3 8 14.3s8-8.8 8-14.3C21 5.4 17.4 2 13 2Zm0 5a2.7 2.7 0 1 0 0 5.4A2.7 2.7 0 0 0 13 7Z"
    />
  ),
  grid: (
    <g fill="currentColor">
      <rect x="3" y="3" width="9" height="9" rx="2" />
      <rect x="14" y="3" width="9" height="9" rx="2" opacity=".5" />
      <rect x="3" y="14" width="9" height="9" rx="2" opacity=".5" />
      <rect x="14" y="14" width="9" height="9" rx="2" />
    </g>
  ),
  wave: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M2 10c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4" />
      <path d="M2 17c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4" opacity=".45" />
    </g>
  ),
  chev: (
    <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5l8 6-8 6" />
      <path d="M13 5l8 6-8 6" opacity=".5" />
    </g>
  ),
  ring: (
    <>
      <circle cx="13" cy="13" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" opacity=".45" />
      <circle cx="13" cy="13" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="13" cy="13" r="1.8" fill="currentColor" />
    </>
  ),
  bolt: <path d="M14 2 5 15h6l-2 9 11-14h-7l1-8Z" fill="currentColor" />,
};
