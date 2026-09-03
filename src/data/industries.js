import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   INDUSTRIES — who we serve. /industries and /industries/<slug>.
   ──────────────────────────────────────────────────────────────── */
export const INDUSTRIES = [
  {
    slug: "government",
    icon: "building",
    title: "Government",
    tagline: "Land authorities, municipalities and national agencies.",
    image: IMG.parcelsTop,
    body: [
      "We build and modernise the spatial systems that governments run on — land registries, revenue records, municipal asset registers and public map services — with the accuracy, audit trails and legal compliance the public sector requires.",
      "Engagements are delivered against national survey standards with documented handover, training and long-term support.",
    ],
    needs: [
      "Cadastre and land-record digitisation",
      "GIS-integrated land information systems",
      "Municipal asset and infrastructure registers",
      "Public parcel search and e-services",
    ],
    proof: { stat: "2.4M+", label: "parcels in a live provincial registry" },
  },
  {
    slug: "infrastructure",
    icon: "workflow",
    title: "Infrastructure",
    tagline: "Roads, utilities, pipelines and urban development.",
    image: IMG.highlandRoad,
    body: [
      "From corridor survey to asset management, we support infrastructure programmes across the lifecycle — RTK/PPK drone capture for design, as-built documentation, and the GIS that tracks the network once it is built.",
      "Deliverables slot straight into engineering and BIM pipelines.",
    ],
    needs: [
      "Corridor mapping and DTM generation",
      "Utility network GIS and asset registers",
      "Construction progress monitoring",
      "As-built capture and handover models",
    ],
    proof: { stat: "320 km", label: "national corridor mapped with RTK/PPK drones" },
  },
  {
    slug: "environmental",
    icon: "leaf",
    title: "Environmental",
    tagline: "Forest monitoring, wetland surveys and climate mapping.",
    image: IMG.lake,
    body: [
      "We apply remote sensing and field survey to environmental monitoring — mapping land cover and change, assessing vegetation and water, and building the dashboards that track indicators over time.",
      "Methods are validated against ground data with published accuracy.",
    ],
    needs: [
      "Land-cover classification and change detection",
      "Vegetation and water-body monitoring",
      "Wetland and coastal survey",
      "Environmental indicator dashboards",
    ],
    proof: { stat: "Multi-epoch", label: "change detection validated against ground truth" },
  },
  {
    slug: "enterprise-gis",
    icon: "globe",
    title: "Enterprise GIS",
    tagline: "Custom geospatial platforms for corporations and logistics.",
    image: IMG.skylineDusk,
    body: [
      "For enterprises, location is a data problem. We build the platforms that make it usable — site-selection tools, territory and network analytics, fleet tracking and embedded maps inside your own products.",
      "Architected for your cloud, your data governance and your scale.",
    ],
    needs: [
      "Site selection and catchment analysis",
      "Territory planning and network optimisation",
      "Fleet and field-crew tracking",
      "Embedded mapping and location APIs",
    ],
    proof: { stat: "15 countries", label: "connected-property platform, one operations view" },
  },
];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);
