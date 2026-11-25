import type { Lang } from "./detect";

export interface Feature {
  title: string;
  description: string;
}

export interface Program {
  title: string;
  content: string;
}

export interface Review {
  name: string;
  review: string;
  fbLink?: string;
}

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
  /** Shown on the OTHER language's page to offer this language. */
  languageOffer: { text: string; action: string; close: string };
  header: {
    brand: string;
    tagline: string;
    logoAlt: string;
    nav: { programs: string; news: string; library: string };
  };
  welcome: {
    title: string;
    text: string;
    /** Key facts under the welcome text: schedule, ages, adult classes. */
    facts: { schedule: string; ages: string; foreignLanguage: string };
    cta: string;
    dialogTitle: string;
  };
  featuresLabel: string;
  features: Feature[];
  programs: { heading: string; items: Program[] };
  gallery: { heading: string; intro: string; prev: string; next: string };
  news: {
    heading: string;
    followText: string;
    followButton: string;
    readMore: string;
    /** Shown when some posts exist only in the other language. */
    otherLanguageNote?: string;
  };
  reviews: {
    heading: string;
    note?: string;
    googleLink: string;
    items: Review[];
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    contactsTitle: string;
    phone: string;
    email: string;
    address: string;
    mapLink: string;
    socialTitle: string;
    schoolName: string;
    rights: string;
  };
  notFound: { title: string; text: string; back: string };
}

const reviewLinks = {
  jyldyz: "https://www.facebook.com/jyldyz.oskoeva",
  tatiana: "https://www.facebook.com/tatiana.belogubets",
  alla: "https://www.facebook.com/alla.kolyadova",
  larisa: "https://www.facebook.com/larisa.kolesnikova",
  oksana: "https://www.facebook.com/oksana.kutsenko",
};

const ru: Dictionary = {
  meta: {
    title: "Колибри (Kolibri) — школа русского языка в Калгари для детей и взрослых",
    description:
      "Школа «Колибри» в Калгари: русский язык для детей от 4,5 до 18 лет, РКИ для детей и взрослых, театр, музыка и библиотека. Запишитесь на пробный урок!",
    ogLocale: "ru_RU",
    siteName: "Школа «Колибри»",
    ogImageAlt: "Ученики школы «Колибри» на сцене во время концерта",
  },
  langName: "Русский",
  languageOffer: {
    text: "Эта страница есть на русском языке.",
    action: "Перейти на русский",
    close: "Закрыть",
  },
  header: {
    brand: "Колибри",
    tagline: "Школа русского языка · Театр · Библиотека · Музыка · Книжный клуб",
    logoAlt: "Логотип школы «Колибри»",
    nav: { programs: "Программы", news: "Новости", library: "Библиотека" },
  },
  welcome: {
    title: "Добро пожаловать в школу «Колибри»",
    text: "Мы создаём пространство, где обучение русскому языку становится не только полезным, но и увлекательным путешествием в мир знаний, культуры и творчества.",
    facts: {
      schedule: "По субботам с 9:00 до 16:00, по будням — вечерние занятия",
      ages: "Детские группы — от 4,5 до 18 лет",
      foreignLanguage:
        "Русский как иностранный — для детей и взрослых, без возрастных ограничений",
    },
    cta: "Запишитесь на пробный урок!",
    dialogTitle: "Контактные данные",
  },
  featuresLabel: "Почему «Колибри»",
  features: [
    {
      title: "Опытные преподаватели",
      description:
        "Наши педагоги — профессионалы с многолетним опытом, влюблённые в русский язык и культуру.",
    },
    {
      title: "Индивидуальный подход",
      description:
        "Мы учитываем уровень, возраст и интересы каждого ребёнка, создавая комфортную среду для обучения.",
    },
    {
      title: "Креативные методики",
      description:
        "Игры, проекты, театр, кино — обучение через творчество и живое общение.",
    },
    {
      title: "Развитие талантов",
      description:
        "Концерты, выступления и творческие проекты помогают детям раскрыть свои способности.",
    },
    {
      title: "Дружелюбная атмосфера",
      description:
        "Добрая и семейная обстановка, где каждый ребёнок чувствует себя частью большой команды.",
    },
  ],
  programs: {
    heading: "Наши программы",
    items: [
      {
        title: "Уроки в классе",
        content: `Мы понимаем, что у каждого ребёнка свои цели и интересы, поэтому предлагаем разные направления обучения:

• Русский как иностранный (РКИ) — для детей и взрослых, которые делают первые шаги в языке. Без возрастных ограничений.
• Углублённое изучение — для детей, уже владеющих русским и желающих совершенствоваться.
• Творческая программа — интересные и яркие проекты.
• 🎶 Концерты и сценические выступления — дети выходят на сцену, учатся уверенности и раскрывают свои таланты.`,
      },
      {
        title: "Внешкольные мероприятия",
        content: `Школа «Колибри» — это больше, чем уроки. Мы предлагаем детям атмосферу живого общения и возможность применять язык в действии:

• Киноклуб 🎬
• Книжный клуб 📖
• Интеллектуальные игры 🧩
• Детективное агентство 🕵️‍♂️
• Театр у микрофона 🎤
• 🌍 Практика языка в реальных ситуациях
• Большие школьные концерты 🎶
• Поэтические вечера «Стихи с чаем» ☕
• Тематические курсы — например, «Мастер истории» 📜
• Скоро: новый театральный курс для младших детей 🎭

Это не просто занятия — это возможность почувствовать русский язык частью жизни.`,
      },
      {
        title: "Уровни классов",
        content: `В школе «Колибри» занятия проходят в группах по уровню знаний и возрасту ребёнка. Мы создаём атмосферу, где каждому комфортно учиться и легко делать шаг вперёд.

🔹 1. Начальный уровень — «Первые шаги»
• Подходит детям, которые только начинают знакомство с русским языком.
• Мы учим буквы, звуки, первые слова и фразы.
• Через игры, сказки и песни дети начинают говорить и понимать по-русски.

🔹 2. Средний уровень — «Я говорю и пишу»
• Для детей, которые уже говорят по-русски, но хотят улучшить грамматику, чтение и письмо.
• Уроки проходят в интерактивной форме: комиксы, викторины, проекты.
• Развиваем словарный запас, учимся выражать свои мысли.

🔹 3. Продвинутый уровень — «Мастера слова»
• Для ребят, хорошо владеющих языком.
• Чтение художественных произведений, сочинения, дебаты.
• Обсуждаем книги, фильмы, актуальные темы.
• Учащиеся готовят творческие проекты и участвуют в концертах и театральных постановках.

🔹 4. Уровень «РКИ» (русский как иностранный)
• Специальная программа для детей и взрослых, не говорящих по-русски. Без возрастных ограничений.
• Постепенное погружение в язык через игры и интерактивные методы.
• Акцент на разговорную практику и понимание на слух.`,
      },
    ],
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
    followText:
      "Свежие новости, фото с праздников и анонсы мы публикуем на нашей странице в Facebook.",
    followButton: "Открыть Facebook",
    readMore: "Читать в Facebook",
  },
  reviews: {
    heading: "Отзывы о школе",
    googleLink: "Все отзывы о нас в Google",
    items: [
      {
        name: "Jyldyz Oskoeva",
        review: "Дети ходят с удовольствием! Отличная школа!",
        fbLink: reviewLinks.jyldyz,
      },
      {
        name: "Tatiana Belogubets",
        review:
          "Спасибо за вклад поддержания русской речи и закрепления в наших детях традиций славянских стран. Мой сын всегда с радостью посещает субботние занятия.",
        fbLink: reviewLinks.tatiana,
      },
      {
        name: "Алла Колядова",
        review:
          "Спасибо, Светлана, что благодаря Вашей активности, у нас появился еще один приятный бонус! Тем более, связанный с книгами! Не сомневаемся, что Вам удастся, как обычно, пополнить библиотеку интересными экземплярами!",
        fbLink: reviewLinks.alla,
      },
      {
        name: "Larisa Kolesnikova",
        review:
          "Прекрасная школа. Ребенку очень нравится, ждет субботу с нетерпением. Преподаватели замечательные, живут своей работой, поэтому и детям интересно.",
        fbLink: reviewLinks.larisa,
      },
      {
        name: "Oksana Kutsenko",
        review:
          "Замечательная школа! Дочка ходит в эту школу уже 4 года. В школе много направлений, это не только русский язык, но и развитие речи, музыка и многое другое. Очень рекомендую школу!",
        fbLink: reviewLinks.oksana,
      },
    ],
  },
  footer: {
    aboutTitle: "О школе",
    aboutText:
      "Школа «Колибри» — это современное образовательное учреждение, где каждый ребёнок может раскрыть свой потенциал.",
    contactsTitle: "Контакты",
    phone: "Телефон",
    email: "Email",
    address: "Адрес",
    mapLink: "Открыть на карте",
    socialTitle: "Соцсети",
    schoolName: "Школа «Колибри»",
    rights: "Все права защищены.",
  },
  notFound: {
    title: "Страница не найдена",
    text: "Такой страницы нет. Возможно, ссылка устарела.",
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
  languageOffer: {
    text: "This page is also available in English.",
    action: "Switch to English",
    close: "Close",
  },
  header: {
    brand: "Kolibri",
    tagline: "Russian language school · Theatre · Library · Music · Book club",
    logoAlt: "Kolibri School logo",
    nav: { programs: "Programs", news: "News", library: "Library" },
  },
  welcome: {
    title: "Welcome to Kolibri School",
    text: "We create a space where learning Russian is not only useful but also an exciting journey into the world of knowledge, culture and creativity.",
    facts: {
      schedule: "Saturdays 9:00–16:00, plus weekday evening classes",
      ages: "Children's groups for ages 4.5 to 18",
      foreignLanguage:
        "Russian as a foreign language for children and adults of any age",
    },
    cta: "Book a trial lesson!",
    dialogTitle: "Contact us",
  },
  featuresLabel: "Why Kolibri",
  features: [
    {
      title: "Experienced teachers",
      description:
        "Our teachers are professionals with many years of experience who love the Russian language and culture.",
    },
    {
      title: "Individual approach",
      description:
        "We take each child's level, age and interests into account to create a comfortable place to learn.",
    },
    {
      title: "Creative methods",
      description:
        "Games, projects, theatre and film: learning through creativity and real conversation.",
    },
    {
      title: "Growing talents",
      description:
        "Concerts, performances and creative projects help children discover what they can do.",
    },
    {
      title: "Friendly atmosphere",
      description:
        "A kind, family-like place where every child feels part of a big team.",
    },
  ],
  programs: {
    heading: "Our programs",
    items: [
      {
        title: "Classroom lessons",
        content: `Every child has their own goals and interests, so we offer several learning tracks:

• Russian as a foreign language (RFL) — for children and adults taking their first steps in Russian, with no age limits.
• Advanced study — for children who already speak Russian and want to improve.
• Creative program — fun, colourful projects.
• 🎶 Concerts and stage performances — children go on stage, build confidence and discover their talents.`,
      },
      {
        title: "Extracurricular activities",
        content: `Kolibri is more than lessons. Children get a lively, social atmosphere and a chance to use the language in action:

• Film club 🎬
• Book club 📖
• Quiz and brain games 🧩
• Detective agency 🕵️‍♂️
• Radio theatre 🎤
• 🌍 Practising Russian in real-life situations
• Big school concerts 🎶
• Poetry evenings over tea ☕
• Themed courses, such as "History Master" 📜
• Coming soon: a new theatre course for younger children 🎭

These aren't just classes: they help children feel Russian as part of everyday life.`,
      },
      {
        title: "Class levels",
        content: `At Kolibri, children learn in groups by language level and age. Everyone feels comfortable and can easily take the next step.

🔹 1. Beginner — “First steps”
• For children who are just starting to learn Russian.
• We learn letters, sounds, first words and phrases.
• Through games, fairy tales and songs, children start to speak and understand Russian.

🔹 2. Intermediate — “I speak and write”
• For children who already speak Russian but want better grammar, reading and writing.
• Interactive lessons: comics, quizzes, projects.
• We grow vocabulary and learn to express our thoughts.

🔹 3. Advanced — “Masters of words”
• For children with a strong command of Russian.
• Reading literature, writing essays, debating.
• Discussing books, films and current topics.
• Students prepare creative projects and take part in concerts and theatre productions.

🔹 4. Russian as a foreign language (RFL)
• A special program for children and adults who don't speak Russian. No age limits.
• Gradual immersion through games and interactive methods.
• A focus on speaking practice and listening comprehension.`,
      },
    ],
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
    followText:
      "We post the latest news, event photos and announcements on our Facebook page.",
    followButton: "Open Facebook",
    readMore: "Read on Facebook",
    otherLanguageNote: "Posts from our Facebook page are in Russian.",
  },
  reviews: {
    heading: "What parents say",
    note: "Translated from Russian",
    googleLink: "All our reviews on Google",
    items: [
      {
        name: "Jyldyz Oskoeva",
        review: "The kids love going! A great school!",
        fbLink: reviewLinks.jyldyz,
      },
      {
        name: "Tatiana Belogubets",
        review:
          "Thank you for helping keep Russian alive in our children and for passing on the traditions of Slavic countries. My son always looks forward to the Saturday classes.",
        fbLink: reviewLinks.tatiana,
      },
      {
        name: "Alla Kolyadova",
        review:
          "Thank you, Svetlana! Thanks to your energy we have one more lovely bonus, and it's about books! We have no doubt you'll fill the library with great titles, as always!",
        fbLink: reviewLinks.alla,
      },
      {
        name: "Larisa Kolesnikova",
        review:
          "A wonderful school. My child loves it and can't wait for Saturday. The teachers are amazing and truly live their work, which is why the kids find it so interesting.",
        fbLink: reviewLinks.larisa,
      },
      {
        name: "Oksana Kutsenko",
        review:
          "A wonderful school! My daughter has been going here for 4 years. It offers much more than Russian: speech development, music and a lot more. Highly recommend!",
        fbLink: reviewLinks.oksana,
      },
    ],
  },
  footer: {
    aboutTitle: "About us",
    aboutText:
      "Kolibri is a modern school where every child can discover their potential.",
    contactsTitle: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    mapLink: "Open on the map",
    socialTitle: "Follow us",
    schoolName: "Kolibri School",
    rights: "All rights reserved.",
  },
  notFound: {
    title: "Page not found",
    text: "This page doesn't exist. The link may be out of date.",
    back: "Go to the home page",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { ru, en };
