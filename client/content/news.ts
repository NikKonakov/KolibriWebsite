import type { Lang } from "@/i18n/detect";

/**
 * News cards shown in the "News" section, newest first.
 *
 * To add a post: copy it from Facebook, add an entry at the top, and redeploy.
 * Text here is indexed by Google, unlike the old Facebook widget.
 *
 * Example:
 * {
 *   date: "2026-09-06",
 *   title: { ru: "Начало учебного года", en: "The school year starts" },
 *   text: { ru: "Ждём всех в субботу…", en: "See you all on Saturday…" },
 *   image: "/news/2026-09-06.webp", // optional, put the file in /public/news/
 *   link: "https://www.facebook.com/…", // optional, link to the original post
 * },
 */
export interface NewsItem {
  /** ISO date, e.g. "2026-09-06" */
  date: string;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  image?: string;
  link?: string;
}

export const news: NewsItem[] = [];
