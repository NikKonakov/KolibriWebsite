import { ExternalLink, Facebook } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import { news } from "@/content/news";
import { school } from "@/content/school";

/**
 * Replaces the Facebook Page Plugin, which broke because:
 * - it only embeds Facebook Pages, and often fails for profile.php?id= links;
 * - its SDK version (v18) has expired;
 * - Safari, Firefox and ad blockers block it by default.
 * News now lives in content/news.ts: it always loads and Google can index it.
 */
export default function NewsSection() {
  const { t, lang } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section
      id="news"
      className="w-full max-w-[345px] lg:max-w-4xl mx-auto flex flex-col items-center gap-4 rounded-xl border border-black/[0.17] bg-white p-6 scroll-mt-20"
    >
      <h2 className="text-xl md:text-2xl text-brand-dark text-center font-medium">
        {t.news.heading}
      </h2>

      {news.length > 0 && (
        <div className="grid w-full gap-4 md:grid-cols-2">
          {news.map((item) => (
            <article
              key={item.date + item.title.ru}
              className="flex flex-col overflow-hidden rounded-xl border border-black/10 bg-brand-light"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col gap-2 p-4">
                <time
                  dateTime={item.date}
                  className="text-xs font-medium uppercase tracking-wide text-brand-text"
                >
                  {dateFormat.format(new Date(item.date))}
                </time>
                <h3 className="text-base md:text-lg font-semibold text-brand-dark">
                  {item.title[lang]}
                </h3>
                <p className="text-sm text-brand-dark leading-relaxed whitespace-pre-line">
                  {item.text[lang]}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-blue-700 hover:underline"
                  >
                    {t.news.readMore}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-blue-50 p-5 text-center">
        <p className="text-sm md:text-base text-brand-dark">
          {t.news.followText}
        </p>
        <a
          href={school.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm md:text-base font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Facebook className="h-5 w-5" />
          {t.news.followButton}
        </a>
      </div>
    </section>
  );
}
