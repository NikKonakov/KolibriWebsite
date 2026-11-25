/**
 * HTTP security headers sent with every page and file of the site.
 *
 * Production (Vercel) reads its own copy in vercel.json, because Vercel can't
 * import TypeScript. shared/security-headers.spec.ts fails the test run if the
 * two copies ever differ. `vite preview` and the self-hosted Express server use
 * this file directly, so local testing sees exactly what production sends.
 */

/**
 * Content Security Policy: the browser may only load code, styles, images and
 * fonts from the site itself. Even if someone managed to inject HTML into a
 * page, the browser would refuse to run scripts from anywhere else.
 */
export const CONTENT_SECURITY_POLICY = [
  // Anything not listed below: only from this site.
  "default-src 'self'",
  // JavaScript: only our own bundled files; no inline scripts, no eval.
  "script-src 'self'",
  // CSS: our files plus inline style attributes (React and the prerendered
  // HTML use them; they can't run code).
  "style-src 'self' 'unsafe-inline'",
  // Images: our files plus small inline SVG patterns (data: URLs) in the CSS.
  "img-src 'self' data:",
  // Fonts are self-hosted (no Google Fonts requests).
  "font-src 'self'",
  // The page makes no network requests to other sites.
  "connect-src 'self'",
  // No Flash/Java-style plugins.
  "object-src 'none'",
  // Stops an injected <base> tag from redirecting relative links.
  "base-uri 'self'",
  // Forms (none today) may only submit to this site.
  "form-action 'self'",
  // Other sites can't show this site in a frame (clickjacking protection).
  "frame-ancestors 'none'",
].join("; ");

export const securityHeaders: Record<string, string> = {
  "Content-Security-Policy": CONTENT_SECURITY_POLICY,
  // Browsers must trust the declared file type instead of guessing it.
  "X-Content-Type-Options": "nosniff",
  // Older browsers' version of frame-ancestors 'none'.
  "X-Frame-Options": "DENY",
  // Other sites see only our domain, never the full page address.
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // The site never needs the camera, microphone, location, payments or USB.
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  // Pages opened from our links can't control this tab, and vice versa.
  "Cross-Origin-Opener-Policy": "same-origin",
};
