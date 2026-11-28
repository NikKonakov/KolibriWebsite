import { ArrowRight, Facebook } from "lucide-react";
import ExternalLink from "./ExternalLink";
import Section from "./Section";
import { useI18n } from "@/i18n/LanguageContext";
import { news, type NewsItem } from "@/content/news";
import { school } from "@/content/school";
import { buttonClass } from "@/lib/button";
import type { Lang } from "@/i18n/detect";

/**
 * "News": the latest posts from the school's Facebook Page, imported at build
 * time (scripts/fetch-facebook-news.mjs), plus a link to the Page. When no
 * posts were imported (e.g. no token yet), it shows a short note and the
 * Facebook button instead of empty space.
 */
export default function NewsSection() {
  const { t, lang } = useI18n();
  const dateFormat = new Intl.DateTimeFormat(
    lang === "ru" ? "ru-RU" : "en-CA",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );
  // Facebook posts are in Russian only; the English page says so once.
  const languageNote = news.some((item) => !hasLanguage(item, lang))
    ? t.news.otherLanguageNote
    : undefined;

  const allNewsLink = (
    <ExternalLink
      href={school.facebook}
      className="inline-flex min-h-[44px] items-center gap-1.5 font-bold text-kolibri-teal no-underline hover:underline"
    >
      <Facebook aria-hidden="true" className="h-[18px] w-[18px]" />
      {t.news.allNews}
    </ExternalLink>
  );

  return (
    <Section
      id="news"
      tone="cream"
      title={t.news.heading}
      intro={languageNote}
      action={news.length > 0 ? allNewsLink : undefined}
    >
      {news.length > 0 ? (
        // Up to 6 posts: 3 + 3 on desktop, 2 + 2 + 2 on tablets, so no row is half empty.
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <li key={item.date + index} className="flex">
              <NewsCard
                item={item}
                lang={lang}
                date={dateFormat.format(new Date(item.date))}
                readMore={t.news.readMore}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[20px] bg-white p-6">
          <p className="text-[17px] text-kolibri-body">{t.news.emptyText}</p>
          <ExternalLink href={school.facebook} className={buttonClass("teal")}>
            <Facebook aria-hidden="true" className="h-[18px] w-[18px]" />
            {t.news.allNews}
          </ExternalLink>
        </div>
      )}
    </Section>
  );
}

/** True when the post has a title or text in the given language. */
function hasLanguage(item: NewsItem, lang: Lang): boolean {
  return Boolean(item.title?.[lang] || item.text[lang]);
}

/**
 * One news card: photo, date, optional title, the start of the text and a
 * link to the full post. A one-line post has a title and no text. Words
 * missing in the page language are shown in Russian and marked lang="ru" so
 * screen readers pronounce them correctly.
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
  const textLang: Lang = hasLanguage(item, lang) ? lang : "ru";
  const title = item.title?.[textLang];
  const text = item.text[textLang];

  return (
    <article
      lang={textLang !== lang ? textLang : undefined}
      className="flex w-full flex-col overflow-hidden rounded-[20px] border border-kolibri-line bg-white"
    >
      {item.image && (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
        <time
          dateTime={item.date}
          className="text-[13px] font-semibold text-kolibri-muted"
        >
          {date}
        </time>
        {title && (
          <h3 className="font-display text-lg font-extrabold leading-snug">
            {title}
          </h3>
        )}
        {text && (
          <p className="line-clamp-6 whitespace-pre-line text-[15px] text-kolibri-muted">
            {text}
          </p>
        )}
        {item.link && (
          <ExternalLink
            href={item.link}
            className="mt-auto inline-flex min-h-[44px] items-center gap-1 pt-2 text-sm font-bold text-kolibri-teal no-underline hover:underline"
          >
            {readMore}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
