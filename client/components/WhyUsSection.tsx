import { GraduationCap, User, Lightbulb, Trophy, Heart } from "lucide-react";
import FeatureCard from "./FeatureCard";
import SectionCard from "./SectionCard";
import { useI18n } from "@/i18n/LanguageContext";

/** Icon and color for each feature, in the order of `features` in translations.ts. */
const icons = [
  { Icon: GraduationCap, gradient: "from-brand-orange to-amber-400" },
  { Icon: User, gradient: "from-blue-400 to-blue-600" },
  { Icon: Lightbulb, gradient: "from-green-300 to-green-500" },
  { Icon: Trophy, gradient: "from-red-400 to-red-600" },
  { Icon: Heart, gradient: "from-purple-400 to-purple-600" },
];

/**
 * "Why Kolibri" section: a horizontally scrolling row of five feature cards
 * (teachers, individual approach, creative methods, talents, atmosphere).
 */
export default function WhyUsSection() {
  const { t } = useI18n();

  return (
    <SectionCard label={t.featuresLabel} className="p-5">
      <div className="flex items-stretch gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {t.features.map((feature, index) => {
          const { Icon, gradient } = icons[index % icons.length];
          return (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={
                <div
                  className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} rounded-full`}
                >
                  <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
              }
            />
          );
        })}
      </div>
    </SectionCard>
  );
}
