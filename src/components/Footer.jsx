import { Link } from '../lib/router.jsx';
import { Brand } from './Header.jsx';
import Icon from './Icon.jsx';
import { mapsUrl, telUrl } from './BranchCard.jsx';
import { SITE } from '../data/site.js';
import { SERVICES, serviceUrl } from '../data/services.js';
import { PUBLISHED_CITIES, cityUrl } from '../data/cities.js';

const COLUMNS = [
  ['Services', SERVICES.map((s) => [s.name, serviceUrl(s.slug)])],
  ['Company', [['About Us', '/about/'], ['How It Works', '/#how-it-works'], ['FAQs', '/faqs/'], ['Guides', '/guides/'], ['Share Feedback', '/feedback/']]],
  ['Legal', [['Privacy Policy', '/privacy-policy/'], ['Terms and Conditions', '/terms-and-conditions/'], ['Refund and Cancellation', '/refund-and-cancellation-policy/'], ['Disclaimer', '/disclaimer/']]],
];

// Every city, split into three even columns (10 + 10 + 10 for the 30 cities).
const PER_COLUMN = Math.ceil(PUBLISHED_CITIES.length / 3);
const CITY_COLUMNS = [0, 1, 2].map((i) => PUBLISHED_CITIES.slice(i * PER_COLUMN, (i + 1) * PER_COLUMN));

const linkCls = 'inline-flex min-h-8 items-center no-underline hover:text-brand';

/** One contact row: a small icon, then the value. Left aligned so the rows line up. */
function ContactRow({ icon, children }) {
  return (
    <li className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3 text-left">
      <Icon name={icon} size={18} className="mt-1 text-brand" />
      <div className="min-w-0 [overflow-wrap:anywhere]">{children}</div>
    </li>
  );
}

export default function Footer() {
  const b = SITE.branch;
  return (
    <footer className="on-dark bg-ink pt-[clamp(1.875rem,3.5vw,2.875rem)] pb-28 text-paper lg:pb-8">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,3fr)]">
          <div className="grid content-start gap-5 sm:col-span-2 lg:col-span-1">
            <Brand light />
            <p className="max-w-[26rem] text-[.9375rem] text-dark-muted">{SITE.description}</p>
            <ul className="grid gap-3 text-[.9375rem]" aria-label="Contact">
              {SITE.phone && <ContactRow icon="phone"><a className="font-semibold no-underline hover:text-brand" href={telUrl()}>{SITE.phone}</a></ContactRow>}
              {SITE.email && <ContactRow icon="mail"><a className="no-underline hover:text-brand" href={`mailto:${SITE.email}`}>{SITE.email}</a></ContactRow>}
              {b && (
                <ContactRow icon="pin">
                  <address className="not-italic text-dark-muted">
                    <span className="block font-semibold text-paper">{b.name}</span>
                    {b.lines.map((l) => <span key={l} className="block">{l}</span>)}
                  </address>
                  <a className="mt-1 inline-block text-brand underline" href={mapsUrl()} target="_blank" rel="noopener">Get directions</a>
                </ContactRow>
              )}
            </ul>
            {SITE.socials?.length > 0 && (
              <ul className="flex gap-4">
                {SITE.socials.map(([n, u]) => <li key={u}><a className={linkCls} href={u} rel="noopener" target="_blank">{n}</a></li>)}
              </ul>
            )}
          </div>

          <div className="grid content-start gap-8">
            {COLUMNS.map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <p className="label-mono mb-2 text-dark-muted">{title}</p>
                <ul className="grid text-[.9375rem]">
                  {links.map(([label, href]) => <li key={href}><Link className={linkCls} to={href}>{label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>

          <nav aria-label="Cities we serve online" className="sm:col-span-2 lg:col-span-1">
            <p className="label-mono mb-2 text-dark-muted">Cities we serve online</p>
            <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {CITY_COLUMNS.map((col, i) => (
                <ul key={i} className="grid content-start text-[.9375rem]">
                  {col.map((c) => <li key={c.slug}><Link className={linkCls} to={cityUrl(c.slug)}>{c.name}</Link></li>)}
                </ul>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 grid gap-2 border-t border-[#333] pt-6 text-center text-[.8125rem] text-dark-muted lg:grid-cols-[auto_1fr] lg:gap-8 lg:text-left">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="lg:text-right">{SITE.name} is an independent consultancy. We are not affiliated with any embassy, government body or awarding organisation unless stated.</p>
        </div>
      </div>
    </footer>
  );
}
