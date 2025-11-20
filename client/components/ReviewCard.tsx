interface ReviewCardProps {
  name: string;
  review: string;
}

export default function ReviewCard({ name, review }: ReviewCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-[183px] flex-shrink-0 p-3 border border-black/25 rounded-xl bg-brand-light">
      <div className="w-[73px] h-[73px] relative">
        <svg className="w-full h-full" viewBox="0 0 73 73" fill="none">
          <circle cx="36.5" cy="36.5" r="36.5" fill="#FFB84D" />
          <path
            d="M36.5 9.125L43.648 26.645L62.5367 28.0442L48.0584 40.2717L52.5905 58.6433L36.5 48.6667L20.4096 58.6433L24.9417 40.2717L10.4634 28.0442L29.3521 26.645L36.5 9.125Z"
            fill="#FFA629"
          />
          <path
            d="M36.5 9.125L29.3521 26.645L10.4634 28.0442L24.9417 40.2717L20.4096 58.6433L36.5 48.6667M36.5 9.125L43.648 26.645L62.5367 28.0442L48.0584 40.2717L52.5905 58.6433L36.5 48.6667"
            stroke="#FFA629"
            strokeWidth="6.08333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-xl text-black text-center font-normal underline">
        {name}
      </h3>
      <div className="flex-1 overflow-y-auto max-h-[150px]">
        <p className="text-sm text-black font-normal">{review}</p>
      </div>
    </div>
  );
}
