# Career Consultancy SEO plan

## Keyword map (hypotheses to validate)

These are starting points based on how people typically search for these services. Validate volumes and intent in Google Keyword Planner and, after launch, in Search Console's Performance report before rewriting copy. Do not add location pages (e.g. "visa consultant in Pune") unless the business genuinely serves that location and each page has distinct, useful content.

| Page | Primary intent | Seed terms | Avoid targeting |
|---|---|---|---|
| `/services/experience-documents/` | Get genuine work-history proof | experience letter from previous employer, how to get relieving letter, experience certificate request letter, employment verification documents | "experience certificate provider", "buy experience letter", anything implying documents are created for you (also a legal and reputational risk) |
| `/services/visa-services/` | Prepare a visa application | visa application assistance, visa document checklist, visa form filling help, work visa documents required | "guaranteed visa", "100% visa approval" |
| `/services/online-certifications/` | Choose a credible credential | online certification courses, how to verify a certificate, best certification for [role], certification guidance | "accredited certificate" unless verified |
| `/services/online-training/` | Learn a skill online | online training courses, live online classes for professionals, online skill training | course names until programmes are confirmed |
| `/faqs/` | Long-tail questions | visa consultant fees, how long to get experience letter, is online certificate valid | — |

Content guidance: answer the question in the first paragraph, use the searcher's words in H2s naturally, link between related service pages (already in place), and add a section only when it is genuinely useful.

## What is implemented

- Pre-rendered HTML (React renderToString at build time) for every route; clean URLs with trailing slashes; one H1 per page; logical H2/H3 hierarchy
- Unique `<title>` and meta description per page (checked automatically)
- Canonical URL, Open Graph and Twitter card tags, 1200×630 OG image
- JSON-LD: Organization + WebSite (home), Service (each service page), BreadcrumbList (inner pages)
- `sitemap.xml` (indexable pages only), `robots.txt` with sitemap reference
- `noindex` on 404 and thank-you pages; staging builds are `noindex` everywhere with `Disallow: /`
- Breadcrumb navigation, crawlable `<a href>` navigation, descriptive link text
- SVG illustrations with `<title>` text alternatives; no layout shift (explicit dimensions)
- One CSS file and one JS bundle (React 19 + app, ~95 KB gzipped)

## Automated checks run during build review

- 13 pages: one H1 each, unique titles and descriptions, no duplicate IDs, balanced HTML tags
- All internal links and `#anchors` resolve
- No horizontal overflow at 320, 375, 390, 768, 1024 and 1440 px on every page
- No JavaScript errors; form shows errors when empty, pre-fills the service from links, and does not show success when the server is unreachable

## Launch audit checklist

- [ ] `SITE["url"]` set to the real domain; canonicals and sitemap show it
- [ ] Production build deployed (not `--env staging`); `robots.txt` allows crawling
- [ ] View source on each service URL: full content present without JS
- [ ] Rich Results Test / Schema validator: Organization, Breadcrumb, Service valid
- [ ] Sitemap validates and is submitted in Google Search Console (verify via DNS TXT record)
- [ ] Search Console URL Inspection on home + 4 service pages: "URL is on Google" after indexing
- [ ] Broken-link scan (e.g. Screaming Frog free tier) after deploy
- [ ] Lighthouse mobile on home and one service page: check LCP ≤ 2.5 s, CLS ≤ 0.1; INP from field data (CrUX/Search Console) once traffic exists
- [ ] Mobile usability: test on a real Android and iPhone, including the menu and form
- [ ] Keyboard-only pass: skip link, menu, explorer (arrow keys), finder, accordions, form errors
- [ ] Screen reader spot check (NVDA or VoiceOver) on the contact form and explorer
- [ ] Send a real test enquiry and confirm it arrives
- [ ] 404 page returns HTTP 404 status
- [ ] www / non-www and http → https redirect to one canonical host



Page	        Performance	    Accessibility	Best practices
Home	            85	            100	              100
Visa services	    89	            100	              100
Guide	            90	            100


