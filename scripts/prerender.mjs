/**
 * Build step 4 of 4 (see "build" in package.json).
 *
 * Turns the empty SPA shell into real HTML pages so Google sees the content
 * without running JavaScript:
 *   dist/spa/index.html     Russian home page   (/)
 *   dist/spa/en/index.html  English home page   (/en/)
 *   dist/spa/404.html       Not-found page
 *   dist/spa/robots.txt and dist/spa/sitemap.xml
 *
 * The production address comes from SITE_URL, or automatically from
 * Vercel (VERCEL_PROJECT_PRODUCTION_URL) or Netlify (URL).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const spaDir = path.join(root, "dist/spa");
const { render, renderHead } = await import(
  pathToFileURL(path.join(root, "dist/prerender/entry-server.js")).href
);

function resolveSiteUrl() {
  const { SITE_URL, VERCEL_PROJECT_PRODUCTION_URL, URL } = process.env;
  const raw =
    SITE_URL ||
    (VERCEL_PROJECT_PRODUCTION_URL && `https://${VERCEL_PROJECT_PRODUCTION_URL}`) ||
    URL;
  return raw ? raw.replace(/\/+$/, "") : undefined;
}

const siteUrl = resolveSiteUrl();
const template = await fs.readFile(path.join(spaDir, "index.html"), "utf8");

const pages = [
  { url: "/", lang: "ru", file: "index.html" },
  { url: "/en/", lang: "en", file: "en/index.html" },
  { url: "/404", lang: "ru", file: "404.html", notFound: true },
];

for (const page of pages) {
  const head = page.notFound
    ? `<title>404 — Колибри / Kolibri</title>\n    <meta name="robots" content="noindex" />`
    : renderHead(page.lang, siteUrl);

  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", render(page.url));

  const out = path.join(spaDir, page.file);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, html);
  console.log(`prerendered ${page.url} -> dist/spa/${page.file}`);
}

const robots = ["User-agent: *", "Allow: /"];
if (siteUrl) robots.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
await fs.writeFile(path.join(spaDir, "robots.txt"), robots.join("\n") + "\n");

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="ru" href="${siteUrl}/" />`,
    `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en/" />`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en/" />`,
  ].join("\n    ");
  const entry = (loc) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    ${alternates}\n  </url>`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(`${siteUrl}/`)}
${entry(`${siteUrl}/en/`)}
</urlset>
`;
  await fs.writeFile(path.join(spaDir, "sitemap.xml"), sitemap);
  console.log(`sitemap.xml and robots.txt written for ${siteUrl}`);
} else {
  console.warn(
    "WARNING: no SITE_URL set — skipped canonical/hreflang URLs and sitemap.xml. " +
      "Set SITE_URL (e.g. https://kolibrischool.ca) in the hosting settings.",
  );
}
