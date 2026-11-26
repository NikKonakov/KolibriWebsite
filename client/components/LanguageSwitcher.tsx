import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageContext";
import { dictionaries } from "@/i18n/translations";
import { LANGS, LANG_PATH, storeLang } from "@/i18n/detect";

/**
 * RU | EN toggle. Plain links, so each language is its own page that Google
 * can index; clicking one also remembers the choice (see LanguageSuggestion).
 * Screen readers hear each language's own name ("Русский", "English").
 */
export default function LanguageSwitcher() {
  const { t, lang } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className="flex rounded-full bg-kolibri-chip p-[3px] text-[13px] font-semibold"
    >
      {LANGS.map((l) => (
        <a
          key={l}
          href={LANG_PATH[l]}
          hrefLang={l}
          lang={l}
          aria-label={dictionaries[l].langName}
          aria-current={l === lang ? "page" : undefined}
          onClick={() => storeLang(l)}
          className={cn(
            "flex min-h-[32px] items-center rounded-full px-[11px] uppercase no-underline transition-colors",
            l === lang
              ? "bg-kolibri-ink text-white"
              : "text-kolibri-ink hover:bg-white",
          )}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
