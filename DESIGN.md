# AutoCare Design System

This file documents the current public AutoCare website styling so dashboard and portal work can reuse the same visual language.

## Brand Foundation

- Product name: AutoCare.
- Personality: premium auto repair, dark editorial surfaces, high-quality vehicle photography, sharp red accent moments.
- Primary experience: dark-first UI with restrained utility surfaces for dashboard work.

## Color Palette

- Page background: `#202020`.
- Dark section/panel background: `#292929`.
- Hero black: `#030303`.
- Primary red: `#ec3042`.
- White text: `#ffffff` and `#f8f8f8`.
- Main muted text: `#858585`.
- Secondary muted text: `#8a8a8a`, `#777777`.
- Border/line colors: `#3a3a3a`, `#626262`, `#666666`, `#a5a5a5`.
- Light card/form surface: `#f7f7f7`, `#f6f6f6`.
- Semantic dashboard colors should stay close to the brand:
  - Positive: `#22c55e`.
  - Negative/urgent: `#ec3042`.
  - Needs review/low confidence: `#f59e0b`.
  - Informational: `#60a5fa`.

## Typography

- Font family: Plus Jakarta Sans via `next/font/google`.
- Available weights: `400`, `500`, `600`, `700`, `800`.
- Base body: `15px`, `600`, line-height `1.65`, muted gray.
- Hero headline: `clamp(56px, 5.3vw, 84px)`, `800`, line-height `1.08`.
- Section heading: `clamp(42px, 4vw, 58px)`, `800`, line-height `1.12`.
- Section eyebrow: uppercase, red, `17px-23px`, `800`, letter spacing around `0.32em`.
- Dashboard page titles should be smaller and denser than marketing sections: `28px-36px`, `700-800`, tight line-height.
- Dashboard metadata, timestamps, and table labels: `11px-13px`, medium/semibold, muted gray.

## Spacing And Layout

- Public site container: `w-[min(100%_-_64px,1360px)] mx-auto`, mobile `w-[min(100%_-_28px,420px)]`.
- Dashboard container can expand slightly for dense tables: max width `1440px`, with `24px-32px` page padding.
- Public sections use generous vertical rhythm: `85px-150px`.
- Dashboard screens should use a compact rhythm: `16px-24px` gaps, `20px-28px` card padding.
- Avoid floating card-heavy marketing composition inside the dashboard. Use full-height app shell, sidebar, topbar, cards only for grouped data.

## Surfaces

- Main dashboard background: `#202020`.
- Sidebar/topbar/cards: `#292929` or slightly transparent `#292929/80`.
- Card borders: `#3a3a3a` or `#3a3a3a/70`.
- Card radius: `10px-14px`, matching the public site.
- Form panels can use light surfaces only when matching the public appointment form; dashboard forms should remain dark.
- Shadows are subtle. The strongest shadow is reserved for red CTA buttons: `0 12px 24px rgb(236 48 66 / 22%)`.

## Controls

- Primary button: red `#ec3042`, white text, `13px-14px`, `800`, `48px-55px` height, `13px` radius.
- Secondary/ghost button: transparent or `#ffffff0a`, muted text, border `#3a3a3a`, hover to brighter text.
- Inputs: `14px` radius on public forms; dashboard inputs/selects can use `10px-12px` radius, dark background, gray border, red focus ring.
- Badges: small rounded pills or compact chips. Use red for negative/urgent, green for positive, amber for needs review.
- Tables: dense rows, muted headers, clear status badges, hover background `#ffffff08`.

## Component Conventions

- Use Tailwind utility classes and local shadcn-style primitives from `src/components/ui`.
- Keep domain components outside route files. Route files should compose feature components.
- Use Lucide icons at `16px-20px` in dashboard UI and `24px+` only for marketing visuals.
- Use Next `Image` for local/static dashboard images where practical.
- Keep public site routes and dashboard routes separated with App Router groups.

## Auth Visual Direction

- Auth pages should keep the dark AutoCare palette and use the red-car hero image treatment.
- The image side should use a slanted edge with `clip-path`, matching the provided auth reference.
- Auth cards use dark surfaces, brand red actions, and compact form controls.

## Dashboard Visual Direction

- The dashboard is the operational side of AutoCare, so it should feel quieter and denser than the website.
- Preserve the public site palette, typography, radii, and red accent, but prioritize scanning, filtering, and repeated action.
- Use the feedback-flow diagram as product context: intake channels, AI scoring, routing, queues, alerts, and management dashboard.
