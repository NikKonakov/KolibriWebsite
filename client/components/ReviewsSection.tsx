import ExternalLink from "./ExternalLink";
import ReviewCard from "./ReviewCard";
import SectionCard from "./SectionCard";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

/** Avatar colors, given to reviews in turn (fixed, so prerender and browser match). */
const gradients = [
  "from-brand-orange to-amber-400",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
];

/**
 * "Reviews": parents' reviews in a horizontally scrolling row, with a link
 * to all reviews in the school's Google profile. On the English page the
 * reviews are translated and say so.
 */
export default function ReviewsSection() {
  const { t } = useI18n();

  return (
    <SectionCard className="p-4 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-xl md:text-2xl text-black text-center font-medium">
          {t.reviews.heading}
        </h2>
        {t.reviews.note && (
          <p className="text-xs text-brand-text">{t.reviews.note}</p>
        )}
      </div>
      <div className="w-full flex items-stretch gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {t.reviews.items.map((review, index) => (
          <ReviewCard
            key={review.name}
            {...review}
            avatarColor={gradients[index % gradients.length]}
          />
        ))}
      </div>
      <ExternalLink
        href={school.google}
        className="text-sm md:text-base font-medium text-blue-700 underline-offset-4 hover:underline"
      >
        {t.reviews.googleLink} →
      </ExternalLink>
    </SectionCard>
  );
}
