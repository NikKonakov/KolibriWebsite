/**
 * School facts in one place. Update contacts, address and links here;
 * every component, the SEO tags and the structured data read from this file.
 */
export const school = {
  phone: "+1 (403) 614-0284",
  phoneHref: "tel:+14036140284",
  phoneE164: "+1-403-614-0284",
  whatsapp: "https://wa.me/14036140284",
  email: "kolibrischool1@gmail.com",
  address: {
    street: "10325 Bonaventure Dr SE",
    unit: "Unit 408, Floor 4",
    city: "Calgary",
    region: "AB",
    postalCode: "T2J 0P8",
    country: "CA",
  },
  facebook: "https://www.facebook.com/profile.php?id=100023570652523",
  /** The school's Google Business Profile (map, directions, reviews). */
  google: "https://share.google/T9zxHCx3SHUTZM9sc",
  /** Leave empty until the school has a real Instagram account; the icon is hidden while empty. */
  instagram: "",
  library: "https://www.libib.com/u/kolibrischool",
  /**
   * "Report a website problem" in the footer: opens a new GitHub issue in the
   * site's repository with the form in .github/ISSUE_TEMPLATE/site-problem.yml.
   * It needs a free GitHub account, and issues are public.
   */
  reportProblem:
    "https://github.com/NikKonakov/KolibriWebsite/issues/new?template=site-problem.yml",
  logo: "/kolibriImageCanva.jpg",
} as const;

/**
 * Link that opens a WhatsApp chat with the school, optionally with a
 * pre-filled message (e.g. a library registration request). The message is
 * URL-encoded, so quotes, «» and line breaks can't break the link.
 */
export function whatsappLink(message?: string): string {
  return message
    ? `${school.whatsapp}?text=${encodeURIComponent(message)}`
    : school.whatsapp;
}
