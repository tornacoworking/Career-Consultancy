# Career Consultancy website (React + Tailwind CSS)

The Career Consultancy consultancy site (*Your Next Step Starts Here.*), built with **React 19**, **Tailwind CSS v4** and **Vite**. Every page is **pre-rendered to static HTML** at build time and then hydrated by React, so search engines see full content without running JavaScript and visitors get instant page changes.

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173 with hot reload
npm run build          # production build -> dist/ (pre-rendered pages, sitemap, robots)
npm run serve          # preview dist/ locally
```

Node 20 or newer is required.

| Command | What it does |
|---|---|
| `npm run build` | Production: indexable pages. Sample stats/reviews are **hidden** while `SAMPLE_DATA = true`. |
| `npm run build:staging` | Staging: `noindex` on every page, `robots.txt` disallows all, sample data visible. |
| `npm run build:preview` | One-folder client-only build (`dist-preview/`) with in-memory routing, for sandboxes. |

## Project structure

```
index.html                    HTML shell (placeholders filled by the prerender step)
vite.config.js                React + Tailwind plugins
scripts/prerender.mjs         Renders each route to dist/<path>/index.html; writes sitemap.xml and robots.txt
src/
  main.jsx                    Browser entry: hydrates pre-rendered HTML
  entry-server.jsx            Server entry used by the prerender step
  App.jsx                     Picks the page for the current URL; updates <title>/meta on navigation
  routes.jsx                  Every URL with its page component, title, description and JSON-LD
  index.css                   Tailwind import, brand theme tokens (@theme), shared component classes
  data/                       ALL copy and business details. Edit these first.
    site.js                     name, domain, email, phone, form settings, stats, reviews, programmes
    services.js                 the four services (scope, requirements, steps, FAQs…)
    home.js                     homepage lists (benefits, journey, audiences, general FAQs)
    guides.js, legal.js         guide articles and legal pages
  lib/
    router.jsx                  ~80-line router (real URLs, <Link>, scroll handling). No dependency.
    head.js                     <head> tags for pre-rendering + client-side updates
    sendForm.js                 Form delivery (FormSubmit email or Netlify functions)
    hooks.js, flags.js          media-query / storage hooks, build flags
  components/                 Header, Footer, SpotlightCursor, Checklist, Toc, form parts, illustrations…
    home/                       One file per homepage section
  pages/                      One file per page type
public/                       Favicons, Open Graph image, web manifest
netlify/functions/            Optional server-side form handlers
netlify.toml                  Build, staging noindex, security and cache headers
```

## Styling (Tailwind CSS v4)

Brand tokens live in `src/index.css` under `@theme`, so they work as utilities everywhere:

- Colours: `bg-brand` (#FF914D), `text-brand-ink` (#B54A14, orange **text** that passes WCAG AA), `bg-paper`, `bg-grey`, `text-ink`, `text-muted`, `border-line`
- Fonts: `font-display` (Schibsted Grotesk), `font-body` (Instrument Sans), `font-mono` (IBM Plex Mono)
- Sizes: `text-hero`, `text-section`, `text-title`, `text-lede`
- Breakpoint: `lg` = 960px. Below it every layout is one centred column; above it, the editorial two-column layouts.

Repeated patterns are component classes in the same file: `btn btn-primary|btn-dark|btn-ghost`, `eyebrow`, `wrap`, `text-link`, `faq`, `steps`, `ticks`, `field-input`. The spotlight cursor, star rating input and a few animations are plain CSS there too, because they rely on things utilities can't express (registered `@property`, `background-clip: text`, sibling selectors).

## Interactions

- **Spotlight cursor** (`components/SpotlightCursor.jsx`): an orange dot on mouse/trackpad devices that becomes a ring over links. Over headings marked `data-spotlight` it grows and recolours the text **only inside the circle**. Text is never duplicated. It's off on touch devices and with reduced motion.
- **Service explorer**: list + preview on desktop (hover, click or arrow keys), accordion on phones.
- **Impact counters** count up when scrolled into view. **Reviews carousel** swipes on touch with arrow buttons on desktop, plus a rating summary.
- **"Who we help" cards**: a glow follows the pointer with a slight tilt.
- **How it works**: the orange progress line fills as you scroll.
- **Service finder**: goal-based picker that pre-fills the enquiry form.
- **Readiness checklist** on each service page (saved in the visitor's browser only), **FAQ search**, **On this page** indicator, magnetic CTA heading.

## Forms → email

The enquiry form and the feedback form both email **tornacoworking@gmail.com** through [FormSubmit](https://formsubmit.co). Set in `src/data/site.js`:

```js
form_email: 'tornacoworking@gmail.com',
form_provider: 'formsubmit',   // or 'netlify' to use netlify/functions instead
```

**One-time activation:** the first submission from the live site makes FormSubmit email an "Activate Form" link to that inbox (check spam). Click it once and all later submissions arrive as emails. Until then, the form tells the visitor their message was **not** sent. It never shows a false success.

Both forms validate on the client with accessible errors and an error summary. They block spam with a honeypot field and a minimum fill time, and never ask for ID or bank numbers.

## Sample data

`STATS`, `RATING_BREAKDOWN` and `TESTIMONIALS` in `src/data/site.js` are **sample data**. While `SAMPLE_DATA = true`:

- dev, staging and preview builds show them with a "Sample data · replace before launch" badge;
- the production build hides the impact and reviews sections.

To go live, replace them with real figures and genuine reviews you have permission to publish, keep the average-rating stat consistent with `RATING_BREAKDOWN`, then set `SAMPLE_DATA = false`.

## Deploy (Netlify)

1. Push to GitHub and import the repo in Netlify. `netlify.toml` already sets `npm run build`, the `dist` folder and Node 22.
2. Set the real domain in `SITE.url` (`src/data/site.js`). Canonicals, the sitemap and Open Graph tags all use it.
3. Deploy previews and branch deploys use `build:staging`, so they are never indexed.

It also works on any static host (Vercel, Cloudflare Pages, Hostinger, cPanel). Upload the contents of `dist/` after `npm run build`. Make the host serve `404.html` for unknown URLs.

## SEO (built in)

- Every URL is its own pre-rendered HTML file, with a unique title and description, a canonical tag, Open Graph and Twitter tags, and exactly one H1.
- JSON-LD: Organization and WebSite on the home page, Service on service pages, Article on guides, and BreadcrumbList on inner pages.
- `sitemap.xml` (indexable pages only) and `robots.txt` are generated on every build. The 404 and thank-you pages are `noindex`.
- No AggregateRating schema: Google ignores self-published review stars, and invented ratings risk a penalty.

## Before launch (business details still needed)

- [ ] Real domain (`SITE.url`) and a public contact email (`SITE.email` is still the placeholder `hello@careerconsultancy.example`)
- [ ] Phone, WhatsApp, address, hours, social links (each appears automatically once set)
- [ ] Confirm each service's scope matches what you actually offer (`data/services.js`)
- [ ] Training programmes, if any (`TRAINING_PROGRAMMES`)
- [ ] Real stats and reviews, then `SAMPLE_DATA = false`
- [ ] Legal review of the Privacy, Terms and Refund pages (`data/legal.js`)
- [ ] Activate FormSubmit (see above) and send a test enquiry
- [ ] Submit `sitemap.xml` in Google Search Console
