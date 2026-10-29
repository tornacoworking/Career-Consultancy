/*
 * One template for every city landing page. The wording that differs between cities (intro, the three
 * service angles, a local question, nearby cities) comes from data/cities.js, so each page has its own
 * content rather than the same paragraphs with a different name.
 */
import { useEffect } from 'react';
import ConsultationForm from '../components/ConsultationForm.jsx';
import ConsultLink from '../components/ConsultLink.jsx';
import CtaBand from '../components/CtaBand.jsx';
import DocumentsSection from '../components/DocumentsSection.jsx';
import WhatElse from '../components/WhatElse.jsx';
import { VisaClarity } from '../components/Requirements.jsx';
import BranchCard from '../components/BranchCard.jsx';
import Icon from '../components/Icon.jsx';
import { BannerPhoto, FillPhoto } from '../components/Photo.jsx';
import { Arrow, Eyebrow, FaqList } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { useConsult } from '../lib/consult.jsx';
import { cityUrl, nearbyCities } from '../data/cities.js';
import { cityFaqs } from '../data/faqs.js';
import { JOURNEY } from '../data/home.js';
import { SERVICE_BY_SLUG, serviceUrl, subServiceUrl, subServicesOf } from '../data/services.js';

// The three core services shown on every city page, experience certificate first.
// `angle` is the per-city text field in cities.js.
const CITY_SERVICES = [
  { id: 'documents', slug: 'experience-certificate', angle: 'docs', icon: 'file', title: (c) => `Genuine experience certificates in ${c}` },
  { id: 'visa', slug: 'visa-documentation', angle: 'visa', icon: 'plane', title: (c) => `Visa documentation for applicants in ${c}` },
  { id: 'training', slug: 'real-time-project-training', angle: 'training', icon: 'code', title: (c) => `Real time project training for learners in ${c}` },
];

const JUMPS = [['documents', 'Experience certificate'], ['visa', 'Visa documentation'], ['training', 'Project training'], ['doc-table', 'Documents table'], ['verification', 'Verification'], ['faqs', 'FAQs'], ['enquiry', 'Enquire']];

export default function CityPage({ city }) {
  const { setCity } = useConsult();
  useEffect(() => setCity(city.slug), [city.slug, setCity]);
  const nearby = nearbyCities(city);

  return (
    <>
      <section className="pt-[clamp(1.5rem,4vw,3rem)] pb-[clamp(1rem,3vw,1.875rem)]">
        <div className="wrap">
          <figure className="relative overflow-hidden rounded-brand">
            <BannerPhoto src="experience-certificate-banner.jpg" alt="Close-up of two people at a desk, one signing a document while the other points to the line to check"
              className="h-auto min-h-[14rem] w-full object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-[clamp(1rem,3vw,2rem)] pt-16 font-display text-[clamp(1.05rem,.9rem+1vw,1.6rem)] leading-snug font-semibold text-white">
              Experience certificates, visa documents and project training, online for people in {city.name}.
            </figcaption>
          </figure>
        </div>
        <div className="wrap mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>{city.state} · Online guidance</Eyebrow>
            <h1 className="text-section font-extrabold tracking-[-0.04em]" data-spotlight>Experience certificate, visa documentation and project training help in {city.name}</h1>
            <p className="lede">{city.intro}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ConsultLink city={city.slug} arrow>Get Free Consultation</ConsultLink>
              <a className="btn btn-ghost" href="#documents">See the services</a>
            </div>
          </div>
          <div className="grid gap-4 border border-line bg-white p-[clamp(1.1rem,3vw,1.5rem)]">
            <p className="border-l-[3px] border-brand pl-4 text-[.9375rem] text-muted">
              {city.slug === 'pune'
                ? 'Our main branch is in Baner, Pune, and we also help people by phone, email and video.'
                : `Career Consultancy works online. Our main branch is in Pune. We help people in ${city.name} by phone, email and video, and we do not claim a physical office there.`}
            </p>
            <nav aria-label="Jump to a section">
              <p className="label-mono mb-2 text-brand-ink">Jump to</p>
              <ul className="flex flex-wrap gap-2">
                {JUMPS.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-line-strong px-3.5 text-[.875rem] font-semibold no-underline hover:border-ink">{label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <div className="wrap grid gap-[clamp(1.375rem,3.5vw,2.375rem)] pb-[clamp(1.375rem,3.5vw,2.875rem)]">
        {CITY_SERVICES.map((cs) => {
          const service = SERVICE_BY_SLUG[cs.slug];
          return (
            <section key={cs.id} id={cs.id} aria-labelledby={`${cs.id}-h`} className="grid gap-5 border-t border-ink pt-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
              <div className="flex flex-col gap-3">
                <span className="grid size-11 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={cs.icon} size={24} /></span>
                <h2 id={`${cs.id}-h`} className="text-title">{cs.title(city.name)}</h2>
                <p className="text-muted">{city[cs.angle]}</p>
                {cs.id === 'visa' && <VisaClarity />}
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <ConsultLink service={cs.slug} city={city.slug} small arrow>Enquire from {city.name}</ConsultLink>
                  <Link className="text-link" to={serviceUrl(cs.slug)}>About {service.name.toLowerCase()} <Arrow /></Link>
                </div>
                <FillPhoto name={`${cs.slug}.jpg`} alt={service.art_label} />
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
      </div>

      {city.slug === 'pune' && <div className="wrap pb-[clamp(1.375rem,3.5vw,2.875rem)]"><BranchCard heading="Our main branch in Baner, Pune" cta className="lg:max-w-[40rem]" /></div>}
      <DocumentsSection city={city.slug} place={city.name} />
      <WhatElse city={city.slug} place={city.name} />

      <section className="section bg-grey" aria-labelledby="process-h" id="process">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <Eyebrow>The consultation process</Eyebrow>
            <h2 id="process-h" className="h-section">How we work with you in {city.name}</h2>
            <p className="lede">Four plain steps. Nothing starts until you have the scope, timeline and fee in writing.</p>
            <FillPhoto name="about.jpg" alt="A consultant and a client talking through their situation across a table" />
          </div>
          <ol className="steps">{JOURNEY.map((j) => <li key={j.title}><h3>{j.title}</h3><p>{j.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-h" id="faqs">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="relative order-last min-h-[22rem] overflow-hidden rounded-brand lg:order-first lg:min-h-0">
            <img className="photo absolute inset-0 size-full object-cover object-[50%_70%]" src={`${import.meta.env.BASE_URL}images/faq-panel.svg`}
              alt="A young woman resting her chin on her hand, thinking, with question marks floating around her" loading="lazy" decoding="async" />
          </div>
          <div className="min-w-0">
            <div className="grid gap-3 text-center lg:text-left">
              <Eyebrow>FAQs</Eyebrow>
              <h2 id="faq-h" className="h-section">Questions from {city.name}</h2>
              <p className="max-w-[26rem] text-muted">Not here? <Link to="/contact/#enquiry" className="underline decoration-brand">Send us your question</Link> and we will reply in writing. Asking is free.</p>
            </div>
            <div className="mt-6 border-t border-ink"><FaqList items={cityFaqs(city)} openFirst /></div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="enquiry" aria-labelledby="enq-h">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <Eyebrow>Free consultation</Eyebrow>
            <h2 id="enq-h" className="h-section">Talk to us from {city.name}</h2>
            <p className="lede">Your city is already filled in. Tell us the service you need and we will reply in writing.</p>
            <ol className="steps mt-2 w-full text-left">
              <li><p className="!text-ink">We reply in writing, usually with a few questions.</p></li>
              <li><p className="!text-ink">You get the scope, timeline and fee before anything starts.</p></li>
              <li><p className="!text-ink">Nothing begins until you agree.</p></li>
            </ol>
            <FillPhoto name="visa-enquiry.jpg" alt="Two professionals in a one-to-one consultation across a desk by a large window" />
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
