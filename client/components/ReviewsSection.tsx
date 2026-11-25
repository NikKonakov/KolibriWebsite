import ReviewCard from "./ReviewCard";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

const gradients = [
  "from-brand-orange to-amber-400",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
];

export default function ReviewsSection() {
  const { t } = useI18n();

  return (
    <section className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white">
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
            key={index}
            {...review}
            avatarColor={gradients[index % gradients.length]}
          />
        ))}
      </div>
      <a
        href={school.google}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm md:text-base font-medium text-blue-700 underline-offset-4 hover:underline"
      >
        {t.reviews.googleLink} →
      </a>
    </section>
  );
}
