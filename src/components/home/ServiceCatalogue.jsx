/* Every service on one screen, experience certificate first: what it is, its options as direct links,
   what to keep ready, and an enquiry button. Replaces the old tabbed explorer so nothing is hidden. */
import { ServicePhoto } from '../Photo.jsx';
import ConsultLink from '../ConsultLink.jsx';
import { Arrow, ButtonLink, SectionHead } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { SERVICES, serviceUrl, subServiceUrl, subServicesOf } from '../../data/services.js';

const NOTE = {
  'experience-certificate': 'Genuine certificates only, issued by your own employer. We never create or alter documents.',
  'visa-documentation': 'Documentation only. We do not offer or issue visas, and we cannot guarantee approval.',
  'real-time-project-training': 'Skills and a project to show, with mentor feedback. No job guarantees.',
};

export default function ServiceCatalogue() {
  return (
    <section className="section bg-white" id="all-services" aria-labelledby="cat-h">
      <div className="wrap">
        <SectionHead eyebrow="All our services" id="cat-h"
          lede="Everything we offer, in one place. Open a service for its full scope and documents, jump straight to one of its options, or start an enquiry.">
          Every service, <span className="accent">one place.</span>
        </SectionHead>
        <ul className="grid gap-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="grid">
              <article aria-labelledby={`cat-${s.slug}`}
                className={`flex flex-col gap-4 border bg-paper p-[clamp(1.1rem,3vw,1.5rem)] ${i === 0 ? 'border-ink border-t-[6px] border-t-brand' : 'border-line'}`}>
                <ServicePhoto slug={s.slug} alt={s.art_label} className="aspect-[4/3] w-full rounded-brand object-cover" />
                <p className="label-mono text-brand-ink">Service {s.num}{i === 0 ? ' · Start here' : ''}</p>
                <h3 id={`cat-${s.slug}`} className="text-title"><Link to={serviceUrl(s.slug)} className="no-underline hover:text-brand-ink">{s.name}</Link></h3>
                <p className="text-muted">{s.short}</p>
                <p className="border-l-[3px] border-brand pl-3 text-[.9375rem]">{NOTE[s.slug]}</p>
                <div>
                  <p className="label-mono mb-1 text-muted">Choose an option</p>
                  <ul className="border-t border-line">
                    {subServicesOf(s.slug).map((x) => (
                      <li key={x.slug}>
                        <Link to={subServiceUrl(x)} className="group flex min-h-11 items-center justify-between gap-3 border-b border-line py-2 text-[.9375rem] font-medium no-underline hover:text-brand-ink">
                          {x.name}<Arrow className="shrink-0 text-brand-ink transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-mono mb-1 text-muted">Keep ready</p>
                  <ul className="ticks text-[.9375rem]">{s.ready.slice(0, 3).map((r) => <li key={r}>{r}</li>)}</ul>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                  <ConsultLink service={s.slug} small arrow>Get Consultation</ConsultLink>
                  <ButtonLink to={serviceUrl(s.slug)} variant="ghost" small>Read more</ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
