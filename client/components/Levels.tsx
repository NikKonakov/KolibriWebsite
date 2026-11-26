import Section from "./Section";
import { useI18n } from "@/i18n/LanguageContext";
import type { LevelId } from "@/i18n/translations";
import { cn } from "@/lib/utils";

/** Levels in teaching order; texts come from translations.ts. */
const LEVELS: LevelId[] = ["first", "speak", "masters", "rfl"];

/**
 * "Class levels": four cards from "First steps" to Russian as a foreign
 * language. An ordered list, so screen readers announce the sequence.
 */
export default function Levels() {
  const { t } = useI18n();

  return (
    <Section
      id="levels"
      tone="cream"
      title={t.levels.heading}
      intro={t.levels.intro}
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LEVELS.map((id) => {
          const level = t.levels.items[id];
          const isForeignLanguage = id === "rfl";
          return (
            <li
              key={id}
              className="flex flex-col gap-2.5 rounded-[20px] border border-kolibri-line bg-white p-[22px]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full font-display font-black",
                  isForeignLanguage
                    ? "bg-kolibri-teal-badge text-xs text-kolibri-teal-dark"
                    : "bg-kolibri-orange",
                )}
              >
                {level.badge}
              </span>
              <h3 className="font-display text-[19px] font-extrabold">
                {level.title}
              </h3>
              <p className="text-[15px] text-kolibri-muted">{level.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
