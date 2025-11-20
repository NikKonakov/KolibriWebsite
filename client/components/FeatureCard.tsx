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
    <div className="flex flex-col items-center gap-2 w-[183px] flex-shrink-0 p-3 border border-black/25 rounded-xl bg-brand-light">
      <div className="w-[73px] h-[73px] relative">{icon}</div>
      <h3 className="text-xl text-black text-center font-normal">{title}</h3>
      <p className="text-sm text-black text-center font-normal">
        {description}
      </p>
    </div>
  );
}
