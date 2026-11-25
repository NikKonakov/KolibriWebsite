import { Facebook, Instagram } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

/** Set at build time so the prerendered HTML and the browser agree. */
const YEAR = __BUILD_YEAR__;

export default function Footer() {
  const { t } = useI18n();
  const a = school.address;

  return (
    <footer className="w-full bg-brand-dark py-12">
      <div className="max-w-[345px] lg:max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h2 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            {t.footer.aboutTitle}
          </h2>
          <p className="text-sm md:text-base text-white font-normal leading-relaxed">
            {t.footer.aboutText}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h2 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            {t.footer.contactsTitle}
          </h2>
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
              <a
                href={school.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 text-brand-orange underline-offset-4 hover:underline"
              >
                {t.footer.mapLink} →
              </a>
            </p>
          </address>
        </div>

        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h2 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            {t.footer.socialTitle}
          </h2>
          <div className="flex items-center gap-4 py-1">
            <a
              href={school.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
            </a>
            {school.instagram && (
              <a
                href={school.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </a>
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
