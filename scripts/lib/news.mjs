/**
 * Pure helpers that turn Facebook Page posts into news cards.
 * No network or file access here, so all of it is unit-tested (news.spec.mjs).
 * The script that downloads posts is scripts/fetch-facebook-news.mjs.
 */

/** Longest post text kept on a card; the full post is one click away. */
export const MAX_TEXT = 600;

/** Longest first line that still reads as a headline. */
const MAX_TITLE = 100;

const CALGARY_DATE = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Edmonton",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Converts Facebook's UTC timestamp ("2026-11-23T01:01:23+0000") to the
 * school's local calendar day in Calgary ("2026-11-22"), so an evening post
 * isn't dated tomorrow.
 * @param {string} fbTime
 * @returns {string | undefined} "YYYY-MM-DD", or undefined if unreadable
 */
export function localDate(fbTime) {
  // "+0000" → "+00:00" so every JavaScript engine parses it as ISO 8601.
  const date = new Date(fbTime.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
  return Number.isNaN(date.getTime()) ? undefined : CALGARY_DATE.format(date);
}

/**
 * Removes blank lines between paragraphs: they waste space in a short card.
 * @param {string} text
 * @returns {string}
 */
export function collapseBlankLines(text) {
  return text.trim().replace(/\n\s*\n+/g, "\n");
}

/**
 * Uses a post's first line as the card title when it's short, as in
 * "«Стихи с чаем» — поэтическая встреча"; the rest becomes the text.
 * A post that is one short line ("Встреча с поэзией — 29 ноября!") is all
 * headline: it gets the title style and an empty text, instead of looking
 * like a small grey note next to cards that have titles.
 * @param {string} message
 * @returns {{ title?: string, text: string }}
 */
export function splitTitle(message) {
  const [first, ...rest] = message.split("\n");
  const head = first.trim();
  if (head.length > MAX_TITLE) return { text: message };
  return { title: head, text: rest.join("\n").trim() };
}

/** Splits text into user-perceived characters (emoji included). */
const CHARACTERS = new Intl.Segmenter("ru", { granularity: "grapheme" });

/**
 * Returns the longest start of `text` that is at most `limit` code units long
 * and ends between two whole characters. An emoji such as 👨‍👩‍👧 is 8 code
 * units; slicing through it would leave a broken symbol (�) on the card.
 * @param {string} text
 * @param {number} limit
 * @returns {string}
 */
function wholeCharsPrefix(text, limit) {
  let end = 0;
  for (const { index, segment } of CHARACTERS.segment(text)) {
    const next = index + segment.length;
    if (next > limit) break;
    end = next;
  }
  return text.slice(0, end);
}

/**
 * Shortens text longer than `max` at a word boundary and adds "…".
 * Never cuts an emoji or any other character in half.
 * @param {string} text
 * @param {number} [max]
 * @returns {string}
 */
export function shorten(text, max = MAX_TEXT) {
  if (text.length <= max) return text;
  const lastSpace = text.slice(0, max).lastIndexOf(" ");
  const end = Math.max(lastSpace, max - 40);
  return wholeCharsPrefix(text, end).trimEnd() + "…";
}

/**
 * Returns the value only if it's a valid https:// URL, otherwise undefined.
 * Links on the page come from a third party (Facebook), so a malformed or
 * "javascript:" value must never reach an href.
 * @param {unknown} value
 * @returns {string | undefined}
 */
export function safeHttpsUrl(value) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Builds a safe file name for a post's photo from the post id
 * ("1887413264861702_2310195109776155"): only digits and underscores survive,
 * so the name can never point outside the photo folder.
 * @param {unknown} id
 * @returns {string}
 */
export function imageFileName(id) {
  return String(id).replace(/[^0-9_]/g, "") || "post";
}

/**
 * Turns one Graph API post into a news item for client/content/news.ts.
 * Returns null for posts that can't become a card (no text or no valid date),
 * e.g. a photo-only post.
 * @param {{ message?: unknown, created_time?: unknown, permalink_url?: unknown }} post
 * @param {string} [image] public path of the downloaded photo
 */
export function toNewsItem(post, image) {
  if (typeof post.message !== "string" || !post.message.trim()) return null;
  if (typeof post.created_time !== "string") return null;
  const date = localDate(post.created_time);
  if (!date) return null;

  const { title, text } = splitTitle(collapseBlankLines(post.message));
  const link = safeHttpsUrl(post.permalink_url);
  return {
    date,
    ...(title && { title: { ru: title } }),
    // A one-line post is all title: its text stays empty.
    text: text ? { ru: shorten(text) } : {},
    ...(image && { image }),
    ...(link && { link }),
  };
}
