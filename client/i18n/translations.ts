/**
 * Every visible text of the site in Russian and English.
 * `Dictionary` describes the shape; TypeScript reports a missing or extra
 * text in either language, so the two versions can't drift apart.
 * List items are keyed by id (not by position), so each component can attach
 * the right icon to the right text.
 */
import type { Lang } from "./detect";

/** A card with a title and a short text (icons are added by the component). */
export interface Card {
  title: string;
  text: string;
}

/** A key fact in the hero: a big value and a short explanation. */
export interface Fact {
  value: string;
  label: string;
}

export interface Level extends Card {
  /** Short badge: "1", "2", "3", "РКИ"/"RFL". */
  badge: string;
}

export interface Review {
  name: string;
  review: string;
}

export type FeatureId =
  "teachers" | "individual" | "creative" | "talents" | "atmosphere";
export type DirectionId =
  "language" | "theatre" | "discovery" | "books" | "teens";
export type LevelId = "first" | "speak" | "masters" | "rfl";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
    siteName: string;
    /** Describes /og-image.jpg, the picture shown when the link is shared. */
    ogImageAlt: string;
  };
  langName: string;
  /** Screen-reader label of the × button that closes pop-ups. */
  closeLabel: string;
  /** First link on the page for keyboard users: jumps past the header. */
  skipLink: string;
  /** Shown on the OTHER language's page to offer this language. */
  languageOffer: { text: string; action: string; close: string };
  header: {
    brand: string;
    subtitle: string;
    languageLabel: string;
    trialCta: string;
    navLabel: string;
    nav: { directions: string; levels: string; news: string; contact: string };
  };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    cta: string;
    photoAlt: string;
    /** The fourth fact's label is the street address from content/school.ts. */
    facts: { schedule: Fact; ages: Fact; levels: Fact; area: string };
  };
  whyUs: { heading: string; intro: string; items: Record<FeatureId, Card> };
  directions: {
    heading: string;
    items: Record<DirectionId, Card>;
    library: {
      title: string;
      text: string;
      signIn: string;
      register: string;
      /** Pre-filled WhatsApp message sent by the "Register" button. */
      registerMessage: string;
    };
  };
  levels: { heading: string; intro: string; items: Record<LevelId, Level> };
  gallery: { heading: string; intro: string; prev: string; next: string };
  news: {
    heading: string;
    allNews: string;
    /** Shown instead of cards when no posts were imported. */
    emptyText: string;
    readMore: string;
    /** Shown when some posts exist only in the other language. */
    otherLanguageNote?: string;
  };
  reviews: {
    heading: string;
    /** Shown when the reviews are translations. */
    note?: string;
    googleLink: string;
    items: Review[];
  };
  contact: {
    heading: string;
    text: string;
    whatsapp: string;
    call: string;
    email: string;
    mapLink: string;
  };
  footer: { copyright: string };
  notFound: { title: string; back: string };
}

const ru: Dictionary = {
  meta: {
    title:
      "Колибри (Kolibri) — школа русского языка в Калгари для детей и взрослых",
    description:
      "Школа «Колибри» в Калгари: русский язык для детей от 4,5 до 18 лет, РКИ для детей и взрослых, театр, музыка и библиотека. Запишитесь на пробный урок!",
    ogLocale: "ru_RU",
    siteName: "Школа «Колибри»",
    ogImageAlt: "Ученики школы «Колибри» на сцене во время концерта",
  },
  langName: "Русский",
  closeLabel: "Закрыть",
  skipLink: "Перейти к содержанию",
  languageOffer: {
    text: "Эта страница есть на русском языке.",
    action: "Перейти на русский",
    close: "Закрыть",
  },
  header: {
    brand: "Колибри",
    subtitle: "Русская школа · Калгари",
    languageLabel: "Язык",
    trialCta: "Пробный урок",
    navLabel: "Разделы",
    nav: {
      directions: "Направления",
      levels: "Уровни",
      news: "Новости",
      contact: "Контакты",
    },
  },
  hero: {
    kicker: "Русская школа для детей в Калгари",
    title: "Русский язык, театр и музыка для детей",
    lead: "Учим говорить, читать и писать по-русски через игры, сцену и книги. Группы по уровню и возрасту — от первых слов до сочинений и дебатов.",
    cta: "Записаться на пробный урок",
    photoAlt: "Ученики «Колибри» на сцене во время школьного концерта",
    facts: {
      schedule: {
        value: "По субботам 9:00–16:00",
        label: "По будням — вечерние занятия",
      },
      ages: { value: "4,5–18 лет", label: "Дети; РКИ — для любого возраста" },
      levels: { value: "4 уровня", label: "От «Первых шагов» до РКИ" },
      area: "Calgary SE",
    },
  },
  whyUs: {
    heading: "Почему родители выбирают «Колибри»",
    intro:
      "Русский язык здесь — не скучная обязанность, а часть живой и дружной жизни.",
    items: {
      teachers: {
        title: "Опытные преподаватели",
        text: "Профессионалы с многолетним опытом, влюблённые в русский язык и культуру.",
      },
      individual: {
        title: "Индивидуальный подход",
        text: "Учитываем уровень, возраст и интересы каждого ребёнка.",
      },
      creative: {
        title: "Креативные методики",
        text: "Игры, проекты, театр и кино — учимся через творчество и живое общение.",
      },
      talents: {
        title: "Развитие талантов",
        text: "Концерты, выступления и проекты помогают детям раскрыться.",
      },
      atmosphere: {
        title: "Дружелюбная атмосфера",
        text: "Семейная обстановка: каждый ребёнок — часть большой команды.",
      },
    },
  },
  directions: {
    heading: "Направления школы",
    items: {
      language: {
        title: "Русский язык и литература",
        text: "Образовательные программы для детей и подростков от 4,5 до 18 лет.",
      },
      theatre: {
        title: "Творчество и театр",
        text: "Театральные занятия, сценические постановки, концерты и творческие проекты.",
      },
      discovery: {
        title: "Учимся через открытия",
        text: "Детективные квесты, интерактивные занятия и исследовательские проекты.",
      },
      books: {
        title: "Мир книг",
        text: "Собственная школьная библиотека, книжные клубы, литературные курсы и поэтические вечера.",
      },
      teens: {
        title: "Территория подростков",
        text: "Общение, совместные проекты, дискуссии и новые друзья.",
      },
    },
    library: {
      title: "Школьная библиотека",
      text: "Каталог школьной библиотеки доступен зарегистрированным пользователям. Войдите в свой аккаунт или зарегистрируйтесь, чтобы ознакомиться с нашей коллекцией книг.",
      signIn: "Войти в каталог",
      register: "Зарегистрироваться",
      registerMessage:
        "Здравствуйте! Хочу зарегистрироваться в каталоге школьной библиотеки «Колибри».",
    },
  },
  levels: {
    heading: "Уровни классов",
    intro:
      "Группы по уровню и возрасту: каждому комфортно и легко сделать шаг вперёд.",
    items: {
      first: {
        badge: "1",
        title: "Первые шаги",
        text: "Буквы, звуки, первые слова — через игры, сказки и песни.",
      },
      speak: {
        badge: "2",
        title: "Я говорю и пишу",
        text: "Говорят по-русски, подтягивают грамматику, чтение и письмо.",
      },
      masters: {
        badge: "3",
        title: "Мастера слова",
        text: "Литература, сочинения, дебаты, концерты и спектакли.",
      },
      rfl: {
        badge: "РКИ",
        title: "Русский как иностранный",
        text: "Для детей и взрослых, которые не говорят по-русски, без ограничений по возрасту. Упор на разговор и понимание на слух.",
      },
    },
  },
  gallery: {
    heading: "Жизнь школы",
    intro:
      "Концерты, спектакли, клубы и уроки: как проходят будни и праздники в «Колибри».",
    prev: "Предыдущее фото",
    next: "Следующее фото",
  },
  news: {
    heading: "Новости",
    allNews: "Все новости в Facebook",
    emptyText:
      "Свежие новости, фото с праздников и анонсы мы публикуем на нашей странице в Facebook.",
    readMore: "Читать в Facebook",
  },
  reviews: {
    heading: "Что говорят родители",
    googleLink: "Все отзывы о нас в Google",
    items: [
      {
        name: "Larisa Kolesnikova",
        review:
          "Прекрасная школа. Ребенку очень нравится, ждет субботу с нетерпением. Преподаватели замечательные, живут своей работой, поэтому и детям интересно.",
      },
      {
        name: "Oksana Kutsenko",
        review:
          "Замечательная школа! Дочка ходит в эту школу уже 4 года. В школе много направлений, это не только русский язык, но и развитие речи, музыка и многое другое. Очень рекомендую школу!",
      },
      {
        name: "Tatiana Belogubets",
        review:
          "Спасибо за вклад поддержания русской речи и закрепления в наших детях традиций славянских стран. Мой сын всегда с радостью посещает субботние занятия.",
      },
      {
        name: "Алла Колядова",
        review:
          "Спасибо, Светлана, что благодаря Вашей активности, у нас появился еще один приятный бонус! Тем более, связанный с книгами! Не сомневаемся, что Вам удастся, как обычно, пополнить библиотеку интересными экземплярами!",
      },
      {
        name: "Jyldyz Oskoeva",
        review: "Дети ходят с удовольствием! Отличная школа!",
      },
    ],
  },
  contact: {
    heading: "Приходите на пробный урок",
    text: "Напишите или позвоните — расскажем о расписании и подберём группу по уровню и возрасту.",
    whatsapp: "Написать в WhatsApp",
    call: "Позвонить",
    email: "Email",
    mapLink: "Открыть на карте",
  },
  footer: { copyright: "Школа «Колибри», Калгари" },
  notFound: {
    title: "Страница не найдена",
    back: "На главную",
  },
};

const en: Dictionary = {
  meta: {
    title: "Kolibri — Russian Language School in Calgary for Kids and Adults",
    description:
      "Kolibri School in Calgary, AB: Russian classes for kids aged 4.5 to 18, Russian as a foreign language for children and adults, plus theatre, music and a library. Book a trial lesson!",
    ogLocale: "en_CA",
    siteName: "Kolibri School",
    ogImageAlt: "Kolibri students on stage at a school concert",
  },
  langName: "English",
  closeLabel: "Close",
  skipLink: "Skip to content",
  languageOffer: {
    text: "This page is also available in English.",
    action: "Switch to English",
    close: "Close",
  },
  header: {
    brand: "Kolibri",
    subtitle: "Russian school · Calgary",
    languageLabel: "Language",
    trialCta: "Trial lesson",
    navLabel: "Sections",
    nav: {
      directions: "Programs",
      levels: "Levels",
      news: "News",
      contact: "Contact",
    },
  },
  hero: {
    kicker: "Russian school for kids in Calgary",
    title: "Russian language, theatre and music for kids",
    lead: "We teach children to speak, read and write Russian through games, the stage and books. Groups by level and age, from first words to essays and debates.",
    cta: "Book a trial lesson",
    photoAlt: "Kolibri students on stage at a school concert",
    facts: {
      schedule: {
        value: "Saturdays 9 a.m.–4 p.m.",
        label: "Plus weekday evening classes",
      },
      ages: { value: "Ages 4.5–18", label: "Children; adults welcome in RFL" },
      levels: { value: "4 levels", label: "From “First steps” to RFL" },
      area: "Calgary SE",
    },
  },
  whyUs: {
    heading: "Why parents choose Kolibri",
    intro:
      "Here Russian isn't a chore: it's part of a lively, friendly community.",
    items: {
      teachers: {
        title: "Experienced teachers",
        text: "Professionals with many years of experience who love the Russian language and culture.",
      },
      individual: {
        title: "Individual approach",
        text: "We take each child's level, age and interests into account.",
      },
      creative: {
        title: "Creative methods",
        text: "Games, projects, theatre and film: learning through creativity and real conversation.",
      },
      talents: {
        title: "Growing talents",
        text: "Concerts, performances and projects help children open up.",
      },
      atmosphere: {
        title: "Friendly atmosphere",
        text: "A family feel: every child is part of a big team.",
      },
    },
  },
  directions: {
    heading: "Our programs",
    items: {
      language: {
        title: "Russian Language & Literature",
        text: "Programs for children and teens aged 4.5 to 18.",
      },
      theatre: {
        title: "Creativity & Theatre",
        text: "Drama classes, stage productions, concerts and creative projects.",
      },
      discovery: {
        title: "Learning Through Discovery",
        text: "Detective quests, hands-on lessons and research projects.",
      },
      books: {
        title: "The World of Books",
        text: "Our own school library, book clubs, literature courses and poetry evenings.",
      },
      teens: {
        title: "Teen Space",
        text: "Friendship, group projects, discussions and new friends.",
      },
    },
    library: {
      title: "School library",
      text: "The school library catalog is open to registered readers. Sign in or register to browse our collection.",
      signIn: "Sign in to the catalog",
      register: "Register",
      registerMessage:
        "Hello! I'd like to register for the Kolibri school library catalog.",
    },
  },
  levels: {
    heading: "Class levels",
    intro:
      "Groups by level and age, so everyone is comfortable and can easily take the next step.",
    items: {
      first: {
        badge: "1",
        title: "First steps",
        text: "Letters, sounds and first words through games, fairy tales and songs.",
      },
      speak: {
        badge: "2",
        title: "I speak and write",
        text: "Children who speak Russian improve their grammar, reading and writing.",
      },
      masters: {
        badge: "3",
        title: "Masters of words",
        text: "Literature, essays, debates, concerts and plays.",
      },
      rfl: {
        badge: "RFL",
        title: "Russian as a foreign language",
        text: "For children and adults who don't speak Russian, at any age. A focus on speaking and listening.",
      },
    },
  },
  gallery: {
    heading: "School life",
    intro:
      "Concerts, plays, clubs and lessons: everyday life and celebrations at Kolibri.",
    prev: "Previous photo",
    next: "Next photo",
  },
  news: {
    heading: "News",
    allNews: "All news on Facebook",
    emptyText:
      "We post the latest news, event photos and announcements on our Facebook page.",
    readMore: "Read on Facebook",
    otherLanguageNote: "Posts from our Facebook page are in Russian.",
  },
  reviews: {
    heading: "What parents say",
    note: "Translated from Russian",
    googleLink: "All our reviews on Google",
    items: [
      {
        name: "Larisa Kolesnikova",
        review:
          "A wonderful school. My child loves it and can't wait for Saturday. The teachers are amazing and truly live their work, which is why the kids find it so interesting.",
      },
      {
        name: "Oksana Kutsenko",
        review:
          "A wonderful school! My daughter has been going here for 4 years. It offers much more than Russian: speech development, music and a lot more. Highly recommend!",
      },
      {
        name: "Tatiana Belogubets",
        review:
          "Thank you for helping keep Russian alive in our children and for passing on the traditions of Slavic countries. My son always looks forward to the Saturday classes.",
      },
      {
        name: "Alla Kolyadova",
        review:
          "Thank you, Svetlana! Thanks to your energy we have one more lovely bonus, and it's about books! We have no doubt you'll fill the library with great titles, as always!",
      },
      {
        name: "Jyldyz Oskoeva",
        review: "The kids love going! A great school!",
      },
    ],
  },
  contact: {
    heading: "Come for a trial lesson",
    text: "Message or call us: we'll tell you about the schedule and find the right group by level and age.",
    whatsapp: "Message on WhatsApp",
    call: "Call",
    email: "Email",
    mapLink: "Open on the map",
  },
  footer: { copyright: "Kolibri School, Calgary" },
  notFound: {
    title: "Page not found",
    back: "Go to the home page",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { ru, en };
