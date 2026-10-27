import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ServiceComparison from '../components/home/ServiceComparison.jsx';
import { ButtonLink } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { SERVICES, serviceUrl } from '../data/services.js';

export default function ServicesHub() {
  return (
    <>
      <PageHero eyebrow="Services" title="Our services"
        lede="Career Consultancy offers three services, all delivered online. Each starts with a conversation about your situation and a written scope, timeline and fee."
        art={{ src: 'hero.jpg', width: 1040, height: 910, alt: 'Two professionals in a consultation at a desk, going through documents together' }} />
      <section className="pt-4 pb-[clamp(4rem,3rem+5vw,8rem)]">
        <div className="wrap">
          <ol className="border-t border-ink">
            {SERVICES.map((s) => (
              <li key={s.slug} className="grid grid-cols-1 items-start justify-items-center gap-x-4 gap-y-2 border-b border-line py-[clamp(1.5rem,3vw,2.25rem)] text-center lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:items-center lg:justify-items-start lg:text-left">
                <span className="font-mono text-[.9375rem] text-brand-ink lg:leading-[2.4]">{s.num}</span>
                <div className="grid gap-2">
                  <h2 className="text-section"><Link to={serviceUrl(s.slug)} className="no-underline hover:text-brand-ink">{s.name}</Link></h2>
                  <p className="max-w-[38rem] text-muted">{s.short}</p>
                </div>
                <ButtonLink to={serviceUrl(s.slug)} variant="ghost" small arrow className="mt-2 lg:mt-0">Details</ButtonLink>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-[46rem] text-center text-[.9375rem] text-muted lg:mx-0 lg:text-left">
            Not sure which you need? Use the <Link to="/#find-your-service" className="underline decoration-brand">service finder</Link> or{' '}
            <Link to="/contact/#enquiry" className="underline decoration-brand">ask us directly</Link>.
          </p>
        </div>
      </section>
      <ServiceComparison />
      <CtaBand consult={{}} label="Get Free Consultation" />
    </>
  );
}
