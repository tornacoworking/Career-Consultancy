/* Hero "readiness check": pick a service, tick what you already have, see how ready you are.
   Nothing is stored or sent. Uses each service's own "what to keep ready" list. */
import { useState } from 'react';
import { Arrow } from '../ui.jsx';
import ConsultLink from '../ConsultLink.jsx';
import { SERVICES } from '../../data/services.js';

const MAX_ITEMS = 4;
const SHORT = { 'real-time-project-training': 'Training', 'visa-documentation': 'Visa', 'experience-certificate': 'Experience certificate' };
const verdict = (n, total) => (n === 0 ? 'Tick what you already have.' : n === total ? 'You have everything. Send your enquiry.' : `${total - n} left to gather. We can help with that.`);

export default function HeroReadiness() {
  const [slug, setSlug] = useState(SERVICES[0].slug);
  const [done, setDone] = useState({});
  const s = SERVICES.find((x) => x.slug === slug);
  const items = s.ready.slice(0, MAX_ITEMS);
  const ticks = done[slug] ?? [];
  const pct = Math.round((ticks.length / items.length) * 100);
  const toggle = (i) => setDone({ ...done, [slug]: ticks.includes(i) ? ticks.filter((t) => t !== i) : [...ticks, i] });

  return (
    <section aria-labelledby="ready-h"
      className="mt-4 w-full border border-ink bg-white p-4 text-left shadow-[0_18px_40px_-22px_rgba(25,25,25,.55)] lg:relative lg:z-10 lg:-mt-24 lg:-ml-6 lg:w-[19.5rem] xl:-ml-10">
      <div className="flex items-center gap-3">
        <svg className="shrink-0 -rotate-90" viewBox="0 0 44 44" width="48" height="48" aria-hidden="true" focusable="false">
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" className="stroke-grey" />
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" strokeLinecap="round" pathLength="100" className="ring-fg stroke-brand" style={{ '--pct': pct }} />
        </svg>
        <div className="min-w-0">
          <p className="label-mono text-brand-ink">Readiness check</p>
          <h2 id="ready-h" className="font-display text-[1.05rem] leading-tight font-bold tracking-[-0.02em]">How ready are you?</h2>
        </div>
        <p className="ml-auto font-display text-2xl leading-none font-extrabold tracking-[-0.04em] tabular-nums" aria-hidden="true">{pct}%</p>
      </div>

      <div role="group" aria-label="Choose a service" className="mt-3 flex flex-wrap gap-1.5">
        {SERVICES.map((x) => (
          <button key={x.slug} type="button" aria-pressed={x.slug === slug} onClick={() => setSlug(x.slug)}
            className={`min-h-9 cursor-pointer rounded-full border-[1.5px] px-3 text-[.8125rem] font-semibold transition-colors ${x.slug === slug ? 'border-ink bg-ink text-white' : 'border-line-strong bg-transparent text-ink hover:border-ink'}`}>
            {SHORT[x.slug] ?? x.name}
          </button>
        ))}
      </div>

      <ul className="mt-2 divide-y divide-line">
        {items.map((item, i) => {
          const on = ticks.includes(i);
          return (
            <li key={item}>
              <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5 text-[.875rem] leading-snug">
                <input type="checkbox" className="absolute size-px opacity-0" checked={on} onChange={() => toggle(i)} />
                <span className="box mt-px shrink-0" aria-hidden="true" />
                <span className={on ? 'text-muted line-through decoration-brand' : ''}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-1 text-[.8125rem] text-muted" aria-live="polite">
        <span className="sr-only">{ticks.length} of {items.length} ready. </span>{verdict(ticks.length, items.length)}
      </p>
      <ConsultLink service={slug} plain className="text-link mt-2 inline-flex min-h-9 items-center gap-1.5 text-[.9375rem]">
        Get help with {s.name.toLowerCase()} <Arrow />
      </ConsultLink>
    </section>
  );
}
