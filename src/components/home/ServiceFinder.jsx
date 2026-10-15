/* "What brings you here?" — goal-based picker that suggests one service. */
import { useState } from 'react';
import { Arrow, ButtonLink, Eyebrow } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { NEEDS } from '../../data/home.js';
import { SERVICE_BY_SLUG, enquireUrl, serviceUrl } from '../../data/services.js';

export default function ServiceFinder() {
  const [need, setNeed] = useState(NEEDS[0].slug);
  const s = SERVICE_BY_SLUG[need];
  return (
    <section className="section bg-white" id="find-your-service" aria-labelledby="find-h">
      <div className="wrap grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid content-start justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
          <Eyebrow>Find your service</Eyebrow>
          <h2 id="find-h" className="h-section" data-spotlight>What brings you here?</h2>
          <p className="lede">Choose the option closest to your situation. No sign-up needed.</p>
          <fieldset className="mt-4 grid w-full min-w-0 gap-2.5 text-left">
            <legend className="sr-only">What do you need help with?</legend>
            {NEEDS.map((n) => {
              const on = n.slug === need;
              return (
                <label key={n.slug}
                  className={`flex min-h-14 cursor-pointer items-center gap-3.5 rounded-brand border-[1.5px] px-[1.1rem] py-3.5 font-medium transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${on ? 'border-ink bg-white shadow-[inset_4px_0_0_var(--color-brand)]' : 'border-line-strong bg-paper hover:border-ink'}`}>
                  <input type="radio" name="need" value={n.slug} checked={on} onChange={() => setNeed(n.slug)} className="pointer-events-none absolute opacity-0" />
                  <span aria-hidden="true" className="grid size-[18px] shrink-0 place-items-center rounded-full border-2 border-ink">
                    <span className={`size-2 rounded-full bg-brand transition-transform duration-300 ease-brand ${on ? 'scale-100' : 'scale-0'}`} />
                  </span>
                  <span>{n.label}</span>
                </label>
              );
            })}
          </fieldset>
        </div>
        <div aria-live="polite" className="min-w-0">
          <div key={need} className="grid animate-in content-start justify-items-center gap-4 border border-line bg-paper p-[clamp(1.5rem,3vw,2.5rem)] text-center lg:justify-items-start lg:text-left">
            <p className="eyebrow">Suggested service · {s.num}</p>
            <h3 className="text-section">{s.name}</h3>
            <p>{s.short}</p>
            <dl className="mt-2 grid w-full gap-4 border-t border-line pt-5">
              <div><dt className="label-mono mb-1.5">Who it&apos;s for</dt><dd className="text-muted">{s.audience[0]}.</dd></div>
              <div>
                <dt className="label-mono mb-1.5">Useful to have ready</dt>
                <dd className="text-muted">
                  <ul className="grid gap-1">{s.ready.slice(0, 3).map((r) => <li key={r}><span className="text-brand-ink">— </span>{r}</li>)}</ul>
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ButtonLink to={enquireUrl(need)} arrow>Enquire about this</ButtonLink>
              <Link className="text-link" to={serviceUrl(need)}>Read the full details <Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
