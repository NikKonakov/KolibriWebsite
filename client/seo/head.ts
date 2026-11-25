import { dictionaries } from "@/i18n/translations";
import { LANG_PATH, LANGS, type Lang } from "@/i18n/detect";
import { school } from "@/content/school";

/**
 * Escapes text for use inside an HTML attribute (title, description, …),
 * so a quote or "<" in a translation can't break or inject markup.
 */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * <head> tags for one language version: title, description, canonical,
 * hreflang alternates, Open Graph and schema.org structured data.
 * `siteUrl` is the production origin, e.g. "https://kolibrischool.ca".
 * Without it, tags that need absolute URLs are left out.
 */
export function renderHead(lang: Lang, siteUrl?: string): string {
  const m = dictionaries[lang].meta;
  /** Absolute URL of a path on this site, or undefined without a site URL. */
  const abs = (path: string) => (siteUrl ? siteUrl + path : undefined);
  const url = abs(LANG_PATH[lang]);
  const logo = abs(school.logo);
  const image = abs("/og-image.jpg");

  const tags: string[] = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(m.siteName)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];

  if (siteUrl) {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      ...LANGS.map(
        (l) =>
          `<link rel="alternate" hreflang="${l}" href="${abs(LANG_PATH[l])}" />`,
      ),
      // Visitors whose language is neither Russian nor English get English.
      `<link rel="alternate" hreflang="x-default" href="${abs(LANG_PATH.en)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(m.ogImageAlt)}" />`,
    );
  }

  const a = school.address;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Kolibri School",
    alternateName: ["Школа «Колибри»", "Колибри", "Kolibri Russian School"],
    description: m.description,
    ...(siteUrl && { url: siteUrl + "/", logo, image }),
    telephone: school.phoneE164,
    email: school.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.street}, ${a.unit}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    areaServed: { "@type": "City", name: "Calgary" },
    knowsLanguage: ["ru", "en"],
    sameAs: [school.facebook, school.instagram].filter(Boolean),
  };

  // "<" is escaped so text inside the JSON can never close the <script> tag.
  tags.push(
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`,
  );

  return tags.join("\n    ");
}
