import FeatureCard from "./FeatureCard";
import { GraduationCap, User, Lightbulb, Trophy, Heart } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

const icons = [
  { Icon: GraduationCap, gradient: "from-brand-orange to-amber-400" },
  { Icon: User, gradient: "from-blue-400 to-blue-600" },
  { Icon: Lightbulb, gradient: "from-green-300 to-green-500" },
  { Icon: Trophy, gradient: "from-red-400 to-red-600" },
  { Icon: Heart, gradient: "from-purple-400 to-purple-600" },
];

export default function WhyUsSection() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.featuresLabel}
      className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-5 border border-black/25 rounded-xl bg-white"
    >
      <div className="flex items-stretch gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {t.features.map((feature, index) => {
          const { Icon, gradient } = icons[index % icons.length];
          return (
            <FeatureCard
              key={index}
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
    </section>
  );
}
