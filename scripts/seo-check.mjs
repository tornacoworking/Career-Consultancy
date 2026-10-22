/**
 * Checks the built site in dist/ (run `npm run build` first):  npm run seo:check
 *
 * Errors (exit code 1):  missing/duplicate title or description, not exactly one <h1>, <img> without an alt
 *   attribute, missing or wrong canonical, invalid JSON-LD, broken internal links or #fragments,
 *   sitemap entries that do not exist, are noindex, or are not canonical.
 * Warnings:  titles over 70 characters, descriptions outside 50-160 characters, indexable pages missing
 *   from the sitemap.
 * A staging build (robots.txt "Disallow: /") skips the indexability checks, because every page is noindex.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) { console.error('dist/ not found. Run "npm run build" first.'); process.exit(1); }

const { SITE } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href);
const base = SITE.url.replace(/\/$/, '');
const staging = /Disallow:\s*\/\s*$/m.test(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8'));

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

/** dist/foo/index.html -> /foo/ ;  dist/404.html -> /404.html */
const urlPath = (f) => {
  const rel = '/' + path.relative(dist, f).split(path.sep).join('/');
  return rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = (s) => decode(s.replace(/<[^>]*>/g, '')).trim();

const pages = new Map();
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const p = urlPath(f);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(p, { html, title: title && decode(title), description: description && decode(description), canonical, noindex: /noindex/.test(robots), ids });
}

const seenTitle = new Map();
const seenDesc = new Map();
for (const [p, pg] of pages) {
  const { html } = pg;
  if (!pg.title) err(p, 'missing <title>');
  else if (!pg.noindex && pg.title.length > 70) warn(p, `title is ${pg.title.length} characters (aim for 70 or fewer)`);
  if (!pg.description) err(p, 'missing meta description');
  else if (!pg.noindex && (pg.description.length < 50 || pg.description.length > 160)) warn(p, `description is ${pg.description.length} characters (aim for 50-160)`);

  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)];
  if (h1s.length !== 1) err(p, `${h1s.length} <h1> elements (expected exactly 1)`);

  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt=/.test(m[0])) err(p, `<img> without alt: ${m[0].slice(0, 80)}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(p, 'invalid JSON-LD'); }
  }

  if (!pg.noindex) {
    if (!pg.canonical) err(p, 'missing canonical link');
    else if (pg.canonical !== `${base}${p}`) err(p, `canonical is ${pg.canonical}, expected ${base}${p}`);
    if (pg.title) seenTitle.set(pg.title, [...(seenTitle.get(pg.title) ?? []), p]);
    if (pg.description) seenDesc.set(pg.description, [...(seenDesc.get(pg.description) ?? []), p]);
  }

  // Internal links: every href must resolve to a built page or file, and #fragments must exist on the target.
  for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
    const href = decode(m[1]);
    if (/^(https?:|mailto:|tel:|javascript:)/.test(href) || href === '') continue;
    const [pathAndQuery, fragment] = href.split('#');
    const target = pathAndQuery.split('?')[0] || p;
    const key = target.endsWith('/') || target.endsWith('.html') ? target : `${target}/`;
    const tp = pages.get(key);
    if (!tp && !files.includes(path.join(dist, target))) { err(p, `broken internal link ${href}`); continue; }
    if (tp && fragment && !tp.ids.has(fragment)) err(p, `link ${href} points to a missing #${fragment}`);
  }
}
if (!staging) {
  for (const [t, list] of seenTitle) if (list.length > 1) err(list.join(', '), `duplicate title "${t}"`);
  for (const [d, list] of seenDesc) if (list.length > 1) err(list.join(', '), `duplicate description "${d.slice(0, 60)}..."`);
}

// Sitemap
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (new Set(locs).size !== locs.length) err('sitemap.xml', 'contains duplicate URLs');
for (const loc of locs) {
  const p = loc.startsWith(base) ? loc.slice(base.length) : null;
  const pg = p && pages.get(p);
  if (!pg) { err('sitemap.xml', `${loc} does not match a built page`); continue; }
  if (!staging && pg.noindex) err('sitemap.xml', `${loc} is noindex`);
  if (pg.canonical && pg.canonical !== loc) err('sitemap.xml', `${loc} is not its own canonical (${pg.canonical})`);
}
if (!staging) {
  for (const [p, pg] of pages) if (!pg.noindex && !locs.includes(`${base}${p}`)) warn(p, 'indexable page is missing from sitemap.xml');
}

console.log(`Checked ${pages.size} pages${staging ? ' (staging build: indexability checks skipped)' : ''} and ${locs.length} sitemap URLs against ${base}.`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n  ` + warnings.join('\n  '));
if (errors.length) { console.error(`\n${errors.length} error(s):\n  ` + errors.join('\n  ')); process.exit(1); }
console.log('\nNo SEO errors found.');
