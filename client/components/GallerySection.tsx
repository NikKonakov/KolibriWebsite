import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/LanguageContext";
import { gallery, photoSrc, thumbSrc } from "@/content/gallery";

/** "School life" photo grid; a tap opens the photo full size. */
export default function GallerySection() {
  const { t, lang } = useI18n();
  const [index, setIndex] = useState<number | null>(null);
  const count = gallery.length;
  const current = index === null ? null : gallery[index];

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + count) % count));

  return (
    <section
      id="gallery"
      className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white scroll-mt-20"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-xl md:text-2xl text-brand-dark font-medium">
          {t.gallery.heading}
        </h2>
        <p className="text-sm md:text-base text-brand-text">
          {t.gallery.intro}
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((photo, i) => (
          <button
            key={photo.name}
            type="button"
            onClick={() => setIndex(i)}
            className="group overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <img
              src={thumbSrc(photo)}
              alt={photo.alt[lang]}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={current !== null}
        onOpenChange={(open) => !open && setIndex(null)}
      >
        <DialogContent
          aria-describedby={undefined}
          className="w-[calc(100%-2rem)] max-w-4xl gap-3 p-3 sm:p-4"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
          }}
        >
          <DialogTitle className="sr-only">{t.gallery.heading}</DialogTitle>
          {current && (
            <>
              <img
                src={photoSrc(current)}
                alt={current.alt[lang]}
                width={current.width}
                height={current.height}
                className="max-h-[75vh] w-full rounded object-contain"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t.gallery.prev}
                  className="rounded-full p-2 text-brand-dark hover:bg-brand-light"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <p className="flex-1 text-center text-sm text-brand-dark">
                  {current.alt[lang]}
                  <span className="text-brand-text">
                    {" "}
                    · {index! + 1} / {count}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.gallery.next}
                  className="rounded-full p-2 text-brand-dark hover:bg-brand-light"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
