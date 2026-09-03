import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   CADASTRAL — land administration. Pillar page at /cadastral.
   Items with `detail` get a page at /cadastral/<slug>.
   ──────────────────────────────────────────────────────────────── */
export const CADASTRAL_INTRO = {
  eyebrow: "Land administration",
  title: "Cadastral mapping & land records",
  lead: "We handle the full lifecycle of land data — from digitising legacy revenue records to building modern, GIS-integrated land registries with accuracy and legal compliance.",
  image: IMG.neighborhood,
  badge: { num: "2.4M+", label: "Parcels mapped" },
  quote: {
    text: "Mappir Dev digitised over 2.4 million land parcels for our provincial land authority, delivering a complete GIS-integrated registry system on time and with exceptional precision.",
    cite: "Director, Regional Land Authority",
  },
};

export const CADASTRAL = [
  {
    slug: "land-parcel-mapping",
    label: "Land Parcel Mapping",
    icon: "mapPin",
    detail: {
      tagline: "Every parcel captured, attributed and topologically clean.",
      body: [
        "We convert cadastral index maps, mouza maps and field sketches into a seamless, topologically correct parcel layer — edge-matched across sheets, attributed with parcel identifiers, and reconciled against the textual record.",
        "The result is a single authoritative parcel fabric that downstream registry, valuation and planning systems can all build on.",
      ],
      points: [
        "Sheet scanning, georeferencing and rubber-sheeting",
        "Heads-up digitising with topology rules enforced",
        "Parcel-to-record linkage and QA reconciliation",
        "Area computation to the statutory method",
      ],
    },
  },
  {
    slug: "boundary-demarcation",
    label: "Boundary Demarcation",
    icon: "target",
    detail: {
      tagline: "Record boundaries retraced and monumented on the ground.",
      body: [
        "Field crews retrace boundaries from the cadastral record, resolve discrepancies against occupation, and set permanent monuments with GNSS-fixed coordinates.",
        "Each demarcation is documented with field notes, photographs and a coordinate schedule suitable for lodgement.",
      ],
      points: [
        "Record research and pre-computation",
        "GNSS and total-station boundary re-establishment",
        "Monumentation with photographic record",
        "Dispute and encroachment reporting",
      ],
    },
  },
  {
    slug: "land-registry-systems",
    label: "Land Registry Systems",
    icon: "clipboard",
    detail: {
      tagline: "GIS-integrated land information systems, end to end.",
      body: [
        "We design and build the software that runs a modern registry — spatial parcel fabric, textual rights records, mutation workflow, fee handling and public search, on one platform.",
        "Systems are built to the country's land law, with role-based access, full audit history and offline-capable field modules.",
      ],
      points: [
        "Parcel and rights data model (LADM-aligned)",
        "Mutation, subdivision and transfer workflows",
        "Public parcel search and certificate issuance",
        "Audit trail, versioning and reporting",
      ],
    },
  },
  {
    slug: "revenue-record-digitization",
    label: "Revenue Record Digitization",
    icon: "database",
    detail: {
      tagline: "Legacy registers converted, structured and linked.",
      body: [
        "Hand-written revenue registers, jamabandi and mutation records are scanned, transcribed under double-entry QA, and structured into a database keyed to the parcel fabric.",
        "We preserve the original images alongside the structured data so every record stays traceable to its source.",
      ],
      points: [
        "High-resolution scanning and image management",
        "Double-key data entry with validation",
        "Script and language handling (Urdu, regional)",
        "Record-to-parcel linkage",
      ],
    },
  },
  {
    slug: "3d-cadastral-modeling",
    label: "3D Cadastral Modeling",
    icon: "box3d",
    detail: {
      tagline: "Stratified and overlapping rights represented in 3D.",
      body: [
        "For apartments, utilities and infrastructure corridors, ownership stacks vertically. We model 3D legal volumes and link them to the 2D parcel fabric and the rights record.",
        "Delivered in formats that GIS and BIM tools can both consume.",
      ],
      points: [
        "3D legal volume capture and modelling",
        "Linkage to 2D parcels and rights",
        "CityGML / IFC / GIS delivery",
        "Visualisation for registry and public use",
      ],
    },
  },
  {
    slug: "conflation-data-migration",
    label: "Conflation & Data Migration",
    icon: "refresh",
    detail: {
      tagline: "Multiple legacy sources merged into one clean fabric.",
      body: [
        "When parcel data exists in several incompatible systems, we conflate it — geometric alignment, attribute reconciliation, duplicate resolution — and migrate it into the target platform with a documented, repeatable pipeline.",
        "Every transformation is logged so the migration can be audited and re-run.",
      ],
      points: [
        "Source profiling and match-rule design",
        "Automated geometric and attribute conflation",
        "Exception queues and manual review tooling",
        "Repeatable, audited migration pipeline",
      ],
    },
  },
  { slug: "mutation-records", label: "Mutation Records", icon: "penLine" },
  { slug: "gis-land-management", label: "GIS-Based Land Management", icon: "monitor" },
  { slug: "property-valuation-maps", label: "Property Valuation Maps", icon: "barChart" },
  { slug: "urban-cadastre", label: "Urban Cadastre", icon: "building" },
  { slug: "rural-land-survey", label: "Rural Land Survey", icon: "leaf" },
  { slug: "spatial-database-design", label: "Spatial Database Design", icon: "layers" },
];

export const getCadastral = (slug) =>
  CADASTRAL.find((c) => c.slug === slug && c.detail);
