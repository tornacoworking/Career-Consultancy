import { useEffect, useState } from 'react';

/** "On this page" list with an active-section indicator. */
export default function Toc({ items }) {
  const [active, setActive] = useState(items[0]?.[0]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? visible.add(en.target.id) : visible.delete(en.target.id)));
      const first = items.find(([id]) => visible.has(id));
      if (first) setActive(first[0]);
    }, { rootMargin: '-90px 0px -55% 0px' });
    items.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page">
      <p className="eyebrow">On this page</p>
      <ol className="mt-4 border-l border-line-strong">
        {items.map(([id, title]) => (
          <li key={id}>
            <a href={`#${id}`}
              className={`-ml-px block border-l-2 py-2 pl-4 text-[.9375rem] no-underline transition-colors ${active === id ? 'border-brand font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
