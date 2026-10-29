import { BannerPhoto, FillPhoto, ServicePhoto } from '../components/Photo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Toc from '../components/Toc.jsx';
import WhatElse from '../components/WhatElse.jsx';
import { ContentsTable, ExperienceDocsTable, ExperienceNeedsTable, ExperienceWhat, TrainingNeedsTable, VisaClarity, VisaMatrix } from '../components/Requirements.jsx';
import Checklist from '../components/Checklist.jsx';
import { Arrow, Eyebrow, FaqList, Html } from '../components/ui.jsx';
import ConsultLink from '../components/ConsultLink.jsx';
import ConsultationForm from '../components/ConsultationForm.jsx';
import { CourseVsProject, DestinationPicker, FeatureSection, FormatList, GenuineSection, IndustrySection, LocationsServed, RichLocations, RichSection, SubServiceGrid, WhySection } from '../components/ServiceSections.jsx';
import { Link } from '../lib/router.jsx';
import { useConsult } from '../lib/consult.jsx';
import { CITY_BY_SLUG, cityUrl } from '../data/cities.js';
import { SERVICE_BY_SLUG, serviceUrl, subServicesOf } from '../data/services.js';
import { TRAINING_PROGRAMMES } from '../data/site.js';
import { RICH } from '../data/serviceRich.js';

function Programmes({ slug }) {
  if (TRAINING_PROGRAMMES.length) {
    return (
      <ul className="grid gap-6">
        {TRAINING_PROGRAMMES.map((p) => (
          <li key={p.name} className="grid gap-2 border-t border-ink pt-4">
            <h3 className="text-xl">{p.name}</h3>
            <p className="text-muted">{p.summary}</p>
            <dl className="grid grid-cols-2 gap-2 text-[.9375rem] sm:grid-cols-4">
              {['format', 'duration', 'schedule', 'fee'].map((k) => (
                <div key={k}><dt className="label-mono text-muted">{k}</dt><dd>{p[k]}</dd></div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="grid justify-items-center gap-5 bg-grey p-[clamp(1.5rem,3vw,2rem)] text-center lg:justify-items-start lg:text-left">
      <p>Our programme calendar is being finalised. Send an enquiry with the skill you want to learn, and we will share what is currently available, including the schedule, duration, trainer and fee.</p>
      <ConsultLink service={slug} small arrow>Discuss This Training</ConsultLink>
    </div>
  );
}

// A section's content followed by a clear enquiry button.
const withCta = (node, slug, label = 'Get Consultation') => (
  <>
    {node}
    <div className="mt-2"><ConsultLink service={slug} small arrow>{label}</ConsultLink></div>
  </>
);

// Extra sections for the services that have sub-service pages. Each is { id, title, intro, node }.
function extraSections(s, subs) {
  if (!subs.length) return [];
  const types = { id: 'types', intro: null, node: <SubServiceGrid items={subs} /> };
  const rich = RICH[s.slug];
  if (rich) {
    const parts = {
      types: { ...types, title: s.slug === 'visa-documentation' ? 'Types of visa support' : 'Training domains' },
      requirements: { id: 'requirements', title: 'Visa documentation requirements', intro: 'These are the documents commonly asked for, by visa purpose. We help you gather, check and organise them. We do not issue visas, and the authority decides every application.', node: withCta(<VisaMatrix />, s.slug) },
      needs: { id: 'needs', title: 'What we need from you before you enrol', intro: 'A few details let us recommend the right track and send you the programme details in writing.', node: withCta(<TrainingNeedsTable />, s.slug, 'Discuss This Training') },
      destinations: { id: 'destinations', title: 'Choose a destination', intro: null, node: <DestinationPicker /> },
      'course-or-project': { id: 'course-or-project', title: 'Course training or live project training', intro: 'Both are hands-on. The right starting point depends on how much you already know.', node: <CourseVsProject /> },
      formats: { id: 'formats', title: 'Learning formats', intro: 'Formats are confirmed in writing before you enrol.', node: <FormatList /> },
      locations: { id: 'locations', title: 'Locations we serve', intro: null, node: <RichLocations cfg={rich.locations} hash={CITY_HASH[s.slug]} /> },
      ...Object.fromEntries(rich.sections.map((c) => [c.id, { id: c.id, title: c.title, intro: c.intro, node: <RichSection cfg={c} /> }])),
    };
    return rich.order.map((id) => parts[id]);
  }
  if (s.slug === 'experience-certificate') {
    return [
      { id: 'what-is', title: 'What is an experience certificate?', intro: 'The short version, for anyone who has not needed one before.', node: withCta(<ExperienceWhat />, s.slug) },
      { ...types, title: 'Types of documentation help' },
      { id: 'docs-we-help', title: 'Documents we help you obtain', intro: 'Every document below is a genuine record issued by your employer or your own bank. We help you request, check and organise them, and we never produce them.', node: withCta(<ExperienceDocsTable />, s.slug) },
      { id: 'needs', title: 'What we need from you', intro: 'Use the checklist above to tick things off. This table explains why each item matters.', node: withCta(<ExperienceNeedsTable />, s.slug) },
      { id: 'why', title: 'Why an experience certificate matters', intro: 'It is one of the first things anyone checks when they want to confirm your career. These are the situations where we see it asked for most.', node: <WhySection /> },
      { id: 'industries', title: 'Industries we support', intro: 'Every sector issues letters in its own way. Here is what we have learned to look out for.', node: <IndustrySection /> },
      { id: 'features', title: 'What makes this service different', intro: 'Anyone can tell you to email HR. This is what we add around that request.', node: <FeatureSection /> },
      { id: 'genuine', title: 'Genuine records only', intro: 'Helping you obtain and organise real documents is very different from fabricating a work history. We do the first and never the second.', node: <GenuineSection /> },
      { id: 'locations', title: 'Locations we serve', intro: null, node: <LocationsServed /> },
    ];
  }
  return [];
}

const CITY_HASH = { 'visa-documentation': 'visa', 'experience-certificate': 'documents', 'real-time-project-training': 'training' };

export default function ServicePage({ service: s }) {
  const { city: citySlug } = useConsult();
  const city = CITY_BY_SLUG[citySlug];
  const subs = subServicesOf(s.slug);
  const extras = extraSections(s, subs);
  const toc = [['scope', 'What we help with'], ['important', 'Important to know'], ['who', 'Who this is for'], ['ready', 'What to keep ready'], ['process', 'How it works']];
  extras.forEach((x) => toc.push([x.id, x.title]));
  if (s.slug === 'real-time-project-training') toc.push(['programmes', 'Current programmes']);
  else if (s.extra) toc.push(['more', s.extra.title]);
  toc.push(['questions', 'Common questions'], ['related', 'Related services']);
  if (s.slug === 'experience-certificate') toc.push(['verification', 'What else do we have for you?']);
  if (s.banner) toc.push(['enquiry', 'Send an enquiry']);

  return (
    <>
      <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(1rem,3vw,1.875rem)]">
        <div className={`wrap grid items-center gap-[clamp(2rem,5vw,4rem)] ${s.banner ? '' : 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'}`}>
          <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>Service {s.num} · {s.name}</Eyebrow>
            <h1 className="page-h my-1" data-spotlight>{s.h1}</h1>
            <p className="lede">{s.intro}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ConsultLink service={s.slug} arrow>Enquire about this service</ConsultLink>
              <a className="btn btn-ghost" href="#process">See the process</a>
            </div>
            {city && CITY_HASH[s.slug] && (
              <p className="text-[.9375rem] text-muted">
                Your city: <strong className="text-ink">{city.name}</strong> · <Link to={`${cityUrl(city.slug)}#${CITY_HASH[s.slug]}`} className="underline decoration-brand">how this works in {city.name}</Link>
              </p>
            )}
          </div>
          {!s.banner && (
            <figure className="mx-auto w-full max-w-[560px] min-w-0">
              <ServicePhoto slug={s.slug} alt={s.art_label} eager className="h-auto w-full rounded-brand object-cover" />
            </figure>
          )}
        </div>
        {s.banner && (
          <div className="wrap mt-[clamp(2.5rem,5vw,3.5rem)]">
            <figure className="relative overflow-hidden rounded-brand">
              <BannerPhoto src={s.banner.src} alt={s.banner.alt} className="h-auto min-h-[14rem] w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-[clamp(1rem,3vw,2rem)] pt-16 font-display text-[clamp(1.05rem,.9rem+1vw,1.6rem)] leading-snug font-semibold text-white">{s.banner.caption}</figcaption>
            </figure>
          </div>
        )}
        <div className="wrap">
          <dl className="mt-[clamp(2.5rem,5vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-t border-ink text-center lg:text-left">
            {s.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-4 lg:pr-4">
                <dt className="label-mono text-muted">{f.label}</dt>
                <dd className="mt-1.5 font-display text-[1.05rem] leading-snug font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          {s.slug === 'visa-documentation' && <VisaClarity cta className="mt-8" />}
        </div>
      </section>

      <div className="wrap grid gap-12 pt-[clamp(1rem,3vw,1.875rem)] pb-[clamp(1.875rem,1.375rem+3vw,3.875rem)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[clamp(3rem,6vw,6rem)]">
        <article className="prose-cn min-w-0">
          <ContentsTable items={toc} />
          <section id="scope">
            <h2>What we help with</h2>
            <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-8">
              {s.scope.map((x) => (
                <div key={x.title} className="grid content-start gap-2 border-t border-ink pt-[1.1rem]">
                  <h3 className="text-xl tracking-[-0.015em]">{x.title}</h3>
                  <p className="text-muted">{x.text}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="important" className="border-[1.5px] border-ink bg-white p-[clamp(1.5rem,3vw,2.25rem)]" aria-labelledby="imp-h">
            <p className="notice-label">Important</p>
            <h2 id="imp-h">Important to know</h2>
            <p>{s.notice}</p>
          </section>
          <section id="who">
            <h2>Who this is for</h2>
            <ul className="ticks">{s.audience.map((a) => <li key={a}>{a}</li>)}</ul>
          </section>
          <section id="ready">
            <h2>What to keep ready</h2>
            <p>Tick items off as you gather them. Your ticks are saved on this device only and are never sent to us.</p>
            <Checklist id={s.slug} items={s.ready} />
          </section>
          <section id="process">
            <h2>How it works</h2>
            <ol className="steps">{s.steps.map((x) => <li key={x.title}><h3>{x.title}</h3><p>{x.text}</p></li>)}</ol>
          </section>
          {extras.map((x) => (
            <section key={x.id} id={x.id}>
              <h2>{x.title}</h2>
              {x.intro && <p>{x.intro}</p>}
              {x.node}
            </section>
          ))}
          {s.slug === 'real-time-project-training' ? (
            <section id="programmes"><h2>Current programmes</h2><Programmes slug={s.slug} /></section>
          ) : s.extra && (
            <section id="more"><h2>{s.extra.title}</h2><Html html={s.extra.html} /></section>
          )}
          <section id="questions">
            <h2>Common questions</h2>
            <div className="border-t border-ink"><FaqList items={s.faqs} /></div>
            <p>More answers on the <Link to="/faqs/">FAQ page</Link>.</p>
          </section>
          <section id="related">
            <h2>Related services</h2>
            <ul className="border-t border-ink">
              {s.related.map((slug) => {
                const r = SERVICE_BY_SLUG[slug];
                return (
                  <li key={slug}>
                    <Link to={serviceUrl(slug)} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-line py-5 !no-underline">
                      <span className="row-span-2 self-start pt-2 font-mono text-[.8125rem] text-muted">{r.num}</span>
                      <span className="font-display text-title leading-tight font-bold tracking-[-0.02em] group-hover:text-brand-ink">{r.name}</span>
                      <Arrow className="col-start-3 row-span-2 row-start-1 text-brand-ink transition-transform group-hover:translate-x-1" />
                      <span className="col-start-2 text-[.9375rem] text-muted">{r.short}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </article>
        <aside className="hidden lg:block" aria-label="Page tools">
          <div className="sticky top-[100px] grid gap-6">
            <Toc items={toc} />
            <div className="on-dark grid justify-items-start gap-3.5 bg-ink p-6 text-paper">
              <p className="font-display text-xl leading-tight font-bold tracking-[-0.02em]">Questions about {s.name.toLowerCase()}?</p>
              <p className="text-[.9375rem] text-dark-muted">Send a short enquiry. You&apos;ll get the scope, timeline and fee in writing before anything starts.</p>
              <ConsultLink service={s.slug} city={city?.slug} small arrow>Send an enquiry</ConsultLink>
            </div>
          </div>
        </aside>
      </div>
      {s.slug === 'experience-certificate' && <WhatElse />}
      {s.banner && (
        <section className="section bg-white" id="enquiry" aria-labelledby="enq-h">
          <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <Eyebrow>Free consultation</Eyebrow>
              <h2 id="enq-h" className="h-section">{s.banner.formHeading}</h2>
              <p className="lede">{s.banner.formLede}</p>
              {s.banner.next && (
                <div className="mt-2 grid gap-3 text-left">
                  <p className="label-mono text-brand-ink">What happens next</p>
                  <ol className="steps">{s.banner.next.map((t) => <li key={t}><p className="!text-ink">{t}</p></li>)}</ol>
                </div>
              )}
              {s.banner.formImage && <FillPhoto name={s.banner.formImage.src} alt={s.banner.formImage.alt} />}
            </div>
            <div className="min-w-0"><ConsultationForm idPrefix="svc" prefill={{ service: s.slug, city: city?.slug }} /></div>
          </div>
        </section>
      )}
      <CtaBand heading="Ready for your next step?" text={`Tell us about your situation and we'll explain how our ${s.name.toLowerCase()} service can help.`}
        label="Enquire now" consult={{ service: s.slug }} />
    </>
  );
}
