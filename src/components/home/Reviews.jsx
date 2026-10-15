/* Feedback and ratings: rating summary + swipeable review carousel. */
import { useEffect, useRef, useState } from 'react';
import { Arrow, SampleBadge, SectionHead, Stars } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { GOOGLE_RATING, RATING_BREAKDOWN, SAMPLE_DATA, TESTIMONIALS } from '../../data/site.js';
import { Avatar } from '../Photo.jsx';
import { SERVICE_BY_SLUG, serviceUrl } from '../../data/services.js';

export default function Reviews() {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const total = Object.values(RATING_BREAKDOWN).reduce((a, b) => a + b, 0);
  const avg = total ? Object.entries(RATING_BREAKDOWN).reduce((a, [k, v]) => a + k * v, 0) / total : 0;
  const shown = Math.round(avg * 10) / 10 || GOOGLE_RATING.rating;

  useEffect(() => {
    const el = track.current;
    const update = () => setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const page = (dir) => track.current.scrollBy({
    left: dir * track.current.clientWidth * 0.9,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });

  return (
    <section className="section bg-grey" id="reviews" aria-labelledby="rev-h">
      <div className="wrap">
        <div className="mb-[clamp(2rem,4vw,3rem)] grid items-end gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <SectionHead eyebrow="Feedback and ratings" id="rev-h" badge={<SampleBadge show={SAMPLE_DATA} />} className="!mb-0">
            What our customers say
          </SectionHead>
          <div className="grid grid-cols-1 items-center justify-items-center gap-x-6 gap-y-1 border border-line bg-white p-6 text-center sm:grid-cols-[auto_minmax(0,1fr)] sm:justify-items-start sm:text-left">
            <p className="font-display text-[4rem] leading-none font-extrabold tracking-[-0.05em] sm:row-span-2">
              {shown.toFixed(1)}<span className="text-xl tracking-normal text-muted">/5</span>
            </p>
            <Stars rating={shown} size="text-2xl" />
            <p className="text-[.9375rem] text-muted">Google rating · {total} reviews</p>
            <ul className="col-span-full mt-4 grid w-full gap-1.5" aria-label="Rating breakdown">
              {[5, 4, 3, 2, 1].map((k) => (
                <li key={k} className="grid grid-cols-[1rem_minmax(0,1fr)_2.5rem] items-center gap-3 font-mono text-[.8125rem]">
                  <span>{k}<span className="sr-only"> stars</span></span>
                  <span aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-grey">
                    <span className="block h-full rounded-full bg-brand" style={{ width: `${((RATING_BREAKDOWN[k] ?? 0) / total) * 100}%` }} />
                  </span>
                  <span className="text-right text-muted tabular-nums">{RATING_BREAKDOWN[k] ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul ref={track} tabIndex={0} aria-label="Customer reviews"
          className="no-scrollbar grid snap-x snap-mandatory auto-cols-[minmax(min(85%,360px),1fr)] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-2 lg:auto-cols-[calc((100%-2rem)/3)]">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="grid snap-start grid-rows-[auto_1fr_auto] justify-items-center gap-[1.1rem] border border-line bg-white p-[1.6rem] text-center lg:justify-items-start lg:text-left">
              <Stars rating={t.rating} />
              <blockquote className="text-[1.08rem] leading-normal font-medium">
                <p><span className="mr-0.5 font-display text-[1.5em] leading-none font-extrabold text-brand-ink" aria-hidden="true">“</span>{t.quote}</p>
              </blockquote>
              <div className="grid w-full grid-cols-1 items-center justify-items-center gap-x-3 gap-y-1 border-t border-line pt-4 lg:grid-cols-[auto_minmax(0,1fr)] lg:justify-items-start">
                <Avatar name={t.name} file={t.avatar} className="lg:row-span-2" />
                <p className="grid text-[.9375rem]"><strong>{t.name}</strong><span className="text-muted">{t.context}{t.when ? ` · ${t.when}` : ''}</span></p>
                <Link to={serviceUrl(t.service)} className="font-mono text-[.8125rem] text-brand-ink no-underline hover:underline lg:col-start-2">
                  {SERVICE_BY_SLUG[t.service].name}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          {[['prev', -1, 'Previous reviews', edges.start], ['next', 1, 'Next reviews', edges.end]].map(([k, dir, label, disabled]) => (
            <button key={k} type="button" aria-label={label} disabled={disabled} onClick={() => page(dir)}
              className="grid size-12 cursor-pointer place-items-center rounded-full border-[1.5px] border-ink bg-transparent text-ink transition-colors enabled:hover:bg-ink enabled:hover:text-white disabled:cursor-default disabled:opacity-30">
              <Arrow className={dir < 0 ? 'rotate-180' : ''} />
            </button>
          ))}
          <Link className="text-link basis-full justify-center lg:ml-auto lg:basis-auto" to="/feedback/">Share your feedback <Arrow /></Link>
        </div>

        <div className="mt-[clamp(2rem,4vw,3rem)] grid items-center gap-5 border border-ink bg-white p-[clamp(1.25rem,3vw,2rem)] text-center md:grid-cols-[minmax(0,1fr)_auto] md:text-left">
          <div className="grid gap-1.5">
            <h3 className="font-display text-title leading-tight font-bold tracking-[-0.02em]">Used our service? Tell us how it went.</h3>
            <p className="text-muted">Tap a star to start. It takes about a minute, and we read every response.</p>
          </div>
          <ul className="flex justify-center gap-1.5 md:justify-end" aria-label="Rate your experience">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n}>
                <Link to={`/feedback/?rating=${n}`} aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  className="group grid size-12 place-items-center rounded-full border-[1.5px] border-line-strong text-xl text-line-strong no-underline transition-colors hover:border-ink hover:bg-brand hover:text-ink">
                  <span aria-hidden="true">★</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
