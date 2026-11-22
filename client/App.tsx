import "./global.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes, { routerFuture } from "./AppRoutes";

const App = () => (
  <BrowserRouter future={routerFuture}>
    <AppRoutes />
  </BrowserRouter>
);

const container = document.getElementById("root")!;

// Production pages are prerendered at build time (see scripts/prerender.mjs):
// attach to that HTML instead of re-rendering. Dev mode starts empty.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
