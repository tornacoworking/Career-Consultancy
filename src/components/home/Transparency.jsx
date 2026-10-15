import { SectionHead } from '../ui.jsx';
import { COMMITMENTS, TRANSPARENCY } from '../../data/home.js';

export default function Transparency() {
  return (
    <section className="section" id="transparency" aria-labelledby="trust-h">
      <div className="wrap">
        <SectionHead eyebrow="Trust and transparency" id="trust-h" lede="Every service starts with these four things, agreed with you in writing.">
          Before you pay, <span className="accent">you&apos;ll know</span> exactly what you&apos;re getting.
        </SectionHead>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-8">
          {TRANSPARENCY.map((t) => (
            <li key={t.title} className="grid content-start justify-items-center gap-2.5 border-t-2 border-ink pt-5 text-center lg:justify-items-start lg:text-left">
              <h3 className="text-title">{t.title}</h3>
              <p className="text-muted">{t.text}</p>
            </li>
          ))}
        </ul>
        <div className="on-dark mt-[clamp(3rem,6vw,5rem)] grid justify-items-center gap-6 bg-ink p-[clamp(1.75rem,4vw,3rem)] text-center text-paper lg:justify-items-start lg:text-left">
          <p className="eyebrow">Our commitments</p>
          <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-x-10 gap-y-4">
            {COMMITMENTS.map((c) => (
              <li key={c} className="relative grid justify-items-center gap-2 font-display text-[1.15rem] leading-snug font-semibold lg:block lg:pl-6">
                <span aria-hidden="true" className="size-2 rounded-full bg-brand lg:absolute lg:top-[.45em] lg:left-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
