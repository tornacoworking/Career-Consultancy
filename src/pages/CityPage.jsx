/*
 * One template for every city landing page. The wording that differs between cities (intro, the three
 * service angles, a local question, nearby cities) comes from data/cities.js, so each page has its own
 * content rather than the same paragraphs with a different name.
 */
import { useEffect } from 'react';
import ConsultationForm from '../components/ConsultationForm.jsx';
import ConsultLink from '../components/ConsultLink.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import { HeroPhoto } from '../components/Photo.jsx';
import { Arrow, Eyebrow, FaqList } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { useConsult } from '../lib/consult.jsx';
import { cityUrl, nearbyCities } from '../data/cities.js';
import { cityFaqs } from '../data/faqs.js';
import { JOURNEY } from '../data/home.js';
import { SERVICE_BY_SLUG, serviceUrl, subServiceUrl, subServicesOf } from '../data/services.js';

// The three core services shown on every city page. `angle` is the per-city text field in cities.js.
const CITY_SERVICES = [
  { id: 'visa', slug: 'visa-services', angle: 'visa', icon: 'plane', title: (c) => `Visa services for applicants in ${c}` },
  { id: 'documents', slug: 'experience-documents', angle: 'docs', icon: 'file', title: (c) => `Genuine experience documents in ${c}` },
  { id: 'training', slug: 'online-training', angle: 'training', icon: 'code', title: (c) => `Real-time project training for learners in ${c}` },
];

export default function CityPage({ city }) {
  const { setCity } = useConsult();
  useEffect(() => setCity(city.slug), [city.slug, setCity]);
  const nearby = nearbyCities(city);

  return (
    <>
      <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]">
        <div className="wrap grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>{city.state} · Online guidance</Eyebrow>
            <h1 className="page-h my-1" data-spotlight>Visa, experience document and training guidance in {city.name}</h1>
            <p className="lede">{city.intro}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ConsultLink city={city.slug} arrow>Get Free Consultation</ConsultLink>
              <a className="btn btn-ghost" href="#visa">See the services</a>
          </div>
          <p className="max-w-[40rem] border-l-[3px] border-brand pl-4 text-left text-[.9375rem] text-muted">
            Career Consultancy works online. We help people in {city.name} by phone, email and video, and we do not claim a physical office there.
          </p>
          </div>
          <figure className="mx-auto w-full max-w-[560px] min-w-0">
            <HeroPhoto alt={`A consultation about visas, documents and training, available online to people in ${city.name}`} className="h-auto w-full rounded-brand object-cover" />
          </figure>
        </div>
      </section>

      <div className="wrap grid gap-[clamp(3rem,6vw,5rem)] pb-[clamp(3rem,5vw,5rem)]">
        {CITY_SERVICES.map((cs) => {
          const service = SERVICE_BY_SLUG[cs.slug];
          return (
            <section key={cs.id} id={cs.id} aria-labelledby={`${cs.id}-h`} className="grid gap-5 border-t border-ink pt-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
              <div className="grid content-start gap-3">
                <span className="grid size-11 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={cs.icon} size={24} /></span>
                <h2 id={`${cs.id}-h`} className="text-title">{cs.title(city.name)}</h2>
                <p className="text-muted">{city[cs.angle]}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <ConsultLink service={cs.slug} city={city.slug} small arrow>Enquire from {city.name}</ConsultLink>
                  <Link className="text-link" to={serviceUrl(cs.slug)}>About {service.name.toLowerCase()} <Arrow /></Link>
                </div>
              </div>
              <ul className="grid content-start border-t border-line lg:border-t-0" aria-label={`${service.name} options`}>
                {subServicesOf(cs.slug).map((x) => (
                  <li key={x.slug}>
                    <Link to={subServiceUrl(x)} className="group flex min-h-14 items-center justify-between gap-3 border-b border-line py-3 no-underline">
                      <span className="grid">
                        <span className="font-display font-semibold group-hover:text-brand-ink">{x.name}</span>
                        <span className="text-[.875rem] text-muted">{x.short}</span>
                      </span>
                      <Arrow className="shrink-0 text-brand-ink transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="text-[.9375rem] text-muted">
          Looking for a credential instead? See our <Link to={serviceUrl('online-certifications')} className="underline decoration-brand">online certification guidance</Link>.
        </p>
      </div>

      <section className="section bg-grey" aria-labelledby="process-h" id="process">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="grid content-start gap-3 text-center lg:text-left">
            <Eyebrow>The consultation process</Eyebrow>
            <h2 id="process-h" className="h-section">How we work with you in {city.name}</h2>
            <p className="lede">Four plain steps. Nothing starts until you have the scope, timeline and fee in writing.</p>
          </div>
          <ol className="steps">{JOURNEY.map((j) => <li key={j.title}><h3>{j.title}</h3><p>{j.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h" id="faqs">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="grid content-start gap-3 text-center lg:text-left">
            <Eyebrow>FAQs</Eyebrow>
            <h2 id="faq-h" className="h-section">Questions from {city.name}</h2>
          </div>
          <div className="border-t border-ink"><FaqList items={cityFaqs(city)} openFirst /></div>
        </div>
      </section>

      <section className="section bg-white" id="enquiry" aria-labelledby="enq-h">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="grid content-start gap-3 text-center lg:text-left">
            <Eyebrow>Free consultation</Eyebrow>
            <h2 id="enq-h" className="h-section">Talk to us from {city.name}</h2>
            <p className="lede">Your city is already filled in. Tell us the service you need and we will reply in writing.</p>
          </div>
          <div className="min-w-0"><ConsultationForm idPrefix="city" prefill={{ city: city.slug }} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="near-h">
        <div className="wrap grid gap-5 text-center lg:text-left">
          <h2 id="near-h" className="text-title">Nearby cities and more</h2>
          <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link to={cityUrl(n.slug)} className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-line-strong px-4 font-semibold no-underline hover:border-ink">{n.name}</Link>
              </li>
            ))}
            <li><Link to="/cities/" className="inline-flex min-h-11 items-center px-3 font-semibold text-brand-ink underline">All cities</Link></li>
            <li><Link to="/services/" className="inline-flex min-h-11 items-center px-3 font-semibold text-brand-ink underline">All services</Link></li>
          </ul>
        </div>
      </section>
      <CtaBand heading={`Ready to start in ${city.name}?`} text="Tell us what you need and we will explain the next steps. No registration and no charge for asking." label="Get Free Consultation" consult={{ city: city.slug }} />
    </>
  );
}
