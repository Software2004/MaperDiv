import { useEffect, useRef, useState } from "react";
import { IMG, MAP_TOUR } from "../data/images";

/* Live satellite basemap (Esri World Imagery) with a gentle fly-through.
   maplibre-gl is code-split and loaded on mount. */
export default function HeroMap() {
  const container = useRef(null);
  const [failed, setFailed] = useState(false);
  const [coords, setCoords] = useState("30.00°  0.00°");

  useEffect(() => {
    let map;
    let tourTimer;
    let cancelled = false;
    const slow = setTimeout(() => setFailed(true), 15000);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
        setFailed(false);
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
    let retryTimer;
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
