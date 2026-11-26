import { ArrowRight } from "lucide-react";
import ExternalLink from "./ExternalLink";
import Section from "./Section";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

/**
 * "What parents say": parents' reviews as quote cards, with a link to all
 * reviews in the school's Google profile. On the English page the reviews
 * are translations, and the intro line says so.
 */
export default function ReviewsSection() {
  const { t } = useI18n();

  return (
    <Section
      id="reviews"
      tone="sand"
      title={t.reviews.heading}
      intro={t.reviews.note}
    >
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {t.reviews.items.map((item) => (
          <li key={item.name} className="flex">
            <figure className="flex w-full flex-col gap-3 rounded-[20px] bg-white p-6">
              <span
                aria-hidden="true"
                className="font-display text-5xl font-black leading-[0.6] text-kolibri-orange-deep"
              >
                “
              </span>
              <blockquote className="text-base">{item.review}</blockquote>
              <figcaption className="mt-auto text-[15px] font-bold">
                {item.name}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <ExternalLink
        href={school.google}
        className="inline-flex min-h-[44px] items-center gap-1.5 self-start font-bold text-kolibri-teal no-underline hover:underline"
      >
        {t.reviews.googleLink}
        <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
      </ExternalLink>
    </Section>
  );
}
