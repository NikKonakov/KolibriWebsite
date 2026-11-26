import {
  ArrowRight,
  CalendarDays,
  Layers,
  MapPin,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";
import { buttonClass } from "@/lib/button";

/** Photo shown next to the headline (also part of the gallery). */
const HERO_PHOTO = {
  src: "/gallery/concert-stage.webp",
  width: 1024,
  height: 626,
};

/**
 * First screen: who the school is for, the main call to action, a stage
 * photo with the logo, and four key facts (schedule, ages, levels, area).
 * The page's only <h1> is here.
 */
export default function Hero() {
  const { t } = useI18n();
  const f = t.hero.facts;
  const facts: { Icon: LucideIcon; value: string; label: string }[] = [
    { Icon: CalendarDays, ...f.schedule },
    { Icon: Users, ...f.ages },
    { Icon: Layers, ...f.levels },
    { Icon: MapPin, value: f.area, label: school.address.street },
  ];

  return (
    <section id="top" className="px-4 pb-14 pt-12">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <p className="self-start rounded-full bg-kolibri-teal-soft px-3 py-1.5 text-sm font-semibold text-kolibri-teal-dark">
            {t.hero.kicker}
          </p>
          <h1 className="font-display text-[34px] font-black leading-[1.08] tracking-[-0.01em] md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="max-w-[34em] text-lg text-kolibri-muted">
            {t.hero.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className={buttonClass(
                "primary",
                "min-h-[52px] px-[22px] text-[17px]",
              )}
            >
              {t.hero.cta}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={school.phoneHref}
              className={buttonClass("outline", "min-h-[52px]")}
            >
              <Phone aria-hidden="true" className="h-[18px] w-[18px]" />
              {school.phone}
            </a>
          </div>
        </div>

        <div className="relative min-w-0 flex-[1_1_320px] pb-6">
          <img
            src={HERO_PHOTO.src}
            alt={t.hero.photoAlt}
            width={HERO_PHOTO.width}
            height={HERO_PHOTO.height}
            className="aspect-[4/3] w-full rounded-[28px] object-cover"
          />
          <img
            src={school.logo}
            alt=""
            width={88}
            height={88}
            className="absolute bottom-0 left-5 h-[88px] w-[88px] rounded-full border-4 border-white object-cover shadow-[0_6px_20px_rgba(31,51,70,0.15)]"
          />
        </div>
      </div>

      <ul className="mx-auto mt-10 grid max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
        {facts.map(({ Icon, value, label }) => (
          <li
            key={value}
            className="flex flex-col gap-1 rounded-2xl bg-white p-4"
          >
            <Icon
              aria-hidden="true"
              className="h-[22px] w-[22px] text-kolibri-teal-icon"
            />
            <span className="font-display text-[19px] font-extrabold">
              {value}
            </span>
            <span className="text-sm text-kolibri-muted">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
