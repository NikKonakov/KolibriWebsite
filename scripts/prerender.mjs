/**
 * Build step 4 of 4 (see "build" in package.json).
 *
 * Turns the empty single-page-app shell into real HTML pages, so search
 * engines and link previews see the full content without running JavaScript:
 *   dist/spa/index.html     Russian home page   (/)
 *   dist/spa/en/index.html  English home page   (/en/)
 *   dist/spa/404.html       not-found page
 * and writes dist/spa/robots.txt and dist/spa/sitemap.xml.
 *
 * The site's address comes from SITE_URL, or automatically from Vercel or
 * Netlify (scripts/lib/site-url.mjs).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { resolveSiteUrl } from "./lib/site-url.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SPA_DIR = path.join(ROOT, "dist/spa");

// The SSR bundle built in step 3 (client/entry-server.tsx).
const { render, renderHead } = await import(
  pathToFileURL(path.join(ROOT, "dist/prerender/entry-server.js")).href
);

const PAGES = [
  { url: "/", lang: "ru", file: "index.html" },
  { url: "/en/", lang: "en", file: "en/index.html" },
  { url: "/404", lang: "ru", file: "404.html", notFound: true },
];

/**
 * Fills the HTML template for one page: its language, its <head> tags and
 * the rendered page body.
 */
function renderPage(template, page, siteUrl) {
  const head = page.notFound
    ? `<title>404 — Колибри / Kolibri</title>\n    <meta name="robots" content="noindex" />`
    : renderHead(page.lang, siteUrl);

  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", render(page.url));
}

/** Writes robots.txt: everything may be crawled; points to the sitemap. */
async function writeRobots(siteUrl) {
  const lines = ["User-agent: *", "Allow: /"];
  if (siteUrl) lines.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
  await fs.writeFile(path.join(SPA_DIR, "robots.txt"), lines.join("\n") + "\n");
}

/** Writes sitemap.xml listing both language versions as alternates. */
async function writeSitemap(siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="ru" href="${siteUrl}/" />`,
    `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/" />`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />`,
  ].join("\n    ");
  const entry = (loc) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    ${alternates}\n  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(`${siteUrl}/`)}
${entry(`${siteUrl}/en/`)}
</urlset>
`;
  await fs.writeFile(path.join(SPA_DIR, "sitemap.xml"), xml);
}

/** Prerenders every page, then writes robots.txt and sitemap.xml. */
async function main() {
  const siteUrl = resolveSiteUrl(process.env);
  const template = await fs.readFile(path.join(SPA_DIR, "index.html"), "utf8");

  for (const page of PAGES) {
    const out = path.join(SPA_DIR, page.file);
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, renderPage(template, page, siteUrl));
    console.log(`prerendered ${page.url} -> dist/spa/${page.file}`);
  }

  await writeRobots(siteUrl);
  if (siteUrl) {
    await writeSitemap(siteUrl);
    console.log(`sitemap.xml and robots.txt written for ${siteUrl}`);
  } else {
    console.warn(
      "WARNING: no SITE_URL set: skipped canonical/hreflang URLs and " +
        "sitemap.xml. Set SITE_URL (e.g. https://kolibrischool.ca) in the " +
        "hosting settings.",
    );
  }
}

await main();
