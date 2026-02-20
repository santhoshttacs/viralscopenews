# ViralScopeNews

AI-powered news website covering **Artificial Intelligence**, **Technology**, **Cryptocurrency**, and **Middle East Business**.

Built with **Next.js 14** (App Router), **Supabase** (PostgreSQL), and **OpenAI GPT-4o-mini** for content rewriting.

---

## Quick Start

### Prerequisites

- **Node.js** 18+ — [Download](https://nodejs.org/)
- **Supabase** account — [Sign up](https://supabase.com)
- **OpenAI** API key — [Get key](https://platform.openai.com/api-keys)
- **NewsAPI** key — [Get key](https://newsapi.org/register)

### 1. Install Dependencies

```bash
cd "News web"
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all values:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API |
| `OPENAI_API_KEY` | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `NEWS_API_KEY` | [NewsAPI](https://newsapi.org/register) |
| `JWT_SECRET` | Any random 32+ character string |
| `CRON_SECRET` | Any random secret for cron auth |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD` | Your admin login password |

### 3. Set Up Database

1. Go to your Supabase project → **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run**

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Key URLs

| Page | URL |
|---|---|
| Homepage | `/` |
| AI News | `/ai` |
| Tech News | `/tech` |
| Crypto News | `/crypto` |
| Middle East | `/middle-east` |
| Admin Login | `/admin/login` |
| Admin Dashboard | `/admin` |
| About | `/about` |
| Privacy Policy | `/privacy` |
| Terms | `/terms` |
| Contact | `/contact` |
| Sitemap | `/sitemap.xml` |

---

## Content Automation

### Manual Trigger

From the admin dashboard, click **"Fetch New Articles"** and enter your `CRON_SECRET`.

### Automated Cron (Vercel)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/fetch-news",
      "schedule": "*/10 * * * *"
    }
  ]
}
```

### External Cron Service

Use [cron-job.org](https://cron-job.org) (free) to call:

```
POST https://your-domain.com/api/fetch-news
Authorization: Bearer YOUR_CRON_SECRET
```

Every 10 minutes.

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy

### Environment Variables in Vercel

Add each variable from `.env.example` into Vercel's Environment Variables section (Settings → Environment Variables).

---

## Google AdSense Integration

### Before Applying

1. ✅ Publish 15–20+ quality articles across all categories
2. ✅ Ensure all legal pages exist (About, Privacy, Terms, Contact)
3. ✅ Submit sitemap to Google Search Console
4. ✅ Wait for Google to index at least 10 pages

### Applying for AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up with your domain
3. Add the verification code to your site
4. Wait for approval (typically 1-4 weeks)

### After Approval

1. Get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
2. Add to `.env.local`: `NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX`
3. Replace ad placeholder components with actual AdSense ad units
4. Create ad units in AdSense dashboard and replace the `AdPlaceholder` component

### Ad Placement Strategy

- **Header Leaderboard** (728×90) — above main content
- **In-Article** (responsive) — between key takeaways and article body
- **Sidebar** (300×250) — in sidebar widget area

Keep ads minimal during the first month to maintain AdSense compliance.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (SEO meta, header, footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Complete design system
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt
│   ├── [category]/
│   │   ├── page.tsx        # Category listing
│   │   └── [slug]/
│   │       └── page.tsx    # Article detail
│   ├── about/              # About Us
│   ├── privacy/            # Privacy Policy
│   ├── terms/              # Terms & Conditions
│   ├── contact/            # Contact form
│   ├── editorial-policy/   # Editorial Policy
│   ├── author/[id]/        # Author profile
│   ├── admin/
│   │   ├── login/          # Admin login
│   │   └── page.tsx        # Dashboard
│   └── api/
│       ├── fetch-news/     # Cron endpoint
│       ├── articles/       # CRUD API
│       ├── contact/        # Contact form API
│       └── admin/auth/     # Auth API
├── components/             # Reusable UI components
└── lib/                    # Utilities (Supabase, OpenAI, RSS)
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, SSR/ISR)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4o-mini
- **Auth:** JWT + bcrypt
- **Styling:** Vanilla CSS (Dark theme)
- **Deployment:** Vercel
- **News Sources:** NewsAPI + Google News RSS + Tech RSS feeds

---

## License

© 2026 ViralScopeNews. All rights reserved.
