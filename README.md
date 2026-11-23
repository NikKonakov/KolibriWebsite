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
- **Styling**: TailwindCSS 3 + Radix UI components
- **Routing**: React Router 6 (SPA mode)
- **Backend**: Express.js server
- **Package Manager**: pnpm
- **Testing**: Vitest

## 📂 Project Structure

```
client/               # React frontend
├── components/       # Reusable React components
├── pages/           # Route pages
└── lib/             # Utility functions

server/              # Express backend
├── routes/          # API endpoints
└── index.ts         # Server configuration

shared/              # Shared TypeScript types
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
- `pnpm build` - Create production build
- `pnpm start` - Run production server
- `pnpm typecheck` - Run TypeScript validation
- `pnpm test` - Run test suite

## 🎯 Key Sections

1. **Header**: Responsive navigation with logo and menu
2. **Welcome Banner**: Introduction with call-to-action for trial lessons
3. **Why Choose Us**: Highlights of school's unique offerings
4. **Programs**: Detailed accordion of class levels and activities
5. **News**: Latest updates and announcements
6. **Reviews**: Parent and student testimonials
7. **Footer**: Contact information and social media links

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

Test locally: `FB_PAGE_TOKEN=... pnpm news`, then `pnpm dev`.

If the token stops working (the person who created it lost access to the Page, changed their password, or Meta reset it), the build still succeeds and the section shows only the Facebook button. The build log then says "Facebook returned an error": repeat steps 2–5.

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

- `vercel.json` - Vercel configuration file
- `.vercelignore` - Files to exclude from deployment
- `api/` folder - Serverless functions for API endpoints

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
