/* ────────────────────────────────────────────────────────────────
   IMAGERY — curated aerial / satellite photography (Unsplash, free
   for commercial use). `U(id)` builds an optimised Unsplash URL.
   ──────────────────────────────────────────────────────────────── */
export const U = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=72&w=${w}${h ? `&h=${h}` : ""}`;

export const IMG = {
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

// Live-map fly-through: [lng, lat, zoom]
export const MAP_TOUR = [
  [73.06, 33.6, 8.4],
  [36.82, -1.29, 8],
  [10.75, 59.91, 8],
  [106.85, -6.21, 8],
  [-74.07, 4.71, 8],
  [55.27, 25.2, 8],
];
