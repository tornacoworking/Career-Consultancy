/*
 * A tiny router for a fully pre-rendered site (about 18 static routes).
 * - Server: <Router url="/services/">  (used by the prerender step)
 * - Browser: <Router />                 (History API, real URLs)
 * - Preview: <Router memory />          (in-memory, for sandboxed previews)
 * <Link> renders a real <a href>, so every link stays crawlable.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

function parse(url) {
  const u = new URL(url, 'https://x.invalid');
  let pathname = u.pathname;
  if (!pathname.endsWith('/') && !pathname.endsWith('.html')) pathname += '/';
  return { pathname, search: u.search, hash: u.hash.slice(1) };
}

const currentUrl = () => window.location.pathname + window.location.search + window.location.hash;

export function Router({ url, memory = false, children }) {
  const [loc, setLoc] = useState(() =>
    parse(url ?? (typeof window !== 'undefined' && !memory ? currentUrl() : '/')),
  );

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const next = parse(to);
      if (!memory) window.history[replace ? 'replaceState' : 'pushState'](null, '', to);
      setLoc({ ...next, key: Math.random() });
    },
    [memory],
  );

  useEffect(() => {
    if (memory) return undefined;
    const onPop = () => setLoc({ ...parse(currentUrl()), key: Math.random(), pop: true });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [memory]);

  // Scroll to the top on page change, or to #section when the link has a hash.
  useEffect(() => {
    if (url !== undefined || loc.pop) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (loc.hash) {
      const el = document.getElementById(loc.hash);
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    if (loc.key) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [loc, url]);

  const value = useMemo(() => ({ ...loc, navigate }), [loc, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useLocation = () => useContext(RouterContext);

export const useSearchParam = (name) => {
  const { search } = useLocation();
  return new URLSearchParams(search).get(name);
};

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useLocation();
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== '_self') return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
