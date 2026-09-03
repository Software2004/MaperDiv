import { IMG } from "./images.js";

/* ────────────────────────────────────────────────────────────────
   INSIGHTS — articles, guides and news. Index at /insights,
   /insights/guides, /insights/news; detail at /insights/<slug>.
   `body` is an array of paragraphs (placeholder copy — replace).
   ──────────────────────────────────────────────────────────────── */
export const INSIGHTS = [
  {
    slug: "accuracy-target-cadastral-surveys",
    kind: "guide",
    tag: "Guide",
    title: "Choosing an accuracy target for cadastral surveys",
    date: "2026-08-12",
    read: "6 min read",
    image: IMG.parcelsTop,
    excerpt:
      "Over-specify and the survey costs multiply; under-specify and the register can't be trusted. How to set a defensible accuracy target.",
    body: [
      "Accuracy in a cadastral survey is a legal and financial decision as much as a technical one. The tolerance you specify flows straight into the method, the equipment, the crew time and, ultimately, whether the resulting register can support the transactions built on it.",
      "Start from the use. A fiscal cadastre that drives valuation and taxation tolerates looser positioning than a legal cadastre that must resolve boundary disputes. Write down what decisions the data has to support before quoting a number.",
      "Match the standard, not a wish. Most countries publish a cadastral survey standard with accuracy classes tied to land value or urban/rural context. Specify the class, not an arbitrary millimetre figure, so the survey is defensible against the rule that actually governs it.",
      "Budget for verification. Whatever target you set, a portion of the work is independent check measurement. If the plan has no check-point budget, the accuracy claim is an assertion, not a result.",
    ],
  },
  {
    slug: "field-to-office-bad-connectivity",
    kind: "article",
    tag: "Article",
    title: "Field-to-office workflows that survive bad connectivity",
    date: "2026-07-03",
    read: "8 min read",
    image: IMG.drone,
    excerpt:
      "The last mile of a GIS project is a crew in a district with one bar of signal. Design for that first.",
    body: [
      "Most GIS platforms are demonstrated on office wifi and deployed to places where the network drops for hours. The gap between those two conditions is where field projects fail.",
      "Offline-first is not a feature you add later. The data model, the sync protocol and the conflict handling all have to assume the device is disconnected by default and occasionally connected — not the other way around.",
      "Make the capture form strict. Every field that can be constrained — pick lists, ranges, required photos, geometry rules — is a field that won't need cleanup back in the office. Strictness at capture is the cheapest quality control there is.",
      "Queue and reconcile. Changes made offline go into an ordered queue with device and user stamps. On reconnect they replay against the server, and genuine conflicts surface to a human rather than being silently overwritten.",
    ],
  },
  {
    slug: "state-of-remote-sensing-land-administration",
    kind: "guide",
    tag: "Report",
    title: "The state of remote sensing for land administration",
    date: "2026-06-18",
    read: "12 min read",
    image: IMG.earthOrbit,
    excerpt:
      "What sub-metre optical, SAR and time-series analysis can and can't do for cadastre and encroachment monitoring today.",
    body: [
      "Remote sensing has become good enough to change how land administration bodies monitor their jurisdictions — but only within limits that are easy to overstate in a vendor demo.",
      "Sub-metre optical imagery now resolves individual buildings and field boundaries in most of the world, on a revisit measured in days. For detecting new construction and encroachment against a known parcel fabric, it is transformative.",
      "SAR fills the gaps optical leaves — cloud, haze, night — and its sensitivity to change makes it a strong trigger layer even when it can't classify what changed on its own.",
      "The honest limit is legal boundaries. Imagery shows occupation, not entitlement. It is an excellent way to decide where to send a survey crew, and a poor substitute for one.",
    ],
  },
  {
    slug: "what-is-cadastral-mapping",
    kind: "guide",
    tag: "Explainer",
    title: "What is cadastral mapping?",
    date: "2026-05-20",
    read: "5 min read",
    image: IMG.neighborhood,
    excerpt:
      "A plain definition of the cadastre, how the spatial and textual records relate, and why the link between them is the hard part.",
    body: [
      "A cadastre is the official record of land parcels in a jurisdiction — where each parcel is, and who holds what rights over it. Cadastral mapping is the work of building and maintaining the spatial half of that record.",
      "Two records, one system. The spatial record is the parcel geometry — boundaries, identifiers, areas. The textual record is the rights, restrictions and responsibilities attached to each parcel. Neither is useful without a reliable link to the other.",
      "The link is where projects succeed or fail. Digitising maps is tractable; digitising registers is tractable; making every parcel resolve to its correct record, and keeping that true through every future mutation, is the real engineering problem.",
      "Modern cadastral systems model this explicitly, often following the Land Administration Domain Model (LADM), so the spatial and legal sides evolve together under one audit trail.",
    ],
  },
  {
    slug: "mappir-dev-corridor-programme-award",
    kind: "news",
    tag: "News",
    title: "Mappir Dev completes 320 km corridor mapping programme",
    date: "2026-04-09",
    read: "3 min read",
    image: IMG.highlandRoad,
    excerpt:
      "The RTK/PPK drone programme for a national rail corridor has been handed over to the design consortium.",
    body: [
      "Mappir Dev has completed and handed over a 320 km drone survey programme for a national rail corridor, delivering orthomosaics, classified point clouds, digital terrain models, contours and 3D meshes to the design consortium.",
      "All deliverables were verified against independent check points to ±1 cm vertical accuracy, with re-flights limited to under 3% of the corridor.",
      "The programme was delivered within its scheduled window despite varied terrain and seasonal weather constraints.",
    ],
  },
  {
    slug: "hiring-gis-engineers-2026",
    kind: "news",
    tag: "News",
    title: "We're growing the GIS engineering team",
    date: "2026-03-02",
    read: "2 min read",
    image: IMG.cityAerial,
    excerpt:
      "Open roles for GIS developers, a mobile engineer and a survey data specialist — remote-friendly, based in Rawalpindi.",
    body: [
      "Mappir Dev is expanding its engineering team to support new land administration and infrastructure programmes.",
      "We're hiring GIS web developers, a mobile GIS engineer and a survey data specialist. Roles are based in Rawalpindi with flexible remote arrangements.",
      "See the Careers page for current openings and how to apply.",
    ],
  },
];

export const getInsight = (slug) => INSIGHTS.find((p) => p.slug === slug);
export const insightsByKind = (kind) =>
  kind ? INSIGHTS.filter((p) => (kind === "guide" ? p.kind === "guide" : p.kind === kind)) : INSIGHTS;
