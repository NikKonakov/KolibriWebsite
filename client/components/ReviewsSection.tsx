import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Jyldyz Oskoeva",
      review: "Дети ходят с удовольствием! Отличная школа!",
      fbLink: "https://www.facebook.com/jyldyz.oskoeva",
    },
    {
      name: "Tatiana Belogubets",
      review:
        "Спасибо за вклад поддержания русской речи и закрепления в наших детях традиций славянских стран. Мой сын всегда с радостью посещает субботние занятия.",
      fbLink: "https://www.facebook.com/tatiana.belogubets",
    },
    {
      name: "Алла Колядова",
      review:
        "Спасибо, Светлана, что благодаря Вашей активности, у нас появился еще один приятный бонус! Тем более, связанный с книгами! Не сомневаемся, что Вам удастся, как обычно, пополнить библиотеку интересными экземплярами!",
      fbLink: "https://www.facebook.com/alla.kolyadova",
    },
    {
      name: "Larisa Kolesnikova",
      review:
        "Прекрасная школа. Ребенку очень нравится, ждет субботу с нетерпением. Преподаватели замечательные, живут своей работой, поэтому и детям интересно.",
      fbLink: "https://www.facebook.com/larisa.kolesnikova",
    },
    {
      name: "Oksana Kutsenko",
      review:
        "Замечательная школа! Дочка ходит в эту школу уже 4 года. В школе много направлений, это не только русский язык, но и развитие речи, музыка и многое другое. Очень рекомендую школу!",
      fbLink: "https://www.facebook.com/oksana.kutsenko",
    },
  ];

  return (
    <div className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-4 flex flex-col items-center gap-4 rounded-xl border border-black/25 bg-white">
      <h2 className="text-xl md:text-2xl text-black text-center font-medium">
        Отзывы о школе
      </h2>
      <div className="w-full flex items-stretch gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
}
