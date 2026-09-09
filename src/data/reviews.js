/* ────────────────────────────────────────────────────────────────
   REVIEWS — client reviews shown on the home page, one per service
   area. `rating` is 5 or 4.5. Portraits live in src/assets.
   NOTE: names are placeholders — swap for the real reviewer list.
   ──────────────────────────────────────────────────────────────── */
import team1 from "../assets/team-1.png";
import team2 from "../assets/team-2.png";
import team3 from "../assets/team-3-old.png";
import team4 from "../assets/team-4.png";
import team5 from "../assets/team-5.png";
import team6 from "../assets/team-6.png";
import team7 from "../assets/team-7.png";
import team8 from "../assets/team-8.png";
import leader from "../assets/leader-img.png";

export const REVIEWS = [
  {
    name: "Marcus Feld",
    role: "GIS Programme Lead, Terrafirma Cadastre",
    service: "GIS Web Development",
    to: "/services/gis-web-development",
    rating: 5,
    image: team2,
    quote:
      "They rebuilt our public land portal on MapLibre and PostGIS and it has not missed a beat since launch. Vector tiles render instantly and the query API is exactly what our analysts asked for.",
  },
  {
    name: "Arjun Nair",
    role: "Field Operations Manager, CivicMap Agency",
    service: "Mobile GIS — Android & iOS",
    to: "/services/mobile-gis",
    rating: 5,
    image: team4,
    quote:
      "Our crews collect offline for days at a time and the background sync just resolves. Bluetooth GNSS pairing worked first try in the field. This replaced three paper workflows.",
  },
  {
    name: "Victor Cho",
    role: "Head of Engineering, OrbitalGrid",
    service: "Custom Software Development",
    to: "/services/custom-software",
    rating: 4.5,
    image: team6,
    quote:
      "Mappir Dev scoped and shipped a spatial processing platform in one quarter. Clean handover, documented pipelines, and the code review culture is genuinely high. Minor timeline slip on one milestone, well communicated.",
  },
  {
    name: "Hannah Berg",
    role: "Director of Analytics, NordCoast Ports",
    service: "Analytics Dashboards",
    to: "/services/analytics-dashboards",
    rating: 5,
    image: team3,
    quote:
      "The dashboards turned a monthly reporting scramble into a live view of the whole port estate. Load times are sub-second on datasets our old BI tool choked on.",
  },
  {
    name: "Omar Farooqi",
    role: "Smart Infrastructure Lead, BluePeak Energy",
    service: "IoT Solutions",
    to: "/services/iot-solutions",
    rating: 5,
    image: team8,
    quote:
      "From proof-of-concept to a production sensor network across 40 sites in a single quarter. The field-to-dashboard telemetry pipeline has been rock solid.",
  },
  {
    name: "Daniel Meyer",
    role: "Hardware Programme Manager, Helix Civil Group",
    service: "Custom IoT Devices",
    to: "/services/custom-iot-devices",
    rating: 4.5,
    image: team1,
    quote:
      "Purpose-built GNSS loggers, designed, prototyped and certified by their team. Battery life beat spec. We would have spent a year sourcing this in-house.",
  },
  {
    name: "Leila Haddad",
    role: "Lead Surveyor, Meridian Rail",
    service: "Drone Surveys",
    to: "/surveys/drone",
    rating: 5,
    image: team5,
    quote:
      "RTK/PPK deliverables slotted straight into our design pipeline — contours, DTMs and 3D meshes, every one ground-truthed against independent check points and documented.",
  },
  {
    name: "Robin Vasquez",
    role: "Civil Engineering Manager, AtlasWorks",
    service: "Topographic & Land Surveys",
    to: "/surveys/topographic",
    rating: 5,
    image: team7,
    quote:
      "Boundary work and topographic capture delivered to national survey standard, with accuracy reports we could hand straight to the regulator. No rework.",
  },
  {
    name: "Stefan Neumann",
    role: "Programme Director, Regional Land Authority",
    service: "Cadastral Mapping & Remote Sensing",
    to: "/cadastral",
    rating: 5,
    image: leader,
    quote:
      "Mappir Dev digitised over 2.4 million parcels and stood up a complete GIS-integrated registry — on time, with change detection from satellite imagery feeding the mutation workflow.",
  },
];
