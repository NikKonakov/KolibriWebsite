import { dictionaries } from "@/i18n/translations";

const NotFound = () => {
  const { ru, en } = dictionaries;

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-brand-dark">404</h1>
        <p className="text-xl text-brand-dark">{ru.notFound.title}</p>
        <p className="text-brand-text" lang="en">
          {en.notFound.title}
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <a href="/" className="text-blue-700 underline hover:text-blue-900">
            {ru.notFound.back}
          </a>
          <a
            href="/en/"
            lang="en"
            className="text-blue-700 underline hover:text-blue-900"
          >
            {en.notFound.back}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
