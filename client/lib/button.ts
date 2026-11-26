import { cn } from "./utils";

/**
 * Shared look of link-buttons ("Book a trial lesson", "Call", "Register"…).
 * Every variant keeps a touch target of at least 48 px and text that meets
 * WCAG AA contrast on its background, plus a visible keyboard focus ring.
 */
const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[14px] px-5 font-bold no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  /** Orange, dark text: the main call to action. */
  primary:
    "bg-kolibri-orange text-kolibri-ink hover:brightness-95 focus-visible:outline-kolibri-ink",
  /** White with a sand border: secondary action on light backgrounds. */
  outline:
    "border-[1.5px] border-kolibri-outline bg-white font-semibold text-kolibri-ink hover:border-kolibri-ink focus-visible:outline-kolibri-ink",
  /** Solid teal: library sign-in. */
  teal: "bg-kolibri-teal text-white hover:bg-kolibri-teal-dark focus-visible:outline-kolibri-teal",
  /** Teal border: library registration. */
  "teal-outline":
    "border-[1.5px] border-kolibri-teal text-kolibri-teal hover:bg-kolibri-teal-soft focus-visible:outline-kolibri-teal",
  /** WhatsApp green, dark text. */
  whatsapp:
    "bg-kolibri-whatsapp text-kolibri-whatsapp-ink hover:brightness-95 focus-visible:outline-white",
  /** Light border on the dark contact section. */
  "navy-outline":
    "border-[1.5px] border-kolibri-navy-outline font-semibold text-white hover:border-white focus-visible:outline-white",
} as const;

export type ButtonVariant = keyof typeof variants;

/**
 * Class names for a link styled as a button, e.g.
 * `<a href="#contact" className={buttonClass("primary")}>`.
 * Extra classes (size tweaks) can be passed as `className`.
 */
export function buttonClass(variant: ButtonVariant, className?: string) {
  return cn(base, variants[variant], className);
}
