import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Directions from "@/components/Directions";
import Levels from "@/components/Levels";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LanguageSuggestion from "@/components/LanguageSuggestion";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { dictionaries } from "@/i18n/translations";
import type { Lang } from "@/i18n/detect";

/**
 * The home page in one language (`/` for Russian, `/en/` for English).
 * Every section below reads its texts from the language given here.
 */
export default function Index({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];

  // Prerendered pages already have the right <html lang> and <title>;
  // this keeps them correct in development, where pages aren't prerendered.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
  }, [lang, t]);

  return (
    <LanguageProvider lang={lang}>
      {/* First Tab stop: lets keyboard users jump past the header and menu. */}
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-kolibri-ink px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        {t.skipLink}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <WhyUs />
        <Directions />
        <Levels />
        <GallerySection />
        <NewsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <LanguageSuggestion />
    </LanguageProvider>
  );
}
