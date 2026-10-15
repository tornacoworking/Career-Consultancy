/**
 * Pre-renders every route to static HTML (dist/<path>/index.html) so search engines and
 * social previews get full content without running JavaScript. Also writes sitemap.xml
 * and robots.txt.
 *
 *   node scripts/prerender.mjs            production (indexable)
 *   node scripts/prerender.mjs --staging  noindex on every page, robots "Disallow: /"
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const staging = process.argv.includes('--staging');

const serverEntry = ['entry-server.js', 'entry-server.mjs'].map((f) => path.join(root, 'dist-server', f)).find(fs.existsSync);
const { render, routes, headTags, SITE } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const indexable = [];
for (const route of routes) {
  const html = template
    .replace('<!--app-head-->', headTags(route, { noindex: staging }))
    .replace('<!--app-html-->', render(route.path));
  const file = route.path.endsWith('.html')
    ? path.join(dist, route.path)
    : path.join(dist, route.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (!route.meta.noindex) indexable.push(route.path);
  console.log(`  ${route.path.padEnd(52)} ${route.meta.title}`);
}

const base = SITE.url.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
    indexable.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'),
  staging ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
console.log(`\nPre-rendered ${routes.length} pages${staging ? ' (staging: noindex)' : ''}.`);
