/* How it works: four steps joined by an orange line that fills as you scroll. */
import { useEffect, useRef, useState } from 'react';
import { SectionHead } from '../ui.jsx';
import { useReducedMotion } from '../../lib/hooks.js';
import { JOURNEY } from '../../data/home.js';

export default function Journey() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !('IntersectionObserver' in window)) { setP(1); return undefined; }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.3))));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { window.addEventListener('scroll', onScroll, { passive: true }); update(); }
      else window.removeEventListener('scroll', onScroll);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [reduce]);

  const last = JOURNEY.length - 1;
  return (
    <section className="section" id="how-it-works" aria-labelledby="how-h">
      <div className="wrap">
        <SectionHead eyebrow="How it works" id="how-h">
          From question to <span className="accent">next step</span> in four stages.
        </SectionHead>
        <ol ref={ref} className="relative grid gap-10 lg:grid-cols-4 lg:gap-8 lg:pt-[3.25rem]">
          <span aria-hidden="true" className="absolute top-[11px] right-0 left-3 hidden h-0.5 bg-line-strong lg:block">
            <span className="absolute inset-0 origin-left bg-brand" style={{ transform: `scaleX(${p})` }} />
          </span>
          {JOURNEY.map((j, i) => {
            const reached = p >= i / last - 0.001;
            return (
              <li key={j.title} className="relative grid justify-items-center gap-2 text-center lg:justify-items-start lg:text-left">
                <span aria-hidden="true"
                  className={`mb-1.5 size-6 rounded-full border-2 transition-[background-color,border-color,transform] duration-300 lg:absolute lg:-top-[3.25rem] lg:left-0 lg:mb-0 ${reached ? 'scale-110 border-brand bg-brand' : 'border-ink bg-paper'}`} />
                <p className="label-mono text-muted">Step {String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-title">{j.title}</h3>
                <p className="text-muted">{j.text}</p>
                {i < last && <span aria-hidden="true" className={`mt-4 h-5 w-0.5 lg:hidden ${reached ? 'bg-brand' : 'bg-line-strong'}`} />}
              </li>
            );
          })}
        </ol>
        <p className="mx-auto mt-10 max-w-[46rem] text-center text-[.9375rem] text-muted lg:mx-0 lg:text-left">
          The exact process and timeline depend on the service you choose and, in some cases, on employers, providers or authorities. We explain this before you commit.
        </p>
      </div>
    </section>
  );
}
