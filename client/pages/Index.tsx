import { useEffect } from "react";
import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import WhyUsSection from "@/components/WhyUsSection";
import ProgramsSection from "@/components/ProgramsSection";
import GallerySection from "@/components/GallerySection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
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
  // Prerendered pages already have the right <html lang> and <title>;
  // this keeps them correct in development, where pages aren't prerendered.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  return (
    <LanguageProvider lang={lang}>
      <div className="min-h-screen w-full bg-brand-light relative overflow-x-hidden">
        {/* Light decorative pattern behind the whole page. */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('/bckgrnd.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10">
          <Header />

          <main className="flex flex-col items-center gap-14 px-4 py-10 md:px-10 md:py-16">
            <WelcomeBanner />
            <WhyUsSection />
            <ProgramsSection />
            <GallerySection />
            <NewsSection />
            <ReviewsSection />
          </main>

          <Footer />
        </div>
        <LanguageSuggestion />
      </div>
    </LanguageProvider>
  );
}
