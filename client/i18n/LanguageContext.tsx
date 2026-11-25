import { createContext, useContext, type ReactNode } from "react";
import { dictionaries, type Dictionary } from "./translations";
import type { Lang } from "./detect";

/** The current page language, shared with every component below the provider. */
const LanguageContext = createContext<Lang>("ru");

/** Makes `lang` the page language for all components inside it. */
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

/**
 * Current page language and its texts, e.g. `const { t } = useI18n();`
 * then `t.header.brand`.
 */
export function useI18n(): { lang: Lang; t: Dictionary } {
  const lang = useContext(LanguageContext);
  return { lang, t: dictionaries[lang] };
}
