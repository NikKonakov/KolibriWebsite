import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Background of a full-width section; alternating tones separate sections. */
export type SectionTone = "cream" | "white" | "teal" | "sand";

const toneClass: Record<SectionTone, string> = {
  cream: "bg-kolibri-cream",
  white: "bg-white",
  teal: "bg-kolibri-teal-bg",
  sand: "bg-kolibri-sand",
};

interface SectionProps {
  /** Anchor for menu links ("#levels"); also names the section for screen readers. */
  id: string;
  tone?: SectionTone;
  title: string;
  /** Optional line under the title. */
  intro?: string;
  /** Optional element on the right of the title, e.g. "All news" link. */
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Full-width page section with a centered content column, a heading and an
 * optional intro. The heading labels the section (aria-labelledby), so screen
 * reader users can jump between sections by name.
 */
export default function Section({
  id,
  tone = "cream",
  title,
  intro,
  action,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-4 px-4 py-14 md:py-16", toneClass[tone])}
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex max-w-[40em] flex-col gap-2">
            <h2
              id={titleId}
              className="font-display text-[28px] font-black leading-tight md:text-[34px]"
            >
              {title}
            </h2>
            {intro && <p className="text-[17px] text-kolibri-muted">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
