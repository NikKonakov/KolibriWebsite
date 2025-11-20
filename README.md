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
