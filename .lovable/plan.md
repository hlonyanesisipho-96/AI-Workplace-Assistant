## Goal

Add a public marketing landing page at **`/landing`** containing every section from your brief. Dashboard stays at `/`. Sidebar and header untouched except for one new link to the landing page.

## Route & layout

- New file `src/routes/landing.tsx` — public page with its own top nav + footer, no app sidebar/header.
- In `src/routes/__root.tsx`, when pathname is `/landing`, render a bare `<Outlet />` (landing owns its chrome). Otherwise the existing `SidebarProvider + AppSidebar + DashboardHeader + Outlet` shell renders unchanged. Providers (QueryClient, Theme, Tooltip, Toaster) still wrap everything.
- `src/components/app-sidebar.tsx` gets a "View landing page" link → `/landing` (in the footer area of the sidebar). No other nav changes.

## Page composition

`src/routes/landing.tsx` composes these section components in order and sets landing-specific `head()` metadata (title "BIZbuilder AI — Get Your Business Digital Today", matching description + og:title/og:description/twitter:card).

Sections and their in-page anchors:
1. `#home` Hero
2. `#about` About BIZbuilder AI
3. `#why` Why Choose BIZbuilder AI
4. `#features` Features (8 cards)
5. `#how` How It Works (4 steps)
6. `#benefits` Benefits (5 cards)
7. `#testimonials` Testimonials (3 quotes)
8. `#analytics` Analytics preview
9. `#cta` Final CTA band
10. Footer

## New files

- `src/components/landing/site-nav.tsx` — sticky top nav: BIZbuilder AI logo, anchor links (Home, Features, About, Testimonials, Contact), theme toggle, "Get Started" button → `/` (dashboard). Mobile: Sheet menu.
- `src/components/landing/site-footer.tsx` — 3-column footer (Quick Links, Resources, Contact) + tagline + socials + copyright.
- `src/components/landing/hero.tsx` — H1 "Build Your Business Online with AI", subhead "Get Your Business Digital Today", full paragraph, "No coding. No technical skills. Just results.", buttons 🚀 Start Building → `/`, 📖 Learn More → `#about`. Framer-motion fade/slide-in. Stylized HTML dashboard mockup (KPI tiles + faux chart bars) on the right.
- `src/components/landing/about.tsx` — full About copy with highlighted mission line.
- `src/components/landing/why-choose.tsx` — 7 ✔ items exactly as provided.
- `src/components/landing/features.tsx` — 8 detailed feature cards, each with title, sub-heading, and full sub-bullet lists verbatim. Each card links to the matching internal route (`/profile`, `/website`, `/marketing`, `/links`, `/qr`, `/analytics`, `/assistant`, `/advisor`).
- `src/components/landing/how-it-works.tsx` — 4 numbered steps with the provided titles/descriptions and connecting arrows on `md+`.
- `src/components/landing/benefits.tsx` — 5 cards (Save Time, Reduce Costs, Increase Visibility, Grow Faster, Mobile Friendly) with lucide icons.
- `src/components/landing/testimonials.tsx` — 3 quote cards with 5-star rows and attributions (Sarah M., James T., Nomsa K.).
- `src/components/landing/analytics-preview.tsx` — "Make Data-Driven Decisions" section: 6 emoji stat chips + a small Recharts line chart and donut using static demo data (Recharts is already installed).
- `src/components/landing/final-cta.tsx` — full-bleed orange gradient band, heading "Ready to Grow Your Business?", body, tagline "Build your website. Promote your business. Grow with AI.", buttons Start Building → `/`, Contact Us → `#contact` (footer).

## Modified files

- `src/routes/__root.tsx` — conditional shell for `/landing` vs the rest.
- `src/components/app-sidebar.tsx` — add "View landing page" link → `/landing`.

## Content fidelity

All headings, body copy, bullet lists, testimonials, phone (+27 65 957 3667), email (support@bizbuilder.ai), and taglines are used verbatim from your brief. Top-nav items are anchor links (not new routes) — say the word if you want Home/Features/Pricing/About/Contact split into real routes with their own `head()` metadata.

## Styling & motion

- Uses existing orange brand tokens (`--brand`, `gradient-brand`); dark mode supported through existing tokens. No token additions unless a soft accent is needed — if so, `--brand-soft` added in `src/styles.css` in the same edit.
- Container `max-w-7xl mx-auto px-4 md:px-6`, vertical rhythm `py-20 md:py-28`, generous negative space.
- Framer Motion: hero fade/slide-in and subtle `whileInView` fade on section headings — kept light.
- Fully responsive; grids collapse to single column on mobile.
- No hardcoded color utilities — semantic tokens only.

## Technical notes

- Pure presentation. No new state, no data fetching, no server functions. Existing localStorage store untouched.
- Recharts + lucide already installed; framer-motion already in use.
- Type-check must pass; every new component file exists before it's imported.

## Out of scope

- No dashboard content changes.
- No auth. No new backend.
- No real screenshot — stylized HTML mockup used in the hero.
