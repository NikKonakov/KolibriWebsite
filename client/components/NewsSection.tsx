export default function NewsSection() {
  return (
    <div className="w-full max-w-[345px] mx-auto flex flex-col items-center gap-3 rounded-xl border border-black/[0.17] bg-white p-4">
      <h2 className="text-base text-brand-dark text-center font-normal">
        Новости
      </h2>
      <div id="fb-root"></div>
      <div className="w-full flex justify-center" id="facebook-feed-container">
        <div className="fb-page" data-href="https://www.facebook.com/profile.php?id=100023570652523" data-tabs="timeline" data-width="345" data-height="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div>
      </div>
    </div>
  );
}
