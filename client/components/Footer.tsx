import ExternalLink from "./ExternalLink";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

/** Copyright year, fixed at build time so prerendered HTML and browser agree. */
const YEAR = __BUILD_YEAR__;

const linkClass =
  "font-semibold text-kolibri-gold no-underline hover:underline";

/**
 * Slim dark footer: copyright and links to the school's social pages
 * (Instagram appears once a real account is set in content/school.ts).
 */
export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-kolibri-navy-deep px-4 py-6 text-sm text-kolibri-on-navy">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3">
        <p>
          © {YEAR} {t.footer.copyright}
        </p>
        <div className="flex gap-4">
          <ExternalLink href={school.facebook} className={linkClass}>
            Facebook
          </ExternalLink>
          {school.instagram && (
            <ExternalLink href={school.instagram} className={linkClass}>
              Instagram
            </ExternalLink>
          )}
        </div>
      </div>
    </footer>
  );
}
