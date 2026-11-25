/**
 * Browser entry point (loaded by index.html): global styles, fonts and the
 * React app.
 */
import "./global.css";
// Self-hosted "Playfair Display" in the weights the site uses (400–700).
// Each file covers Cyrillic and Latin; browsers download only what a page
// needs, and no visitor data goes to Google Fonts.
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes, { routerFuture } from "./AppRoutes";

/** The whole app: the browser's router around the page routes. */
const App = () => (
  <BrowserRouter future={routerFuture}>
    <AppRoutes />
  </BrowserRouter>
);

const container = document.getElementById("root")!;

// Production pages arrive prerendered (scripts/prerender.mjs), so React
// attaches to the existing HTML ("hydrates") instead of drawing it again.
// In development the page starts empty and React renders from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
