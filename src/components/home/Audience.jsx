import { useRef } from 'react';
import { Arrow, SectionHead } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { useFinePointer, useReducedMotion } from '../../lib/hooks.js';
import { AUDIENCES } from '../../data/home.js';
import { SERVICE_BY_SLUG, serviceUrl } from '../../data/services.js';

function AudienceCard({ a }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const onMove = (e) => {
    if (!fine || raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const el = ref.current;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
      if (!reduce) el.style.transform = `perspective(800px) rotateX(${((0.5 - py) * 5).toFixed(2)}deg) rotateY(${((px - 0.5) * 6).toFixed(2)}deg)`;
    });
  };
  return (
    <Link ref={ref} to={serviceUrl(a.slug)} onPointerMove={onMove} onPointerLeave={() => { ref.current.style.transform = ''; }}
      className="group relative isolate grid h-full content-start justify-items-center gap-3 overflow-hidden rounded-brand border border-line bg-white p-7 text-center text-ink no-underline transition-[transform,background-color,color,border-color] duration-300 ease-brand [--gx:50%] [--gy:0%] hover:border-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper lg:min-h-[280px] lg:justify-items-start lg:text-left">
      <span aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(260px_circle_at_var(--gx)_var(--gy),rgba(255,145,77,.45),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span className="font-display text-[3.5rem] leading-none font-extrabold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-line-strong)] transition-[-webkit-text-stroke-color] duration-300 group-hover:[-webkit-text-stroke-color:var(--color-brand)]">{a.num}</span>
      <h3 className="mt-1 text-title lg:mt-auto">{a.title}</h3>
      <p className="text-muted transition-colors duration-300 group-hover:text-dark-muted group-focus-visible:text-dark-muted">{a.text}</p>
      <span className="mt-2 inline-flex items-center gap-2 text-[.9375rem] font-semibold text-brand-ink group-hover:text-brand group-focus-visible:text-brand">
        {SERVICE_BY_SLUG[a.slug].name} <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default function Audience() {
  return (
    <section className="section" id="who-we-help" aria-labelledby="aud-h">
      <div className="wrap">
        <SectionHead eyebrow="Who we help" id="aud-h">
          Wherever you are, <span className="accent">there&apos;s a next step.</span>
        </SectionHead>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
          {AUDIENCES.map((a) => <li key={a.slug}><AudienceCard a={a} /></li>)}
        </ul>
      </div>
    </section>
  );
}
