import { useEffect, useState } from 'react';

/** Matches a media query. Returns `fallback` during server rendering and the first client render. */
export function useMediaQuery(query, fallback = false) {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useDesktop = () => useMediaQuery('(min-width: 60rem)');

/** localStorage-backed state that never throws (private mode, blocked storage). */
export function useStoredState(key, initial) {
  const [value, setValue] = useState(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch { /* storage unavailable */ }
  }, [key]);
  const set = (next) => {
    setValue(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ }
  };
  return [value, set];
}
