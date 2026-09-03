import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   SURVEYS — field services. One entry = one page at /surveys/<slug>.
   ──────────────────────────────────────────────────────────────── */
export const SURVEYS = [
  {
    slug: "drone",
    title: "Drone Surveys",
    tagline: "Fixed-wing and multirotor UAV capture.",
    summary:
      "Fixed-wing and multirotor UAV capture — photogrammetry, LiDAR, thermal and multispectral imaging for full-site analysis.",
    image: IMG.drone,
    accuracy: "±1 cm",
    accuracyLabel: "vertical, RTK/PPK at scale",
    methods: ["Photogrammetry", "LiDAR", "Thermal", "Multispectral", "RTK / PPK"],
    overview: [
      "We fly RTK/PPK-corrected missions and process the imagery into dense point clouds, orthomosaics, digital terrain and surface models, contours and textured 3D meshes.",
      "Ground control is surveyed with GNSS and every deliverable is checked against independent check points before it leaves us.",
    ],
    deliverables: [
      "Orthomosaic (GeoTIFF) and digital surface / terrain models",
      "Classified LiDAR or photogrammetric point cloud (LAS/LAZ)",
      "Contours at the specified interval",
      "3D mesh and volumetric reports",
      "Accuracy report against check points",
    ],
    useCases: [
      "Infrastructure corridor mapping",
      "Stockpile and earthworks volumes",
      "Construction progress monitoring",
      "Quarry and mine surveys",
    ],
  },
  {
    slug: "topographic",
    title: "Topographic Surveys",
    tagline: "Terrain mapping and contour generation.",
    summary:
      "Terrain mapping and contour generation with total stations, GNSS and LiDAR for engineering and construction.",
    image: IMG.topo,
    accuracy: "±10 mm",
    accuracyLabel: "horizontal, GNSS + total station",
    methods: ["GNSS RTK", "Total station", "Terrestrial LiDAR", "Levelling"],
    overview: [
      "Detailed ground surveys for design and construction — breaklines, spot heights, services, structures and boundaries captured to survey-grade accuracy.",
      "Delivered in your CAD or BIM environment on the correct datum and projection, ready to design on.",
    ],
    deliverables: [
      "CAD drawing (DWG/DXF) with layers and breaklines",
      "Digital terrain model and contours",
      "Point database with codes",
      "Control diagram and survey report",
    ],
    useCases: [
      "Road and drainage design",
      "Site development and grading",
      "Flood modelling inputs",
      "As-built verification",
    ],
  },
  {
    slug: "building-overlays",
    title: "Building Overlays",
    tagline: "3D footprints, façade measurement and BIM overlays.",
    summary:
      "3D building footprints, façade measurements and architectural overlays with BIM integration and as-built documentation.",
    image: IMG.cityAerial,
    accuracy: "LOD 200–300",
    accuracyLabel: "model detail, as agreed",
    methods: ["Terrestrial LiDAR", "Photogrammetry", "Total station", "Scan-to-BIM"],
    overview: [
      "We capture existing buildings as measured point clouds and turn them into footprints, elevations, sections and BIM models that match what is actually there.",
      "Useful where the drawings are missing, out of date, or never existed.",
    ],
    deliverables: [
      "Registered point cloud (E57/RCP)",
      "2D plans, elevations and sections",
      "Scan-to-BIM model (Revit/IFC) at the agreed LOD",
      "Deviation report against design",
    ],
    useCases: [
      "Retrofit and refurbishment design",
      "Heritage documentation",
      "Facilities and space management",
      "Planning and permitting overlays",
    ],
  },
  {
    slug: "land",
    title: "Land Surveys",
    tagline: "Boundary demarcation and parcel verification.",
    summary:
      "Boundary demarcation, parcel verification and subdivision surveys compliant with national standards.",
    image: IMG.parcelsTop,
    accuracy: "Cadastral grade",
    accuracyLabel: "to national survey standards",
    methods: ["GNSS", "Total station", "Record research", "Monumentation"],
    overview: [
      "Legal boundary work — retracing record boundaries, resolving conflicts on the ground, setting monuments and preparing the plans that support registration.",
      "Carried out to the relevant national cadastral standard with full field notes and traceability.",
    ],
    deliverables: [
      "Boundary / subdivision plan for lodgement",
      "Coordinate schedule and area calculations",
      "Monumentation record with photos",
      "Surveyor's report",
    ],
    useCases: [
      "Title registration and mutation",
      "Subdivision and amalgamation",
      "Encroachment and dispute resolution",
      "Acquisition and right-of-way",
    ],
  },
  {
    slug: "hydrographic",
    title: "Hydrographic Surveys",
    tagline: "Riverbed mapping, coastal charting and bathymetry.",
    summary:
      "Riverbed mapping, coastal charting and underwater topography with multibeam sonar and bathymetry.",
    image: IMG.lake,
    accuracy: "IHO S-44",
    accuracyLabel: "order as specified",
    methods: ["Single-beam echo sounder", "Multibeam sonar", "RTK tide", "ADCP"],
    overview: [
      "Depth and bed surveys for water bodies — rivers, reservoirs, harbours and coastlines — referenced to a vertical datum with tide and sound-velocity corrections applied.",
      "Processed into surfaces, cross-sections and volume estimates for design, dredging and monitoring.",
    ],
    deliverables: [
      "Bathymetric surface and depth contours",
      "Cross-sections and long-sections",
      "Volume and siltation reports",
      "Survey report to the agreed IHO order",
    ],
    useCases: [
      "Dredging design and payment surveys",
      "Reservoir capacity and sedimentation",
      "Bridge and jetty scour monitoring",
      "Flood-channel capacity studies",
    ],
  },
  {
    slug: "remote-sensing",
    title: "Remote Sensing",
    tagline: "Satellite imagery analysis and change detection.",
    summary:
      "Satellite imagery analysis, change detection, NDVI vegetation mapping and land-use classification.",
    image: IMG.earthOrbit,
    accuracy: "10–0.3 m",
    accuracyLabel: "GSD, sensor dependent",
    methods: ["Optical", "SAR", "NDVI / indices", "Supervised classification", "Time series"],
    overview: [
      "We source and analyse satellite and high-altitude imagery to map land cover, detect change over time, and monitor vegetation, water and encroachment across large areas.",
      "Outputs are validated against ground data and delivered as classified rasters and vector summaries.",
    ],
    deliverables: [
      "Classified land-use / land-cover raster",
      "Change-detection maps between epochs",
      "Vegetation and moisture index products",
      "Accuracy assessment and confusion matrix",
    ],
    useCases: [
      "Land administration and encroachment monitoring",
      "Agriculture and forestry assessment",
      "Disaster and flood extent mapping",
      "Urban growth analysis",
    ],
  },
];

export const getSurvey = (slug) => SURVEYS.find((s) => s.slug === slug);
