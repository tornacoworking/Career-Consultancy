/*
 * Tables and callouts for documents and requirements, shared by the home page, city pages, service pages
 * and sub-service pages so the same information reads the same everywhere (data/requirements.js).
 */
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { Arrow } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { serviceUrl } from '../data/services.js';
import {
  EXPERIENCE_DOCS, EXPERIENCE_NEEDS, EXPERIENCE_WHAT, TRAINING_NEEDS, VISA_DOCS, VISA_LEVELS, VISA_TABLE_NOTE, VISA_TYPES,
} from '../data/requirements.js';

/** Numbered table of contents for a page. `items` is [[id, label], ...], the same list the side "On this page" uses. */
export function ContentsTable({ items, title = 'Contents of this page' }) {
  return (
    <nav aria-label="Page contents" className="border-[1.5px] border-ink bg-white p-[clamp(1.1rem,3vw,1.5rem)]">
      <p className="label-mono flex items-center gap-2 text-brand-ink"><Icon name="list" size={18} />{title}</p>
      <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
        {items.map(([id, label], i) => (
          <li key={id} className="border-b border-line">
            <a href={`#${id}`} className="grid min-h-11 grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-2 py-2 text-[.9375rem] font-medium no-underline hover:text-brand-ink">
              <span className="font-mono text-[.8125rem] text-brand-ink">{String(i + 1).padStart(2, '0')}</span>{label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** A table that becomes a stack of labelled cards on phones. The first column is the row heading. */
export function DataTable({ caption, head, rows }) {
  return (
    <table className="data-table stack border-t border-ink">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>{head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map(([first, ...rest]) => (
          <tr key={first}>
            <th scope="row" className="md:w-[24%]">{first}</th>
            {rest.map((cell, i) => <td key={head[i + 1]} data-label={head[i + 1]}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** "Documents we help you obtain and organise": every row is a genuine record issued by the employer or your bank. */
export function ExperienceDocsTable() {
  return (
    <DataTable caption="Documents we help you obtain and organise for an experience certificate file"
      head={['Document', 'What it shows', 'How we help']}
      rows={EXPERIENCE_DOCS.map((d) => [d.doc, d.shows, d.help])} />
  );
}

/** What the customer needs to give us before an experience certificate file can start. */
export function ExperienceNeedsTable() {
  return (
    <DataTable caption="What we need from you to start an experience certificate file"
      head={['You provide', 'Why we need it']}
      rows={EXPERIENCE_NEEDS.map((n) => [n.item, n.why])} />
  );
}

export function TrainingNeedsTable() {
  return (
    <DataTable caption="What we need from you before you enrol in project training"
      head={['You provide', 'Why we need it']}
      rows={TRAINING_NEEDS.map((n) => [n.item, n.why])} />
  );
}

function Ticks({ items }) {
  return <ul className="ticks">{items.map((t) => <li key={t}>{t}</li>)}</ul>;
}

/** What an experience certificate is, who needs one and how we help. */
export function ExperienceWhat() {
  const { what, who, how } = EXPERIENCE_WHAT;
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="grid content-start gap-3 border-t-2 border-ink pt-4">
        <h3 className="text-xl">{what.title}</h3>
        <p className="text-[.9375rem] text-muted">{what.text}</p>
      </div>
      {[who, how].map((c) => (
        <div key={c.title} className="grid content-start gap-3 border-t-2 border-ink pt-4">
          <h3 className="text-xl">{c.title}</h3>
          <Ticks items={c.items} />
        </div>
      ))}
    </div>
  );
}

function Level({ level }) {
  const l = VISA_LEVELS[level];
  if (level === 'none') return <span className="text-muted-lg" title={l.note}>–<span className="sr-only">{l.label}</span></span>;
  return (
    <span title={l.note}
      className={`inline-block rounded-full px-2.5 py-0.5 text-[.8125rem] font-semibold whitespace-nowrap ${level === 'usual' ? 'bg-brand-soft text-brand-ink' : 'border border-line-strong text-ink'}`}>
      {l.label}
    </span>
  );
}

/** Documents commonly asked for, by visa purpose. Scrolls sideways on phones, with the document column pinned. */
export function VisaMatrix() {
  return (
    <div className="grid gap-3">
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[.875rem]" aria-label="Key to the table">
        {['usual', 'ask', 'none'].map((k) => (
          <li key={k} className="flex items-center gap-2"><Level level={k} /> <span className="text-muted">{VISA_LEVELS[k].note}</span></li>
        ))}
      </ul>
      <div className="table-scroll" role="region" aria-label="Visa documentation requirements by visa purpose, scrolls sideways" tabIndex={0}>
        <table className="data-table min-w-[46rem]">
          <caption className="sr-only">Documents commonly asked for, by visa purpose</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-10 min-w-[10rem] md:min-w-[13rem]">Document</th>
              {VISA_TYPES.map((t) => <th key={t.slug} scope="col" className="text-center">{t.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {VISA_DOCS.map((r) => (
              <tr key={r.doc}>
                <th scope="row" className="sticky left-0 z-10 bg-inherit">{r.doc}</th>
                {VISA_TYPES.map((t) => <td key={t.slug} className="text-center"><Level level={r.levels[t.slug]} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[.875rem] text-muted">{VISA_TABLE_NOTE}</p>
    </div>
  );
}

/** The same table, narrowed to one visa purpose, for the visa sub-service pages. */
export function VisaTypeChecklist({ slug }) {
  const rows = VISA_DOCS.filter((r) => r.levels[slug] && r.levels[slug] !== 'none');
  const name = VISA_TYPES.find((t) => t.slug === slug)?.name.toLowerCase();
  return (
    <div className="grid gap-3">
      <DataTable caption={`Documents commonly asked for on a ${name} visa application`}
        head={['Document', 'How often it is asked']}
        rows={rows.map((r) => [r.doc, <span key={r.doc} className="inline-flex flex-wrap items-center gap-2"><Level level={r.levels[slug]} /><span className="text-[.875rem]">{VISA_LEVELS[r.levels[slug]].note}</span></span>])} />
      <p className="text-[.875rem] text-muted">{VISA_TABLE_NOTE}</p>
    </div>
  );
}

/** Says plainly that we do not provide visas. Shown wherever the visa service is described. */
export function VisaClarity({ className = '', cta = false, city }) {
  return (
    <aside aria-label="What our visa service is" className={`grid gap-3 border-[1.5px] border-ink bg-white p-[clamp(1.1rem,3vw,1.5rem)] text-left sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-4 ${className}`}>
      <span className="grid size-11 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name="shield" size={24} /></span>
      <div className="grid gap-2">
        <p><strong>We do not offer or issue visas.</strong> We assist only with the documentation required to apply for one: reading the official requirements, organising your documents and completing forms for you to review, sign and submit.</p>
        <p className="text-[.9375rem] text-muted">Only the immigration authority decides an application, and we cannot guarantee approval.</p>
        {cta && (
          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
            <ConsultLink service="visa-documentation" city={city} small arrow>Get Consultation</ConsultLink>
            <Link className="text-link" to={serviceUrl('visa-documentation')}>Visa documentation details <Arrow /></Link>
          </div>
        )}
      </div>
    </aside>
  );
}
