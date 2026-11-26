import { describe, expect, it } from "vitest";
import { renderHead } from "./head";

describe("renderHead", () => {
  const site = "https://kolibri.example";

  it("links both language versions to each other", () => {
    const ru = renderHead("ru", site);
    expect(ru).toContain(`<link rel="canonical" href="${site}/" />`);
    expect(ru).toContain(`hreflang="en" href="${site}/en/"`);
    expect(renderHead("en", site)).toContain(
      `<link rel="canonical" href="${site}/en/" />`,
    );
  });

  it("leaves out absolute links when the site address is unknown", () => {
    const head = renderHead("ru");
    expect(head).not.toContain("canonical");
    expect(head).not.toContain("og:image");
    expect(head).toContain("<title>");
  });

  it("can't be broken out of: structured data never contains a raw '<'", () => {
    const json = renderHead("ru", site).match(
      /<script type="application\/ld\+json">(.*)<\/script>/s,
    )?.[1];
    expect(json).toBeDefined();
    expect(json).not.toContain("<");
    expect(() => JSON.parse(json!)).not.toThrow();
  });
});
