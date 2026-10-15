import { Link } from '../lib/router.jsx';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="wrap pt-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap justify-center gap-x-2 gap-y-1 font-mono text-[.8125rem] leading-snug text-muted lg:justify-start">
        {items.map(([name, path], i) => (
          <li key={path} className="flex gap-2">
            {i > 0 && <span className="text-line-strong" aria-hidden="true">/</span>}
            {i === items.length - 1
              ? <span aria-current="page" className="text-ink">{name}</span>
              : <Link to={path} className="no-underline hover:text-brand-ink hover:underline">{name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
