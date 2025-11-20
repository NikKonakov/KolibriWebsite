import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Hero Section with Logo and Title */}
      <div className="relative flex items-center justify-center gap-6 bg-gradient-to-r from-brand-orange via-brand-orange to-[#FFA833] px-4 py-6 md:py-8 shadow-lg">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        {/* Logo with Ring */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-white/30 rounded-full blur-md group-hover:bg-white/40 transition-all duration-300"></div>
          <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex-shrink-0 rounded-full overflow-hidden shadow-xl bg-white ring-4 ring-white/50 group-hover:ring-white/70 transition-all duration-300 transform group-hover:scale-105">
            <img
              src="/kolibriImageCanva.jpg"
              alt="Kolibri Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 max-w-[280px] md:max-w-none">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight drop-shadow-md font-serif">
            Колибри
          </h1>
          <p className="text-white/90 text-xs md:text-sm font-medium text-center leading-relaxed font-serif break-words">
            Школа русского языка · Театр · Библиотека · Музыка · Книжный клуб
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-center gap-1 px-2 sm:px-4 py-3 md:py-4 max-w-3xl mx-auto">
          <a
            href="#programs"
            className="group relative flex-1 flex items-center justify-center px-2 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold text-brand-dark hover:text-brand-orange transition-all duration-300 overflow-hidden"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("programs")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span className="absolute inset-0 bg-brand-orange/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            <span className="relative">Программы</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
          </a>

          <a
            href="#news"
            className="group relative flex-1 flex items-center justify-center px-2 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold text-brand-dark hover:text-brand-orange transition-all duration-300 overflow-hidden"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("news")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <span className="absolute inset-0 bg-brand-orange/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            <span className="relative">Новости</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
          </a>

          <a
            href="https://www.libib.com/u/kolibrischool"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 flex items-center justify-center px-2 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold text-brand-dark hover:text-brand-orange transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-brand-orange/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
            <span className="relative">Библиотека</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-orange group-hover:w-3/4 transition-all duration-300"></span>
          </a>
        </div>
      </nav>
    </header>
  );
}
