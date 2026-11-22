import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/** Shared by the browser entry (App.tsx) and the build-time prerender (entry-server.tsx). */
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

export const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
