import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="flex items-center justify-center gap-6 bg-brand-orange px-2.5 py-0 h-[99px] shadow-md">
        <div className="w-[90px] h-[91px] flex-shrink-0 relative shadow-md">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/217eb959e9cdda3f0eba327777f87ac5199178bc?width=190"
            alt="Kolibri Logo"
            className="w-[95px] h-[112px] absolute -left-[5px] -top-[13px]"
          />
        </div>
        <h1 className="text-2xl text-brand-dark text-center font-normal w-[209px]">
          Школа &quot;Колибри&quot;
        </h1>
      </div>
      
      <nav className="flex items-center justify-center gap-2.5 bg-white px-2 py-8 h-[73px]">
        <Link
          to="/"
          className="flex-1 flex items-center justify-center px-4 py-2 rounded-md border border-brand-orange bg-white text-sm font-medium text-slate-900 hover:bg-brand-orange/10 transition-colors"
        >
          Программы
        </Link>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center px-4 py-2 rounded-md border border-brand-orange bg-white text-sm font-medium text-slate-900 hover:bg-brand-orange/10 transition-colors"
        >
          Новости
        </Link>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center px-4 py-2 rounded-md border border-brand-orange bg-white text-sm font-medium text-slate-900 hover:bg-brand-orange/10 transition-colors"
        >
          Библиотека
        </Link>
      </nav>
      
      <div className="w-full h-[1px] bg-[#AFABAB]/50" />
    </header>
  );
}
