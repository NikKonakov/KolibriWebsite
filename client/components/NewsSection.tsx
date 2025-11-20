import { useEffect } from "react";

export default function NewsSection() {
  useEffect(() => {
    // Parse Facebook plugins after component mounts
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div
      id="news"
      className="w-full max-w-[345px] lg:max-w-4xl mx-auto flex flex-col items-center gap-4 rounded-xl border border-black/[0.17] bg-white p-6 scroll-mt-20"
    >
      <h2 className="text-xl md:text-2xl text-brand-dark text-center font-medium">
        Новости
      </h2>
      <div id="fb-root"></div>
      <div
        className="w-full flex justify-center min-h-[500px]"
        id="facebook-feed-container"
      >
        <div
          className="fb-page"
          data-href="https://www.facebook.com/profile.php?id=100023570652523"
          data-tabs="timeline"
          data-width=""
          data-height="500"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        ></div>
      </div>
    </div>
  );
}
