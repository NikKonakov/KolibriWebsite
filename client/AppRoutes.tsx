import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Page routes, shared by the browser entry (App.tsx) and the build-time
 * prerender (entry-server.tsx), so both produce identical HTML:
 *   /     Russian home page
 *   /en   English home page (served as /en/)
 *   *     anything else: the 404 page
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index lang="ru" />} />
      <Route path="/en" element={<Index lang="en" />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Opt-in flags for React Router v7 behaviour. They silence upgrade warnings
 * and must match between the browser router and the prerender router.
 */
export const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
