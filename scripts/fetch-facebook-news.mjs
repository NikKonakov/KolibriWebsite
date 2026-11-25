/**
 * Build step 1 of 4 (see "build" in package.json).
 *
 * Pulls the latest posts from the school's Facebook Page into
 * client/content/news.generated.json and downloads their photos into
 * public/news/fb/, so the News section is part of the prerendered HTML
 * (Google can read it) and never depends on Facebook's widget.
 *
 * Needs FB_PAGE_TOKEN: a never-expiring Page access token with the
 * pages_read_engagement permission (how to get one: README, "Facebook news").
 * Without it, or when Facebook returns an error, the build still succeeds:
 * the News section then shows manual news and the Facebook button only.
 */
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outJson = path.join(root, "client/content/news.generated.json");
const imgDir = path.join(root, "public/news/fb");
const graphBase = (process.env.FB_GRAPH_BASE || "https://graph.facebook.com").replace(/\/+$/, "");

const MAX_POSTS = 6;
const MAX_TEXT = 600;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

const CALGARY_DATE = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Edmonton",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Facebook sends UTC ("2026-11-23T01:01:23+0000"); show the school's local day. */
function localDate(fbTime) {
  return CALGARY_DATE.format(new Date(fbTime.replace(/([+-]\d{2})(\d{2})$/, "$1:$2")));
}

/** Posts usually open with a short headline line: use it as the card title. */
function splitTitle(message) {
  const [first, ...rest] = message.split("\n");
  const body = rest.join("\n").trim();
  return first.trim().length <= 100 && body
    ? { title: first.trim(), text: body }
    : { text: message };
}

async function writeNews(items) {
  await fs.writeFile(outJson, JSON.stringify(items, null, 2) + "\n");
}

/** Shortens long posts at a word boundary; the full post is one click away. */
function shorten(text) {
  if (text.length <= MAX_TEXT) return text;
  const cut = text.slice(0, MAX_TEXT);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), MAX_TEXT - 40)).trimEnd() + "…";
}

async function downloadImage(url, name) {
  try {
    const res = await fetch(url);
    const ext = IMAGE_EXT[(res.headers.get("content-type") || "").split(";")[0]];
    if (!res.ok || !ext) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_IMAGE_BYTES) return undefined;
    await fs.writeFile(path.join(imgDir, `${name}.${ext}`), buf);
    return `/news/fb/${name}.${ext}`;
  } catch {
    return undefined;
  }
}

async function main() {
  await fs.rm(imgDir, { recursive: true, force: true });
  await fs.mkdir(imgDir, { recursive: true });

  const token = process.env.FB_PAGE_TOKEN;
  if (!token) {
    console.warn("FB_PAGE_TOKEN is not set: skipping Facebook news.");
    return writeNews([]);
  }

  const url = new URL(`${graphBase}/me/posts`);
  url.searchParams.set("fields", "message,created_time,full_picture,permalink_url");
  url.searchParams.set("limit", "20");

  let body;
  try {
    // The token goes in a header, never in the URL, so it can't leak into logs.
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    body = await res.json();
  } catch (err) {
    console.warn(`WARNING: could not reach Facebook (${err.message}). Building without Facebook news.`);
    return writeNews([]);
  }
  if (body.error || !Array.isArray(body.data)) {
    const e = body.error || {};
    console.warn(
      `WARNING: Facebook returned an error (${e.type || "unknown"} ${e.code ?? ""}: ${e.message || "no data"}). ` +
        "If the token expired, create a new one (README, \"Facebook news\"). Building without Facebook news.",
    );
    return writeNews([]);
  }

  const posts = body.data.filter((p) => p.message && p.message.trim()).slice(0, MAX_POSTS);
  const items = [];
  for (const post of posts) {
    const id = String(post.id).replace(/[^0-9_]/g, "");
    // Blank lines between paragraphs waste space in a short card.
    const message = post.message.trim().replace(/\n\s*\n+/g, "\n");
    const { title, text } = splitTitle(message);
    items.push({
      date: localDate(post.created_time),
      ...(title && { title: { ru: title } }),
      text: { ru: shorten(text) },
      image: post.full_picture ? await downloadImage(post.full_picture, id) : undefined,
      link: post.permalink_url,
    });
  }

  await writeNews(items);
  console.log(`Facebook news: ${items.length} posts, ${items.filter((i) => i.image).length} photos.`);
}

await main();
