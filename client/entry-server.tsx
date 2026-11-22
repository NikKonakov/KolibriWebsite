import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoutes, { routerFuture } from "./AppRoutes";

export { renderHead } from "./seo/head";

/** Renders one URL to HTML at build time, so search engines get real content. */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url} future={routerFuture}>
      <AppRoutes />
    </StaticRouter>,
  );
}
