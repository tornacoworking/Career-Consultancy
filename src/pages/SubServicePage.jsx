/* One template for every sub-service page (visa types, document-help types, training domains). */
import Icon from '../components/Icon.jsx';
import { BannerPhoto } from '../components/Photo.jsx';
import ConsultLink from '../components/ConsultLink.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Toc from '../components/Toc.jsx';
import WhatElse from '../components/WhatElse.jsx';
import { ContentsTable, ExperienceDocsTable, VisaClarity, VisaTypeChecklist } from '../components/Requirements.jsx';
import { DestinationPicker, FormatList, SubServiceGrid } from '../components/ServiceSections.jsx';
import { Eyebrow, FaqList } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { POPULAR_CITIES, cityUrl } from '../data/cities.js';
import { SERVICE_BY_SLUG, serviceUrl, subServicesOf } from '../data/services.js';

export default function SubServicePage({ sub }) {
  const parent = SERVICE_BY_SLUG[sub.parent];
  const isVisa = sub.parent === 'visa-documentation';
  const isTraining = sub.parent === 'real-time-project-training';
  const isExperience = sub.parent === 'experience-certificate';
  const siblings = subServicesOf(sub.parent).filter((x) => x.slug !== sub.slug);
  const toc = [['who', 'Who this is for'], ['process', 'How it works'], [isTraining ? 'topics' : 'documents', isTraining ? 'What you will cover' : 'Documents we help organise']];
  if (isExperience) toc.push(['doc-table', 'Documents we help you obtain']);
  if (isVisa) toc.push(['requirements', 'Documents commonly asked for']);
  toc.push(['not-included', 'Not included']);
  if (isVisa) toc.push(['destinations', 'Choose a destination']);
  if (isTraining) toc.push(['formats', 'Learning formats']);
  toc.push(['cities', 'Your city'], ['questions', 'Common questions'], ['more', `More ${parent.name.toLowerCase()}`]);
  if (isExperience) toc.push(['verification', 'What else do we have for you?']);
  const cta = { service: sub.parent, sub: sub.slug };
  const ctaLabel = isTraining ? 'Discuss This Training' : 'Get Free Consultation';

  return (
    <>
      <section className="pt-[clamp(1.5rem,4vw,3rem)] pb-[clamp(1rem,3vw,1.875rem)]">
        {parent.banner && (
          <div className="wrap">
            <figure className="relative overflow-hidden rounded-brand">
              <BannerPhoto src={parent.banner.src} alt={parent.banner.alt} className="h-auto min-h-[14rem] w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-[clamp(1rem,3vw,2rem)] pt-16 font-display text-[clamp(1.05rem,.9rem+1vw,1.6rem)] leading-snug font-semibold text-white">{parent.banner.caption}</figcaption>
            </figure>
          </div>
        )}
        <div className="wrap mt-[clamp(2rem,4vw,3rem)] grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>{parent.name}</Eyebrow>
            <span className="grid size-12 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={sub.icon} size={26} /></span>
            <h1 className="text-section font-extrabold tracking-[-0.04em]" data-spotlight>{sub.h1}</h1>
            <p className="lede">{sub.intro}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ConsultLink {...cta} arrow>{ctaLabel}</ConsultLink>
              <a className="btn btn-ghost" href="#process">See the process</a>
            </div>
          </div>
          <dl className="grid gap-x-6 border border-line bg-white p-[clamp(1.1rem,3vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-1">
            <p className="label-mono col-span-full mb-1 text-brand-ink">At a glance</p>
            {parent.facts.map((f) => (
              <div key={f.label} className="border-t border-line py-3">
                <dt className="label-mono text-muted">{f.label}</dt>
                <dd className="mt-1 font-display font-semibold leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {isVisa && <div className="wrap mt-[clamp(1.5rem,3vw,2.5rem)]"><VisaClarity /></div>}
      </section>

      <div className="wrap grid gap-12 pt-[clamp(1rem,3vw,1.875rem)] pb-[clamp(1.875rem,1.375rem+3vw,3.875rem)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[clamp(3rem,6vw,6rem)]">
        <article className="prose-cn min-w-0">
          <ContentsTable items={toc} />
          <section id="who">
            <h2>Who this is for</h2>
            <ul className="ticks">{sub.audience.map((a) => <li key={a}>{a}</li>)}</ul>
          </section>
          <section id="process">
            <h2>How it works</h2>
            <ol className="steps">{sub.process.map((x) => <li key={x.title}><h3>{x.title}</h3><p>{x.text}</p></li>)}</ol>
          </section>
          {isTraining ? (
            <section id="topics">
              <h2>What you will cover</h2>
              <ul className="ticks">{sub.topics.map((t) => <li key={t}>{t}</li>)}</ul>
              <p><strong>Live project:</strong> {sub.project}</p>
            </section>
          ) : (
            <section id="documents">
              <h2>Documents we help organise</h2>
              <p>The exact list depends on the organisation or authority asking. This is a typical starting point, not an official requirement.</p>
              <ul className="ticks">{sub.documents.map((d) => <li key={d}>{d}</li>)}</ul>
              {sub.covers && (
                <p>Also covered under this page: {sub.covers.join(', ').toLowerCase()}.</p>
              )}
            </section>
          )}
          {isExperience && (
            <section id="doc-table">
              <h2>Documents we help you obtain</h2>
              <p>Every document below is a genuine record issued by your employer or your own bank. We help you request, check and organise them, and we never produce them.</p>
              <ExperienceDocsTable />
              <div><ConsultLink {...cta} small arrow>{ctaLabel}</ConsultLink></div>
            </section>
          )}
          {isVisa && (
            <section id="requirements">
              <h2>Documents commonly asked for</h2>
              <p>We help you gather and organise these. We do not issue visas, and the authority decides every application.</p>
              <VisaTypeChecklist slug={sub.slug} />
              <div><ConsultLink {...cta} small arrow>{ctaLabel}</ConsultLink></div>
            </section>
          )}
          <section id="not-included" className="border-[1.5px] border-ink bg-white p-[clamp(1.5rem,3vw,2.25rem)]" aria-labelledby="ni-h">
            <p className="notice-label">Important</p>
            <h2 id="ni-h">Not included</h2>
            <ul className="ticks">{sub.notIncluded.map((n) => <li key={n}>{n}</li>)}</ul>
            <p>{parent.notice}</p>
          </section>
          {isVisa && (
            <section id="destinations">
              <h2>Choose a destination</h2>
              <DestinationPicker sub={sub.slug} />
            </section>
          )}
          {isTraining && (
            <section id="formats">
              <h2>Learning formats</h2>
              <p>Formats are confirmed in writing before you enrol, because availability can differ by track.</p>
              <FormatList />
            </section>
          )}
          <section id="cities">
            <h2>Online, wherever you are</h2>
            <p>This service is delivered online. Pick your city to see how it applies where you live.</p>
            <ul className="flex flex-wrap gap-2">
              {POPULAR_CITIES.map((c) => (
                <li key={c.slug}>
                  <Link to={cityUrl(c.slug)} className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-line-strong px-3.5 text-[.9rem] font-semibold no-underline hover:border-ink">{c.name}</Link>
                </li>
              ))}
              <li><Link to="/cities/" className="inline-flex min-h-10 items-center px-2 text-[.9rem] font-semibold text-brand-ink underline">All cities</Link></li>
            </ul>
          </section>
          <section id="questions">
            <h2>Common questions</h2>
            <div className="border-t border-ink"><FaqList items={sub.faqs} /></div>
          </section>
          <section id="more">
            <h2>More {parent.name.toLowerCase()}</h2>
            <SubServiceGrid items={siblings} />
            <p><Link to={serviceUrl(parent.slug)}>Back to {parent.name}</Link></p>
          </section>
        </article>
        <aside className="hidden lg:block" aria-label="Page tools">
          <div className="sticky top-[100px] grid gap-6">
            <Toc items={toc} />
            <div className="on-dark grid justify-items-start gap-3.5 bg-ink p-6 text-paper">
              <p className="font-display text-xl leading-tight font-bold tracking-[-0.02em]">Questions about {sub.name.toLowerCase()}?</p>
              <p className="text-[.9375rem] text-dark-muted">Send a short enquiry. You&apos;ll get the scope, timeline and fee in writing before anything starts.</p>
              <ConsultLink {...cta} small arrow>{ctaLabel}</ConsultLink>
            </div>
          </div>
        </aside>
      </div>
      {isExperience && <WhatElse />}
      <CtaBand heading="Ready for your next step?" text={`Tell us about your situation and we'll explain how we can help with ${sub.name.toLowerCase()}.`}
        label={ctaLabel} consult={cta} />
    </>
  );
}
