import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Section from "./Section";
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
    <Section
      id="gallery"
      tone="white"
      title={t.gallery.heading}
      intro={t.gallery.intro}
    >
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((photo, i) => (
          <li key={photo.name}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-kolibri-teal focus-visible:ring-offset-2"
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
          </li>
        ))}
      </ul>

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
                  className="rounded-full p-2 text-kolibri-ink hover:bg-kolibri-chip"
                >
                  <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                </button>
                <p className="flex-1 text-center text-sm text-kolibri-ink">
                  {current.alt[lang]}
                  <span className="text-kolibri-muted">
                    {" "}
                    · {index + 1} / {count}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t.gallery.next}
                  className="rounded-full p-2 text-kolibri-ink hover:bg-kolibri-chip"
                >
                  <ChevronRight aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
