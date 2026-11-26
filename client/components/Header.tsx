import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";
import { buttonClass } from "@/lib/button";

/** In-page sections linked from the menu, in page order. */
const MENU = ["directions", "levels", "news", "contact"] as const;

/**
 * Page header: logo and school name (link to the top), the RU/EN switcher,
 * the "Trial lesson" button and a menu of in-page sections. On phones the
 * menu scrolls sideways instead of wrapping. Smooth scrolling comes from CSS
 * (global.css), so the links work without JavaScript.
 */
export default function Header() {
  const { t } = useI18n();

  return (
    <header className="border-b border-kolibri-line bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-kolibri-ink no-underline"
        >
          {/* Decorative: the name next to it already says "Kolibri". */}
          <img
            src={school.logo}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border-2 border-kolibri-orange object-cover"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[22px] font-black">
              {t.header.brand}
            </span>
            <span className="text-xs text-kolibri-muted">
              {t.header.subtitle}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <a
            href="#contact"
            className={buttonClass("primary", "min-h-[44px] px-4 text-[15px]")}
          >
            {t.header.trialCta}
          </a>
        </div>
      </div>

      <nav
        aria-label={t.header.navLabel}
        className="overflow-x-auto border-t border-kolibri-chip"
      >
        <ul className="mx-auto flex w-max gap-1 px-2 text-[14px] font-semibold md:text-[15px]">
          {MENU.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block px-2.5 py-3 text-kolibri-ink no-underline hover:text-kolibri-teal md:px-3"
              >
                {t.header.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
