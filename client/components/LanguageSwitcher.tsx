import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LanguageContext";
import { LANGS, LANG_PATH, storeLang } from "@/i18n/detect";

/** RU | EN toggle. Plain links, so each language is its own crawlable page. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-white/90 p-0.5 text-xs font-semibold shadow-sm",
        className,
      )}
      role="group"
      aria-label="Language / Язык"
    >
      {LANGS.map((l) => (
        <a
          key={l}
          href={LANG_PATH[l]}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "page" : undefined}
          onClick={() => storeLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            l === lang
              ? "bg-brand-dark text-white"
              : "text-brand-dark hover:bg-brand-orange/20",
          )}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
