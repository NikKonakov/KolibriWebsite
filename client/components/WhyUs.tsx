import {
  GraduationCap,
  Heart,
  Lightbulb,
  Star,
  User,
  type LucideIcon,
} from "lucide-react";
import IconTile from "./IconTile";
import Section from "./Section";
import { useI18n } from "@/i18n/LanguageContext";
import type { FeatureId } from "@/i18n/translations";

/** Icon and tile color of each feature; texts come from translations.ts. */
const FEATURES: { id: FeatureId; Icon: LucideIcon; tone: "orange" | "teal" }[] =
  [
    { id: "teachers", Icon: GraduationCap, tone: "orange" },
    { id: "individual", Icon: User, tone: "teal" },
    { id: "creative", Icon: Lightbulb, tone: "orange" },
    { id: "talents", Icon: Star, tone: "teal" },
    { id: "atmosphere", Icon: Heart, tone: "orange" },
  ];

/** "Why parents choose Kolibri": five short reasons with icons. */
export default function WhyUs() {
  const { t } = useI18n();

  return (
    <Section
      id="why"
      tone="white"
      title={t.whyUs.heading}
      intro={t.whyUs.intro}
    >
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
        {FEATURES.map(({ id, Icon, tone }) => (
          <li key={id} className="flex flex-col gap-2.5">
            <IconTile icon={Icon} tone={tone} />
            <h3 className="font-display text-lg font-extrabold leading-tight">
              {t.whyUs.items[id].title}
            </h3>
            <p className="text-[15px] text-kolibri-muted">
              {t.whyUs.items[id].text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
