import FeatureCard from "./FeatureCard";
import { GraduationCap, User, Lightbulb, Trophy, Heart } from "lucide-react";

export default function WhyUsSection() {
  const features = [
    {
      icon: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-orange to-amber-400 rounded-full">
          <GraduationCap className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      ),
      title: "Опытные преподаватели",
      description:
        "Наши педагоги — профессионалы с многолетним опытом, влюблённые в русский язык и культуру.",
    },
    {
      icon: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-full">
          <User className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      ),
      title: "Индивидуальный подход",
      description:
        "Мы учитываем уровень, возраст и интересы каждого ребёнка, создавая комфортную среду для обучения.",
    },
    {
      icon: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500 rounded-full">
          <Lightbulb className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      ),
      title: "Креативные методики",
      description:
        "Игры, проекты, театр, кино — обучение через творчество и живое общение.",
    },
    {
      icon: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 rounded-full">
          <Trophy className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      ),
      title: "Развитие талантов",
      description:
        "Концерты, выступления и творческие проекты помогают детям раскрыть свои способности.",
    },
    {
      icon: (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600 rounded-full">
          <Heart className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      ),
      title: "Дружелюбная атмосфера",
      description:
        "Добрая и семейная обстановка, где каждый ребёнок чувствует себя частью большой команды.",
    },
  ];

  return (
    <div className="w-full max-w-[345px] lg:max-w-4xl mx-auto p-5 border border-black/25 rounded-xl bg-white">
      <div className="flex items-stretch gap-5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}
