import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n/LanguageContext";
import { school } from "@/content/school";

const navLinkClass =
  "group relative flex-1 flex items-center justify-center px-2 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold text-brand-dark hover:text-brand-orange transition-all duration-300 overflow-hidden";

function NavLinkDecor({ label }: { label: string }) {
  return (
    <>
      <span className="absolute inset-0 bg-brand-orange/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
      <span className="relative">{label}</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
    </>
  );
}

function scrollTo(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Hero Section with Logo and Title */}
      <div className="relative flex items-center justify-center gap-6 bg-gradient-to-r from-brand-orange via-brand-orange to-[#FFA833] px-4 py-6 md:py-8 shadow-lg">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <LanguageSwitcher className="absolute right-3 top-3 z-10" />

        {/* Logo with Ring */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-white/30 rounded-full blur-md group-hover:bg-white/40 transition-all duration-300"></div>
          <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex-shrink-0 rounded-full overflow-hidden shadow-xl bg-white ring-4 ring-white/50 group-hover:ring-white/70 transition-all duration-300 transform group-hover:scale-105">
            <img
              src={school.logo}
              alt={t.header.logoAlt}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 max-w-[280px] md:max-w-none">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight drop-shadow-md font-serif">
            {t.header.brand}
          </h1>
          <p className="text-white/90 text-xs md:text-sm font-medium text-center leading-relaxed font-serif break-words">
            {t.header.tagline}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-center gap-1 px-2 sm:px-4 py-3 md:py-4 max-w-3xl mx-auto">
          <a
            href="#programs"
            className={navLinkClass}
            onClick={scrollTo("programs")}
          >
            <NavLinkDecor label={t.header.nav.programs} />
          </a>

          <a href="#news" className={navLinkClass} onClick={scrollTo("news")}>
            <NavLinkDecor label={t.header.nav.news} />
          </a>

          <a
            href={school.library}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            <NavLinkDecor label={t.header.nav.library} />
          </a>
        </div>
      </nav>
    </header>
  );
}
