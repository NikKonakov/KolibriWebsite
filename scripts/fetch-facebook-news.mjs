/**
 * Build step 1 of 4 (see "build" in package.json).
 *
 * Downloads the latest posts of the school's Facebook Page into
 * client/content/news.generated.json and their photos into public/news/fb/,
 * so the News section is part of the prerendered HTML (Google can read it)
 * and never depends on Facebook's embed widget.
 *
 * Needs FB_PAGE_TOKEN: a never-expiring Page access token with the
 * pages_read_engagement permission (README, "Facebook news"). Without it, or
 * when Facebook fails, the build still succeeds and the News section shows
 * only the Facebook button.
 *
 * Safety measures:
 * - the token travels in a request header, never in a URL or a log line;
 * - every request has a timeout, so a slow Facebook can't hang the build;
 * - photos must be images under 5 MB and get fixed, digit-only file names;
 * - post data is validated, and links are kept only if they're https.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { imageFileName, toNewsItem } from "./lib/news.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_JSON = path.join(ROOT, "client/content/news.generated.json");
const IMG_DIR = path.join(ROOT, "public/news/fb");

/** Graph API address. Tests point FB_GRAPH_BASE at a local mock server. */
const GRAPH_BASE = (
  process.env.FB_GRAPH_BASE || "https://graph.facebook.com"
).replace(/\/+$/, "");

const MAX_POSTS = 6;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const API_TIMEOUT_MS = 20_000;
const IMAGE_TIMEOUT_MS = 15_000;
const IMAGE_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/** Saves the news list where client/content/news.ts picks it up. */
async function writeNews(items) {
  await fs.writeFile(OUT_JSON, JSON.stringify(items, null, 2) + "\n");
}

/** Prints a warning that explains why the build continues without news. */
function warn(reason) {
  console.warn(`WARNING: ${reason}. Building without Facebook news.`);
}

/**
 * Asks the Graph API for the Page's latest posts.
 * Returns the raw post list, or null on any network or API error.
 */
async function fetchPosts(token) {
  const url = new URL(`${GRAPH_BASE}/me/posts`);
  url.searchParams.set(
    "fields",
    "message,created_time,full_picture,permalink_url",
  );
  url.searchParams.set("limit", "20");

  let body;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    body = await res.json();
  } catch (err) {
    warn(`could not reach Facebook (${err.message})`);
    return null;
  }

  if (!body || body.error || !Array.isArray(body.data)) {
    const e = body?.error ?? {};
    warn(
      `Facebook returned an error (${e.type || "unknown"} ${e.code ?? ""}: ` +
        `${e.message || "no data"}). If the token expired, create a new one ` +
        `(README, "Facebook news")`,
    );
    return null;
  }
  return body.data;
}

/**
 * Downloads one post photo into public/news/fb/<name>.<ext>.
 * Returns its public path ("/news/fb/<name>.jpg"), or undefined when the URL
 * isn't http(s), the file isn't an image, is bigger than 5 MB, or the
 * download fails or times out. A missing photo never stops the build.
 */
async function downloadImage(url, name) {
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return undefined;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(IMAGE_TIMEOUT_MS),
    });
    const type = (res.headers.get("content-type") || "").split(";")[0].trim();
    const ext = IMAGE_EXT[type];
    const declaredSize = Number(res.headers.get("content-length") || 0);
    if (!res.ok || !ext || declaredSize > MAX_IMAGE_BYTES) {
      await res.body?.cancel();
      return undefined;
    }
    const data = Buffer.from(await res.arrayBuffer());
    if (data.length > MAX_IMAGE_BYTES) return undefined;
    await fs.writeFile(path.join(IMG_DIR, `${name}.${ext}`), data);
    return `/news/fb/${name}.${ext}`;
  } catch {
    return undefined;
  }
}

/** Fetches the posts, downloads their photos and writes the news file. */
async function main() {
  // Start from an empty photo folder so deleted posts don't leave old files.
  await fs.rm(IMG_DIR, { recursive: true, force: true });
  await fs.mkdir(IMG_DIR, { recursive: true });

  const token = process.env.FB_PAGE_TOKEN;
  if (!token) {
    console.warn("FB_PAGE_TOKEN is not set: skipping Facebook news.");
    return writeNews([]);
  }

  const posts = await fetchPosts(token);
  if (!posts) return writeNews([]);

  const items = [];
  for (const post of posts) {
    if (items.length >= MAX_POSTS) break;
    // Check the text first, so photos of skipped posts aren't downloaded.
    if (!post || !toNewsItem(post)) continue;
    const image = await downloadImage(
      post.full_picture,
      imageFileName(post.id),
    );
    items.push(toNewsItem(post, image));
  }

  await writeNews(items);
  const photos = items.filter((item) => item.image).length;
  console.log(`Facebook news: ${items.length} posts, ${photos} photos.`);
}

await main();
