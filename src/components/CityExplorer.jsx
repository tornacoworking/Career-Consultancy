/*
 * City explorer. `compact` is the hero version (search + popular shortcuts + selected-city panel);
 * the full version lists every published city as a crawlable link. Choosing a city personalises the
 * rest of the site for this visit (memory only) and never blocks browsing without a choice.
 */
import { useId, useState } from 'react';
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { Arrow } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { useConsult } from '../lib/consult.jsx';
import { CITY_BY_SLUG, POPULAR_CITIES, PUBLISHED_CITIES, cityUrl, searchCities } from '../data/cities.js';

const CITY_SECTIONS = [['Experience certificate', 'documents'], ['Visa documentation', 'visa'], ['Project training', 'training']];

function SelectedCity({ city, onClear }) {
  return (
    <div className="animate-in grid gap-3 border border-ink bg-white p-4 text-left" role="status">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="label-mono text-brand-ink">Selected city</span>
        <strong className="font-display text-lg">{city.name}</strong>
        <button type="button" onClick={onClear} className="text-link ml-auto">Clear</button>
      </p>
      <ul className="flex flex-wrap gap-2">
        {CITY_SECTIONS.map(([label, hash]) => (
          <li key={hash}>
            <Link to={`${cityUrl(city.slug)}#${hash}`} className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-line-strong px-3.5 text-[.875rem] font-semibold no-underline hover:border-ink">
              {label} in {city.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={cityUrl(city.slug)} className="text-link w-fit">Open the {city.name} page <Arrow /></Link>
    </div>
  );
}

function NoMatch({ query }) {
  return (
    <div className="grid justify-items-start gap-3 border border-line bg-white p-4 text-[.9375rem]">
      <p>We don&apos;t have a dedicated page for &ldquo;{query.trim()}&rdquo; yet. Our services are online, so you can still ask for help from anywhere in India.</p>
      <ConsultLink variant="ghost" small>Enquire from your city</ConsultLink>
    </div>
  );
}

export default function CityExplorer({ compact = false }) {
  const { city: selectedSlug, setCity } = useConsult();
  const [query, setQuery] = useState('');
  const uid = useId();
  const selected = CITY_BY_SLUG[selectedSlug];
  const matches = searchCities(query);
  const typing = query.trim().length > 0;
  const count = `${matches.length} ${matches.length === 1 ? 'city' : 'cities'} found`;

  if (compact) {
    const shown = typing ? matches.slice(0, 6) : POPULAR_CITIES;
    return (
      <section className="grid gap-5 text-left lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-12" aria-labelledby={`${uid}-h`}>
        <div className="grid content-start gap-3">
          <h2 id={`${uid}-h`} className="flex items-center gap-2 font-display text-[1.25rem] font-bold tracking-[-0.01em]">
            <Icon name="pin" size={22} className="text-brand-ink" /> Find guidance in your city
          </h2>
          <p className="text-[.9375rem] text-muted">Search or pick a city to see how our visa, document and training guidance applies where you live. You can also browse without choosing.</p>
          <div className="relative">
            <label htmlFor={`${uid}-q`} className="sr-only">Search cities</label>
            <Icon name="search" size={20} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
            <input id={`${uid}-q`} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your city, e.g. Pune"
              autoComplete="off" className="field-input pl-11" aria-describedby={`${uid}-count`} />
          </div>
          <p id={`${uid}-count`} className="sr-only" aria-live="polite">{typing ? count : ''}</p>
          <Link to="/cities/" className="text-link w-fit">View all {PUBLISHED_CITIES.length} cities <Arrow /></Link>
        </div>
        <div className="grid content-start gap-4">
          {shown.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label={typing ? 'Matching cities' : 'Popular cities'}>
              {shown.map((c) => {
                const on = c.slug === selectedSlug;
                return (
                  <li key={c.slug}>
                    <button type="button" aria-pressed={on} onClick={() => { setCity(c.slug); setQuery(''); }}
                      className={`min-h-11 cursor-pointer rounded-full border-[1.5px] px-4 text-[.9375rem] font-semibold transition-colors ${on ? 'border-ink bg-ink text-white' : 'border-line-strong bg-white hover:border-ink'}`}>
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : <NoMatch query={query} />}
          {selected && <SelectedCity city={selected} onClear={() => setCity(null)} />}
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,26rem)_1fr] sm:items-end">
        <div className="relative">
          <label htmlFor={`${uid}-q`} className="field-label mb-2 block">Search cities</label>
          <Icon name="search" size={20} className="pointer-events-none absolute bottom-3.5 left-3.5 text-muted" />
          <input id={`${uid}-q`} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a city or state"
            autoComplete="off" className="field-input pl-11" aria-describedby={`${uid}-count`} />
        </div>
        <p id={`${uid}-count`} className="text-[.9375rem] text-muted" aria-live="polite">
          {typing ? count : `${PUBLISHED_CITIES.length} cities with their own guidance page`}
        </p>
      </div>
      {selected && <SelectedCity city={selected} onClear={() => setCity(null)} />}
      {matches.length > 0 ? (
        <ul className="grid grid-cols-1 gap-x-6 border-t border-ink min-[30rem]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {matches.map((c) => (
            <li key={c.slug}>
              <Link to={cityUrl(c.slug)} onClick={() => setCity(c.slug)} aria-current={c.slug === selectedSlug ? 'true' : undefined}
                className="group flex min-h-14 items-center justify-between gap-2 border-b border-line py-3 no-underline">
                <span className="grid min-w-0">
                  <span className={`font-display text-[1.05rem] leading-tight font-semibold group-hover:text-brand-ink ${c.slug === selectedSlug ? 'text-brand-ink' : ''}`}>{c.name}</span>
                  <span className="text-[.8125rem] text-muted">{c.state}</span>
                </span>
                <Arrow className="shrink-0 text-brand-ink transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      ) : <NoMatch query={query} />}
    </div>
  );
}
