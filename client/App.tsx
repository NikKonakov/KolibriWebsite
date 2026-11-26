/**
 * Browser entry point (loaded by index.html): global styles, fonts and the
 * React app.
 */
import "./global.css";
// Self-hosted variable fonts: Inter for text, Nunito for headings. One file
// per alphabet covers every weight; browsers download only the alphabets a
// page uses (Cyrillic, Latin), and no visitor data goes to Google Fonts.
import "@fontsource-variable/inter";
import "@fontsource-variable/nunito";

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
