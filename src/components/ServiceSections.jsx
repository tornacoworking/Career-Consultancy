/* Building blocks shared by the service pages, sub-service pages and city pages. */
import { useState } from 'react';
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { Arrow } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { subServiceUrl } from '../data/services.js';
import { DESTINATIONS } from '../data/visaServices.js';
import { GENUINE_VS_FABRICATED } from '../data/experienceDocumentServices.js';
import { COURSE_VS_PROJECT, TRAINING_FORMATS } from '../data/trainingServices.js';

/** Cards linking to sub-service pages, each with its own enquiry CTA that prefills the form. */
export function SubServiceGrid({ items, current }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-x-8 border-t border-ink">
      {items.map((x) => (
        <li key={x.slug} className="grid content-between gap-3 border-b border-line py-5">
          <Link to={subServiceUrl(x)} aria-current={x.slug === current ? 'page' : undefined}
            className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 no-underline">
            <span className="grid size-10 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={x.icon} size={22} /></span>
            <span className="grid gap-1">
              <span className="font-display text-lg leading-tight font-bold tracking-[-0.015em] group-hover:text-brand-ink">{x.name}</span>
              <span className="text-[.9375rem] text-muted">{x.short}</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pl-14">
            <Link to={subServiceUrl(x)} className="text-link">Details <Arrow /></Link>
            <ConsultLink service={x.parent} sub={x.slug} plain className="text-link">
              {x.parent === 'online-training' ? 'Discuss This Training' : 'Enquire'}
            </ConsultLink>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Country selector for visa pages. Choosing a country sets the destination in the enquiry form. */
export function DestinationPicker({ sub }) {
  const [slug, setSlug] = useState('');
  const d = DESTINATIONS.find((x) => x.slug === slug);
  return (
    <div className="grid gap-4">
      <p>Choose a destination to see who sets the rules and to start an enquiry for it. We do not list fees, processing times or eligibility, because they change.</p>
      <div role="group" aria-label="Destination country" className="flex flex-wrap gap-2">
        {DESTINATIONS.map((x) => (
          <button key={x.slug} type="button" aria-pressed={x.slug === slug} onClick={() => setSlug(x.slug === slug ? '' : x.slug)}
            className={`min-h-10 cursor-pointer rounded-full border-[1.5px] px-3.5 text-[.9rem] font-semibold transition-colors ${x.slug === slug ? 'border-ink bg-ink text-white' : 'border-line-strong bg-white hover:border-ink'}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="min-h-[5.5rem]">
        {d && (
          <div className="animate-in grid justify-items-start gap-3 border border-line bg-white p-5">
            <p><strong>{d.name}:</strong> applications are decided by {d.authority}. We help you read its current published requirements and organise your documents. Eligibility and timelines depend on that authority.</p>
            <ConsultLink service="visa-services" sub={sub} destination={d.slug} small arrow>Discuss a {d.name} application</ConsultLink>
          </div>
        )}
      </div>
    </div>
  );
}

/** Genuine records versus fabrication, for the experience-document pages. */
export function GenuineCompare() {
  const cols = [
    ['What we help with', GENUINE_VS_FABRICATED.genuine, 'ticks'],
    ['What we never do', GENUINE_VS_FABRICATED.fabricated, 'crosses'],
  ];
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {cols.map(([title, items, kind]) => (
        <div key={title} className={`grid content-start gap-3 border-t-2 pt-4 ${kind === 'ticks' ? 'border-ink' : 'border-error'}`}>
          <h3 className="text-xl">{title}</h3>
          <ul className={kind === 'ticks' ? 'ticks' : 'grid gap-3'}>
            {items.map((t) => (
              <li key={t} className={kind === 'ticks' ? '' : 'relative pl-7 before:absolute before:left-0 before:font-bold before:text-error before:content-["✕"]'}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function CourseVsProject() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {COURSE_VS_PROJECT.map((c) => (
        <div key={c.title} className="grid content-start gap-3 border-t-2 border-ink pt-4">
          <h3 className="text-xl">{c.title}</h3>
          <ul className="ticks">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

export function FormatList() {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-x-8 border-t border-ink">
      {TRAINING_FORMATS.map((f) => (
        <li key={f.name} className="grid gap-1 border-b border-line py-4">
          <strong className="font-display">{f.name}</strong>
          <span className="text-[.9375rem] text-muted">{f.text}</span>
        </li>
      ))}
    </ul>
  );
}
