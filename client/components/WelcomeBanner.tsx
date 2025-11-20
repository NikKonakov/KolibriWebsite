export default function WelcomeBanner() {
  return (
    <div className="w-full max-w-[345px] mx-auto p-3 flex flex-col items-center gap-3 rounded-xl border border-black/25 bg-white shadow-sm">
      <h2 className="text-base md:text-xl text-brand-dark text-center font-normal">
        Добро пожаловать в Школу &quot;Колибри&quot;
      </h2>
      <p className="text-[12px] md:text-sm text-brand-dark text-center font-normal">
        Мы создаём пространство, где обучение русскому языку становится не
        только полезным, но и увлекательным путешествием в мир знаний, культуры
        и творчества.
      </p>
      <button className="px-4 py-2 bg-brand-orange rounded-md text-white text-sm font-medium hover:bg-brand-orange/90 transition-colors">
        Запишитесь на пробный урок!
      </button>
    </div>
  );
}
