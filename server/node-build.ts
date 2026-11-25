/**
 * Self-hosted production server: `pnpm build && pnpm build:server && pnpm start`.
 * Not used on Vercel (which serves dist/spa directly); kept for hosting the
 * site on any Node.js machine.
 */
import path from "path";
import * as express from "express";
import { createServer } from "./index";
import { securityHeaders } from "../shared/security-headers";

const app = createServer();
const port = process.env.PORT || 3000;
const distPath = path.join(import.meta.dirname, "../spa");

// Same security headers as production on Vercel (see shared/security-headers.ts).
app.use((_req, res, next) => {
  res.set(securityHeaders);
  next();
});

// Prerendered pages and assets: "/" → index.html, "/en/" → en/index.html.
app.use(express.static(distPath));

// Everything else is a real 404 with the not-found page. (Answering 200 with
// the home page would be a "soft 404", which Google penalises.) A final
// middleware is used instead of app.get("*"): Express 5 rejects the bare "*".
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    res.status(404).json({ error: "API endpoint not found" });
    return;
  }
  res.status(404).sendFile(path.join(distPath, "404.html"));
});

app.listen(port, () => {
  console.log(`Kolibri website running on http://localhost:${port}`);
});

/** Exits cleanly when the hosting platform asks the process to stop. */
function shutDown(signal: string) {
  console.log(`Received ${signal}, shutting down`);
  process.exit(0);
}
process.on("SIGTERM", () => shutDown("SIGTERM"));
process.on("SIGINT", () => shutDown("SIGINT"));
