/**
 * Works out the site's public address for canonical and hreflang links,
 * sitemap.xml and robots.txt from the build environment, in this order:
 *   SITE_URL                       set by you, e.g. https://kolibrischool.ca
 *   VERCEL_PROJECT_PRODUCTION_URL  set by Vercel, e.g. kolibri.vercel.app
 *   URL                            set by Netlify
 *
 * Returns the origin without a trailing slash ("https://kolibrischool.ca"),
 * or undefined when none is set. Throws on a malformed or non-https value, so
 * a typo fails the build instead of publishing broken links.
 * @param {Record<string, string | undefined>} env usually process.env
 * @returns {string | undefined}
 */
export function resolveSiteUrl(env) {
  const raw =
    env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    env.URL;
  if (!raw) return undefined;

  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Site address "${raw}" is not a valid URL.`);
  }
  if (url.protocol !== "https:") {
    throw new Error(`Site address "${raw}" must start with https://`);
  }
  return url.origin;
}
