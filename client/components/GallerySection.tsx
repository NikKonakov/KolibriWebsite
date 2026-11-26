import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SectionCard from "./SectionCard";
import { useI18n } from "@/i18n/LanguageContext";
import { gallery, photoSrc, thumbSrc } from "@/content/gallery";

/**
 * "School life": a grid of square photo thumbnails. Tapping one opens it
 * full size in a pop-up with previous/next buttons; the arrow keys work too.
 */
export default function GallerySection() {
  const { t, lang } = useI18n();
  /** Position of the photo open in the pop-up, or null when it's closed. */
  const [index, setIndex] = useState<number | null>(null);
  const count = gallery.length;
  const current = index === null ? null : gallery[index];

  /** Moves to the previous (-1) or next (+1) photo, wrapping around the ends. */
  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + count) % count));

  return (
    <SectionCard id="gallery" className="p-4 flex flex-col items-center gap-4">
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
          closeLabel={t.closeLabel}
          className="w-[calc(100%-2rem)] max-w-4xl gap-3 p-3 sm:p-4"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
          }}
        >
          <DialogTitle className="sr-only">{t.gallery.heading}</DialogTitle>
          {current && index !== null && (
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
                    · {index + 1} / {count}
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
    </SectionCard>
  );
}
