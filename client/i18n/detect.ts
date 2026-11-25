/**
 * Language basics: the two site languages, their URLs, and how the visitor's
 * preferred language is detected and remembered.
 */

export type Lang = "ru" | "en";

/** Every language the site is published in, in menu order. */
export const LANGS: Lang[] = ["ru", "en"];

/** URL path of each language version. */
export const LANG_PATH: Record<Lang, string> = { ru: "/", en: "/en/" };

/** localStorage key that remembers the visitor's explicit language choice. */
export const LANG_STORAGE_KEY = "kolibri-lang";

/**
 * Languages whose speakers usually read Russian comfortably.
 * Visitors with any of these in their browser list are not offered English.
 */
const READS_RUSSIAN = ["ru", "uk", "be", "kk", "ky", "uz", "tg"];

/** Language part of a browser language tag: "en-CA" → "en", "ru_RU" → "ru". */
const baseCode = (tag: string) => tag.toLowerCase().split(/[-_]/)[0];

/**
 * Which other language version to offer, based on the browser's language list.
 * Returns null when the current page already suits the visitor.
 *
 * - Russian page: offer English only if nothing in the list reads Russian.
 *   Many Russian-speaking parents in Canada run their phones in English,
 *   so a single "ru" anywhere in the list keeps them on the Russian page.
 * - English page: offer Russian only if the visitor's first language reads Russian.
 */
export function suggestLanguage(
  pageLang: Lang,
  browserLanguages: readonly string[],
): Lang | null {
  const codes = browserLanguages.filter(Boolean).map(baseCode);
  if (codes.length === 0) return null;

  if (pageLang === "ru") {
    return codes.some((c) => READS_RUSSIAN.includes(c)) ? null : "en";
  }
  return READS_RUSSIAN.includes(codes[0]) ? "ru" : null;
}

/**
 * The language the visitor picked earlier with the RU/EN switcher, or null.
 * Anything other than "ru"/"en" in storage is ignored, and private browsing
 * modes that block storage simply return null.
 */
export function readStoredLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "ru" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

/** Remembers the visitor's language choice in this browser. */
export function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Private mode or blocked storage: the choice just isn't remembered.
  }
}
