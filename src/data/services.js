import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   SERVICES — technology services. One entry = one page at
   /services/<slug>. Category overview lives at /services.
   ──────────────────────────────────────────────────────────────── */
export const SERVICES = [
  {
    slug: "gis-web-development",
    icon: "layers",
    title: "GIS Web Development",
    tagline: "Custom geospatial web platforms and mapping apps.",
    summary:
      "Interactive geospatial web platforms — custom GIS portals, web mapping apps, spatial analytics dashboards and location services built on OpenLayers, Leaflet, Mapbox and the ArcGIS APIs.",
    image: IMG.cityAerial,
    tags: ["OpenLayers", "Leaflet", "Mapbox GL", "PostGIS", "GeoServer", "React"],
    overview: [
      "We build GIS web platforms from the data model up: a spatial database, tiled and vector services, and a browser client that stays fast with millions of features on the map.",
      "Every build is designed around the decisions it has to support — a public parcel viewer, an internal asset register, a field-ops console — so the interface shows the right layer at the right zoom, not everything at once.",
    ],
    capabilities: [
      "Custom web GIS portals and public map viewers",
      "Vector-tile pipelines and cartographic styling",
      "Spatial analytics dashboards with drill-down",
      "PostGIS / GeoServer / pg_tileserv back ends",
      "Editing workflows with versioning and audit trails",
      "Integration with ArcGIS Online / Enterprise and OGC services",
    ],
    deliverables: [
      "Deployed web application with source and documentation",
      "Spatial database schema and migration scripts",
      "Tile and API services with monitoring",
      "Admin and editor roles with access control",
    ],
    faqs: [
      {
        q: "Do you work with our existing ArcGIS licences?",
        a: "Yes. We integrate with ArcGIS Online and Enterprise via the REST and JS APIs, and can mix in open-source components where it lowers cost without losing capability.",
      },
      {
        q: "How large a dataset can the map handle?",
        a: "With vector tiles and server-side aggregation we routinely render millions of features in the browser. Larger sets are pre-tiled or clustered server-side.",
      },
    ],
  },
  {
    slug: "mobile-gis",
    icon: "smartphone",
    title: "Mobile GIS — Android & iOS",
    tagline: "Field data collection, tracking and offline mapping.",
    summary:
      "Native and cross-platform mobile GIS apps for field data collection, real-time tracking, offline mapping and spatial analysis — built with React Native, Flutter and platform-native SDKs.",
    image: IMG.highlandRoad,
    tags: ["Android", "iOS", "React Native", "Flutter", "MapLibre", "GNSS"],
    overview: [
      "Field teams work where connectivity fails. Our mobile GIS apps cache basemaps and edit layers on device, queue changes, and sync cleanly when a signal returns — with conflict handling built in.",
      "We pair the app with external GNSS receivers for sub-metre and RTK accuracy, and keep the capture forms strict so the data that comes back needs no cleanup.",
    ],
    capabilities: [
      "Offline-first map and form caching with background sync",
      "External GNSS / RTK receiver integration over Bluetooth",
      "Photo, sketch and geometry capture with validation rules",
      "Live crew tracking and geofenced task assignment",
      "On-device spatial queries and routing",
      "MDM-ready builds for managed fleets",
    ],
    deliverables: [
      "Published app builds (Play Store / App Store or enterprise distribution)",
      "Sync service and admin console",
      "Configurable capture forms",
      "Field user guide and training session",
    ],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "Cross-platform (React Native / Flutter) for most projects; native modules where GNSS, sensors or performance demand it. We recommend per project.",
      },
    ],
  },
  {
    slug: "custom-software",
    icon: "code",
    title: "Custom Software Development",
    tagline: "Bespoke platforms, automation and processing engines.",
    summary:
      "End-to-end bespoke software engineered for your exact requirements — from enterprise platforms and workflow automation to specialised geospatial processing engines.",
    image: IMG.skylineDusk,
    tags: ["Full Stack", "Cloud", "APIs", "Microservices", "Python", "Node.js"],
    overview: [
      "When off-the-shelf software forces the process to bend around the tool, we build the tool instead — scoped tightly, shipped in increments, and handed over with the tests and docs to maintain it.",
      "Geospatial processing is a speciality: imagery pipelines, coordinate transformations, conflation and validation engines that run reliably at production volume.",
    ],
    capabilities: [
      "Enterprise web platforms and internal tools",
      "Workflow automation and approval systems",
      "Geospatial ETL, conflation and data-migration engines",
      "REST / GraphQL APIs and integration layers",
      "Cloud architecture on AWS / Azure / GCP",
      "Modernisation of legacy systems",
    ],
    deliverables: [
      "Production system with CI/CD and infrastructure-as-code",
      "Automated test suite and technical documentation",
      "Runbooks and handover training",
      "Optional support and maintenance retainer",
    ],
    faqs: [
      {
        q: "How do you scope a custom build?",
        a: "A short discovery engagement: stakeholders, data sources, constraints and success measures, ending in a costed backlog and a first release plan.",
      },
    ],
  },
  {
    slug: "analytics-dashboards",
    icon: "barChart",
    title: "Analytics Dashboards",
    tagline: "Spatial and operational data turned into decisions.",
    summary:
      "Real-time, visually compelling dashboards that turn raw spatial and operational data into decisions — interactive charts, heatmaps, KPIs and drill-down reports.",
    image: IMG.denseHousing,
    tags: ["Power BI", "D3.js", "Recharts", "deck.gl", "Tableau", "dbt"],
    overview: [
      "A dashboard earns its place when someone changes what they do because of it. We start from the decision and the cadence, then design the smallest set of views that drive it.",
      "Spatial context is first-class — maps sit alongside the charts, filters cross-link, and the numbers reconcile with the system of record.",
    ],
    capabilities: [
      "Executive and operational dashboards",
      "Map-linked analytics with deck.gl and Mapbox GL",
      "Data modelling and semantic layers (dbt, warehouse views)",
      "Scheduled and event-driven refresh",
      "Embedded analytics inside your own product",
      "Alerting and threshold monitoring",
    ],
    deliverables: [
      "Deployed dashboards with role-based access",
      "Documented data model and refresh pipeline",
      "Source datasets and transformation code",
      "Editor training",
    ],
    faqs: [
      {
        q: "Can you build on our existing BI stack?",
        a: "Yes — Power BI, Tableau, Looker or a custom React build. We advise based on your data volume, map requirements and licensing.",
      },
    ],
  },
  {
    slug: "iot-solutions",
    icon: "wifi",
    title: "IoT Solutions",
    tagline: "Sensor networks, pipelines and connected monitoring.",
    summary:
      "Intelligent IoT ecosystems connecting physical devices to digital intelligence — sensor networks, real-time data pipelines, edge computing and cloud-connected monitoring.",
    image: IMG.parcelsTop,
    tags: ["MQTT", "AWS IoT", "Edge AI", "LoRaWAN", "Time-series DB", "Grafana"],
    overview: [
      "We connect the field to the dashboard end to end: device provisioning, a resilient ingestion pipeline, a time-series store, and the alerting and views that make the stream useful.",
      "Where bandwidth or latency is tight, processing moves to the edge — only the events that matter travel upstream.",
    ],
    capabilities: [
      "Sensor network design and device provisioning",
      "MQTT / LoRaWAN / cellular ingestion at scale",
      "Edge processing and on-device inference",
      "Time-series storage, rules engines and alerting",
      "Operations dashboards and mobile notifications",
      "Digital-twin and GIS integration",
    ],
    deliverables: [
      "Provisioned devices and gateway configuration",
      "Ingestion pipeline and time-series database",
      "Operations dashboard and alert rules",
      "Fleet management console",
    ],
    faqs: [
      {
        q: "Do you supply the hardware too?",
        a: "We can — see Custom IoT Devices. Otherwise we integrate your chosen sensors and gateways.",
      },
    ],
  },
  {
    slug: "custom-iot-devices",
    icon: "cpu",
    title: "Custom IoT Devices",
    tagline: "Purpose-built hardware for demanding field environments.",
    summary:
      "Purpose-built hardware for demanding environments — from PCB design and firmware to rugged enclosures and field-ready prototypes that integrate straight into your GIS workflows.",
    image: IMG.topo,
    tags: ["PCB Design", "Firmware", "GNSS", "RTK", "LoRa", "Low-power"],
    overview: [
      "When the sensor you need doesn't exist off the shelf, we design it: schematic and PCB, firmware, power budget, and an enclosure rated for the field it will live in.",
      "Devices ship speaking your platform's protocol, with GNSS positioning and over-the-air update built in from the first prototype.",
    ],
    capabilities: [
      "Schematic capture and multi-layer PCB layout",
      "Low-power firmware and RTOS integration",
      "GNSS / RTK positioning modules",
      "LoRa / NB-IoT / cellular connectivity",
      "Rugged, IP-rated enclosure design",
      "Small-batch assembly and field trials",
    ],
    deliverables: [
      "Manufacturing files (Gerbers, BOM, assembly drawings)",
      "Firmware source and OTA update channel",
      "Prototype units and test report",
      "Certification guidance",
    ],
    faqs: [
      {
        q: "What volumes do you support?",
        a: "Prototyping through small production batches. For large runs we hand off a manufacturing-ready package to your contract manufacturer.",
      },
    ],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
