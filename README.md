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
| `npm run seo:check` | Audits the built `dist/` (see [SEO validation](#seo-validation)). Run `npm run build` first. |
| `npm run check` | Build, then run the SEO audit. |

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
    services.js                 the four services (scope, requirements, steps, FAQs…) + sub-service helpers
    cities.js                   the 30 priority cities, in display order (see "Cities and sub-services")
    visaServices.js             6 visa sub-services + the editable destination-country list
    experienceDocumentServices.js  3 document-help sub-services + genuine-vs-fabricated comparison
    trainingServices.js         5 training tracks, course-vs-project, learning formats
    faqs.js                     city FAQ builder and destination FAQ
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

## Cities and sub-services

**30 cities** live in `src/data/cities.js`, in the order shown in the hero and the directory. Each has its own intro, a visa / documents / training angle, a local FAQ and nearby cities. `routes.jsx` builds `/cities/<slug>/` from that data, so there is one `CityPage` template and no per-city component. City pages say plainly that the service is online and never claim an office.

**Sub-services** (14 pages) are data too: `visaServices.js`, `experienceDocumentServices.js`, `trainingServices.js`. They render through `SubServicePage` at `/services/<service>/<sub>/`.

The URLs from the original brief (`/services/experience-document-assistance/…`, `/services/real-time-project-training/…`) are 301-redirected in `netlify.toml` to the existing `/services/experience-documents/…` and `/services/online-training/…`.

**Selected city:** choosing a city (hero explorer, directory, or visiting a city page) is held in memory only (`src/lib/consult.jsx`). It adds a "your city" line to service pages and prefills the consultation form. Nothing is persisted, and choosing a city is never required.

**Consultation modal:** every primary CTA is a `ConsultLink`, a real `<a href="/contact/?service=…">` that opens a native `<dialog>` form with service, sub-service, city and destination prefilled. Without JavaScript it simply goes to the contact page.

### Add a city

1. Append an entry to `CITIES` in `src/data/cities.js` with its own `intro`, `visa`, `docs` and `training` angles, a local `faq`, and 2-4 `nearby` slugs. Write something specific to that city. Do not copy another city's text and swap the name.
2. Optionally add spellings people type to `CITY_ALIASES` (for example Bangalore for Bengaluru).
3. Set `popular: true` to show it as a hero shortcut. Use `published: false` to keep a draft out of the site and the sitemap.
4. Run `npm run check`. The page, sitemap entry, directory link and form option appear automatically.

### Add a service or sub-service

- **Sub-service:** add an object to the relevant array in `visaServices.js`, `experienceDocumentServices.js` or `trainingServices.js` (copy an existing one; `parent` must be the main service slug). Its page, sitemap entry and links appear automatically.
- **Destination country:** add to `DESTINATIONS` in `visaServices.js`.
- **Main service:** add to `SERVICES` in `services.js`, then review `HeroReadiness.jsx` (`SHORT` labels) and `ServiceExplorer.jsx`, which assumes four rows.

## Forms → email

The enquiry form and the feedback form both email **tornacoworking@gmail.com** through [FormSubmit](https://formsubmit.co). Set in `src/data/site.js`:

```js
form_email: 'tornacoworking@gmail.com',
form_provider: 'formsubmit',   // or 'netlify' to use netlify/functions instead
```

**One-time activation:** the first submission from the live site makes FormSubmit email an "Activate Form" link to that inbox (check spam). Click it once and all later submissions arrive as emails. Until then, the form tells the visitor their message was **not** sent. It never shows a false success.

The enquiry form (`components/ConsultationForm.jsx`, used on the contact page, city pages, sub-service pages and in the modal) collects name, email, phone, preferred city, main service, a conditional sub-service or training domain, a destination country for visa enquiries, an optional message and privacy consent. Phone numbers are validated as Indian mobile numbers (optional +91) or international `+` numbers.

If delivery fails the form says so, keeps what was typed, and offers a clearly labelled `mailto:` link as a *manual* fallback. It never shows success unless the service confirmed it. Entered details are held in component state only, never in localStorage, sessionStorage or a database.

Both forms validate on the client with accessible errors and an error summary. They block spam with a honeypot field and a minimum fill time, and never ask for ID or bank numbers.

## Sample data

`STATS`, `RATING_BREAKDOWN` and `TESTIMONIALS` in `src/data/site.js` are **sample data**. While `SAMPLE_DATA = true`:

- dev, staging and preview builds show them with a "Sample data · replace before launch" badge;
- the production build hides the impact and reviews sections.

To go live, replace them with real figures and genuine reviews you have permission to publish, keep the average-rating stat consistent with `RATING_BREAKDOWN`, then set `SAMPLE_DATA = false`.

## SEO validation

```bash
npm run build        # pre-renders every route into dist/
npm run seo:check    # or: npm run check (both steps)
```

`scripts/seo-check.mjs` reads the built HTML and fails (exit code 1) on: missing or duplicate titles and descriptions, anything other than exactly one `<h1>`, `<img>` without `alt`, missing or wrong canonical URLs, invalid JSON-LD, broken internal links or `#fragments`, and sitemap entries that do not exist, are `noindex`, or are not their own canonical. It warns on titles over 70 characters and descriptions outside 50-160 characters.

### Lighthouse

Serve the build and audit it with Chrome:

```bash
npm run serve                                   # or any static server for dist/
npx lighthouse http://localhost:3000/ --view    # also try /cities/pune/ and /services/visa-services/study-visa/
```

Targets: SEO, Accessibility, Best Practices and Performance all 90+. Measure on the deployed site (with compression and CDN caching) as well as locally. Performance varies a lot between runs and machines, so run it several times and on a real phone before trusting a number.

**Measured 2026-10-21** (Lighthouse mobile profile against a local gzip server; home, a city page and a sub-service page): SEO 100, Accessibility 100, Best Practices 100. Performance on the home page ranged from about 55 to 90 between runs on the development machine, and the pre-update site measured in the same band (about 55 to 90). It has **not** reached a stable 90, so treat that as an open item (see "Known gaps"). Below-the-fold sections use `content-visibility: auto` to keep style and layout cost down.

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

## Known gaps

- **Performance below 90.** All pages ship one JavaScript bundle (about 130 KB gzipped) that includes the city and service data, and Google Fonts load from another origin. Next steps: self-host the fonts, and split the data-heavy pages into lazy chunks.
- **Router.** The site keeps its own small, dependency-free router (real URLs, crawlable `<a href>`, prerendered). The original brief named React Router DOM, but swapping it would not improve SEO and would add a dependency.
- **Brand colours.** The existing orange-and-charcoal identity and logo were kept rather than replaced with navy and gold.
- **Contact email.** `SITE.email` is still the placeholder `hello@careerconsultancy.example` (shown on the contact page, footer and legal pages). Set a real public address.
- **Owner to confirm:** the Java track (the reference site mentions Java only alongside Selenium testing), every training duration, schedule, trainer and fee (`TRAINING_PROGRAMMES` is empty), and the destination-country list.

## Replace the sample reviews with real ones

`TESTIMONIALS`, `STATS`, `RATING_BREAKDOWN` and `GOOGLE_RATING` in `src/data/site.js` are sample data and are hidden in production. To go live: replace them with real reviews you have permission to publish, make the average rating match `RATING_BREAKDOWN`, then set `SAMPLE_DATA = false`. No rating or review is ever written into structured data.

## Domain and canonical URLs

Set `SITE.url` in `src/data/site.js` to your real origin (no trailing slash). Canonical tags, Open Graph URLs, JSON-LD and `sitemap.xml` are all generated from it on each build. Then run `npm run check`; it fails if any canonical does not match.

## Search Console

1. Add the domain as a property in Google Search Console and verify it (a DNS record is simplest).
2. Submit `https://<your-domain>/sitemap.xml` under Sitemaps.
3. Use URL Inspection on the home page, one city page and one sub-service page, then "Request indexing".
4. Watch Pages > Indexing for "Duplicate" or "Crawled, not indexed" city pages. If you see them, add more distinct local content to those cities rather than adding more cities.

## Before launch (business details still needed)

- [ ] Real domain (`SITE.url`) and a public contact email (`SITE.email` is still the placeholder `hello@careerconsultancy.example`)
- [ ] Phone, WhatsApp, address, hours, social links (each appears automatically once set)
- [ ] Confirm each service's scope matches what you actually offer (`data/services.js`)
- [ ] Training programmes, if any (`TRAINING_PROGRAMMES`)
- [ ] Real stats and reviews, then `SAMPLE_DATA = false`
- [ ] Legal review of the Privacy, Terms and Refund pages (`data/legal.js`)
- [ ] Activate FormSubmit (see above) and send a test enquiry
- [ ] Submit `sitemap.xml` in Google Search Console