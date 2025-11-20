export default function NewsSection() {
  return (
    <div className="w-full max-w-[345px] lg:max-w-2xl mx-auto flex flex-col items-center gap-3 rounded-xl border border-black/[0.17] bg-white p-4">
      <h2 className="text-xl md:text-2xl text-brand-dark text-center font-normal">
        Новости
      </h2>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/13479821037a011752d75317abcfbc5e8b820626?width=614"
        alt="News"
        className="w-full max-w-[307px] h-auto aspect-[307/450] rounded-2xl object-cover"
      />
    </div>
  );
}
