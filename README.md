# Kolibri School Website

A modern, responsive website for "Kolibri" - a Russian language school offering theater, library, music, and book club programs.

## 🎨 Project Overview

This website was **designed and migrated to code** to provide an engaging online presence for Kolibri School. The site showcases the school's programs, news, reviews, and contact information with a clean, professional design optimized for both desktop and mobile devices.

## ✨ Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing
- **Modern UI**: Built with React, TypeScript, and TailwindCSS
- **Interactive Components**: Accordion menus, dialog modals, and smooth scrolling navigation
- **Program Information**: Detailed information about class levels and extracurricular activities
- **Contact Integration**: Direct links to phone, email, WhatsApp, and social media
- **News & Reviews**: Sections for latest updates and parent testimonials

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS 3 with the `kolibri` palette (tailwind.config.ts), one Radix UI component (dialog), self-hosted Inter and Nunito fonts
- **Routing**: React Router 6 (SPA mode)
- **Backend**: Express.js server
- **Package Manager**: pnpm
- **Testing**: Vitest

## 📂 Project Structure

```
client/                  # React website
├── App.tsx              # Browser entry: styles, fonts, hydration
├── AppRoutes.tsx        # Routes: / (ru), /en (en), 404
├── entry-server.tsx     # Build-time prerender entry
├── pages/               # Index (home page), NotFound
├── components/          # Page sections + Section, IconTile, ExternalLink helpers
│   └── ui/dialog.tsx    # The only shadcn/ui component in use
├── content/             # School facts, gallery photos, news
├── i18n/                # Russian/English texts and language detection
├── seo/head.ts          # <head> tags and structured data per language
└── lib/utils.ts         # cn() class-name helper

scripts/                 # Build steps (Node.js)
├── fetch-facebook-news.mjs  # Step 1: posts from the Facebook Page
├── prerender.mjs        # Step 4: static HTML, robots.txt, sitemap.xml
└── lib/                 # Pure, unit-tested helpers for both

server/                  # Optional Express server (dev middleware, self-hosting)
shared/                  # Code shared by client, server and configs
├── api.ts               # API response types
└── security-headers.ts  # HTTP security headers (mirrored in vercel.json)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (preferred) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development

The development server runs on port 8080 by default and includes:

- Hot module replacement (HMR)
- TypeScript type checking
- Integrated Express backend

### Available Scripts

- `pnpm dev` - Start development server (client + server)
- `pnpm build` - Production build: Facebook news → client bundle → SSR bundle → prerendered pages
- `pnpm news` - Only fetch Facebook news (needs `FB_PAGE_TOKEN`)
- `pnpm build:server` + `pnpm start` - Optional self-hosted Node.js server
- `pnpm typecheck` - TypeScript validation (strict mode)
- `pnpm test` - Unit tests (Vitest)

After `pnpm build`, run `npx vite preview` to test the production build locally with the same security headers as Vercel.

## 🔒 Security

- **Secrets**: real values live only in Vercel's Environment Variables or a local `.env`, which git ignores. `.env.example` lists every setting. Never commit tokens.
- **Facebook token**: read at build time only, sent in a request header (never in a URL or log), never included in the website bundle.
- **HTTP security headers** (`shared/security-headers.ts`, mirrored in `vercel.json`): a strict Content Security Policy (scripts, styles, images and fonts only from this site), clickjacking protection, `nosniff`, a strict referrer policy and disabled browser permissions. A unit test fails if the two copies differ.
- **No third-party requests**: fonts are self-hosted, the Facebook SDK is gone, news photos are downloaded at build time.
- **External links** go through `ExternalLink`, which always adds `rel="noopener noreferrer"`.
- **Data from Facebook** is validated: only https links, image files under 5 MB with digit-only names, timeouts on every request.
- **Dependencies**: only packages the site uses (24, down from 79); check with `pnpm audit`. pnpm doesn't run dependency install scripts unless approved.

## 🎯 Key Sections

In page order (`client/pages/Index.tsx`):

1. **Header**: logo, RU/EN switcher, "Trial lesson" button, section menu
2. **Hero**: headline, call to action, stage photo, four key facts (schedule, ages, levels, area)
3. **Why us**: five reasons parents choose Kolibri
4. **Programs** (`Directions.tsx`): the school's five programs, in the school's own wording, plus the library panel (sign in to the Libib catalog, or register through WhatsApp: Libib has no self-registration)
5. **Levels**: four class levels, from "First steps" to Russian as a foreign language
6. **School life**: photo gallery with a full-size viewer
7. **News**: latest posts from the Facebook Page
8. **Reviews**: parents' reviews and a link to Google reviews
9. **Contact**: WhatsApp, call, email, address and map
10. **Footer**: copyright and social links

All texts live in `client/i18n/translations.ts`; colors in the `kolibri` palette of `tailwind.config.ts`.

## 🔎 SEO & Languages

- **Two languages**: Russian at `/`, English at `/en/`. Texts live in `client/i18n/translations.ts`.
- **Language detection**: a visitor's earlier choice is restored automatically; otherwise a small banner offers the other language based on the browser language (`client/i18n/detect.ts`).
- **Prerendered HTML**: `pnpm build` renders both pages to static HTML (`scripts/prerender.mjs`), so Google sees the full text without running JavaScript.
- **Site address**: set `SITE_URL` (e.g. `https://kolibrischool.ca`) in the hosting settings. On Vercel it falls back to the production domain automatically. It is used for canonical and hreflang links, `sitemap.xml` and `robots.txt`.
- **School facts** (phone, address, links): `client/content/school.ts`.
- **News cards**: pulled from the school's Facebook Page at build time (see below); optional manual news in `client/content/news.ts`.

## 📰 Facebook news

The News section shows the 6 latest posts from the school's Facebook Page. `scripts/fetch-facebook-news.mjs` downloads them during `pnpm build`, so they are part of the HTML that Google reads. A GitHub Action rebuilds the site every morning.

One-time setup (about 30 minutes, done by someone who manages the Page):

1. **Create a Meta app**: [developers.facebook.com/apps](https://developers.facebook.com/apps) → Create app → "Other" → "Business". Name it e.g. "Kolibri Website". Leave it in Development mode.
2. **Get a short-lived token**: [Graph API Explorer](https://developers.facebook.com/tools/explorer/) → pick the app → add permissions `pages_show_list` and `pages_read_engagement` → Generate Access Token → choose the Kolibri Page.
3. **Make it long-lived**: [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/) → paste the token → Debug → "Extend Access Token" → copy the new token.
4. **Get the Page token**: back in Graph API Explorer, paste the long-lived token and run `GET me/accounts`. Copy the `access_token` of the Kolibri Page. Check it in the Access Token Debugger: "Expires" should say "Never".
5. **Add it to Vercel**: Project → Settings → Environment Variables → `FB_PAGE_TOKEN` = the Page token (Production and Preview) → redeploy.
6. **Daily refresh**: Vercel → Settings → Git → Deploy Hooks → create one for the production branch → copy the URL. GitHub → this repo → Settings → Secrets and variables → Actions → New secret `VERCEL_DEPLOY_HOOK` = that URL. The project must be connected to GitHub in Vercel for deploy hooks to exist.

How a post becomes a card: a first line of up to 100 characters becomes the card title, and a one-line post is shown as a title only. Emoji are kept, and long texts are never cut in the middle of an emoji.

Test locally: `FB_PAGE_TOKEN=... pnpm news`, then `pnpm dev`.

If the token stops working (the person who created it lost access to the Page, changed their password, or Meta reset it), the build still succeeds and the section shows only the Facebook button. The build log then says "Facebook returned an error": repeat steps 2–5.

## 🐞 Problem reports

The footer link "Сообщить об ошибке на сайте" / "Report a website problem" opens a new GitHub issue with the form in `.github/ISSUE_TEMPLATE/site-problem.yml`. Reporters need a free GitHub account. Issues are public, so the form asks people not to share phone numbers, addresses or children's names. Questions about classes are sent to the school's WhatsApp instead (`.github/ISSUE_TEMPLATE/config.yml`).

## 🌐 Deployment

### Vercel Deployment (Recommended)

#### Option 1: Via GitHub (Easiest)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Vercel will auto-detect settings and deploy

#### Option 2: Using Vercel CLI

**Step 1: Install Vercel CLI**

```bash
npm i -g vercel
```

**Step 2: Login to Vercel**

```bash
vercel login
```

This will open your browser to authenticate.

**Step 3: Deploy**

```bash
# For production deployment
vercel --prod

# For preview deployment (development)
vercel
```

**Step 4: Link to Existing Project (if needed)**

If you already have a Vercel project:

```bash
vercel link
```

Follow the prompts to link to your existing project.

#### Vercel CLI Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview (staging)
vercel

# Check deployment status
vercel inspect <deployment-url>

# List all deployments
vercel ls

# Remove a deployment
vercel rm <deployment-name>

# View logs
vercel logs <deployment-url>

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add <NAME>
```

#### Project Configuration

The project includes:

- `vercel.json` - build, routes (/en redirect, real 404s), security and cache headers
- `.vercelignore` - Files to exclude from deployment

#### Environment Variables

To add environment variables in Vercel:

**Via Dashboard:**

1. Go to Project Settings → Environment Variables
2. Add your variables

**Via CLI:**

```bash
vercel env add VARIABLE_NAME
```

#### Custom Domain

To add a custom domain:

**Via Dashboard:**

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

**Via CLI:**

```bash
vercel domains add yourdomain.com
```

### Netlify Deployment

The project is also configured for Netlify deployment with `netlify.toml`.

### Traditional Hosting

For traditional Node.js hosting:

```bash
pnpm build
pnpm start
```

## 📱 Mobile Optimization

The website is fully responsive with:

- Adaptive typography and spacing
- Touch-friendly navigation
- Optimized images and assets
- Mobile-first design approach

## 📄 License

This project is designed and developed for Kolibri School.

## 👤 Author

**Designed and migrated to code by**: [Your Name]

---

For more information about Kolibri School, visit the website or contact:

- 📞 Phone: +1 (403) 614-0284
- 📧 Email: kolibrischool1@gmail.com
