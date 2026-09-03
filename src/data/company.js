/* ────────────────────────────────────────────────────────────────
   COMPANY — shared marketing content (stats, process, proof,
   testimonials, team, values, careers).
   ──────────────────────────────────────────────────────────────── */

export const STATS = [
  { value: "350+", label: "Projects Delivered" },
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Expert Engineers" },
  { value: "28", label: "Countries Served" },
];

export const STEPS = [
  { icon: "search", title: "Discover & scope", desc: "We map the problem before the terrain — stakeholders, data sources, accuracy targets and compliance constraints." },
  { icon: "cpu", title: "AI-first design", desc: "Automation, spatial ML and processing pipelines are designed in from day one, not bolted on later." },
  { icon: "ruler", title: "Build & verify", desc: "Every deliverable is ground-truthed against control points and reviewed to national survey standards." },
  { icon: "shield", title: "Deliver & support", desc: "Documented handover, training and long-term maintenance of the platforms and registries we build." },
];

export const CLIENTS = [
  { name: "Terrafirma Cadastre", shape: "stack", c: "#0EA5A3" },
  { name: "OrbitalGrid", shape: "orbit", c: "#4F46E5" },
  { name: "Meridian Rail", shape: "chev", c: "#D97706" },
  { name: "Helix Civil Group", shape: "hex", c: "#E11D48" },
  { name: "NordCoast Ports", shape: "wave", c: "#0284C7" },
  { name: "AtlasWorks", shape: "grid", c: "#7C3AED" },
  { name: "CivicMap Agency", shape: "pin", c: "#059669" },
  { name: "BluePeak Energy", shape: "bolt", c: "#EA580C" },
  { name: "GeoNexus Labs", shape: "ring", c: "#0891B2" },
];

export const PARTNERS = [
  { name: "CloudSpan", shape: "grid", c: "#2563EB" },
  { name: "Sentinel Data Co.", shape: "orbit", c: "#7C3AED" },
  { name: "FieldOps SDK", shape: "chev", c: "#0D9488" },
  { name: "CartoStack", shape: "stack", c: "#DB2777" },
  { name: "RTKnet", shape: "ring", c: "#16A34A" },
  { name: "OpenTerrain", shape: "hex", c: "#D97706" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Mappir Dev digitised over 2.4 million land parcels for our provincial land authority and delivered a complete GIS-integrated registry system on time and with exceptional precision.",
    name: "R. Kapoor",
    role: "Director, Regional Land Authority",
  },
  {
    quote:
      "Their team moved from proof-of-concept to a production sensor network in a single quarter. The field-to-dashboard workflow just works.",
    name: "S. Haddad",
    role: "Head of Operations, Smart Communities",
  },
  {
    quote:
      "The drone survey deliverables slotted straight into our design pipeline — contours, DTMs and 3D models, all ground-truthed and documented.",
    name: "M. Lindqvist",
    role: "Lead Engineer, Rail Corridor Programme",
  },
];

export const VALUES = [
  { icon: "target", title: "Accuracy is non-negotiable", desc: "Every deliverable is checked against independent control before it leaves us. A number without verification is an opinion." },
  { icon: "shield", title: "Built to comply", desc: "We work to national survey and land-law standards, with the audit trails and documentation that stand up to scrutiny." },
  { icon: "refresh", title: "Own the outcome", desc: "From brief to basemap to handover and support — we stay accountable for the system working, not just shipping." },
  { icon: "sparkles", title: "AI-first, not AI-only", desc: "Automation and spatial ML where they earn their place; human review where judgement matters." },
];

export const TEAM = [
  { name: "Founding partners", role: "GIS engineers, surveyors & software architects", bio: "Mappir Dev was started by people who had spent years on both sides of the gap between traditional survey firms and modern software teams." },
  { name: "Survey & field operations", role: "Licensed surveyors, UAV pilots, GNSS specialists", bio: "Crews equipped for RTK/PPK drone capture, hydrographic survey and cadastral boundary work to national standards." },
  { name: "Geospatial engineering", role: "GIS developers, data engineers, ML practitioners", bio: "The team building the portals, pipelines and registries — PostGIS to deck.gl, ETL to spatial ML." },
  { name: "Hardware & IoT", role: "Electronics and firmware engineers", bio: "PCB design, low-power firmware and GNSS integration for purpose-built field devices." },
];

export const OPEN_ROLES = [
  {
    slug: "gis-web-developer",
    title: "GIS Web Developer",
    type: "Full-time",
    location: "Rawalpindi / Remote-friendly",
    team: "Geospatial engineering",
    summary:
      "Build custom web GIS platforms and mapping applications on OpenLayers, MapLibre and PostGIS for government and enterprise clients.",
    responsibilities: [
      "Develop web mapping front ends in React with MapLibre / OpenLayers",
      "Design and query PostGIS schemas; build vector-tile and API services",
      "Work with surveyors and analysts to translate requirements into interfaces",
      "Own features from spec through deployment and handover",
    ],
    requirements: [
      "3+ years building web applications with JavaScript / React",
      "Hands-on experience with a web mapping library and spatial data",
      "SQL and comfort with PostGIS or a willingness to learn it fast",
      "Clear written communication for client-facing documentation",
    ],
  },
  {
    slug: "mobile-gis-engineer",
    title: "Mobile GIS Engineer",
    type: "Full-time",
    location: "Rawalpindi / Remote-friendly",
    team: "Geospatial engineering",
    summary:
      "Build offline-first field data collection apps with external GNSS integration for survey and land-administration programmes.",
    responsibilities: [
      "Develop cross-platform mobile apps (React Native / Flutter)",
      "Implement offline caching, background sync and conflict resolution",
      "Integrate external GNSS / RTK receivers over Bluetooth",
      "Support field rollouts and iterate on crew feedback",
    ],
    requirements: [
      "3+ years of mobile development, at least one shipped app",
      "Experience with offline data and sync patterns",
      "Interest in GNSS, mapping and field workflows",
    ],
  },
  {
    slug: "survey-data-specialist",
    title: "Survey Data Specialist",
    type: "Full-time",
    location: "Rawalpindi",
    team: "Survey & field operations",
    summary:
      "Process drone, GNSS and LiDAR survey data into verified deliverables — orthomosaics, point clouds, DTMs and contours.",
    responsibilities: [
      "Process photogrammetric and LiDAR datasets to survey grade",
      "Run ground-control adjustment and check-point verification",
      "Produce CAD and GIS deliverables to client specification",
      "Maintain processing documentation and accuracy reports",
    ],
    requirements: [
      "Experience with photogrammetry / LiDAR processing software",
      "Understanding of coordinate systems, datums and survey accuracy",
      "Meticulous with QA and documentation",
    ],
  },
];

export const getRole = (slug) => OPEN_ROLES.find((r) => r.slug === slug);

export const SERVICE_OPTIONS = [
  "GIS Web Development",
  "Mobile GIS App (Android/iOS)",
  "Custom Software Development",
  "Analytics Dashboard",
  "IoT Solutions",
  "Custom IoT Devices",
  "Drone Survey",
  "Topographic Survey",
  "Building Overlays",
  "Cadastral Mapping",
  "Other",
];
