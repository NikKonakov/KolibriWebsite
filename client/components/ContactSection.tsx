import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ExternalLink from "./ExternalLink";
import { useI18n } from "@/i18n/LanguageContext";
import { school, whatsappLink } from "@/content/school";
import { buttonClass } from "@/lib/button";

/**
 * Dark contact section at the end of the page, the target of every
 * "Trial lesson" button: WhatsApp, call and email buttons, plus a card with
 * the address, phone, email and a map link.
 */
export default function ContactSection() {
  const { t } = useI18n();
  const a = school.address;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-4 bg-kolibri-ink px-4 py-14 text-white md:py-16"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start gap-10">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <h2
            id="contact-title"
            className="font-display text-[30px] font-black leading-tight md:text-4xl"
          >
            {t.contact.heading}
          </h2>
          <p className="text-[17px] text-kolibri-on-navy">{t.contact.text}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ExternalLink
              href={whatsappLink()}
              className={buttonClass("whatsapp", "min-h-[52px]")}
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              {t.contact.whatsapp}
            </ExternalLink>
            <a
              href={school.phoneHref}
              className={buttonClass(
                "primary",
                "min-h-[52px] focus-visible:outline-white",
              )}
            >
              <Phone aria-hidden="true" className="h-[18px] w-[18px]" />
              {t.contact.call}
            </a>
            <a
              href={`mailto:${school.email}`}
              className={buttonClass("navy-outline", "min-h-[52px]")}
            >
              <Mail aria-hidden="true" className="h-[18px] w-[18px]" />
              {t.contact.email}
            </a>
          </div>
        </div>

        <address className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[20px] bg-kolibri-navy-card p-6 text-[15px] not-italic text-kolibri-on-navy-strong">
          <p className="flex gap-3">
            <MapPin
              aria-hidden="true"
              className="h-[22px] w-[22px] shrink-0 text-kolibri-orange"
            />
            <span>
              {a.street}
              <br />
              {a.unit}
              <br />
              {a.city}, {a.region} {a.postalCode}
            </span>
          </p>
          <p className="flex gap-3">
            <Phone
              aria-hidden="true"
              className="h-[22px] w-[22px] shrink-0 text-kolibri-orange"
            />
            <a
              href={school.phoneHref}
              className="text-inherit no-underline hover:underline"
            >
              {school.phone}
            </a>
          </p>
          <p className="flex gap-3">
            <Mail
              aria-hidden="true"
              className="h-[22px] w-[22px] shrink-0 text-kolibri-orange"
            />
            <a
              href={`mailto:${school.email}`}
              className="text-inherit no-underline hover:underline"
            >
              {school.email}
            </a>
          </p>
          <ExternalLink
            href={school.google}
            className="inline-flex min-h-[44px] items-center gap-1.5 self-start font-bold text-kolibri-gold no-underline hover:underline"
          >
            {t.contact.mapLink}
            <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />
          </ExternalLink>
        </address>
      </div>
    </section>
  );
}
