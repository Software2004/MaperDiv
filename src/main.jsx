import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "maplibre-gl/dist/maplibre-gl.css";
import "./styles/global.css";
import App from "./App.jsx";

/*
 * `basename` comes from Vite's `base` (see vite.config.js). It is "/" for a
 * custom-domain / user-page deploy, and "/<repo>/" for a GitHub project-page
 * deploy — set VITE_BASE at build time in that case. `public/404.html` restores
 * deep links on GitHub Pages.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
