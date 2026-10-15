import { SITE } from '../data/site.js';
import { breadcrumbSchema } from '../routes.jsx';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** <head> tags for one page, used by the prerender step. */
export function headTags(route, { noindex = false } = {}) {
  const m = route.meta;
  const url = `${SITE.url}${route.path}`;
  const robots = m.noindex || noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const jsonld = [...(m.jsonld ?? []), ...(m.crumbs ? [breadcrumbSchema(m.crumbs)] : [])];
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta property="og:type" content="${m.ogType ?? 'website'}">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE.url}/og-image.png">`,
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${SITE.name}: ${esc(SITE.tagline)}">`,
    `<meta property="og:locale" content="${SITE.locale}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    ...jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

/** Keeps the title, description and canonical correct after client-side navigation. */
export function applyHead(route) {
  if (typeof document === 'undefined') return;
  const m = route.meta;
  document.title = m.title;
  const set = (sel, attr, val) => {
    const el = document.head.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  set('meta[name="description"]', 'content', m.description);
  set('link[rel="canonical"]', 'href', `${SITE.url}${route.path}`);
  set('meta[property="og:title"]', 'content', m.title);
  set('meta[property="og:description"]', 'content', m.description);
  set('meta[property="og:url"]', 'content', `${SITE.url}${route.path}`);
}
