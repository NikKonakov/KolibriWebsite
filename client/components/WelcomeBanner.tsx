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
import ExternalLink from "./ExternalLink";
import SectionCard from "./SectionCard";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

const iconLinkClass = "hover:scale-110 transition-transform";
const iconCircleClass =
  "w-14 h-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow";
const contactTextClass =
  "text-lg font-medium text-brand-dark hover:text-brand-orange transition-colors";

/**
 * First section of the page: greeting, key facts (schedule, ages, adult
 * classes) and the "Book a trial lesson" button that opens the contacts.
 */
export default function WelcomeBanner() {
  const [contactsOpen, setContactsOpen] = useState(false);
  const { t } = useI18n();

  const facts = [
    { Icon: CalendarDays, text: t.welcome.facts.schedule },
    { Icon: Users, text: t.welcome.facts.ages },
    { Icon: Globe, text: t.welcome.facts.foreignLanguage },
  ];

  return (
    <>
      <SectionCard className="p-4 flex flex-col items-center gap-4 shadow-sm">
        <h2 className="text-xl md:text-3xl text-brand-dark text-center font-semibold">
          {t.welcome.title}
        </h2>
        <p className="text-sm md:text-lg text-brand-dark text-center font-normal leading-relaxed">
          {t.welcome.text}
        </p>
        <ul className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-brand-light p-3 text-sm md:text-base text-brand-dark">
          {facts.map(({ Icon, text }) => (
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
          type="button"
          onClick={() => setContactsOpen(true)}
          className="px-6 py-3 bg-brand-orange rounded-md text-white text-base md:text-lg font-medium hover:bg-brand-orange/90 transition-colors"
        >
          {t.welcome.cta}
        </button>
      </SectionCard>

      <ContactDialog open={contactsOpen} onOpenChange={setContactsOpen} />
    </>
  );
}

/**
 * Pop-up with every way to contact the school: WhatsApp, email, Facebook,
 * Instagram (only once a real account is set) and the phone number.
 */
function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeLabel={t.closeLabel}
        className="sm:max-w-md border-2 border-brand-orange/20"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-brand-dark font-semibold pb-2">
            {t.welcome.dialogTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ExternalLink
              href={school.whatsapp}
              className={iconLinkClass}
              aria-label="WhatsApp"
            >
              <div className={`${iconCircleClass} bg-green-500`}>
                <Phone className="w-8 h-8 text-white" />
              </div>
            </ExternalLink>
            <a
              href={`mailto:${school.email}`}
              className={iconLinkClass}
              aria-label="Email"
            >
              <div className={`${iconCircleClass} bg-brand-orange`}>
                <Mail className="w-8 h-8 text-white" />
              </div>
            </a>
            <ExternalLink
              href={school.facebook}
              className={iconLinkClass}
              aria-label="Facebook"
            >
              <div className={`${iconCircleClass} bg-blue-600`}>
                <Facebook className="w-8 h-8 text-white" />
              </div>
            </ExternalLink>
            {school.instagram && (
              <ExternalLink
                href={school.instagram}
                className={iconLinkClass}
                aria-label="Instagram"
              >
                <div
                  className={`${iconCircleClass} bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500`}
                >
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </ExternalLink>
            )}
          </div>

          <div className="w-full h-px bg-gray-200"></div>

          <div className="flex flex-col items-center gap-2 text-center">
            <a href={school.phoneHref} className={contactTextClass}>
              {school.phone}
            </a>
            <a href={`mailto:${school.email}`} className={contactTextClass}>
              {school.email}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
