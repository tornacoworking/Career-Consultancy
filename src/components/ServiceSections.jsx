/* Building blocks shared by the service pages, sub-service pages and city pages. */
import { useState } from 'react';
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { Arrow } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { subServiceUrl } from '../data/services.js';
import { DESTINATIONS } from '../data/visaServices.js';
import {
  CERTIFICATE_CONTENTS, EXPERIENCE_FEATURES, EXPERIENCE_INDUSTRIES, EXPERIENCE_USES, GENUINE_VS_FABRICATED,
  INDUSTRY_NOTES, RED_FLAGS, REGION_NOTES, WORKING_WITH_US,
} from '../data/experienceDocumentServices.js';
import { PUBLISHED_CITIES, REGIONS, cityUrl } from '../data/cities.js';
import { COURSE_VS_PROJECT, TRAINING_FORMATS } from '../data/trainingServices.js';

/** Cards linking to sub-service pages, each with its own enquiry CTA that prefills the form. */
export function SubServiceGrid({ items, current, cols = 2, cta = true }) {
  // When the last row would be short, a "not sure?" tile fills the gap instead of leaving it empty.
  const rem = items.length % cols;
  const span = cta && rem ? cols - rem : 0;
  return (
    <ul className={`grid grid-cols-1 gap-x-8 border-t border-ink md:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''}`}>
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
              {x.parent === 'real-time-project-training' ? 'Discuss This Training' : 'Enquire'}
            </ConsultLink>
          </div>
        </li>
      ))}
      {span > 0 && (
        <li className={`grid content-center gap-2 border-b border-line bg-grey p-6 ${span === 2 ? 'lg:col-span-2' : ''}`}>
          <p className="font-display text-lg font-bold tracking-[-0.015em]">Not sure which fits?</p>
          <p className="text-[.9375rem] text-muted">Tell us your goal and we will point you to the right one.</p>
          <div><ConsultLink service={items[0].parent} small arrow>Ask us</ConsultLink></div>
        </li>
      )}
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
            <ConsultLink service="visa-documentation" sub={sub} destination={d.slug} small arrow>Discuss a {d.name} application</ConsultLink>
          </div>
        )}
      </div>
    </div>
  );
}

/** Genuine records versus fabrication, for the experience-document pages. */
export function GenuineCompare({ help = GENUINE_VS_FABRICATED.genuine, never = GENUINE_VS_FABRICATED.fabricated }) {
  const cols = [
    ['What we help with', help, 'ticks'],
    ['What we never do', never, 'crosses'],
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

/** Image on the left, content on the right. Stacks on small screens. */
function Split({ image, alt, children }) {
  return (
    <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
      <figure className="relative min-h-[16rem] overflow-hidden rounded-brand md:min-h-[22rem]">
        <img className="photo absolute inset-0 size-full object-cover" src={`${import.meta.env.BASE_URL}images/${image}`} width="640" height="800" alt={alt} loading="lazy" decoding="async" />
      </figure>
      <div className="grid content-start gap-5">{children}</div>
    </div>
  );
}

function Ticks({ items }) {
  return <ul className="ticks">{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

/** Where an experience certificate is asked for, with what a good one contains. */
export function WhySection() {
  return (
    <div className="grid gap-8">
      <Split image="experience-why.jpg" alt="A candidate smiling and shaking hands with a hiring colleague across a meeting table">
        <h3 className="text-xl">What a good certificate shows</h3>
        <p className="text-[.9375rem] text-muted">Whoever reads it will look for these details first. If one is missing or wrong, ask the issuer to correct it before you submit.</p>
        <Ticks items={CERTIFICATE_CONTENTS} />
      </Split>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-x-8 border-t border-ink">
        {EXPERIENCE_USES.map((u, i) => (
          <li key={u.title} className="grid content-start gap-1.5 border-b border-line py-5">
            <span className="font-mono text-[.8125rem] text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-lg tracking-[-0.015em]">{u.title}</h3>
            <p className="text-[.9375rem] text-muted">{u.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function IndustrySection() {
  return (
    <div className="grid gap-8">
      <Split image="experience-industries.jpg" alt="A tall stack of clipped office paperwork next to a pair of glasses on a desk">
        <h3 className="text-xl">Across twelve sectors</h3>
        <ul className="flex flex-wrap gap-2" aria-label="Industries we support">
          {EXPERIENCE_INDUSTRIES.map((x) => (
            <li key={x} className="rounded-full border-[1.5px] border-line-strong bg-white px-4 py-2 text-[.9375rem] font-semibold">{x}</li>
          ))}
        </ul>
        <p className="text-[.9375rem] text-muted">Large HR departments, single-owner businesses, contractors and institutions all have their own habits. Knowing who signs, and what they expect to be asked, saves weeks.</p>
      </Split>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-x-8 border-t border-ink">
        {INDUSTRY_NOTES.map((n) => (
          <li key={n.sector} className="grid content-start gap-1.5 border-b border-line py-5">
            <h3 className="text-lg tracking-[-0.015em]">{n.sector}</h3>
            <p className="text-[.9375rem] text-muted">{n.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The things that are specific to this service, as icon cards, beside how we work. */
export function FeatureSection() {
  return (
    <div className="grid gap-8">
      <Split image="experience-features.jpg" alt="A calm client listening during a one-to-one consultation">
        <h3 className="text-xl">How we work with you</h3>
        <ul className="grid gap-4">
          {WORKING_WITH_US.map((w) => (
            <li key={w.lead} className="border-l-[3px] border-brand pl-4"><strong>{w.lead}</strong> {w.text}</li>
          ))}
        </ul>
      </Split>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-5">
        {EXPERIENCE_FEATURES.map((f) => (
          <li key={f.title} className="grid content-start gap-3 border border-line bg-white p-6">
            <span className="grid size-11 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={f.icon} size={24} /></span>
            <h3 className="text-lg leading-tight tracking-[-0.015em]">{f.title}</h3>
            <p className="text-[.9375rem] text-muted">{f.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Genuine versus fabricated, with the warning signs of a fake-certificate provider. */
export function GenuineSection() {
  return (
    <div className="grid gap-8">
      <Split image="experience-genuine.jpg" alt="A hand signing a form with a pen while another hand points to the line being signed">
        <h3 className="text-xl">Warning signs of a fake provider</h3>
        <p className="text-[.9375rem] text-muted">A certificate that cannot be confirmed by the employer named on it will fail a proper check, and can put a visa, a job offer or your name at risk.</p>
        <ul className="grid gap-3">
          {RED_FLAGS.map((t) => (
            <li key={t} className='relative pl-7 before:absolute before:left-0 before:font-bold before:text-error before:content-["✕"]'>{t}</li>
          ))}
        </ul>
      </Split>
      <GenuineCompare />
    </div>
  );
}

/** Every published city, grouped by region, each linking to its own page. The service itself is online. */
export function LocationsServed() {
  return (
    <div className="grid gap-8">
      <Split image="experience-locations.jpg" alt="Two professionals in a one-to-one consultation across a desk by a large window">
        <h3 className="text-xl">Online, wherever you are</h3>
        <p>This service is delivered online, so you can use it from anywhere in India. The city pages below describe the local picture, such as the kinds of employers people there work for.</p>
        <Ticks items={['Consultation by phone, email or video, at times that suit you', 'The same written scope, timeline and fee in every city', 'Requests written for employers wherever they are based, including outside India']} />
      </Split>
      <div className="grid gap-6">
        {REGIONS.map((region) => {
          const cities = PUBLISHED_CITIES.filter((c) => c.region === region);
          if (!cities.length) return null;
          return (
            <div key={region} className="grid gap-3 border-t border-ink pt-4">
              <h3 className="text-lg">{region}</h3>
              {REGION_NOTES[region] && <p className="text-[.9375rem] text-muted">{REGION_NOTES[region]}</p>}
              <ul className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link to={`${cityUrl(c.slug)}#documents`} className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-line-strong px-4 font-semibold no-underline hover:border-ink">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <p className="text-[.9375rem] text-muted">Do not see your city? <Link to="/cities/">Browse all cities</Link> or send an enquiry. We help applicants everywhere in India.</p>
      </div>
    </div>
  );
}

/* ---------- Data-driven long-form sections (see data/serviceRich.js) ---------- */

function Flags({ items }) {
  return (
    <ul className="grid gap-3">
      {items.map((t) => (
        <li key={t} className='relative pl-7 before:absolute before:left-0 before:font-bold before:text-error before:content-["✕"]'>{t}</li>
      ))}
    </ul>
  );
}

function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((x) => (
        <li key={x} className="rounded-full border-[1.5px] border-line-strong bg-white px-4 py-2 text-[.9375rem] font-semibold">{x}</li>
      ))}
    </ul>
  );
}

function Leads({ items }) {
  return (
    <ul className="grid gap-4">
      {items.map((w) => (
        <li key={w.lead} className="border-l-[3px] border-brand pl-4"><strong>{w.lead}</strong> {w.text}</li>
      ))}
    </ul>
  );
}

function Numbered({ items }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-x-8 border-t border-ink">
      {items.map((u, i) => (
        <li key={u.title} className="grid content-start gap-1.5 border-b border-line py-5">
          <span className="font-mono text-[.8125rem] text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="text-lg tracking-[-0.015em]">{u.title}</h3>
          <p className="text-[.9375rem] text-muted">{u.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Notes({ items }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-x-8 border-t border-ink">
      {items.map((n) => (
        <li key={n.title} className="grid content-start gap-1.5 border-b border-line py-5">
          <h3 className="text-lg tracking-[-0.015em]">{n.title}</h3>
          <p className="text-[.9375rem] text-muted">{n.text}</p>
        </li>
      ))}
    </ul>
  );
}

function Cards({ items }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-5">
      {items.map((f) => (
        <li key={f.title} className="grid content-start gap-3 border border-line bg-white p-6">
          <span className="grid size-11 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={f.icon} size={24} /></span>
          <h3 className="text-lg leading-tight tracking-[-0.015em]">{f.title}</h3>
          <p className="text-[.9375rem] text-muted">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

const BELOW = { numbered: Numbered, notes: Notes, cards: Cards };

/** One long-form section: image left with a short list, then a grid (or a help/never comparison) underneath. */
export function RichSection({ cfg }) {
  const Below = cfg.below ? BELOW[cfg.below.type] : null;
  return (
    <div className="grid gap-8">
      <Split image={cfg.image} alt={cfg.alt}>
        <h3 className="text-xl">{cfg.heading}</h3>
        {cfg.kind === 'ticks' && <Ticks items={cfg.items} />}
        {cfg.kind === 'flags' && <Flags items={cfg.items} />}
        {cfg.kind === 'chips' && <Chips items={cfg.items} />}
        {cfg.kind === 'leads' && <Leads items={cfg.items} />}
        {cfg.note && <p className="text-[.9375rem] text-muted">{cfg.note}</p>}
      </Split>
      {cfg.belowTitle && <h3 className="-mb-4 text-xl">{cfg.belowTitle}</h3>}
      {Below && <Below items={cfg.below.items} />}
      {cfg.compare && <GenuineCompare help={cfg.compare.help} never={cfg.compare.never} />}
    </div>
  );
}

/** Cities grouped by region, each linking to the matching section of its city page. */
export function RichLocations({ cfg, hash }) {
  return (
    <div className="grid gap-8">
      <Split image={cfg.image} alt={cfg.alt}>
        <h3 className="text-xl">{cfg.heading}</h3>
        <p>{cfg.text}</p>
        <Ticks items={cfg.points} />
      </Split>
      <div className="grid gap-6">
        {REGIONS.map((region) => {
          const cities = PUBLISHED_CITIES.filter((c) => c.region === region);
          if (!cities.length) return null;
          return (
            <div key={region} className="grid gap-3 border-t border-ink pt-4">
              <h3 className="text-lg">{region}</h3>
              {cfg.notes?.[region] && <p className="text-[.9375rem] text-muted">{cfg.notes[region]}</p>}
              <ul className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link to={`${cityUrl(c.slug)}#${hash}`} className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-line-strong px-4 font-semibold no-underline hover:border-ink">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        <p className="text-[.9375rem] text-muted">Do not see your city? <Link to="/cities/">Browse all cities</Link> or send an enquiry. We help applicants everywhere in India.</p>
      </div>
    </div>
  );
}
