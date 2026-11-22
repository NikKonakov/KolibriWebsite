import { createContext, useContext, type ReactNode } from "react";
import { dictionaries, type Dictionary } from "./translations";
import type { Lang } from "./detect";

const LanguageContext = createContext<Lang>("ru");

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
}

/** Current page language and its texts. */
export function useI18n(): { lang: Lang; t: Dictionary } {
  const lang = useContext(LanguageContext);
  return { lang, t: dictionaries[lang] };
}
