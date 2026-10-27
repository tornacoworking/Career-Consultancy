/* Side-by-side comparison, derived from each service's own data so it never drifts out of date. */
import { ButtonLink, SectionHead } from '../ui.jsx';
import { SERVICES, serviceUrl } from '../../data/services.js';

export default function ServiceComparison({ headingId = 'compare-h' }) {
  return (
    <section className="section" id="compare" aria-labelledby={headingId}>
      <div className="wrap">
        <SectionHead eyebrow="Compare" id={headingId}
          lede="Three services, three different jobs. Here is what each is for, who typically uses it, and how it begins.">
          Which service is <span className="accent">right for you?</span>
        </SectionHead>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-x-8 border-t border-ink">
          {SERVICES.map((s) => (
            <li key={s.slug} className="grid content-start gap-4 border-b border-line py-6">
              <h3 className="text-title">{s.name}</h3>
              <dl className="grid gap-3.5 text-[.9375rem]">
                <div><dt className="label-mono text-muted">Purpose</dt><dd className="mt-1">{s.short}</dd></div>
                <div><dt className="label-mono text-muted">Typical use</dt><dd className="mt-1">{s.audience[0]}</dd></div>
                <div><dt className="label-mono text-muted">Next step</dt><dd className="mt-1">{s.steps[0].title}: {s.steps[0].text}</dd></div>
              </dl>
              <div><ButtonLink to={serviceUrl(s.slug)} variant="ghost" small arrow>View service</ButtonLink></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
