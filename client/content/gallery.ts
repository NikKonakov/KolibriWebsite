import type { Lang } from "@/i18n/detect";

/**
 * "School life" photos, shared by the school for the website.
 * Files live in public/gallery/: <name>.webp (full size, up to 1600 px)
 * and <name>-thumb.webp (600×600 square, cropped around faces).
 * Metadata (including any location) is stripped from every file.
 *
 * To add a photo: put both files in public/gallery/ and add an entry here.
 */
export interface Photo {
  name: string;
  width: number;
  height: number;
  alt: Record<Lang, string>;
}

export const gallery: Photo[] = [
  {
    name: "concert-stage",
    width: 1024,
    height: 626,
    alt: {
      ru: "Ученики «Колибри» на сцене во время школьного концерта",
      en: "Kolibri students on stage at a school concert",
    },
  },
  {
    name: "reading-corner",
    width: 1600,
    height: 739,
    alt: {
      ru: "Уютный осенний уголок для чтения: ребята с книгами",
      en: "A cozy autumn reading corner with children and books",
    },
  },
  {
    name: "detectives",
    width: 794,
    height: 1024,
    alt: {
      ru: "Юные сыщики из «Детективного агентства» с лупой и портфелем",
      en: "Young sleuths from the Detective Agency club with a magnifying glass",
    },
  },
  {
    name: "cooking-class",
    width: 1600,
    height: 739,
    alt: {
      ru: "Кулинарный мастер-класс: ученики лепят пельмени вместе с преподавателем",
      en: "Cooking class: students making dumplings with their teacher",
    },
  },
  {
    name: "lesson",
    width: 768,
    height: 1024,
    alt: {
      ru: "Занятие за партой: ученица и преподаватель",
      en: "A lesson at the desk: a student and her teacher",
    },
  },
  {
    name: "young-actors",
    width: 848,
    height: 1024,
    alt: {
      ru: "Юные артисты в театральных костюмах после спектакля",
      en: "Young actors in costume after a performance",
    },
  },
  {
    name: "school-play",
    width: 1123,
    height: 1496,
    alt: {
      ru: "Сцена из школьного спектакля",
      en: "A scene from a school play",
    },
  },
  {
    name: "holiday-costumes",
    width: 1024,
    height: 768,
    alt: {
      ru: "Малыши в костюмах ёлочек и зверят перед праздником",
      en: "Little ones dressed as Christmas trees and animals before a holiday party",
    },
  },
  {
    name: "class-presentation",
    width: 768,
    height: 1024,
    alt: {
      ru: "Ученики выступают перед классом",
      en: "Students speaking in front of the class",
    },
  },
  {
    name: "play-on-stage",
    width: 1200,
    height: 1600,
    alt: {
      ru: "Преподаватель и дети на сцене во время спектакля",
      en: "A teacher and children on stage during a play",
    },
  },
  {
    name: "teacher-hug",
    width: 768,
    height: 1024,
    alt: {
      ru: "Ученицы обнимают преподавателя",
      en: "Students hugging their teacher",
    },
  },
  {
    name: "dumplings",
    width: 739,
    height: 1600,
    alt: {
      ru: "Ученица с тарелкой пельменей на кулинарном мастер-классе",
      en: "A student holding a plate of dumplings at the cooking class",
    },
  },
];

/** Address of the full-size photo, shown in the pop-up. */
export const photoSrc = (p: Photo) => `/gallery/${p.name}.webp`;

/** Address of the 600×600 square thumbnail, shown in the grid. */
export const thumbSrc = (p: Photo) => `/gallery/${p.name}-thumb.webp`;
