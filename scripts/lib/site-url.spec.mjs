import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site-url.mjs";

describe("resolveSiteUrl", () => {
  it("prefers SITE_URL and strips paths and trailing slashes", () => {
    expect(
      resolveSiteUrl({
        SITE_URL: "https://kolibri.example/some/path/",
        VERCEL_PROJECT_PRODUCTION_URL: "kolibri.vercel.app",
      }),
    ).toBe("https://kolibri.example");
  });

  it("falls back to the Vercel production domain, then Netlify's URL", () => {
    expect(
      resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "kolibri.vercel.app" }),
    ).toBe("https://kolibri.vercel.app");
    expect(resolveSiteUrl({ URL: "https://kolibri.netlify.app" })).toBe(
      "https://kolibri.netlify.app",
    );
  });

  it("returns undefined when nothing is set", () => {
    expect(resolveSiteUrl({})).toBeUndefined();
  });

  it("rejects typos and plain http", () => {
    expect(() => resolveSiteUrl({ SITE_URL: "kolibri.example" })).toThrow(
      /not a valid URL/,
    );
    expect(() =>
      resolveSiteUrl({ SITE_URL: "http://kolibri.example" }),
    ).toThrow(/https/);
  });
});
