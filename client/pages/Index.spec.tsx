import { describe, expect, it } from "vitest";
import { render } from "../entry-server";
import { dictionaries } from "@/i18n/translations";

/** Text as React writes it into HTML ("&" → "&amp;", "'" → "&#x27;"…). */
const escapeHtml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

const pages = [
  { url: "/", lang: "ru" as const },
  { url: "/en/", lang: "en" as const },
];

/**
 * Renders the real home page (as the build's prerender does) and checks
 * rules that must hold for every link, image and section, in both languages.
 */
describe.each(pages)("home page $url", ({ url, lang }) => {
  const html = render(url);
  const t = dictionaries[lang];

  it("renders the page in its language with exactly one <h1>", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain(escapeHtml(t.hero.title));
    expect(html).toContain(escapeHtml(t.directions.items.language.title));
    expect(html).not.toMatch(/undefined|\[object Object\]/);
  });

  it("opens every new-tab link with rel=noopener noreferrer", () => {
    const newTabLinks = html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? [];
    expect(newTabLinks.length).toBeGreaterThan(0);
    for (const link of newTabLinks) {
      expect(link).toContain('rel="noopener noreferrer"');
    }
  });

  it("links only to https, tel:, mailto: or this site", () => {
    const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    for (const href of hrefs) {
      expect(href).toMatch(/^(https:\/\/|tel:|mailto:|\/|#)/);
    }
  });

  it("describes every image (alt text, empty for decorative ones)", () => {
    const images = html.match(/<img [^>]*>/g) ?? [];
    expect(images.length).toBeGreaterThan(0);
    for (const img of images) expect(img).toMatch(/ alt="/);
  });

  it("has a section for every menu link", () => {
    const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
    for (const id of new Set(anchors)) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("pre-fills the library registration message in the page language", () => {
    const encoded = encodeURIComponent(t.directions.library.registerMessage);
    expect(html).toContain(
      escapeHtml(`https://wa.me/14036140284?text=${encoded}`),
    );
  });
});
