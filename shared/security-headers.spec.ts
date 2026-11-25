import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { securityHeaders } from "./security-headers";

interface VercelRoute {
  src?: string;
  headers?: Record<string, string>;
  continue?: boolean;
}

/** Reads the routes from vercel.json, the production copy of the headers. */
function vercelRoutes(): VercelRoute[] {
  const url = new URL("../vercel.json", import.meta.url);
  return JSON.parse(readFileSync(url, "utf8")).routes;
}

describe("security headers", () => {
  it("vercel.json sends exactly the headers defined in security-headers.ts", () => {
    const allPages = vercelRoutes().find(
      (r) => r.src === "/(.*)" && r.continue && r.headers,
    );
    expect(allPages?.headers).toEqual(securityHeaders);
  });

  it("the policy blocks scripts from other sites and framing", () => {
    const csp = securityHeaders["Content-Security-Policy"];
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toMatch(/unsafe-eval|https?:/);
  });
});
