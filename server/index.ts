import "dotenv/config";
import express from "express";
import { handleDemo } from "./routes/demo";

/**
 * Builds the Express app that answers the /api/* endpoints.
 *
 * It's used in three places: as middleware of the Vite dev server
 * (vite.config.ts), by the self-hosted production server (node-build.ts) and
 * by the Netlify function (netlify/functions/api.ts). The website itself is
 * static and calls no endpoint; the two below are the template's examples.
 *
 * There is deliberately no CORS middleware: the API is same-origin only, so
 * other websites can't call it from a visitor's browser. If that's ever
 * needed, add the `cors` package with an explicit list of allowed origins.
 */
export function createServer() {
  const app = express();

  // Don't advertise the framework (and its version) in every response.
  app.disable("x-powered-by");

  // Accept only small JSON/form bodies; larger requests get "413 Too Large".
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: false, limit: "100kb" }));

  app.get("/api/ping", (_req, res) => {
    res.json({ message: process.env.PING_MESSAGE ?? "ping" });
  });

  app.get("/api/demo", handleDemo);

  return app;
}
