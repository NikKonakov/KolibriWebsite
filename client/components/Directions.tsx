import {
  BookOpen,
  Drama,
  LibraryBig,
  LogIn,
  Search,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import ExternalLink from "./ExternalLink";
import IconTile from "./IconTile";
import Section from "./Section";
import { useI18n } from "@/i18n/LanguageContext";
import type { DirectionId } from "@/i18n/translations";
import { school, whatsappLink } from "@/content/school";
import { buttonClass } from "@/lib/button";

/** Icon and tile color of each program; texts come from translations.ts. */
const DIRECTIONS: {
  id: DirectionId;
  Icon: LucideIcon;
  tone: "orange" | "teal";
}[] = [
  { id: "language", Icon: BookOpen, tone: "orange" },
  { id: "theatre", Icon: Drama, tone: "teal" },
  { id: "discovery", Icon: Search, tone: "orange" },
  { id: "books", Icon: LibraryBig, tone: "teal" },
  { id: "teens", Icon: Users, tone: "orange" },
];

/**
 * The school's five programs as cards (wording chosen by the school), followed
 * by the library panel.
 */
export default function Directions() {
  const { t } = useI18n();

  return (
    <Section id="directions" tone="teal" title={t.directions.heading}>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {DIRECTIONS.map(({ id, Icon, tone }) => (
          <li
            key={id}
            className="flex flex-col gap-3 rounded-[20px] bg-white p-6"
          >
            <IconTile icon={Icon} tone={tone} />
            <h3 className="font-display text-[21px] font-extrabold leading-tight">
              {t.directions.items[id].title}
            </h3>
            <p className="text-[15px] text-kolibri-body">
              {t.directions.items[id].text}
            </p>
          </li>
        ))}
      </ul>
      <LibraryAccess />
    </Section>
  );
}

/**
 * Library panel. The online catalog (Libib) is only open to registered
 * readers, and Libib has no self-registration: the school adds readers.
 * So "Sign in" opens the catalog's login, and "Register" opens WhatsApp
 * with a ready-made request to the school, in the page language.
 */
function LibraryAccess() {
  const { t } = useI18n();
  const library = t.directions.library;

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-5 rounded-[20px] bg-white p-6">
      <div className="flex min-w-0 flex-[1_1_380px] items-start gap-4">
        <IconTile icon={LibraryBig} tone="teal" />
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-[21px] font-extrabold">
            {library.title}
          </h3>
          <p className="text-[15px] text-kolibri-body">{library.text}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <ExternalLink href={school.library} className={buttonClass("teal")}>
          <LogIn aria-hidden="true" className="h-[18px] w-[18px]" />
          {library.signIn}
        </ExternalLink>
        <ExternalLink
          href={whatsappLink(library.registerMessage)}
          className={buttonClass("teal-outline")}
        >
          <UserPlus aria-hidden="true" className="h-[18px] w-[18px]" />
          {library.register}
        </ExternalLink>
      </div>
    </div>
  );
}
