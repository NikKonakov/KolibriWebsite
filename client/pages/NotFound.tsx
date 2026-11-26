import { dictionaries } from "@/i18n/translations";

const linkClass =
  "font-bold text-kolibri-teal underline-offset-4 hover:underline";

/**
 * 404 page for unknown addresses. It's shown in both languages at once,
 * because a wrong address says nothing about the visitor's language.
 * Hosting returns it with a real 404 status (vercel.json, node-build.ts).
 */
export default function NotFound() {
  const { ru, en } = dictionaries;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="font-display text-5xl font-black">404</h1>
        <p className="text-xl">{ru.notFound.title}</p>
        <p className="text-kolibri-muted" lang="en">
          {en.notFound.title}
        </p>
        <div className="flex justify-center gap-5 pt-2">
          <a href="/" className={linkClass}>
            {ru.notFound.back}
          </a>
          <a href="/en/" lang="en" className={linkClass}>
            {en.notFound.back}
          </a>
        </div>
      </div>
    </main>
  );
}
