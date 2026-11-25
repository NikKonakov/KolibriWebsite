import { ExternalLink as ExternalLinkIcon, Facebook } from "lucide-react";
import ExternalLink from "./ExternalLink";
import SectionCard from "./SectionCard";
import { useI18n } from "@/i18n/LanguageContext";
import { news, type NewsItem } from "@/content/news";
import { school } from "@/content/school";
import type { Lang } from "@/i18n/detect";

/**
 * "News": the latest posts from the school's Facebook Page, imported at build
 * time (scripts/fetch-facebook-news.mjs), plus a button to the Page.
 *
 * Replaces Facebook's embed widget, which stopped showing posts (expired SDK
 * version, blocked by Safari/Firefox and ad blockers). These cards always
 * load, and Google can index their text.
 */
export default function NewsSection() {
  const { t, lang } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(
    lang === "ru" ? "ru-RU" : "en-CA",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );
  // Facebook posts are in Russian only; the English page says so once.
  const showLanguageNote =
    Boolean(t.news.otherLanguageNote) && news.some((item) => !item.text[lang]);

  return (
    <SectionCard id="news" className="p-6 flex flex-col items-center gap-4">
      <h2 className="text-xl md:text-2xl text-brand-dark text-center font-medium">
        {t.news.heading}
      </h2>

      {showLanguageNote && (
        <p className="-mt-2 text-xs text-brand-text">
          {t.news.otherLanguageNote}
        </p>
      )}

      {news.length > 0 && (
        <div className="grid w-full gap-4 md:grid-cols-2">
          {news.map((item, index) => (
            <NewsCard
              key={item.date + index}
              item={item}
              lang={lang}
              date={dateFormat.format(new Date(item.date))}
              readMore={t.news.readMore}
            />
          ))}
        </div>
      )}

      <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-blue-50 p-5 text-center">
        <p className="text-sm md:text-base text-brand-dark">
          {t.news.followText}
        </p>
        <ExternalLink
          href={school.facebook}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm md:text-base font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Facebook className="h-5 w-5" />
          {t.news.followButton}
        </ExternalLink>
      </div>
    </SectionCard>
  );
}

/**
 * One news card: photo, date, optional title, the start of the text and a
 * link to the full post. Text missing in the page language is shown in
 * Russian and marked with lang="ru" for screen readers.
 */
function NewsCard({
  item,
  lang,
  date,
  readMore,
}: {
  item: NewsItem;
  lang: Lang;
  date: string;
  readMore: string;
}) {
  const textLang: Lang = item.text[lang] ? lang : "ru";
  const title = item.title?.[textLang];

  return (
    <article
      lang={textLang !== lang ? textLang : undefined}
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
          {date}
        </time>
        {title && (
          <h3 className="text-base md:text-lg font-semibold text-brand-dark">
            {title}
          </h3>
        )}
        <p className="line-clamp-6 text-sm text-brand-dark leading-relaxed whitespace-pre-line">
          {item.text[textLang]}
        </p>
        {item.link && (
          <ExternalLink
            href={item.link}
            className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-blue-700 hover:underline"
          >
            {readMore}
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
