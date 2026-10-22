/* One template for every sub-service page (visa types, document-help types, training domains). */
import Icon from '../components/Icon.jsx';
import { ServicePhoto } from '../components/Photo.jsx';
import ConsultLink from '../components/ConsultLink.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Toc from '../components/Toc.jsx';
import { DestinationPicker, FormatList, SubServiceGrid } from '../components/ServiceSections.jsx';
import { Eyebrow, FaqList } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { POPULAR_CITIES, cityUrl } from '../data/cities.js';
import { SERVICE_BY_SLUG, serviceUrl, subServicesOf } from '../data/services.js';

export default function SubServicePage({ sub }) {
  const parent = SERVICE_BY_SLUG[sub.parent];
  const isVisa = sub.parent === 'visa-services';
  const isTraining = sub.parent === 'online-training';
  const siblings = subServicesOf(sub.parent).filter((x) => x.slug !== sub.slug);
  const toc = [['who', 'Who this is for'], ['process', 'How it works'], [isTraining ? 'topics' : 'documents', isTraining ? 'What you will cover' : 'Documents we help organise'], ['not-included', 'Not included']];
  if (isVisa) toc.push(['destinations', 'Choose a destination']);
  if (isTraining) toc.push(['formats', 'Learning formats']);
  toc.push(['cities', 'Your city'], ['questions', 'Common questions'], ['more', `More ${parent.name.toLowerCase()}`]);
  const cta = { service: sub.parent, sub: sub.slug };
  const ctaLabel = isTraining ? 'Discuss This Training' : 'Get Free Consultation';

  return (
    <>
      <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]">
        <div className="wrap grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>{parent.name}</Eyebrow>
            <span className="grid size-12 place-items-center rounded-brand bg-brand-soft text-brand-ink"><Icon name={sub.icon} size={26} /></span>
            <h1 className="page-h my-1" data-spotlight>{sub.h1}</h1>
            <p className="lede">{sub.intro}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ConsultLink {...cta} arrow>{ctaLabel}</ConsultLink>
              <a className="btn btn-ghost" href="#process">See the process</a>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[560px] min-w-0">
            <ServicePhoto slug={parent.slug} alt={parent.art_label} eager className="h-auto w-full rounded-brand object-cover" />
          </figure>
        </div>
      </section>

      <div className="wrap grid gap-12 pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4rem,3rem+5vw,8rem)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[clamp(3rem,6vw,6rem)]">
        <article className="prose-cn min-w-0">
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
      <CtaBand heading="Ready for your next step?" text={`Tell us about your situation and we'll explain how we can help with ${sub.name.toLowerCase()}.`}
        label={ctaLabel} consult={cta} />
    </>
  );
}
