import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

/**
 * Uses native <details> instead of a JS accordion: the text of closed items
 * stays in the HTML, so Google indexes the full program descriptions.
 */
export default function ProgramsSection() {
  const { t } = useI18n();

  return (
    <section
      id="programs"
      className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white scroll-mt-20"
    >
      <h2 className="text-xl md:text-2xl text-brand-dark text-center font-medium">
        {t.programs.heading}
      </h2>
      <div className="w-full">
        {t.programs.items.map((program, index) => (
          <details key={index} className="group border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base md:text-lg text-brand-dark font-medium hover:underline [&::-webkit-details-marker]:hidden">
              <h3>{program.title}</h3>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="pb-4 text-sm md:text-base text-brand-text font-normal whitespace-pre-wrap leading-relaxed">
              {program.content}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
