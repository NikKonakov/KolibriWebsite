import { Facebook, Instagram } from "lucide-react";
import ExternalLink from "./ExternalLink";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

/** Copyright year, fixed at build time so prerendered HTML and browser agree. */
const YEAR = __BUILD_YEAR__;

const columnClass = "flex flex-col items-start gap-3 w-full md:w-1/3";
const headingClass = "text-xl md:text-2xl text-brand-orange font-semibold mb-1";
const socialIconClass =
  "w-10 h-10 rounded-full flex items-center justify-center";

/**
 * Dark page footer in three columns: about the school, contacts (phone,
 * email, address with a map link) and social networks; then the copyright.
 */
export default function Footer() {
  const { t } = useI18n();
  const a = school.address;

  return (
    <footer className="w-full bg-brand-dark py-12">
      <div className="max-w-[345px] lg:max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        <div className={columnClass}>
          <h2 className={headingClass}>{t.footer.aboutTitle}</h2>
          <p className="text-sm md:text-base text-white font-normal leading-relaxed">
            {t.footer.aboutText}
          </p>
        </div>

        <div className={columnClass}>
          <h2 className={headingClass}>{t.footer.contactsTitle}</h2>
          <address className="flex flex-col gap-2 text-sm md:text-base text-white font-normal not-italic">
            <p>
              📞 {t.footer.phone}:{" "}
              <a
                href={school.phoneHref}
                className="hover:text-brand-orange transition-colors"
              >
                {school.phone}
              </a>
            </p>
            <p>
              📧 {t.footer.email}:{" "}
              <a
                href={`mailto:${school.email}`}
                className="hover:text-brand-orange transition-colors"
              >
                {school.email}
              </a>
            </p>
            <p className="break-words">
              📍 {t.footer.address}:
              <br />
              {a.street}
              <br />
              {a.unit}
              <br />
              {a.city}, {a.region} {a.postalCode}
              <br />
              <ExternalLink
                href={school.google}
                className="inline-block pt-1 text-brand-orange underline-offset-4 hover:underline"
              >
                {t.footer.mapLink} →
              </ExternalLink>
            </p>
          </address>
        </div>

        <div className={columnClass}>
          <h2 className={headingClass}>{t.footer.socialTitle}</h2>
          <div className="flex items-center gap-4 py-1">
            <ExternalLink
              href={school.facebook}
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <div className={`${socialIconClass} bg-blue-600`}>
                <Facebook className="w-6 h-6 text-white" />
              </div>
            </ExternalLink>
            {school.instagram && (
              <ExternalLink
                href={school.instagram}
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <div
                  className={`${socialIconClass} bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500`}
                >
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </ExternalLink>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[345px] lg:max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-white/20">
        <p className="text-sm text-white/70 text-center">
          © {YEAR} {t.footer.schoolName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
