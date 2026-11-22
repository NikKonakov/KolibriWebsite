interface ReviewCardProps {
  name: string;
  review: string;
  fbLink?: string;
  avatarColor?: string;
}

export default function ReviewCard({
  name,
  review,
  fbLink,
  avatarColor,
}: ReviewCardProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Fixed fallback colour: a random one would differ between the
  // prerendered HTML and the browser and break hydration.
  const gradient = avatarColor || "from-brand-orange to-amber-400";

  const content = (
    <>
      <div className="flex items-center gap-3 w-full">
        <div
          className={`w-[50px] h-[50px] rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-bold text-lg">
            {getInitials(name)}
          </span>
        </div>
        <h3 className="text-sm md:text-base text-black font-semibold flex-1">
          {name}
        </h3>
      </div>
      <div className="flex-1 w-full">
        <p className="text-xs md:text-sm text-black font-normal leading-relaxed">
          {review}
        </p>
      </div>
    </>
  );

  if (fbLink) {
    return (
      <a
        href={fbLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start gap-3 w-[280px] min-h-[200px] flex-shrink-0 p-4 border border-black/25 rounded-xl bg-brand-light snap-start hover:shadow-lg transition-shadow cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 w-[280px] min-h-[200px] flex-shrink-0 p-4 border border-black/25 rounded-xl bg-brand-light snap-start">
      {content}
    </div>
  );
}
