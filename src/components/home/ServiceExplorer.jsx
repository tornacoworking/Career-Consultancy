/* Service explorer: list + preview pane on desktop (hover, click or arrow keys);
   accordion on small screens. Every panel is in the server HTML. */
import { useRef, useState } from 'react';
import { ServicePhoto } from '../Photo.jsx';
import { Arrow, ButtonLink, SectionHead } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { useDesktop, useFinePointer } from '../../lib/hooks.js';
import { SERVICES, enquireUrl, serviceUrl } from '../../data/services.js';

const ROWS = ['lg:row-start-1', 'lg:row-start-2', 'lg:row-start-3', 'lg:row-start-4'];

export default function ServiceExplorer() {
  const [current, setCurrent] = useState(0);
  const desktop = useDesktop();
  const fine = useFinePointer();
  const btns = useRef([]);

  const select = (i, fromClick) => setCurrent(!desktop && fromClick && i === current ? -1 : i);
  const shown = desktop && current < 0 ? 0 : current;

  const onKey = (e, i) => {
    const k = e.key;
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return;
    e.preventDefault();
    let n = k === 'Home' ? 0 : k === 'End' ? SERVICES.length - 1 : i + (k === 'ArrowDown' ? 1 : -1);
    n = (n + SERVICES.length) % SERVICES.length;
    btns.current[n]?.focus();
    if (desktop) setCurrent(n);
  };

  return (
    <section className="section" id="services" aria-labelledby="svc-h">
      <div className="wrap">
        <SectionHead eyebrow="What we do" id="svc-h"
          lede="Select a service to see what it covers. Each one has its own page with the full scope, requirements and common questions.">
          Four services, <span className="accent">one clear</span> process.
        </SectionHead>

        <div className="border-t border-ink lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-[clamp(2.5rem,5vw,5rem)]">
          {SERVICES.map((s, i) => {
            const open = i === shown;
            return (
              <div key={s.slug} className="contents">
                <h3 className={`text-[length:inherit] lg:col-start-1 ${ROWS[i]}`}>
                  <button ref={(el) => { btns.current[i] = el; }} type="button" id={`ex-b-${s.slug}`}
                    aria-expanded={open} aria-controls={`ex-p-${s.slug}`}
                    onClick={() => select(i, true)} onKeyDown={(e) => onKey(e, i)}
                    onPointerEnter={() => { if (desktop && fine && current !== i) setCurrent(i); }}
                    className={`group grid min-h-16 w-full cursor-pointer grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-line bg-transparent py-[1.35rem] text-left font-display text-[clamp(1.35rem,1rem+1.8vw,2.5rem)] leading-[1.1] font-bold tracking-[-0.03em] transition-colors lg:py-7
                      ${open ? 'text-ink lg:shadow-[inset_0_-2px_0_var(--color-brand)]' : 'text-ink lg:text-muted-lg lg:hover:text-ink'}`}>
                    <span className={`font-mono text-[.9375rem] font-normal tracking-normal ${open ? 'text-brand-ink' : 'text-muted'}`}>{s.num}</span>
                    <span>{s.name}</span>
                    <span aria-hidden="true" className="relative size-5">
                      <span className="absolute inset-x-0 top-[9px] h-0.5 bg-current lg:hidden" />
                      <span className={`absolute inset-x-0 top-[9px] h-0.5 bg-current transition-transform duration-300 lg:hidden ${open ? 'rotate-0' : 'rotate-90'}`} />
                      <span className={`absolute top-[3px] left-0 hidden size-3.5 rotate-45 border-t-2 border-r-2 border-current transition-opacity lg:block ${open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </span>
                  </button>
                </h3>
                <div id={`ex-p-${s.slug}`} role="region" aria-labelledby={`ex-b-${s.slug}`} hidden={!open}
                  className="grid animate-in justify-items-center gap-5 border-b border-line pt-6 pb-10 text-center lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:justify-items-start lg:border-b-0 lg:text-left">
                  <figure className="w-full max-w-[520px]">
                    <ServicePhoto slug={s.slug} alt={s.art_label} className="h-auto w-full rounded-brand object-cover" />
                  </figure>
                  <p className="max-w-[34rem] text-lede leading-normal">{s.short}</p>
                  <p className="grid gap-1 text-[.9375rem] text-muted">
                    <span className="label-mono text-ink">Good for</span>{s.audience[0]}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
                    <ButtonLink to={serviceUrl(s.slug)} variant="dark" small arrow>About {s.name.toLowerCase()}</ButtonLink>
                    <Link className="text-link" to={enquireUrl(s.slug)}>Enquire <Arrow /></Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
