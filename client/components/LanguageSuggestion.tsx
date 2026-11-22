import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import { dictionaries } from "@/i18n/translations";
import {
  LANG_PATH,
  readStoredLang,
  storeLang,
  suggestLanguage,
  type Lang,
} from "@/i18n/detect";

/**
 * Detects the visitor's system language.
 * - A language they picked before is restored automatically.
 * - Otherwise a small banner offers the other version; nothing is forced,
 *   so Google can crawl both versions and Russian speakers whose phones run
 *   in English are not pushed away from the Russian page.
 */
export default function LanguageSuggestion() {
  const { lang } = useI18n();
  const [offer, setOffer] = useState<Lang | null>(null);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== lang) {
      window.location.replace(LANG_PATH[stored] + window.location.hash);
      return;
    }
    if (stored) return;

    const browserLangs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    setOffer(suggestLanguage(lang, browserLangs));
  }, [lang]);

  if (!offer) return null;
  const copy = dictionaries[offer].languageOffer;

  return (
    <div
      lang={offer}
      role="region"
      aria-label={copy.text}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-md items-center gap-3 rounded-xl bg-brand-dark px-4 py-3 text-sm text-white shadow-xl"
    >
      <p className="flex-1">{copy.text}</p>
      <a
        href={LANG_PATH[offer]}
        hrefLang={offer}
        onClick={() => storeLang(offer)}
        className="whitespace-nowrap rounded-md bg-brand-orange px-3 py-1.5 font-semibold text-brand-dark hover:bg-brand-orange/90"
      >
        {copy.action}
      </a>
      <button
        type="button"
        onClick={() => {
          storeLang(lang);
          setOffer(null);
        }}
        className="rounded-md p-1 text-white/70 hover:text-white"
        aria-label={copy.close}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
