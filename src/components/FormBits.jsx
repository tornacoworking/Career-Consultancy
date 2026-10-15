/* Accessible form building blocks shared by the enquiry and feedback forms. */
import { Arrow } from './ui.jsx';

export function Field({ id, label, optional, hint, error, children }) {
  return (
    <div className="grid min-w-0 gap-2">
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && <p className="hint flex flex-wrap justify-between gap-4" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="err" id={`${id}-err`}>{error}</p>}
    </div>
  );
}

/** aria props for an input given its id, hint and error */
export const describe = (id, { hint, error } = {}) => ({
  id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined,
});

export function CheckField({ id, name, checked, onChange, error, children }) {
  return (
    <div className="grid gap-2">
      <label className="flex cursor-pointer items-start gap-3.5 text-[.9375rem]">
        <input id={id} name={name} type="checkbox" className="absolute size-px opacity-0" checked={checked} onChange={onChange}
          aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-err` : undefined} />
        <span className="box" aria-hidden="true" />
        <span>{children}</span>
      </label>
      {error && <p className="err" id={`${id}-err`}>{error}</p>}
    </div>
  );
}

export function ErrorSummary({ errors, refEl, verb = 'send your enquiry' }) {
  const list = Object.entries(errors).filter(([, v]) => v);
  return (
    <div ref={refEl} tabIndex={-1} role="alert" hidden={!list.length} className="border-[1.5px] border-error bg-[#FDF1EF] px-5 py-4 text-[.9375rem]">
      <strong>Please fix {list.length === 1 ? 'this' : `these ${list.length}`} to {verb}:</strong>
      <ul className="mt-1.5 grid gap-1">
        {list.map(([id, msg]) => <li key={id}><a className="font-semibold text-error" href={`#${id}`}>{msg}</a></li>)}
      </ul>
    </div>
  );
}

export function SubmitButton({ busy, label }) {
  return (
    <button type="submit" aria-busy={busy || undefined}
      className={`btn btn-primary min-w-[200px] justify-self-center sm:justify-self-start ${busy ? 'pointer-events-none opacity-85' : ''}`}>
      <span>{busy ? 'Sending…' : label}</span>
      {busy ? <span aria-hidden="true" className="size-[18px] animate-spin rounded-full border-2 border-ink border-r-transparent" /> : <Arrow />}
    </button>
  );
}

export const StatusMessage = ({ text }) => (
  <div role="status" aria-live="polite" className={text ? 'border-l-[3px] border-error bg-[#FDF1EF] px-5 py-4 text-[.9375rem]' : ''}>{text}</div>
);

/** Honeypot: invisible to people, often filled by bots. */
export const Honeypot = ({ value, onChange, id }) => (
  <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
    <label htmlFor={id}>Company website</label>
    <input id={id} name="_honey" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
  </div>
);
