import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import WhyUsSection from "@/components/WhyUsSection";
import ProgramsSection from "@/components/ProgramsSection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen w-full bg-brand-light relative overflow-x-hidden">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/a137529b45294faa0f7882a344cbb0fdbf732be7?width=866')",
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
          <NewsSection />
          <ReviewsSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
