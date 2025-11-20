interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-[183px] min-h-[280px] flex-shrink-0 p-4 border border-black/25 rounded-xl bg-brand-light snap-start">
      <div className="w-[73px] h-[73px] relative">{icon}</div>
      <h3 className="text-base md:text-lg text-black text-center font-semibold">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-black text-center font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
