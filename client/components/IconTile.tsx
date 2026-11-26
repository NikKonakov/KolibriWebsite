import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Rounded square with a soft orange or teal background holding a line icon.
 * Used by the feature, program and library cards. The icon is decorative:
 * the card's title says the same thing in words.
 */
export default function IconTile({
  icon: Icon,
  tone,
}: {
  icon: LucideIcon;
  tone: "orange" | "teal";
}) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]",
        tone === "orange" ? "bg-kolibri-orange-soft" : "bg-kolibri-teal-soft",
      )}
    >
      <Icon aria-hidden="true" className="h-6 w-6 text-kolibri-ink" />
    </span>
  );
}
