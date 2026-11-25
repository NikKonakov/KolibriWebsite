import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  Facebook,
  Globe,
  Instagram,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

const iconLinkClass = "hover:scale-110 transition-transform";
const iconCircleClass =
  "w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow";

export default function WelcomeBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <section className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white shadow-sm">
        <h2 className="text-xl md:text-3xl text-brand-dark text-center font-semibold">
          {t.welcome.title}
        </h2>
        <p className="text-sm md:text-lg text-brand-dark text-center font-normal leading-relaxed">
          {t.welcome.text}
        </p>
        <ul className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-brand-light p-3 text-sm md:text-base text-brand-dark">
          {[
            { Icon: CalendarDays, text: t.welcome.facts.schedule },
            { Icon: Users, text: t.welcome.facts.ages },
            { Icon: Globe, text: t.welcome.facts.foreignLanguage },
          ].map(({ Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-brand-orange rounded-md text-white text-base md:text-lg font-medium hover:bg-brand-orange/90 transition-colors"
        >
          {t.welcome.cta}
        </button>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-2 border-brand-orange/20">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-brand-dark font-semibold pb-2">
              {t.welcome.dialogTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 py-2">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={school.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label="WhatsApp"
              >
                <div className={`${iconCircleClass} bg-green-500`}>
                  <Phone className="w-8 h-8 text-white" />
                </div>
              </a>
              <a
                href={`mailto:${school.email}`}
                className={iconLinkClass}
                aria-label="Email"
              >
                <div className={`${iconCircleClass} bg-brand-orange`}>
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </a>
              <a
                href={school.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label="Facebook"
              >
                <div className={`${iconCircleClass} bg-blue-600`}>
                  <Facebook className="w-8 h-8 text-white" />
                </div>
              </a>
              {school.instagram && (
                <a
                  href={school.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLinkClass}
                  aria-label="Instagram"
                >
                  <div
                    className={`${iconCircleClass} bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500`}
                  >
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                </a>
              )}
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            <div className="flex flex-col items-center gap-2 text-center">
              <a
                href={school.phoneHref}
                className="text-lg font-medium text-brand-dark hover:text-brand-orange transition-colors"
              >
                {school.phone}
              </a>
              <a
                href={`mailto:${school.email}`}
                className="text-lg font-medium text-brand-dark hover:text-brand-orange transition-colors"
              >
                {school.email}
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
