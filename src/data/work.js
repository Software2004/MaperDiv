import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   WORK — selected projects. Index at /work, detail at /work/<slug>.
   `sector` / `services` power the index filters.
   ──────────────────────────────────────────────────────────────── */
export const WORK = [
  {
    slug: "provincial-land-registry",
    tag: "Cadastral",
    sector: "Government",
    services: ["Cadastral Mapping", "Custom Software", "GIS Web Development"],
    title: "2.4M parcels digitised for a provincial land authority",
    result: "2.4M+",
    resultLabel: "parcels in a live GIS registry",
    image: IMG.denseHousing,
    summary:
      "Legacy revenue records converted, geo-referenced and migrated into a GIS-integrated land information system — delivered on schedule with full legal traceability.",
    challenge:
      "The authority held land rights in hand-written registers and paper index maps across dozens of offices. Searches took days, mutations were untracked, and there was no spatial view of ownership.",
    solution:
      "We scanned and double-keyed the textual records, digitised the index maps into a topologically clean parcel fabric, and built a GIS-integrated registry with mutation workflow, public search and full audit history. Field modules worked offline and synced on return.",
    results: [
      "2.4M+ parcels linked to their rights records in one system",
      "Parcel search reduced from days to seconds",
      "Every mutation now versioned and auditable",
      "Field-to-office workflow operating in low-connectivity districts",
    ],
    quote: {
      text: "Mappir Dev digitised over 2.4 million land parcels for our provincial land authority and delivered a complete GIS-integrated registry system on time and with exceptional precision.",
      name: "R. Kapoor",
      role: "Director, Regional Land Authority",
    },
  },
  {
    slug: "connected-apartments-platform",
    tag: "IoT · Smart City",
    sector: "Enterprise GIS",
    services: ["IoT Solutions", "Custom IoT Devices", "Analytics Dashboards"],
    title: "Connected-apartment platform across 15 countries",
    result: "94%",
    resultLabel: "predicted-ETA accuracy",
    image: IMG.skylineDusk,
    summary:
      "Custom IoT devices, a real-time data pipeline and an operations dashboard turning 50,000 daily field events into instant intelligence for property teams.",
    challenge:
      "A property operator running buildings in 15 countries had no unified view of field activity — access events, maintenance visits and sensor alerts lived in separate tools.",
    solution:
      "We designed a custom gateway device, built a resilient MQTT ingestion pipeline into a time-series store, and delivered one operations dashboard with geofenced task assignment and predictive ETAs for field crews.",
    results: [
      "50,000 daily field events unified into one live view",
      "94% predicted-ETA accuracy for crew dispatch",
      "Up to 25% reduction in unit vacancy",
      "Single console replacing four disconnected tools",
    ],
    quote: {
      text: "Their team moved from proof-of-concept to a production sensor network in a single quarter. The field-to-dashboard workflow just works.",
      name: "S. Haddad",
      role: "Head of Operations, Smart Communities",
    },
  },
  {
    slug: "national-corridor-drone-mapping",
    tag: "Survey · UAV",
    sector: "Infrastructure",
    services: ["Drone Surveys", "Remote Sensing"],
    title: "National corridor mapped with RTK/PPK drones",
    result: "±1 cm",
    resultLabel: "vertical accuracy at scale",
    image: IMG.highlandRoad,
    summary:
      "Photogrammetry and LiDAR across a 320 km infrastructure corridor, processed into contours, DTMs and 3D models for the design consortium.",
    challenge:
      "A design consortium needed survey-grade terrain data along 320 km of varied terrain in a compressed programme, with deliverables ready to design on.",
    solution:
      "We flew RTK/PPK-corrected fixed-wing and multirotor missions, surveyed independent ground control, and processed the data into orthomosaics, classified point clouds, DTMs, contours and textured meshes — each tile checked against check points before release.",
    results: [
      "320 km corridor captured inside the programme window",
      "±1 cm vertical accuracy verified against check points",
      "Contours, DTMs and 3D models delivered in the consortium's CAD environment",
      "Re-flights limited to under 3% of the corridor",
    ],
    quote: {
      text: "The drone survey deliverables slotted straight into our design pipeline — contours, DTMs and 3D models, all ground-truthed and documented.",
      name: "M. Lindqvist",
      role: "Lead Engineer, Rail Corridor Programme",
    },
  },
  {
    slug: "municipal-asset-register",
    tag: "GIS · Municipal",
    sector: "Government",
    services: ["GIS Web Development", "Mobile GIS"],
    title: "City-wide asset register with an offline field app",
    result: "60k",
    resultLabel: "assets captured in 14 weeks",
    image: IMG.cityAerial,
    summary:
      "A municipal GIS portal and offline mobile app to inventory roads, drainage, lighting and green space — with a maintenance workflow on top.",
    challenge:
      "A fast-growing municipality had no current inventory of its infrastructure and no way for crews to report condition from the field.",
    solution:
      "We stood up a PostGIS/GeoServer stack, a web portal for planners, and an offline-first mobile app with strict capture forms. Crews inventoried assets district by district; condition data fed a maintenance backlog.",
    results: [
      "60,000 assets inventoried in 14 weeks",
      "Field data captured offline, synced on return to coverage",
      "Maintenance backlog prioritised spatially",
      "Portal now the single source for capital planning",
    ],
    quote: {
      text: "For the first time we can see what we own and what condition it's in. Planning meetings look completely different now.",
      name: "A. Farooqi",
      role: "Director of Works, City Municipality",
    },
  },
  {
    slug: "reservoir-sedimentation-survey",
    tag: "Survey · Hydrographic",
    sector: "Environmental",
    services: ["Hydrographic Surveys", "Analytics Dashboards"],
    title: "Reservoir capacity and sedimentation baseline",
    result: "12%",
    resultLabel: "capacity loss quantified",
    image: IMG.lake,
    summary:
      "A multibeam bathymetric survey of a major reservoir, processed into a capacity curve and a sedimentation dashboard for the operating authority.",
    challenge:
      "The operator suspected significant storage loss to sedimentation but had no measured bed survey since impoundment.",
    solution:
      "We ran RTK-tide-corrected multibeam lines across the reservoir, built a current bed surface, and compared it to the original design to compute sedimentation volumes and an updated capacity curve — published in a monitoring dashboard.",
    results: [
      "Current storage capacity measured against design",
      "12% capacity loss to sedimentation quantified",
      "Sediment hotspots mapped for targeted dredging",
      "Repeatable survey spec for annual monitoring",
    ],
    quote: {
      text: "We finally have a defensible number for capacity, and a method we can repeat every year.",
      name: "T. Mengal",
      role: "Chief Engineer, Water Authority",
    },
  },
  {
    slug: "retail-site-selection-tool",
    tag: "Enterprise · Analytics",
    sector: "Enterprise GIS",
    services: ["Analytics Dashboards", "Custom Software"],
    title: "Site-selection tool for a retail network",
    result: "5×",
    resultLabel: "faster location screening",
    image: IMG.denseHousing,
    summary:
      "A spatial decision tool combining demographics, catchments, competition and drive-time to score candidate retail sites.",
    challenge:
      "A retailer screened new locations manually in spreadsheets and maps, taking weeks per shortlist and missing viable sites.",
    solution:
      "We built a web tool with isochrone catchments, demographic enrichment, cannibalisation modelling and a transparent scoring model the property team could tune themselves.",
    results: [
      "Location screening cut from weeks to days",
      "Consistent, explainable scores across the property team",
      "Cannibalisation flagged before commitments",
      "Pipeline of viable sites doubled in the first quarter",
    ],
    quote: {
      text: "It moved us off intuition and spreadsheets. Every site now gets the same rigorous look.",
      name: "J. Rehman",
      role: "Head of Expansion, Retail Group",
    },
  },
];

export const getWork = (slug) => WORK.find((w) => w.slug === slug);
export const WORK_SECTORS = [...new Set(WORK.map((w) => w.sector))];
export const WORK_SERVICES = [...new Set(WORK.flatMap((w) => w.services))].sort();
