import { useState, useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

/* ────────────────────────────────────────────────────────────────
   IMAGERY — curated aerial / satellite photography (Unsplash, free
   for commercial use) + a live Esri World Imagery basemap in the hero.
   ──────────────────────────────────────────────────────────────── */
const U = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72&w=${w}${h ? `&h=${h}` : ""}`;

const IMG = {
  heroBg: U("1446776653964-20c1d3a81b06", 1600), // North America city lights from orbit
  heroFallback: U("1451187580459-43490279c0fa", 1100, 1380), // Earth limb at night
  drone: U("1508614589041-895b88991e3e", 900, 620), // survey drone in flight
  topo: U("1500534314209-a25ddb2bd429", 900, 620), // layered ridgelines (relief)
  cityAerial: U("1477959858617-67f85cf4f1df", 900, 620), // city skyline from the air
  parcelsTop: U("1524813686514-a57563d77965", 900, 620), // top-down suburban grid
  neighborhood: U("1512699355324-f07e3106dae5", 1100, 760), // top-down parcels
  denseHousing: U("1516156008625-3a9d6067fab5", 900, 620), // dense housing from above
  skylineDusk: U("1486325212027-8081e485255e", 900, 620), // skyline at dusk
  highlandRoad: U("1470071459604-3b5ec3a7fe05", 900, 620), // highland corridor + road
  lake: U("1502786129293-79981df4e689", 900, 620), // glacial lake + mountains
  earthOrbit: U("1446776877081-d282a0f896e2", 900, 620), // Earth from the ISS cupola
};

/* ────────────────────────────────────────────────────────────────
   ICON SYSTEM — single stroke set, currentColor, 24px grid
   ──────────────────────────────────────────────────────────────── */
const ICONS = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
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
};

function Icon({ name, size = 22, stroke = 1.75, fill = false, style }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────
   CONTENT
   ──────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Surveys", href: "#surveys" },
  { label: "Cadastral", href: "#cadastral" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const TRUST = ["GEOSURVEY DEPT", "TERRANOVA", "CIVIL WORKS AUTHORITY", "NORDLAND RAIL", "EU-SPATIAL", "PORTCOAST"];

const SERVICES = [
  {
    icon: "layers",
    title: "GIS Web Development",
    desc: "Interactive geospatial web platforms — custom GIS portals, web mapping apps, spatial analytics dashboards and location services built on OpenLayers, Leaflet, Mapbox and the ArcGIS APIs.",
    tags: ["OpenLayers", "Leaflet", "Mapbox", "PostGIS"],
  },
  {
    icon: "smartphone",
    title: "Mobile GIS — Android & iOS",
    desc: "Native and cross-platform mobile GIS apps for field data collection, real-time tracking, offline mapping and spatial analysis — built with React Native, Flutter and platform-native SDKs.",
    tags: ["Android", "iOS", "React Native", "Flutter"],
  },
  {
    icon: "code",
    title: "Custom Software Development",
    desc: "End-to-end bespoke software engineered for your exact requirements — from enterprise platforms and workflow automation to specialised geospatial processing engines.",
    tags: ["Full Stack", "Cloud", "APIs", "Microservices"],
  },
  {
    icon: "barChart",
    title: "Analytics Dashboards",
    desc: "Real-time, visually compelling dashboards that turn raw spatial and operational data into decisions — interactive charts, heatmaps, KPIs and drill-down reports.",
    tags: ["Power BI", "D3.js", "Recharts", "Tableau"],
  },
  {
    icon: "wifi",
    title: "IoT Solutions",
    desc: "Intelligent IoT ecosystems connecting physical devices to digital intelligence — sensor networks, real-time data pipelines, edge computing and cloud-connected monitoring.",
    tags: ["MQTT", "AWS IoT", "Edge AI", "LoRaWAN"],
  },
  {
    icon: "cpu",
    title: "Custom IoT Devices",
    desc: "Purpose-built hardware for demanding environments — from PCB design and firmware to rugged enclosures and field-ready prototypes that integrate straight into your GIS workflows.",
    tags: ["PCB Design", "Firmware", "GNSS", "RTK"],
  },
];

const STEPS = [
  { icon: "search", title: "Discover & scope", desc: "We map the problem before the terrain — stakeholders, data sources, accuracy targets and compliance constraints." },
  { icon: "cpu", title: "AI-first design", desc: "Automation, spatial ML and processing pipelines are designed in from day one, not bolted on later." },
  { icon: "ruler", title: "Build & verify", desc: "Every deliverable is ground-truthed against control points and reviewed to national survey standards." },
  { icon: "shield", title: "Deliver & support", desc: "Documented handover, training and long-term maintenance of the platforms and registries we build." },
];

const SURVEYS = [
  { title: "Drone Surveys", desc: "Fixed-wing and multirotor UAV capture — photogrammetry, LiDAR, thermal and multispectral imaging for full-site analysis.", img: IMG.drone },
  { title: "Topographic Surveys", desc: "Terrain mapping and contour generation with total stations, GNSS and LiDAR for engineering and construction.", img: IMG.topo },
  { title: "Building Overlays", desc: "3D building footprints, façade measurements and architectural overlays with BIM integration and as-built docs.", img: IMG.cityAerial },
  { title: "Land Surveys", desc: "Boundary demarcation, parcel verification and subdivision surveys compliant with national standards.", img: IMG.parcelsTop },
  { title: "Hydrographic Surveys", desc: "Riverbed mapping, coastal charting and underwater topography with multibeam sonar and bathymetry.", img: IMG.lake },
  { title: "Remote Sensing", desc: "Satellite imagery analysis, change detection, NDVI vegetation mapping and land-use classification.", img: IMG.earthOrbit },
];

const CADASTRAL = [
  { label: "Land Parcel Mapping", icon: "mapPin" },
  { label: "Boundary Demarcation", icon: "target" },
  { label: "Land Registry Systems", icon: "clipboard" },
  { label: "Mutation Records", icon: "penLine" },
  { label: "Revenue Record Digitization", icon: "database" },
  { label: "GIS-Based Land Management", icon: "monitor" },
  { label: "Property Valuation Maps", icon: "barChart" },
  { label: "Urban Cadastre", icon: "building" },
  { label: "Rural Land Survey", icon: "leaf" },
  { label: "3D Cadastral Modeling", icon: "box3d" },
  { label: "Conflation & Data Migration", icon: "refresh" },
  { label: "Spatial Database Design", icon: "layers" },
];

const CASES = [
  {
    tag: "Cadastral",
    title: "2.4M parcels digitised for a provincial land authority",
    result: "2.4M+",
    resultLabel: "parcels in a live GIS registry",
    desc: "Legacy revenue records converted, geo-referenced and migrated into a GIS-integrated land information system — delivered on schedule with full legal traceability.",
    img: IMG.denseHousing,
  },
  {
    tag: "IoT · Smart City",
    title: "Connected-apartment platform across 15 countries",
    result: "94%",
    resultLabel: "predicted-ETA accuracy",
    desc: "Custom IoT devices, a real-time data pipeline and an operations dashboard turning 50,000 daily field events into instant intelligence for property teams.",
    img: IMG.skylineDusk,
  },
  {
    tag: "Survey · UAV",
    title: "National corridor mapped with RTK/PPK drones",
    result: "±1 cm",
    resultLabel: "vertical accuracy at scale",
    desc: "Photogrammetry and LiDAR across a 320 km infrastructure corridor, processed into contours, DTMs and 3D models for the design consortium.",
    img: IMG.highlandRoad,
  },
];

const STATS = [
  { value: "350+", label: "Projects Delivered" },
  { value: "12+", label: "Years Experience" },
  { value: "40+", label: "Expert Engineers" },
  { value: "28", label: "Countries Served" },
];

const SECTORS = [
  { icon: "building", t: "Government", d: "Land authorities, municipalities and national agencies worldwide" },
  { icon: "workflow", t: "Infrastructure", d: "Roads, utilities, pipelines and urban development programmes" },
  { icon: "leaf", t: "Environmental", d: "Forest monitoring, wetland surveys and climate mapping" },
  { icon: "globe", t: "Enterprise GIS", d: "Custom geospatial platforms for corporations and logistics" },
];

const TESTIMONIALS = [
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

const INSIGHTS = [
  { tag: "Guide", title: "Choosing an accuracy target for cadastral surveys", date: "Aug 2026", read: "6 min read", img: IMG.parcelsTop },
  { tag: "Article", title: "Field-to-office workflows that survive bad connectivity", date: "Jul 2026", read: "8 min read", img: IMG.drone },
  { tag: "Report", title: "The state of remote sensing for land administration", date: "Jun 2026", read: "12 min read", img: IMG.earthOrbit },
];

const FOOTER_COLS = [
  { head: "Services", links: ["GIS Development", "Mobile Apps", "IoT Solutions", "Dashboards", "Custom Software"] },
  { head: "Surveys", links: ["Drone Survey", "Topographic", "Building Overlays", "Hydrographic", "Remote Sensing"] },
  { head: "Expertise", links: ["Cadastral Mapping", "Land Records", "Parcel Digitization", "3D Modeling", "LIS Systems"] },
];

// Live-map fly-through: [lng, lat, zoom]
const MAP_TOUR = [
  [73.06, 33.6, 8.4],
  [36.82, -1.29, 8],
  [10.75, 59.91, 8],
  [106.85, -6.21, 8],
  [-74.07, 4.71, 8],
  [55.27, 25.2, 8],
];

/* ────────────────────────────────────────────────────────────────
   HOOKS + PRIMITIVES
   ──────────────────────────────────────────────────────────────── */
function useInView(ref, threshold = 0.18) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setInView(true);

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    const failsafe = setTimeout(() => setInView(true), 1600);
    return () => {
      obs.disconnect();
      clearTimeout(failsafe);
    };
  }, [ref, threshold]);
  return inView;
}

function useMediaQuery(query) {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return match;
}

function AnimSection({ children, className = "", delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function useCountUp(target, inView, duration = 1500) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return n;
}

function Stat({ value, label, size = "md" }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.4);
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const num = m ? parseFloat(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const isInt = Number.isInteger(num);
  const count = useCountUp(num, inView);
  const shown = inView ? (isInt ? Math.round(count) : count.toFixed(1)) : isInt ? 0 : "0.0";
  return (
    <div ref={ref} className={`stat stat--${size}`}>
      <div className="stat__num">
        {shown}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

function Eyebrow({ children, center = false, light = false }) {
  return (
    <span className={`eyebrow${center ? " eyebrow--center" : ""}${light ? " eyebrow--light" : ""}`}>
      {children}
    </span>
  );
}

function LinkMore({ children = "Learn more", onClick, light = false }) {
  return (
    <button type="button" className={`link-more${light ? " link-more--light" : ""}`} onClick={onClick}>
      {children} <Icon name="arrowRight" size={16} />
    </button>
  );
}

function Logo({ light = false }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`} aria-label="Mappir Dev">
      <span className="logo__mark">
        <Icon name="layers" size={22} stroke={2} />
      </span>
      <span className="logo__text">
        MAPPIR<span className="logo__accent">DEV</span>
      </span>
    </span>
  );
}

/* Live satellite basemap (Esri World Imagery) with a gentle fly-through. */
function HeroMap() {
  const container = useRef(null);
  const [failed, setFailed] = useState(false);
  const [coords, setCoords] = useState("30.00°  0.00°");

  useEffect(() => {
    let map;
    let tourTimer;
    let retryTimer;
    let cancelled = false;
    const slow = setTimeout(() => setFailed(true), 15000);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // kick off the (code-split) library download immediately, in parallel with layout.
    // maplibre-gl v6 is pure ESM with named exports only (no default export).
    const modPromise = import("maplibre-gl");

    const build = (maplibregl) => {
      if (cancelled || !container.current) return;
      map = new maplibregl.Map({
        container: container.current,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
        scrollZoom: false,
        doubleClickZoom: false,
        keyboard: false,
        touchZoomRotate: false,
        center: [30, 20],
        zoom: 1.9,
        style: {
          version: 8,
          sources: {
            esri: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics",
            },
          },
          layers: [{ id: "esri", type: "raster", source: "esri" }],
        },
      });

      map.on("move", () => {
        const c = map.getCenter();
        setCoords(`${c.lat.toFixed(2)}°  ${c.lng.toFixed(2)}°`);
      });
      map.on("load", () => {
        clearTimeout(slow);
        setFailed(false); // reveal the map even if the slow-timeout already fired
        MAP_TOUR.forEach(([lng, lat]) => {
          const dot = document.createElement("div");
          dot.className = "map-dot";
          new maplibregl.Marker({ element: dot }).setLngLat([lng, lat]).addTo(map);
        });
        if (reduce) {
          map.jumpTo({ center: [MAP_TOUR[0][0], MAP_TOUR[0][1]], zoom: MAP_TOUR[0][2] });
          return;
        }
        let i = 0;
        const step = () => {
          if (cancelled || !map) return;
          const [lng, lat, zoom] = MAP_TOUR[i % MAP_TOUR.length];
          map.flyTo({ center: [lng, lat], zoom, duration: 6500, curve: 1.4, essential: true });
          i += 1;
          tourTimer = setTimeout(step, 8500);
        };
        tourTimer = setTimeout(step, 2200);
      });
    };

    let started = false;
    const tryStart = () => {
      if (cancelled || started) return;
      const el = container.current;
      if (!el || el.offsetWidth < 200) return;
      started = true;
      if (ro) ro.disconnect();
      clearInterval(retryTimer);
      document.removeEventListener("visibilitychange", tryStart);
      modPromise.then((mod) => build(mod.default || mod)).catch(() => setFailed(true));
    };

    // Start as soon as the container actually has a size (handles slow layout
    // and tabs that mount while hidden), with a polling + rAF backstop.
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(tryStart);
      if (container.current) ro.observe(container.current);
    }
    retryTimer = setInterval(tryStart, 400);
    requestAnimationFrame(tryStart);
    document.addEventListener("visibilitychange", tryStart);

    return () => {
      cancelled = true;
      clearTimeout(slow);
      clearTimeout(tourTimer);
      clearInterval(retryTimer);
      if (ro) ro.disconnect();
      document.removeEventListener("visibilitychange", tryStart);
      if (map) map.remove();
    };
  }, []);

  return (
    <div className="hero__frame hero__frame--map">
      <div ref={container} className="hero__map" style={{ opacity: failed ? 0 : 1 }} />
      {failed && <img className="hero__map-fallback" src={IMG.heroFallback} alt="" />}
      <div className="hero__coords">
        <span className="hero__coords-dot" /> {coords}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   APP
   ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navSolid = scrolled || menuOpen;

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3200);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <div className="site">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`nav${navSolid ? " nav--solid" : ""}`}>
        <div className="nav__inner container">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#home");
            }}
          >
            <Logo light={!navSolid} />
          </a>

          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <button key={l.label} className="nav__link" onClick={() => handleNav(l.href)}>
                {l.label}
              </button>
            ))}
            <button className="btn btn--primary btn--sm" onClick={() => handleNav("#contact")}>
              Get a Quote
            </button>
          </div>

          <button className="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.label} className="mobile-nav__link" onClick={() => handleNav(l.href)}>
                {l.label}
              </button>
            ))}
            <button className="btn btn--primary btn--block" onClick={() => handleNav("#contact")}>
              Get a Quote
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <header id="home" className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${IMG.heroBg})` }} aria-hidden="true" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <Eyebrow light>Geospatial Intelligence &amp; Technology</Eyebrow>
            <h1 className="hero__title">
              Mapping the world&rsquo;s data with <span>precision</span>.
            </h1>
            <p className="hero__lead">
              From satellite imagery to custom IoT devices — Mappir Dev delivers end-to-end GIS
              development, precision surveys, cadastral mapping and intelligent software for a
              connected world.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => handleNav("#services")}>
                Explore services <Icon name="arrowRight" size={17} />
              </button>
              <button className="btn btn--light" onClick={() => handleNav("#contact")}>
                Talk to an expert
              </button>
            </div>
            <div className="hero__stats">
              {STATS.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} size="sm" />
              ))}
            </div>
          </div>

          {isDesktop && (
            <div className="hero__visual">
              <HeroMap />
              <div className="hero__float">
                <div className="hero__float-num">±1&nbsp;cm</div>
                <div className="hero__float-label">RTK / PPK survey accuracy</div>
              </div>
              <div className="hero__chip">
                <Icon name="check" size={15} /> Live satellite basemap
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── TRUST STRIP ── */}
      <section className="trust">
        <div className="container">
          <p className="trust__lead">
            Trusted by national land authorities, infrastructure firms and enterprises across 28
            countries
          </p>
          <div className="trust__logos">
            {TRUST.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>What we build</Eyebrow>
            <h2 className="h2">Technology services</h2>
            <p className="lead">
              Comprehensive GIS, software and IoT solutions engineered for precision, scale and
              real-world impact.
            </p>
          </AnimSection>

          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.title} delay={(i % 3) * 90}>
                <article className="svc-card">
                  <span className="chip chip--lg">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.desc}</p>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="section section--alt dotted">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="h2">From brief to basemap, we own the outcome</h2>
            <p className="lead">
              A repeatable delivery model that keeps accuracy, compliance and timelines in view at
              every stage.
            </p>
          </AnimSection>

          <div className="steps">
            {STEPS.map((s, i) => (
              <AnimSection key={s.title} delay={i * 90} className="step">
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="chip chip--plain">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SURVEYS ── */}
      <section id="surveys" className="section">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>Field services</Eyebrow>
            <h2 className="h2">Survey &amp; data acquisition</h2>
            <p className="lead">
              From aerial drone photogrammetry to sub-centimetre GNSS ground control — every survey
              delivered with precision, speed and full compliance.
            </p>
          </AnimSection>

          <div className="grid-3">
            {SURVEYS.map((s, i) => (
              <AnimSection key={s.title} delay={(i % 3) * 80}>
                <article className="survey-card">
                  <img src={s.img} alt={s.title} loading="lazy" decoding="async" />
                  <div className="survey-card__overlay">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>

          <AnimSection delay={120}>
            <div className="feature-banner" style={{ backgroundImage: `url(${IMG.drone})` }}>
              <div className="feature-banner__inner">
                <div>
                  <Eyebrow light>Featured capability</Eyebrow>
                  <h3>Sub-centimetre drone mapping with RTK/PPK technology</h3>
                </div>
                <button className="btn btn--primary" onClick={() => handleNav("#contact")}>
                  Request a survey <Icon name="arrowRight" size={17} />
                </button>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CADASTRAL ── */}
      <section id="cadastral" className="section section--alt">
        <div className="container cadastral">
          <AnimSection className="cadastral__intro">
            <Eyebrow>Land administration</Eyebrow>
            <h2 className="h2">
              Cadastral mapping &amp; <span className="accent">land records</span>
            </h2>
            <p className="lead">
              We handle the full lifecycle of land data — from digitising legacy revenue records to
              building modern, GIS-integrated land registries with accuracy and legal compliance.
            </p>
            <button className="btn btn--primary" onClick={() => handleNav("#contact")}>
              Discuss your project <Icon name="arrowRight" size={17} />
            </button>

            <blockquote className="pull-quote">
              <Icon name="quote" size={26} />
              <p>
                &ldquo;Mappir Dev digitised over 2.4 million land parcels for our provincial land
                authority, delivering a complete GIS-integrated registry system on time and with
                exceptional precision.&rdquo;
              </p>
              <cite>— Director, Regional Land Authority</cite>
            </blockquote>
          </AnimSection>

          <div className="cadastral__side">
            <AnimSection className="cadastral__figure">
              <img src={IMG.neighborhood} alt="Aerial view of surveyed land parcels" loading="lazy" decoding="async" />
              <div className="cadastral__badge">
                <div className="cadastral__badge-num">2.4M+</div>
                <div className="cadastral__badge-label">Parcels mapped</div>
              </div>
            </AnimSection>
            <AnimSection delay={120}>
              <div className="pill-grid">
                {CADASTRAL.map((c) => (
                  <div key={c.label} className="pill">
                    <Icon name={c.icon} size={18} />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" className="section">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="h2">Projects that scaled</h2>
            <p className="lead">
              A snapshot of programmes we&rsquo;ve delivered for governments, infrastructure
              consortia and enterprises.
            </p>
          </AnimSection>

          <div className="grid-3">
            {CASES.map((c, i) => (
              <AnimSection key={c.title} delay={(i % 3) * 90}>
                <article className="case-card">
                  <div className="case-card__media">
                    <img src={c.img} alt={c.title} loading="lazy" decoding="async" />
                    <span className="case-card__tag">{c.tag}</span>
                  </div>
                  <div className="case-card__body">
                    <h3>{c.title}</h3>
                    <div className="case-card__result">
                      <span className="case-card__result-num">{c.result}</span>
                      <span className="case-card__result-label">{c.resultLabel}</span>
                    </div>
                    <p>{c.desc}</p>
                    <LinkMore onClick={() => handleNav("#contact")}>Read the case study</LinkMore>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="section section--navy dots">
        <div className="container">
          <AnimSection className="section__head section__head--center">
            <Eyebrow center light>
              By the numbers
            </Eyebrow>
            <h2 className="h2 h2--light">A track record built on delivery</h2>
          </AnimSection>
          <div className="stats-band">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} size="lg" />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="container about">
          <AnimSection className="about__copy">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="h2">
              Built by geospatial engineers, <span className="accent">for the world</span>
            </h2>
            <p className="lead">
              Mappir Dev was founded by GIS engineers, surveyors and software architects who saw the
              gap between traditional survey firms and modern technology. Over 12 years we&rsquo;ve
              grown into a full-spectrum geospatial technology company — trusted by governments,
              infrastructure firms and enterprises across 28 countries.
            </p>
            <p className="lead">
              We believe spatial data is the backbone of smart infrastructure, effective governance
              and intelligent business. Our mission is to make it accessible, actionable and
              beautiful.
            </p>
            <button className="btn btn--ghost" onClick={() => handleNav("#contact")}>
              Start a conversation
            </button>
          </AnimSection>

          <div className="about__grid">
            {SECTORS.map((item, i) => (
              <AnimSection key={item.t} delay={i * 80} className="sector">
                <span className="chip chip--plain">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section section--alt">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>Client voices</Eyebrow>
            <h2 className="h2">Trusted on complex mandates</h2>
          </AnimSection>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <AnimSection key={t.name} delay={(i % 3) * 90}>
                <figure className="quote-card">
                  <Icon name="quote" size={24} />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span className="avatar">
                      {t.name
                        .replace(/[^A-Za-z .]/g, "")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <em>{t.role}</em>
                    </span>
                  </figcaption>
                </figure>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section className="section">
        <div className="container">
          <AnimSection className="section__head section__head--row">
            <div>
              <Eyebrow>Insights</Eyebrow>
              <h2 className="h2">From the field notes</h2>
            </div>
            <LinkMore onClick={() => handleNav("#contact")}>View all</LinkMore>
          </AnimSection>
          <div className="grid-3">
            {INSIGHTS.map((p, i) => (
              <AnimSection key={p.title} delay={(i % 3) * 90}>
                <article className="insight-card">
                  <div className="insight-card__media">
                    <img src={p.img} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="insight-card__body">
                    <div className="insight-card__meta">
                      <span className="tag tag--solid">{p.tag}</span>
                      <span>
                        {p.date} · {p.read}
                      </span>
                    </div>
                    <h3>{p.title}</h3>
                    <LinkMore onClick={() => handleNav("#contact")}>Read</LinkMore>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section section--navy dots cta">
        <div className="container">
          <AnimSection className="section__head section__head--center">
            <Eyebrow center light>
              Start a project
            </Eyebrow>
            <h2 className="h2 h2--light">Let&rsquo;s map your next big idea</h2>
            <p className="lead lead--light">
              Whether it&rsquo;s a national cadastral programme or a custom IoT sensor network — our
              team is ready to scope, plan and deliver.
            </p>
            <div className="cta__actions">
              <button className="btn btn--primary" onClick={() => handleNav("#contact")}>
                Get a quote <Icon name="arrowRight" size={17} />
              </button>
              <button className="btn btn--light" onClick={() => handleNav("#work")}>
                See our work
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section section--alt">
        <div className="container">
          <AnimSection className="section__head section__head--center">
            <Eyebrow center>Get in touch</Eyebrow>
            <h2 className="h2">Start a project</h2>
            <p className="lead">
              Tell us about your scope, timeline and goals. We typically respond within one business
              day.
            </p>
          </AnimSection>

          <div className="contact-grid">
            <AnimSection className="contact-info">
              {[
                {
                  icon: "mapPin",
                  label: "Location",
                  val: "PWD, Rawalpindi, Pakistan",
                  href: "https://www.google.com/maps/search/?api=1&query=PWD%2C%20Rawalpindi%2C%20Pakistan",
                  external: true,
                },
                { icon: "mail", label: "Email", val: "mappirdev@gmail.com", href: "mailto:mappirdev@gmail.com" },
                { icon: "phone", label: "Phone", val: "+92 334 5017980", href: "tel:+923345017980" },
                { icon: "clock", label: "Availability", val: "Reach out any time — we're responsive" },
              ].map((c) => {
                const Tag = c.href ? "a" : "div";
                const linkProps = c.href
                  ? {
                      href: c.href,
                      ...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {}),
                    }
                  : {};
                return (
                  <Tag
                    key={c.label}
                    className={`contact-item${c.href ? " contact-item--link" : ""}`}
                    {...linkProps}
                  >
                    <span className="chip">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <div>
                      <div className="contact-item__label">{c.label}</div>
                      <div className="contact-item__val">{c.val}</div>
                    </div>
                  </Tag>
                );
              })}
            </AnimSection>

            <AnimSection delay={100}>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    <span>Full name</span>
                    <input
                      className="input"
                      placeholder="Jane Smith"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      className="input"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    />
                  </label>
                </div>
                <label>
                  <span>Service needed</span>
                  <select
                    className="input"
                    value={formData.service}
                    onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                  >
                    <option value="">Select a service…</option>
                    <option>GIS Web Development</option>
                    <option>Mobile GIS App (Android/iOS)</option>
                    <option>Custom Software Development</option>
                    <option>Analytics Dashboard</option>
                    <option>IoT Solutions</option>
                    <option>Custom IoT Devices</option>
                    <option>Drone Survey</option>
                    <option>Topographic Survey</option>
                    <option>Building Overlays</option>
                    <option>Cadastral Mapping</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  <span>Project details</span>
                  <textarea
                    className="input"
                    rows={5}
                    placeholder="Tell us about your project scope, timeline and goals…"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  />
                </label>
                <button type="submit" className="btn btn--primary btn--block">
                  {submitted ? (
                    <>
                      <Icon name="check" size={17} /> Message sent
                    </>
                  ) : (
                    <>
                      Send message <Icon name="arrowRight" size={17} />
                    </>
                  )}
                </button>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <Logo light />
              <p>Precision geospatial technology and survey services. Mapping the world&rsquo;s data since 2012.</p>
              <div className="footer__social">
                {["linkedin", "x", "youtube", "github"].map((s) => (
                  <button key={s} aria-label={s} className="social">
                    <Icon name={s} size={18} fill />
                  </button>
                ))}
              </div>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.head} className="footer__col">
                <div className="footer__head">{col.head}</div>
                {col.links.map((l) => (
                  <button key={l} className="footer__link" onClick={() => handleNav("#contact")}>
                    {l}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="footer__bottom">
            <span>© {new Date().getFullYear()} Mappir Dev. All rights reserved.</span>
            <span>GIS · Surveys · IoT · Custom Software · Cadastral Mapping</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   STYLES
   ──────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap');

:root{
  --ink:#0e1f2e;
  --ink-soft:#48596a;
  --ink-faint:#7c8e9c;
  --bg:#ffffff;
  --bg-alt:#f2f7f8;
  --navy:#0b1b2b;
  --navy-deep:#071320;
  --line:#e3eaef;
  --brand:#0a7268;
  --brand-hover:#063f3a;
  --brand-bright:#2dd4bf;
  --brand-tint:#e7f3f1;
  --radius:12px;
  --shadow:0 1px 2px rgba(14,31,46,.05), 0 14px 34px rgba(14,31,46,.08);
  --container:1200px;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg)}
.site{
  font-family:'Inter',system-ui,'Segoe UI',sans-serif;
  color:var(--ink-soft);background:var(--bg);overflow-x:hidden;
  font-size:16px;line-height:1.62;-webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block}
button{font-family:inherit}
::selection{background:var(--brand);color:#fff}
section[id]{scroll-margin-top:88px}
#home{scroll-margin-top:0}

.container{max-width:var(--container);margin:0 auto;padding-inline:clamp(20px,5vw,40px)}

/* typography */
.h2{font-family:'Montserrat',sans-serif;font-weight:800;font-size:clamp(1.9rem,4vw,3rem);line-height:1.12;letter-spacing:-.015em;color:var(--ink)}
.h2--light{color:#fff}
.h2 .accent{color:var(--brand)}
.h2--light .accent,.h2--light span{color:var(--brand-bright)}
.lead{font-size:clamp(1rem,1.6vw,1.12rem);line-height:1.7;color:var(--ink-soft);max-width:56ch}
.lead--light{color:#a9bccb}
.lead + .lead{margin-top:16px}

.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--brand);margin-bottom:16px}
.eyebrow::before{content:"";width:28px;height:2px;background:currentColor;display:inline-block}
.eyebrow--center{justify-content:center}
.eyebrow--center::after{content:"";width:28px;height:2px;background:currentColor;display:inline-block}
.eyebrow--light{color:var(--brand-bright)}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:600;font-size:.95rem;letter-spacing:.005em;padding:13px 24px;border-radius:8px;border:1.5px solid transparent;cursor:pointer;transition:transform .18s ease,background .18s ease,border-color .18s ease,box-shadow .18s ease;white-space:nowrap}
.btn--sm{padding:9px 18px;font-size:.88rem}
.btn--block{width:100%}
.btn--primary{background:var(--brand);color:#fff}
.btn--primary:hover{background:var(--brand-hover);transform:translateY(-1px);box-shadow:0 10px 24px rgba(10,114,104,.28)}
.btn--ghost{background:transparent;color:var(--ink);border-color:var(--line)}
.btn--ghost:hover{border-color:var(--brand);color:var(--brand)}
.btn--light{background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.4)}
.btn--light:hover{background:rgba(255,255,255,.16);transform:translateY(-1px)}

.link-more{display:inline-flex;align-items:center;gap:7px;background:none;border:0;cursor:pointer;color:var(--brand);font-weight:600;font-size:.92rem;padding:2px 0;border-bottom:1.5px solid transparent;transition:border-color .18s ease}
.link-more svg{transition:transform .18s ease}
.link-more:hover{border-color:currentColor}
.link-more:hover svg{transform:translateX(4px)}
.link-more--light{color:var(--brand-bright)}

/* logo */
.logo{display:inline-flex;align-items:center;gap:11px;color:var(--ink)}
.logo--light{color:#fff}
.logo__mark{width:36px;height:36px;border-radius:9px;display:grid;place-items:center;background:var(--brand);color:#fff;flex:none}
.logo--light .logo__mark{background:var(--brand-bright);color:var(--navy)}
.logo__text{font-family:'Montserrat',sans-serif;font-weight:800;font-size:1.12rem;letter-spacing:.04em;color:inherit}
.logo__accent{color:var(--brand);margin-left:.28em}
.logo--light .logo__accent{color:var(--brand-bright)}

/* nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;border-bottom:1px solid transparent;transition:background .3s ease,box-shadow .3s ease,border-color .3s ease}
.nav--solid{background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-bottom-color:var(--line);box-shadow:0 6px 24px rgba(14,31,46,.06)}
.nav__inner{height:72px;display:flex;align-items:center;justify-content:space-between}
.nav__links{display:flex;align-items:center;gap:30px}
.nav__link{background:none;border:0;cursor:pointer;font-size:.9rem;font-weight:500;color:var(--ink-soft);letter-spacing:.01em;transition:color .18s ease}
.nav:not(.nav--solid) .nav__link{color:rgba(255,255,255,.82)}
.nav__link:hover{color:var(--brand)}
.nav:not(.nav--solid) .nav__link:hover{color:#fff}
.hamburger{display:none;background:none;border:0;cursor:pointer;color:var(--ink)}
.nav:not(.nav--solid) .hamburger{color:#fff}
.mobile-nav{display:flex;flex-direction:column;gap:6px;padding:16px clamp(20px,5vw,40px) 24px;background:#fff;border-top:1px solid var(--line)}
.mobile-nav__link{background:none;border:0;text-align:left;padding:12px 4px;font-size:1rem;font-weight:500;color:var(--ink);cursor:pointer;border-bottom:1px solid var(--line)}
.mobile-nav .btn{margin-top:12px}

/* hero */
.hero{position:relative;background:var(--navy);color:#fff;overflow:hidden;padding:calc(72px + clamp(56px,9vw,96px)) 0 clamp(56px,9vw,96px)}
.hero__bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.22}
.hero__scrim{position:absolute;inset:0;background:linear-gradient(105deg,var(--navy) 30%,rgba(11,27,43,.7) 60%,rgba(11,27,43,.4) 100%),radial-gradient(circle at 82% 42%,rgba(45,212,191,.16),transparent 55%)}
.hero__grid{position:relative;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.hero__title{font-family:'Montserrat',sans-serif;font-weight:800;color:#fff;font-size:clamp(2.5rem,5.4vw,4rem);line-height:1.06;letter-spacing:-.02em;margin:6px 0 20px}
.hero__title span{color:var(--brand-bright)}
.hero__lead{font-size:clamp(1rem,1.7vw,1.16rem);line-height:1.72;color:#b9c8d4;max-width:52ch;margin-bottom:32px}
.hero__actions{display:flex;flex-wrap:wrap;gap:14px;margin-bottom:44px}
.hero__stats{display:grid;grid-template-columns:repeat(4,auto);gap:26px 44px}

.stat__num{font-family:'Montserrat',sans-serif;font-weight:800;color:var(--ink);line-height:1}
.stat__label{color:var(--ink-faint);letter-spacing:.05em;font-size:.76rem;text-transform:uppercase;margin-top:7px}
.stat--sm .stat__num{font-size:1.9rem;color:var(--brand-bright)}
.stat--sm .stat__label{color:#8ba0af}
.stat--md .stat__num{font-size:2.4rem}
.stat--lg .stat__num{font-size:clamp(2.6rem,5vw,3.4rem);color:var(--brand-bright)}
.stat--lg .stat__label{color:#9db0be;font-size:.8rem;margin-top:10px}

.hero__visual{position:relative}
.hero__frame{margin-left:auto;width:100%;max-width:440px;aspect-ratio:4/5;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.16);box-shadow:0 44px 90px -24px rgba(0,0,0,.6);position:relative;background:#0d2233}
.hero__map{position:absolute;inset:0;transition:opacity .5s ease}
.hero__map-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero__coords{position:absolute;left:12px;top:12px;z-index:3;display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.04em;color:#fff;background:rgba(11,27,43,.6);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(6px);padding:6px 10px;border-radius:7px;font-variant-numeric:tabular-nums}
.hero__coords-dot{width:7px;height:7px;border-radius:50%;background:var(--brand-bright);box-shadow:0 0 0 3px rgba(45,212,191,.3)}
.hero__frame .maplibregl-ctrl-attrib{background:rgba(11,27,43,.66);color:#9db0be;font-size:9px;padding:1px 6px}
.hero__frame .maplibregl-ctrl-attrib a{color:#c4d2dc}
.hero__frame .maplibregl-ctrl-attrib-button{filter:invert(1) opacity(.6)}
.map-dot{width:12px;height:12px;border-radius:50%;background:var(--brand-bright);box-shadow:0 0 0 3px rgba(45,212,191,.35);position:relative}
.map-dot::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid var(--brand-bright);animation:mapPulse 2.4s ease-out infinite}
@keyframes mapPulse{0%{transform:scale(.7);opacity:1}100%{transform:scale(2.6);opacity:0}}
.hero__float{position:absolute;left:-6px;bottom:30px;background:#fff;color:var(--ink);border-radius:12px;padding:15px 20px;box-shadow:0 24px 50px rgba(0,0,0,.3);z-index:4}
.hero__float-num{font-family:'Montserrat',sans-serif;font-weight:800;font-size:1.5rem;line-height:1}
.hero__float-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-faint);margin-top:5px}
.hero__chip{position:absolute;right:6px;top:22px;display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px);color:#fff;font-size:.78rem;font-weight:500;padding:8px 13px;border-radius:100px;z-index:4}
.hero__chip svg{color:var(--brand-bright)}

/* trust */
.trust{background:#fff;padding:40px 0;border-bottom:1px solid var(--line)}
.trust__lead{text-align:center;font-size:.9rem;color:var(--ink-faint);margin-bottom:22px}
.trust__logos{display:flex;flex-wrap:wrap;justify-content:center;gap:20px 46px}
.trust__logos span{font-family:'Montserrat',sans-serif;font-weight:700;font-size:.92rem;letter-spacing:.06em;color:#9aabb7;opacity:.85}

/* sections */
.section{padding:clamp(72px,10vw,120px) 0}
.section--alt{background:var(--bg-alt)}
.section--navy{background:var(--navy);color:#fff}
.dotted{background-image:radial-gradient(rgba(14,31,46,.045) 1px,transparent 1px);background-size:22px 22px}
.dots{background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:22px 22px}
.section__head{max-width:640px;margin-bottom:52px}
.section__head--center{max-width:620px;margin-inline:auto;text-align:center}
.section__head--row{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;max-width:100%}

/* grids */
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:26px}

/* service card (icon-led, no photo) */
.svc-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px 28px;height:100%;display:flex;flex-direction:column;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}
.svc-card:hover{transform:translateY(-5px);border-color:#cfe2de;box-shadow:var(--shadow)}
.svc-card__title{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.2rem;color:var(--ink);margin-bottom:10px}
.svc-card__desc{font-size:.9rem;line-height:1.65;color:var(--ink-soft);margin-bottom:18px;flex:1}
.chip{width:44px;height:44px;border-radius:11px;display:grid;place-items:center;flex:none;background:var(--brand-tint);color:var(--brand);margin-bottom:16px}
.chip--lg{width:54px;height:54px;border-radius:13px;margin-bottom:20px}
.chip--plain{background:#fff;border:1px solid var(--line)}
.tags{display:flex;flex-wrap:wrap;gap:7px}
.tag{font-size:.72rem;font-weight:600;letter-spacing:.03em;color:var(--brand);background:var(--brand-tint);border:1px solid #cfe7e2;padding:3px 10px;border-radius:100px}
.tag--solid{background:var(--brand);color:#fff;border-color:var(--brand)}

/* steps */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
.step{padding:28px 24px;background:#fff;border:1px solid var(--line);border-radius:var(--radius)}
.step__num{font-family:'Montserrat',sans-serif;font-weight:800;font-size:.95rem;color:#c3d3d0;letter-spacing:.08em}
.step .chip--plain{margin-top:14px}
.step__title{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.08rem;color:var(--ink);margin-bottom:8px}
.step__desc{font-size:.88rem;line-height:1.6;color:var(--ink-soft)}

/* survey cards */
.survey-card{position:relative;border-radius:var(--radius);overflow:hidden;height:300px;transition:transform .3s ease}
.survey-card:hover{transform:scale(1.015)}
.survey-card img{width:100%;height:100%;object-fit:cover}
.survey-card__overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;background:linear-gradient(to top,rgba(7,19,32,.9) 0%,rgba(7,19,32,.4) 46%,rgba(7,19,32,.04) 100%);transition:background .3s ease}
.survey-card:hover .survey-card__overlay{background:linear-gradient(to top,rgba(7,19,32,.92) 0%,rgba(7,19,32,.55) 50%,rgba(7,19,32,.12) 100%)}
.survey-card__overlay h3{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.16rem;color:#fff;margin-bottom:6px}
.survey-card__overlay p{font-size:.82rem;line-height:1.55;color:#c4d2dc}

/* feature banner */
.feature-banner{margin-top:44px;border-radius:16px;overflow:hidden;position:relative;background-size:cover;background-position:center;min-height:230px}
.feature-banner__inner{position:relative;padding:40px clamp(24px,5vw,56px);min-height:230px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:22px;background:linear-gradient(95deg,rgba(11,27,43,.94) 38%,rgba(11,27,43,.3) 100%)}
.feature-banner__inner h3{font-family:'Montserrat',sans-serif;font-weight:800;color:#fff;font-size:clamp(1.4rem,3.2vw,2.1rem);line-height:1.18;max-width:22ch}

/* cadastral */
.cadastral{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.cadastral__intro .btn{margin-top:6px}
.pull-quote{margin-top:40px;padding:26px 28px;background:#fff;border:1px solid var(--line);border-left:3px solid var(--brand);border-radius:10px}
.pull-quote svg{color:var(--brand);margin-bottom:10px}
.pull-quote p{font-size:.95rem;line-height:1.7;color:var(--ink);font-style:italic}
.pull-quote cite{display:block;margin-top:12px;font-size:.8rem;font-style:normal;font-weight:700;color:var(--brand)}
.cadastral__figure{position:relative;margin-bottom:52px}
.cadastral__figure img{width:100%;border-radius:14px;aspect-ratio:16/10;object-fit:cover}
.cadastral__badge{position:absolute;right:-18px;bottom:-22px;background:var(--brand);color:#fff;border-radius:12px;padding:16px 22px;box-shadow:0 20px 40px rgba(10,114,104,.3)}
.cadastral__badge-num{font-family:'Montserrat',sans-serif;font-weight:800;font-size:1.7rem;line-height:1}
.cadastral__badge-label{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:4px;opacity:.9}
.pill-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pill{display:flex;align-items:center;gap:11px;padding:13px 15px;background:#fff;border:1px solid var(--line);border-radius:9px;font-size:.86rem;font-weight:500;color:var(--ink);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
.pill svg{color:var(--brand);flex:none}
.pill:hover{transform:translateX(4px);border-color:#cfe2de;box-shadow:var(--shadow)}

/* case cards */
.case-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.case-card:hover{transform:translateY(-5px);border-color:#cfe2de;box-shadow:var(--shadow)}
.case-card__media{position:relative;height:200px;overflow:hidden}
.case-card__media img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.case-card:hover .case-card__media img{transform:scale(1.05)}
.case-card__tag{position:absolute;left:14px;top:14px;background:rgba(7,19,32,.82);color:#fff;font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 11px;border-radius:100px;backdrop-filter:blur(4px)}
.case-card__body{padding:22px 24px 26px;display:flex;flex-direction:column;flex:1}
.case-card__body h3{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.12rem;line-height:1.3;color:var(--ink);margin-bottom:14px}
.case-card__result{display:flex;align-items:baseline;gap:10px;padding:12px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-bottom:14px}
.case-card__result-num{font-family:'Montserrat',sans-serif;font-weight:800;font-size:1.5rem;color:var(--brand)}
.case-card__result-label{font-size:.78rem;color:var(--ink-faint);line-height:1.3}
.case-card__body p{font-size:.87rem;line-height:1.62;margin-bottom:16px;flex:1}

/* stats band */
.stats-band{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:960px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);padding:44px 0}
.stats-band .stat{text-align:center}

/* about */
.about{display:grid;grid-template-columns:1.05fr .95fr;gap:64px;align-items:center}
.about__copy .btn{margin-top:24px}
.about__grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sector{padding:24px;background:#fff;border:1px solid var(--line);border-radius:var(--radius)}
.sector h3{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1rem;color:var(--ink);margin:14px 0 6px}
.sector p{font-size:.84rem;line-height:1.55;color:var(--ink-soft)}

/* testimonials */
.quote-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:28px 26px;height:100%;display:flex;flex-direction:column}
.quote-card > svg{color:var(--brand);margin-bottom:14px}
.quote-card blockquote{font-size:.95rem;line-height:1.68;color:var(--ink);flex:1}
.quote-card figcaption{display:flex;align-items:center;gap:13px;margin-top:22px;padding-top:18px;border-top:1px solid var(--line)}
.avatar{width:42px;height:42px;border-radius:50%;flex:none;display:grid;place-items:center;background:var(--brand-tint);color:var(--brand);font-weight:700;font-size:.85rem;letter-spacing:.02em}
.quote-card figcaption strong{display:block;font-size:.9rem;color:var(--ink);font-weight:700}
.quote-card figcaption em{font-style:normal;font-size:.8rem;color:var(--ink-faint)}

/* insights */
.insight-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
.insight-card:hover{transform:translateY(-5px);border-color:#cfe2de;box-shadow:var(--shadow)}
.insight-card__media{height:180px;overflow:hidden}
.insight-card__media img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.insight-card:hover .insight-card__media img{transform:scale(1.05)}
.insight-card__body{padding:20px 22px 24px;display:flex;flex-direction:column;flex:1}
.insight-card__meta{display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:.75rem;color:var(--ink-faint)}
.insight-card__body h3{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.04rem;line-height:1.35;color:var(--ink);margin-bottom:16px;flex:1}

/* cta */
.cta .section__head{margin-bottom:0}
.cta__actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px}

/* contact */
.contact-grid{display:grid;grid-template-columns:.9fr 1.3fr;gap:52px;max-width:1020px;margin:0 auto}
.contact-item{display:flex;gap:15px;margin-bottom:14px;align-items:flex-start;padding:8px;margin-inline:-8px;border-radius:10px;border:1px solid transparent;text-decoration:none;color:inherit;transition:background .18s ease,border-color .18s ease,transform .18s ease}
.contact-item--link{cursor:pointer}
.contact-item--link:hover{background:#fff;border-color:var(--line);transform:translateX(3px)}
.contact-item--link:hover .chip{background:var(--brand);color:#fff}
.contact-item--link:hover .contact-item__val{color:var(--brand)}
.contact-item--link:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.contact-item .chip{transition:background .18s ease,color .18s ease}
.contact-item__label{font-size:.72rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-faint);margin-bottom:3px}
.contact-item__val{font-size:.94rem;color:var(--ink);transition:color .18s ease}
.form-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:30px;box-shadow:var(--shadow)}
.form-card label{display:block;margin-bottom:16px}
.form-card label span{display:block;font-size:.74rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-faint);margin-bottom:7px;font-weight:600}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.input{width:100%;background:#fff;border:1px solid var(--line);border-radius:9px;padding:12px 14px;font-size:.92rem;font-family:inherit;color:var(--ink);transition:border-color .18s ease,box-shadow .18s ease}
.input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px rgba(10,114,104,.12)}
.input::placeholder{color:#9aa9b4}
textarea.input{resize:vertical}

/* footer */
.footer{background:var(--navy-deep);color:#93a6b3;padding:60px 0 30px}
.footer__grid{display:flex;flex-wrap:wrap;justify-content:space-between;gap:44px;margin-bottom:44px}
.footer__brand{max-width:300px}
.footer__brand p{font-size:.85rem;line-height:1.7;color:#7f93a1;margin-top:16px}
.footer__social{display:flex;gap:10px;margin-top:18px}
.social{width:36px;height:36px;border-radius:9px;display:grid;place-items:center;cursor:pointer;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#aebecb;transition:background .18s ease,color .18s ease,border-color .18s ease}
.social:hover{background:var(--brand);color:#fff;border-color:var(--brand)}
.footer__head{font-family:'Montserrat',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--brand-bright);margin-bottom:16px}
.footer__link{display:block;background:none;border:0;cursor:pointer;color:#8ba0ae;font-size:.86rem;padding:6px 0;text-align:left;transition:color .18s ease}
.footer__link:hover{color:#fff}
.footer__bottom{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;padding-top:24px;border-top:1px solid rgba(255,255,255,.08);font-size:.78rem;color:#6f8391}

/* responsive */
@media (max-width:960px){
  .nav__links{display:none}
  .hamburger{display:block}
  .hero__grid{grid-template-columns:1fr}
  .cadastral{grid-template-columns:1fr;gap:44px}
  .about{grid-template-columns:1fr;gap:44px}
  .contact-grid{grid-template-columns:1fr;gap:36px}
  .stats-band{grid-template-columns:1fr 1fr;gap:32px 20px}
  .section__head--row{flex-direction:column;align-items:flex-start;gap:14px}
}
@media (max-width:560px){
  .hero__stats{grid-template-columns:1fr 1fr;gap:22px 30px}
  .form-row{grid-template-columns:1fr}
  .pill-grid{grid-template-columns:1fr}
  .about__grid{grid-template-columns:1fr}
  .cadastral__badge{right:12px}
  .footer__bottom{flex-direction:column}
}
@media (prefers-reduced-motion:reduce){
  *{transition:none!important;animation:none!important}
  html{scroll-behavior:auto}
}
`;
