import type { RequestHandler } from "express";
import type { DemoResponse } from "@shared/api";

/**
 * GET /api/demo — example endpoint from the project template.
 * Returns a fixed greeting typed with the shared DemoResponse interface,
 * showing how client and server can share one response type.
 */
export const handleDemo: RequestHandler = (_req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
