# AutoCare

Official website and dashboard foundation for AutoCare, an auto repair and car care brand focused on appointments, diagnostics, maintenance, service education, and future customer/operations workflows.

## Overview

AutoCare is built as a modern Next.js application with a polished marketing website today and room for a dashboard experience as the product grows. The public site presents AutoCare’s services, repair process, testimonials, appointment form, FAQs, blog previews, SEO metadata, and social sharing previews.

The codebase is organized so the SPA landing page remains thin and section-driven, while reusable UI, content constants, and future dashboard modules can grow cleanly.

## Features

- Responsive AutoCare landing page
- Modular one-layer public SPA component architecture
- Auto repair service sections and appointment CTA
- Blog preview, testimonials, FAQ, footer, and brand/service content
- SEO metadata for search engines and social sharing
- Open Graph and Twitter/X preview image routes
- Favicon and Apple touch icon routes
- Sitemap, robots, and web app manifest
- Tailwind CSS styling with minimal global CSS

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Lucide React icons
- pnpm

## Project Structure

```text
src/
  app/
    page.tsx                 # SPA composition
    layout.tsx               # Metadata, font, root layout
    opengraph-image.tsx      # Social preview image
    twitter-image.tsx        # Twitter/X preview image
    icon.tsx                 # Favicon image route
    apple-icon.tsx           # Apple touch icon route
    manifest.ts              # Web app manifest
    robots.ts                # Robots config
    sitemap.ts               # Sitemap config
  components/
    external/                # Public website sections
    sections/                # Cross-section behavior
    ui/                      # Shared UI primitives
  constants/
    autocare.ts              # Website content/data
  lib/
    utils.ts                 # Shared utilities
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## Environment

For production SEO URLs, set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If deployed on Vercel, the app also falls back to `VERCEL_URL` when available.

## Scripts

```bash
pnpm dev      # Start local development
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## SEO And Social Preview

The app includes:

- Standard metadata title and description
- Canonical URL
- Open Graph metadata
- Twitter/X large summary card metadata
- WhatsApp/Slack-friendly Open Graph preview image
- Generated favicon and Apple touch icon
- Sitemap and robots configuration
- Web app manifest

The social preview image is generated from `src/app/opengraph-image.tsx` and uses the AutoCare hero visual system.

## Dashboard Direction

The current repository is prepared for a future AutoCare dashboard. Suggested future areas include:

- Customer appointment management
- Service history and repair status tracking
- Admin dashboard for bookings and leads
- Technician workflow views
- Notifications and reminders
- Blog/content management
- Analytics for inquiries, appointments, and service demand

## Brand

Product name: **AutoCare**

Primary color: `#ec3042`

Primary typeface: Plus Jakarta Sans

## License

Private project. All rights reserved.
