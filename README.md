# Artist Portfolio

A minimalist, content-managed portfolio site for visual artists. Built with Next.js 16 App Router and Sanity.io as the headless CMS. Features ISR (Incremental Static Regeneration), an embedded Sanity Studio at `/studio`, and a filterable project gallery.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Sanity CMS Setup](#sanity-cms-setup)
- [Customizing Site Content](#customizing-site-content)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [ISR Webhook (On-Demand Revalidation)](#isr-webhook-on-demand-revalidation)
- [Content Schema Reference](#content-schema-reference)

---

## Tech Stack

| Layer         | Technology                                           |
| ------------- | ---------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) — App Router + ISR  |
| Language      | TypeScript 5                                         |
| Styling       | CSS Modules + CSS custom properties (no Tailwind)    |
| Fonts         | Syne (display) + DM Sans (body) via `next/font`      |
| CMS           | [Sanity.io](https://sanity.io) v3 + GROQ queries     |
| Images        | `next/image` + Sanity Image URL builder              |
| Deployment    | Vercel (recommended)                                 |

---

## Project Structure

```
artist-pf/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Nav, Footer)
│   ├── page.tsx                # Home page (Hero + featured projects)
│   ├── about/page.tsx          # About page
│   ├── work/
│   │   ├── page.tsx            # Gallery with category filter
│   │   └── [slug]/page.tsx     # Individual project detail page
│   ├── contact/page.tsx        # Contact form
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio (at /studio)
│   ├── api/revalidate/route.ts # ISR webhook endpoint
│   └── sitemap.ts              # Auto-generated XML sitemap
├── components/
│   ├── Nav.tsx                 # Sticky header + mobile hamburger menu
│   ├── Hero.tsx                # Full-viewport hero section
│   ├── GalleryGrid.tsx         # Filterable project grid (client component)
│   ├── ProjectCard.tsx         # Individual project card
│   ├── ContactForm.tsx         # Contact form
│   └── Footer.tsx
├── lib/
│   ├── sanity.ts               # Sanity client + urlFor() image helper
│   ├── content.ts              # GROQ query functions (getAllProjects, etc.)
│   └── siteConfig.ts           # Artist name, email, socials — edit this
├── sanity/
│   └── schemas/
│       ├── project.ts          # "project" document schema
│       └── index.ts            # Schema registry
├── sanity.config.ts            # Sanity Studio configuration
├── content/                    # Legacy markdown files (backup only)
└── scripts/
    └── seed-sanity.ts          # One-time migration script (md → Sanity)
```

---

## Prerequisites

- **Node.js** 18.17 or later
- **npm** (comes with Node) or **pnpm** / **yarn**
- A free [Sanity.io account](https://www.sanity.io/get-started)

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Sanity project credentials — get these from sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Secret token used to protect the ISR revalidation webhook
# Generate any random string, e.g.: openssl rand -hex 32
SANITY_REVALIDATE_SECRET=your_secret_token

# Full URL of your deployed site (used for sitemap generation)
# Leave empty during local development
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.
> `SANITY_REVALIDATE_SECRET` is server-only and must never be prefixed with `NEXT_PUBLIC_`.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/artist-pf.git
cd artist-pf
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example above into `.env.local` and fill in your Sanity credentials (see [Sanity CMS Setup](#sanity-cms-setup) below).

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

---

## Sanity CMS Setup

If you do not have a Sanity project yet, follow these steps:

### 1. Create a Sanity project

```bash
npx sanity init
```

Follow the prompts. Choose **"Create a new project"**, give it a name, and select **"production"** as the dataset. Skip creating a Studio folder — the Studio is already embedded in this Next.js app.

Alternatively, create a project directly at [sanity.io/manage](https://www.sanity.io/manage).

### 2. Copy your credentials

From [sanity.io/manage](https://www.sanity.io/manage), find your project and copy:
- **Project ID** → `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Dataset** (usually `production`) → `NEXT_PUBLIC_SANITY_DATASET`

Paste these values into `.env.local`.

### 3. Add API permissions (CORS)

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**, add:

- `http://localhost:3000` (development)
- `https://your-site.vercel.app` (production)

This is required for the embedded Studio to communicate with the Sanity API.

### 4. Add an API token (for the seed script, if using it)

In sanity.io/manage → **API** → **Tokens**, create a token with **"Editor"** permissions. Add it to `.env.local`:

```env
SANITY_API_TOKEN=your_editor_token
```

> This token is only needed if you run the `seed-sanity.ts` migration script. You can skip this if you're starting fresh and will add content manually through the Studio.

### 5. Open the Studio and add your content

Visit [http://localhost:3000/studio](http://localhost:3000/studio). You'll see the **Artist Portfolio CMS** with a **Projects** document type. Create your first project from here.

---

## Customizing Site Content

### Artist name, email, and social links

Edit [lib/siteConfig.ts](lib/siteConfig.ts):

```ts
export const siteConfig = {
  artistName: "Your Name",
  email: "hello@yoursite.com",
  availability: "open",           // "open" | "limited" | "closed"
  availabilityMessage: "Currently accepting commissions for Q3 2026.",
  social: {
    instagram: "https://instagram.com/yourhandle",
    behance: "https://behance.net/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
  },
};
```

### Adding project categories

Project categories are defined in the Sanity schema at [sanity/schemas/project.ts](sanity/schemas/project.ts). To add a new category, add an entry to the `list` array in the `category` field, then update the `GalleryGrid` component filter buttons accordingly.

### Migrating existing markdown content

If you have `.md` files in the `content/` directory, you can migrate them to Sanity using the seed script:

```bash
npx tsx scripts/seed-sanity.ts
```

This is a one-time, non-destructive operation. It reads the frontmatter from each `.md` file and creates corresponding documents in Sanity (text fields only — images are not migrated automatically).

---

## Available Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Starts the Next.js dev server at `localhost:3000`|
| `npm run build` | Builds the production bundle                     |
| `npm run start` | Serves the production build locally              |
| `npm run lint`  | Runs ESLint across the project                   |

---

## Deployment

### Deploying to Vercel (recommended)

1. Push the project to GitHub (or GitLab / Bitbucket).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in the Vercel project settings under **Settings → Environment Variables**.
4. Deploy. Vercel auto-detects Next.js — no extra configuration needed.

> **Important:** Do **not** set `output: 'export'` in `next.config.ts`. The embedded Sanity Studio and ISR both require a Node.js server runtime. This project is designed for Vercel's serverless infrastructure.

### Contact form

The contact form (`components/ContactForm.tsx`) uses `data-netlify="true"` by default, which works out-of-the-box on Netlify. If deploying to **Vercel**, replace the form action with [Formspree](https://formspree.io) or another form service:

```tsx
// Replace with a Formspree action URL
<form action="https://formspree.io/f/your_form_id" method="POST">
```

---

## ISR Webhook (On-Demand Revalidation)

The site uses Incremental Static Regeneration (ISR). Pages are pre-rendered at build time and automatically revalidated when content changes in Sanity.

### How it works

1. You publish or update a project in the Studio.
2. Sanity fires a webhook to your `/api/revalidate` endpoint.
3. The endpoint verifies the secret and calls `revalidatePath()` on `/` and `/work`.
4. Those pages are re-rendered on the next request with fresh data.

### Setting up the webhook in Sanity

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Webhooks**, create a new webhook:

| Field   | Value                                                          |
| ------- | -------------------------------------------------------------- |
| URL     | `https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET` |
| Trigger | On **create**, **update**, and **delete**                      |
| Filter  | `_type == "project"` (optional, to limit to project changes)   |
| Method  | `POST`                                                         |

Replace `YOUR_SECRET` with the value of `SANITY_REVALIDATE_SECRET` from your environment variables.

---

## Content Schema Reference

The `project` document type in Sanity has the following fields:

| Field         | Type           | Required | Description                                        |
| ------------- | -------------- | -------- | -------------------------------------------------- |
| `title`       | string         | Yes      | Project title                                      |
| `slug`        | slug           | Yes      | URL-safe identifier, auto-generated from title     |
| `category`    | string (enum)  | Yes      | `"illustrations"` or `"3d-work"`                   |
| `year`        | number         | Yes      | Year of the work                                   |
| `tags`        | array[string]  | No       | Keywords for the project                           |
| `thumbnail`   | image          | No       | Cover image shown in the gallery grid              |
| `images`      | array[image]   | No       | Additional images shown on the detail page         |
| `featured`    | boolean        | No       | If true, appears on the home page (default: false) |
| `description` | text           | No       | Short description (shown in cards and meta)        |
| `body`        | portable text  | No       | Full rich-text body for the detail page            |

---

## License

This project is private. All rights reserved.
