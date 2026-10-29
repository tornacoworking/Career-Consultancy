/*
 * One card with every way to reach us: phone, email and the main branch address, each on its own row with an
 * icon and its own action. Used on the contact, about and Pune pages so the details read the same everywhere.
 */
import { useRef } from 'react';
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { CopyButton } from './ui.jsx';
import { SITE } from '../data/site.js';

export const mapsUrl = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
export const telUrl = () => `tel:${SITE.phone.replace(/\s/g, '')}`;

function Row({ icon, label, children }) {
  return (
    <li className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-4 first:pt-0 last:pb-0">
      <span className="grid size-10 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={icon} size={20} /></span>
      <div className="grid min-w-0 content-start gap-1">
        <p className="label-mono text-muted">{label}</p>
        {children}
      </div>
    </li>
  );
}

export default function BranchCard({ className = '', heading = 'Contact us directly', cta = false, email = true }) {
  const emailRef = useRef(null);
  const b = SITE.branch;
  return (
    <section aria-labelledby="reach-h" className={`grid gap-5 border-[1.5px] border-ink bg-white p-[clamp(1.25rem,3vw,1.75rem)] text-left ${className}`}>
      <h2 id="reach-h" className="text-title">{heading}</h2>
      <ul className="divide-y divide-line">
        {SITE.phone && (
          <Row icon="phone" label="Phone">
            <a className="w-fit font-display text-lg font-semibold no-underline hover:text-brand-ink" href={telUrl()}>{SITE.phone}</a>
            <p className="text-[.875rem] text-muted">Tap to call from your phone.</p>
          </Row>
        )}
        {email && SITE.email && (
          <Row icon="mail" label="Email">
            <span ref={emailRef} className="font-display text-[.9375rem] font-semibold [overflow-wrap:anywhere] sm:text-lg">{SITE.email}</span>
            <span><CopyButton getText={() => SITE.email} targetRef={emailRef} label="Copy email" /></span>
          </Row>
        )}
        {b && (
          <Row icon="pin" label={b.name}>
            <address className="not-italic text-muted">
              {b.lines.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <a className="text-link w-fit" href={mapsUrl()} target="_blank" rel="noopener">Get directions</a>
            <p className="text-[.8125rem] text-muted">Please contact us before visiting so we can arrange a time.</p>
          </Row>
        )}
      </ul>
      {cta && <div><ConsultLink small arrow>Get Consultation</ConsultLink></div>}
    </section>
  );
}
