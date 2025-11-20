import { useState } from "react";

interface ProgramItem {
  title: string;
  content: string;
}

export default function ProgramsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const programs: ProgramItem[] = [
    {
      title: "Уроки в классе",
      content: `Мы понимаем, что у каждого ребёнка свои цели и интересы, поэтому предлагаем разные направления обучения:
	•	Русский как иностранный (РКИ) – для тех, кто делает первые шаги в языке.
	•	Углублённое изучение – для детей, уже владеющих русским и желающих совершенствоваться.
	•	Творческая программа – интересные и яркие проекты.
	•	🎶 Концерты и сценические выступления – дети выходят на сцену, учатся уверенности и раскрывают свои таланты.`,
    },
    {
      title: "Внешкольные мероприятия",
      content: `Школа «Колибри» — это больше, чем уроки. Мы предлагаем детям атмосферу живого общения и возможность применять язык в действии:
	•	Киноклуб 🎬
	•	Книжный клуб 📖
	•	Интеллектуальные игры 🧩
	•	Детективное агентство 🕵️‍♂️
	•	Театр у микрофона 🎤
	•	🌍 Практика языка в реальных ситуациях

Это не просто занятия — это возможность почувствовать русский язык частью жизни.`,
    },
    {
      title: "Уровни классов",
      content: `В школе «Колибри» занятия проходят в группах по уровню знаний и возрасту ребёнка. Мы создаём атмосферу, где каждому комфортно учиться и легко делать шаг вперёд.

🔹 1. Начальный уровень – «Первые шаги»
	 •	Подходит детям, которые только начинают знакомство с русским языком.
	 •	Мы учим буквы, звуки, первые слова и фразы.
	 •	Через игры, сказки и песни дети начинают говорить и понимать по-русски.

🔹 2. Средний уровень – «Я говорю и пишу»
	 •	Для детей, которые уже говорят по-русски, но хотят улучшить грамматику, чтение и письмо.
 	•	Уроки проходят в интерактивной форме: комиксы, викторины, проекты.
	 •	Развиваем словарный запас, учимся выражать свои мысли.

🔹 3. Продвинутый уровень – «Мастера слова»
	 •	Для ребят, хорошо владеющих языком.
 	•	Чтение художественных произведений, сочинения, дебаты.
	 •	Обсуждаем книги, фильмы, актуальные темы.
	 •	Учащиеся готовят творческие проекты и участвуют в концертах и театральных постановках.

🔹 4. Уровень "РКИ"`,
    },
  ];

  return (
    <div className="w-full max-w-[345px] lg:max-w-2xl mx-auto p-4 flex flex-col items-center gap-7 rounded-xl border border-black/25 bg-white">
      <h2 className="text-base md:text-xl text-brand-dark text-center font-medium">
        Наши Программы
      </h2>
      <div className="w-full flex flex-col gap-0">
        {programs.map((program, index) => (
          <div
            key={index}
            className="border-t border-[#E2E8F0] pb-4 bg-black/[0.01]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-4 text-left hover:bg-black/[0.02] transition-colors"
            >
              <h3 className="text-base md:text-lg text-brand-dark font-medium flex-1">
                {program.title}
              </h3>
            </button>
            {openIndex === index && (
              <p className="text-sm md:text-base text-brand-text font-normal whitespace-pre-wrap">
                {program.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
