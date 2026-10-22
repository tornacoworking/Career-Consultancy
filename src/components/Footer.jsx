import { Link } from '../lib/router.jsx';
import { Brand } from './Header.jsx';
import { SITE } from '../data/site.js';
import { SERVICES, serviceUrl } from '../data/services.js';
import { POPULAR_CITIES, PUBLISHED_CITIES, cityUrl } from '../data/cities.js';

const COLUMNS = [
  ['Services', SERVICES.map((s) => [s.name, serviceUrl(s.slug)])],
  ['Company', [['About Us', '/about/'], ['How It Works', '/#how-it-works'], ['FAQs', '/faqs/'], ['Guides', '/guides/'], ['Share Feedback', '/feedback/']]],
  ['Legal', [['Privacy Policy', '/privacy-policy/'], ['Terms and Conditions', '/terms-and-conditions/'], ['Refund and Cancellation', '/refund-and-cancellation-policy/'], ['Disclaimer', '/disclaimer/']]],
  ['Cities', [...POPULAR_CITIES.map((c) => [c.name, cityUrl(c.slug)]), [`All ${PUBLISHED_CITIES.length} cities`, '/cities/']]],
];

const linkCls = 'inline-flex min-h-9 items-center no-underline hover:text-brand';

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pt-[clamp(3.5rem,6vw,5rem)] pb-8 text-paper">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(5,minmax(0,1fr))] lg:text-left">
          <div className="grid content-start justify-items-center gap-4 sm:col-span-2 lg:col-span-1 lg:justify-items-start">
            <Brand light />
            <p className="max-w-[26rem] text-[.9375rem] text-dark-muted">{SITE.description}</p>
            {SITE.socials?.length > 0 && (
              <ul className="flex gap-4">
                {SITE.socials.map(([n, u]) => <li key={u}><a className={linkCls} href={u} rel="noopener" target="_blank">{n}</a></li>)}
              </ul>
            )}
          </div>
          {COLUMNS.map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <p className="label-mono mb-4 text-dark-muted">{title}</p>
              <ul className="grid gap-1 text-[.9375rem]">
                {links.map(([label, href]) => <li key={href}><Link className={linkCls} to={href}>{label}</Link></li>)}
              </ul>
            </nav>
          ))}
          <div>
            <p className="label-mono mb-4 text-dark-muted">Contact</p>
            <ul className="grid gap-1 text-[.9375rem] [overflow-wrap:anywhere]">
              {SITE.email && <li><a className={linkCls} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
              {SITE.phone && <li><a className={linkCls} href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>}
              {SITE.address && <li>{SITE.address}</li>}
              <li><Link className={linkCls} to="/contact/">Send an enquiry</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 grid gap-2 border-t border-[#333] pt-6 text-center text-[.8125rem] text-dark-muted lg:grid-cols-[auto_1fr] lg:gap-8 lg:text-left">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="lg:text-right">{SITE.name} is an independent consultancy. We are not affiliated with any embassy, government body or awarding organisation unless stated.</p>
        </div>
      </div>
    </footer>
  );
}
