import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  /** Anchor for links like "#programs"; also lets the menu scroll here. */
  id?: string;
  /** Accessible name for sections that have no visible heading. */
  label?: string;
  /** Padding and layout of this particular section. */
  className?: string;
  children: ReactNode;
}

/**
 * White rounded card that frames each section of the home page, so all
 * sections share one width, border and background. `scroll-mt-20` keeps the
 * sticky header from covering the section title after a menu jump.
 */
export default function SectionCard({
  id,
  label,
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "w-full max-w-[345px] lg:max-w-4xl mx-auto scroll-mt-20 rounded-xl border border-black/25 bg-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
