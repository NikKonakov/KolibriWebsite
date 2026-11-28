import type { Lang } from "@/i18n/detect";

export interface NewsItem {
  /** ISO date, e.g. "2026-09-06" */
  date: string;
  /** Optional headline: for Facebook posts, a short first line. */
  title?: Partial<Record<Lang, string>>;
  /**
   * Text per language. Posts imported from Facebook only have "ru", and a
   * one-line post has none: its line is the title.
   */
  text: Partial<Record<Lang, string>>;
  image?: string;
  link?: string;
}

/**
 * Posts from the school's Facebook Page, fetched at build time by
 * scripts/fetch-facebook-news.mjs. The file is missing in dev until you run
 * `pnpm news` with FB_PAGE_TOKEN set; the list is then simply empty.
 */
const generated = import.meta.glob<NewsItem[]>("./news.generated.json", {
  eager: true,
  import: "default",
});
const fromFacebook: NewsItem[] = Object.values(generated)[0] ?? [];

/**
 * News added by hand (optional), e.g. an announcement that isn't on Facebook.
 *
 * {
 *   date: "2026-09-06",
 *   title: { ru: "Начало учебного года", en: "The school year starts" },
 *   text: { ru: "Ждём всех в субботу…", en: "See you all on Saturday…" },
 *   image: "/news/2026-09-06.webp", // optional, put the file in /public/news/
 *   link: "https://www.facebook.com/…", // optional
 * },
 */
const manualNews: NewsItem[] = [];

/** Newest first, at most 6 cards. */
export const news: NewsItem[] = [...manualNews, ...fromFacebook]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 6);
