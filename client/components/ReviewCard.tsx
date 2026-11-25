import ExternalLink from "./ExternalLink";

interface ReviewCardProps {
  name: string;
  review: string;
  /** Reviewer's Facebook profile; when set, the whole card links to it. */
  fbLink?: string;
  /** Tailwind gradient classes for the avatar circle. */
  avatarColor?: string;
}

const cardClass =
  "flex flex-col items-start gap-3 w-[280px] min-h-[200px] flex-shrink-0 p-4 border border-black/25 rounded-xl bg-brand-light snap-start";

/**
 * Up to two capital initials for the avatar: "Larisa Kolesnikova" → "LK".
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * One parent review: an avatar with initials, the name and the review text.
 * The avatar color is passed in rather than random, because a random color
 * would differ between the prerendered HTML and the browser.
 */
export default function ReviewCard({
  name,
  review,
  fbLink,
  avatarColor = "from-brand-orange to-amber-400",
}: ReviewCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3 w-full">
        <div
          className={`w-[50px] h-[50px] rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center flex-shrink-0`}
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

  return fbLink ? (
    <ExternalLink
      href={fbLink}
      className={`${cardClass} hover:shadow-lg transition-shadow cursor-pointer`}
    >
      {content}
    </ExternalLink>
  ) : (
    <div className={cardClass}>{content}</div>
  );
}
