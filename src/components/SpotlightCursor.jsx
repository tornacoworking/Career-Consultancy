/*
 * Circular spotlight cursor (desktop mouse/trackpad only, off for reduced motion).
 * - Default: small orange dot.  Links/buttons: ring.  Text fields: hidden.
 * - Headings with [data-spotlight]: the dot grows into a circle and the heading text is
 *   recoloured ONLY inside it (CSS radial-gradient + background-clip:text, see index.css).
 *   No text is duplicated, so screen readers, selection and no-JS rendering are unaffected.
 * Uses event delegation, so it works across client-side page changes.
 */
import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/hooks.js';

const LINK = 'a, button, summary, label, [role="button"], select';
const FIELD = 'input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea';

export default function SpotlightCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const dotRef = useRef(null);
  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, active = null;

    const frame = () => {
      cx += (x - cx) * 0.3;
      cy += (y - cy) * 0.3;
      if (Math.abs(x - cx) < 0.1 && Math.abs(y - cy) < 0.1) { cx = x; cy = y; }
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (active) { active.style.setProperty('--x', `${cx}px`); active.style.setProperty('--y', `${cy}px`); }
      raf = cx !== x || cy !== y ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const deactivate = (el) => {
      el.style.setProperty('--r', '0px');
      const off = (e) => {
        if (e.propertyName !== '--r') return;
        el.removeEventListener('transitionend', off);
        if (active !== el) el.classList.remove('is-lit');
      };
      el.addEventListener('transitionend', off);
      setTimeout(() => { if (active !== el) el.classList.remove('is-lit'); }, 600);
    };
    const activate = (el) => {
      const size = Math.min(110, Math.max(70, parseFloat(getComputedStyle(el).fontSize) * 1.15));
      el.style.setProperty('--x', `${cx}px`);
      el.style.setProperty('--y', `${cy}px`);
      el.classList.add('is-lit');
      requestAnimationFrame(() => el.style.setProperty('--r', `${size}px`));
      dot.style.setProperty('--d', `${size * 2}px`);
    };

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!dot.classList.contains('is-visible')) { cx = x; cy = y; dot.classList.add('is-visible'); }
      const t = e.target instanceof Element ? e.target : null;
      const heading = t?.closest('[data-spotlight]') ?? null;
      if (heading !== active) {
        if (active) deactivate(active);
        active = heading;
        if (heading) activate(heading);
      }
      dot.classList.toggle('is-spot', !!active);
      dot.classList.toggle('is-link', !active && !!t?.closest(LINK));
      dot.classList.toggle('is-field', !!t?.closest(FIELD));
      kick();
    };
    const hide = () => dot.classList.remove('is-visible');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor');
    };
  }, [enabled]);

  return enabled ? <div ref={dotRef} className="cursor" aria-hidden="true" /> : null;
}
