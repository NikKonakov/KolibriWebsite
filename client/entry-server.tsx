/**
 * Server-side entry, built by `vite build --ssr` and used only at build time
 * by scripts/prerender.mjs. Never shipped to the browser.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes, { routerFuture } from "./AppRoutes";

export { renderHead } from "./seo/head";

/**
 * Renders the page for one URL ("/", "/en/", "/404") to an HTML string, so
 * search engines get the full content without running JavaScript.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url} future={routerFuture}>
      <AppRoutes />
    </StaticRouter>,
  );
}
