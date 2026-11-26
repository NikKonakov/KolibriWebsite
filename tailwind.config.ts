import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Tailwind theme for the Kolibri website.
 *
 * `kolibri.*` is the site palette, named by role rather than by color, so a
 * component says what a color is for ("muted text", "line") instead of
 * repeating hex codes. Every text/background pair used on the site meets
 * WCAG AA contrast. The shadcn/ui tokens below it serve the dialog component
 * (values in client/global.css).
 */
export default {
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kolibri: {
          cream: "#FFF9F0", // page background
          ink: "#1F3346", // main text, dark sections
          body: "#33475B", // longer card text
          muted: "#4A5D70", // secondary text
          line: "#EFE6D8", // borders and dividers
          chip: "#F3EEE6", // language switch background
          outline: "#D8CDBD", // outlined button border
          orange: "#F6A623", // main buttons (with ink text)
          "orange-soft": "#FFEBCB", // icon tiles
          "orange-deep": "#E08A00", // decorative quote marks
          sand: "#FFF1DA", // reviews section
          teal: "#0F6E68", // links and library buttons
          "teal-dark": "#0F5F5A", // text on teal-soft
          "teal-soft": "#E3F2F0", // icon tiles, kicker
          "teal-bg": "#E9F5F3", // directions section
          "teal-icon": "#0F7A73", // fact icons
          "teal-badge": "#CFEAE6", // the RFL level badge
          "navy-card": "#2A4259", // address card on the contact section
          "navy-deep": "#16263A", // footer
          "on-navy": "#C9D4DF", // text on dark sections
          "on-navy-strong": "#E4EAF0",
          "navy-outline": "#6B8094", // outlined button on dark sections
          gold: "#FFC966", // links on dark sections
          whatsapp: "#3DDC84",
          "whatsapp-ink": "#102A1C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        // Self-hosted variable fonts with Cyrillic (imported in client/App.tsx).
        sans: ["Inter Variable", "system-ui", "sans-serif"],
        display: [
          "Nunito Variable",
          "Inter Variable",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // Enter/exit animations of the dialog (animate-in, fade-in-0, zoom-in-95…).
  plugins: [animate],
} satisfies Config;
