import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-dark py-12">
      <div className="max-w-[345px] lg:max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h3 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            О Школе
          </h3>
          <p className="text-sm md:text-base text-white font-normal leading-relaxed">
            Школа &quot;Колибри&quot; - это современное образовательное
            учреждение, где каждый ребенок может раскрыть свой потенциал.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h3 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            Контакты
          </h3>
          <div className="flex flex-col gap-2 text-sm md:text-base text-white font-normal">
            <p>
              📞 Телефон:{" "}
              <a
                href="tel:+14036140284"
                className="hover:text-brand-orange transition-colors"
              >
                +1 (403) 614-0284
              </a>
            </p>
            <p>
              📧 Email:{" "}
              <a
                href="mailto:kolibrischool1@gmail.com"
                className="hover:text-brand-orange transition-colors"
              >
                kolibrischool1@gmail.com
              </a>
            </p>
            <p className="break-words">
              📍 Адрес:
              <br />
              10325 Bonaventure Dr S E<br />
              Unit 408 Floor 4<br />
              Calgary, AB T2J 0P8
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full md:w-1/3">
          <h3 className="text-xl md:text-2xl text-brand-orange font-semibold mb-1">
            Соц. Сети
          </h3>
          <div className="flex items-center gap-4 py-1">
            <a
              href="https://www.facebook.com/profile.php?id=100023570652523"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[345px] lg:max-w-4xl mx-auto px-4 mt-8 pt-6 border-t border-white/20">
        <p className="text-sm text-white/70 text-center">
          © {new Date().getFullYear()} Школа &quot;Колибри&quot;. Все права
          защищены.
        </p>
      </div>
    </footer>
  );
}
