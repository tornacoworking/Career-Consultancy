/* Small shared building blocks. */
import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/hooks.js';
import { Link } from '../lib/router.jsx';

export const Arrow = ({ className = '' }) => (
  <svg className={`arrow ${className}`} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <path d="M3 9h11M10 4.5 14.5 9 10 13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Button-styled internal link */
export const ButtonLink = ({ to, variant = 'primary', small, arrow, children, className = '' }) => (
  <Link to={to} className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`}>
    {children}
    {arrow && <Arrow />}
  </Link>
);

export const Eyebrow = ({ children, className = '' }) => <p className={`eyebrow ${className}`}>{children}</p>;

/** Trusted, first-party HTML from the data files (legal text, guides). */
export const Html = ({ html, as: Tag = 'div', className = '' }) => (
  <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

export function Stars({ rating, size = '' }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const label = `Rated ${Number.isInteger(rating) ? rating : rating.toFixed(1)} out of 5`;
  return (
    <span className={`stars ${size}`} role="img" aria-label={label}>
      <span style={{ width: `${pct}%` }} aria-hidden="true" />
    </span>
  );
}

export const SampleBadge = ({ show }) => (show ? <p className="sample-badge">Sample data · replace before launch</p> : null);

/** Section heading block: eyebrow + spotlight heading + optional intro. Centred on small screens. */
export function SectionHead({ eyebrow, id, children, lede, badge, className = '' }) {
  return (
    <div className={`mb-[clamp(2.25rem,4vw,3.75rem)] grid max-w-[54rem] justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      {badge}
      <h2 id={id} className="h-section" data-spotlight>{children}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

/** A heading that drifts slightly toward the pointer, with an animated underline. */
export function Magnetic({ children, className = '', as: Tag = 'h2', ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [t, setT] = useState('');
  const raf = useRef(0);
  const enabled = fine && !reduce;
  const onMove = (e) => {
    if (!enabled || raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = ref.current.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      setT(`translate(${(dx * 14).toFixed(1)}px, ${(dy * 10).toFixed(1)}px)`);
    });
  };
  return (
    <Tag ref={ref} className={`group ${className}`} onPointerMove={onMove} onPointerLeave={() => setT('')} {...rest}>
      <span className="relative inline-block transition-transform duration-300 ease-brand" style={{ transform: t }}>
        {children}
        <span className="absolute -bottom-[.08em] left-0 h-[.06em] w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-brand group-hover:scale-x-100" aria-hidden="true" />
      </span>
    </Tag>
  );
}

/** Counts up to `value` when scrolled into view. The final value is in the server HTML. */
export function CountUp({ value }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const decimals = (String(value).split('.')[1] || '').length;
  const fmt = (v) => (decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN'));
  const [shown, setShown] = useState(fmt(value));
  useEffect(() => {
    const el = ref.current;
    if (reduce || !('IntersectionObserver' in window) || el.getBoundingClientRect().top < window.innerHeight) return undefined;
    setShown(fmt(0));
    let raf;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        setShown(fmt(value * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);
  return <span ref={ref}>{shown}</span>;
}

/** Copy-to-clipboard button with a select-text fallback. */
export function CopyButton({ getText, targetRef, label = 'Copy', className = 'text-link' }) {
  const [state, setState] = useState(label);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setState('Copied');
    } catch {
      const r = document.createRange();
      r.selectNodeContents(targetRef.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      setState('Selected, press Ctrl+C');
    }
    setTimeout(() => setState(label), 2500);
  };
  return <button type="button" className={className} onClick={onClick}>{state}</button>;
}

export function FaqList({ items, openFirst = false }) {
  return items.map((f, i) => (
    <details className="faq" key={f.q} open={openFirst && i === 0 ? true : undefined}>
      <summary><span>{f.q}</span><span className="plus" aria-hidden="true" /></summary>
      <div className="max-w-[44rem] pb-[1.4rem] pr-11 text-muted"><p>{f.a}</p></div>
    </details>
  ));
}
