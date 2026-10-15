import { CountUp, Eyebrow, SampleBadge } from '../ui.jsx';
import { SAMPLE_DATA, STATS } from '../../data/site.js';

export default function Impact() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-[clamp(3.5rem,7vw,6rem)] text-paper" aria-labelledby="impact-h">
      <span aria-hidden="true" className="pointer-events-none absolute -top-[40%] -right-[12%] aspect-square w-[clamp(280px,40vw,560px)] rounded-full bg-brand opacity-10" />
      <div className="wrap relative">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-[50rem] justify-items-center gap-4 text-center lg:justify-items-start lg:text-left">
          <Eyebrow>Our impact</Eyebrow>
          <SampleBadge show={SAMPLE_DATA} />
          <h2 id="impact-h" className="h-section" data-spotlight>
            People we&apos;ve helped take their <span className="accent-d">next step.</span>
          </h2>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-t border-dark-line text-center lg:text-left">
          {STATS.map((s, i) => (
            <li key={s.label} className={`grid content-start justify-items-center gap-1.5 border-b border-dark-line py-7 lg:justify-items-start lg:pr-6 ${i > 0 ? 'lg:border-l lg:pl-6' : ''}`}>
              <p className="font-display text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none font-extrabold tracking-[-0.045em] tabular-nums">
                <CountUp value={s.value} /><span className="text-brand">{s.suffix}</span>
              </p>
              <p className="font-display text-[1.1rem] leading-snug font-semibold">{s.label}</p>
              <p className="text-[.9375rem] text-dark-muted">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
