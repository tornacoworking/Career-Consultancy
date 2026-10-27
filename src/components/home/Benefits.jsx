import { Eyebrow } from '../ui.jsx';
import { Picture } from '../Photo.jsx';
import { BENEFITS } from '../../data/home.js';

export default function Benefits() {
  return (
    <section className="section bg-grey" id="why" aria-labelledby="why-h">
      <div className="wrap grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid content-start justify-items-center gap-[1.1rem] text-center lg:sticky lg:top-[110px] lg:justify-items-start lg:text-left">
          <Eyebrow>Why Career Consultancy</Eyebrow>
          <h2 id="why-h" className="h-section" data-spotlight>Guidance you can actually follow.</h2>
          <p className="lede">We focus on the things that make a difference when you are dealing with paperwork, providers and deadlines.</p>
          <Picture name="about.jpg" width={1200} height={675} alt="A consultant and a client talking through their situation across a table"
            className="mt-4 h-auto w-full max-w-[520px] rounded-brand object-cover" />
        </div>
        <ul className="min-w-0 border-t border-ink">
          {BENEFITS.map((b) => (
            <li key={b.title} className="relative grid justify-items-center gap-2 border-b border-line-strong py-[1.6rem] text-center lg:justify-items-start lg:pl-7 lg:text-left">
              <span aria-hidden="true" className="mb-1 size-2.5 rounded-full bg-brand lg:absolute lg:top-[2.05rem] lg:left-0 lg:mb-0" />
              <h3 className="text-title">{b.title}</h3>
              <p className="max-w-[36rem] text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
