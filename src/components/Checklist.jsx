/* "What to keep ready" checklist. Ticks are stored in this browser only. */
import { useStoredState } from '../lib/hooks.js';

export default function Checklist({ id, items }) {
  const [done, setDone] = useStoredState(`cn-checklist-${id}`, []);
  const toggle = (i) => setDone(done.includes(i) ? done.filter((d) => d !== i) : [...done, i]);
  const pct = Math.round((done.length / items.length) * 100);
  return (
    <div className="border border-line bg-white">
      <div className="flex flex-wrap items-center gap-4 border-b border-line px-5 py-4">
        <svg className="-rotate-90" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" className="stroke-grey" />
          <circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" strokeLinecap="round" pathLength="100" className="ring-fg stroke-brand" style={{ '--pct': pct }} />
        </svg>
        <p className="text-[.9375rem] text-muted" aria-live="polite">
          <strong className="text-ink tabular-nums">{done.length} of {items.length}</strong> ready
        </p>
        <button type="button" className="text-link ml-auto" onClick={() => setDone([])}>Clear ticks</button>
      </div>
      <ul className="divide-y divide-line">
        {items.map((item, i) => {
          const on = done.includes(i);
          return (
            <li key={item}>
              <label className="flex min-h-[52px] cursor-pointer items-start gap-3.5 px-5 py-4">
                <input type="checkbox" className="absolute size-px opacity-0" checked={on} onChange={() => toggle(i)} />
                <span className="box" aria-hidden="true" />
                <span className={on ? 'text-muted line-through decoration-brand' : ''}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
