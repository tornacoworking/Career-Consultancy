import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Arrow, Eyebrow } from '../components/ui.jsx';
import { Picture } from '../components/Photo.jsx';
import { Link } from '../lib/router.jsx';
import { GUIDES, guideUrl } from '../data/guides.js';
import { SERVICE_BY_SLUG } from '../data/services.js';

export default function GuidesHub() {
  return (
    <>
      <PageHero eyebrow="Guides" title="Practical guides"
        lede="Free, step-by-step help with the paperwork behind your next step. Written from official sources, with no shortcuts."
        art={{ src: 'visa-docs.jpg', width: 640, height: 800, alt: 'Hands sorting papers into a ring binder beside a cup of coffee' }} />
      <section className="pt-4 pb-[clamp(1.875rem,1.375rem+3vw,3.875rem)]">
        <ul className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link to={guideUrl(g.slug)} className="group grid h-full content-start justify-items-center gap-3 border border-line bg-white p-[clamp(1.5rem,3vw,2.25rem)] text-center no-underline transition-colors hover:border-ink lg:justify-items-start lg:text-left">
                <span className="font-mono text-[.8125rem] tracking-[.04em] text-muted">{SERVICE_BY_SLUG[g.service].name} · {g.read}</span>
                <h2 className="text-title">{g.h1}</h2>
                <p className="text-muted">{g.summary}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-[.9375rem] font-semibold text-brand-ink">Read the guide <Arrow className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="section bg-white" aria-labelledby="how-written-h">
        <div className="wrap grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,5vw,5rem)]">
          <Picture name="experience-industries.jpg" width={640} height={800} alt="A tall stack of clipped office paperwork next to a pair of glasses on a desk"
            className="mx-auto h-auto max-h-[28rem] w-full max-w-[24rem] rounded-brand object-cover lg:mx-0" />
          <div className="grid gap-4 text-center lg:text-left">
            <Eyebrow>How our guides are written</Eyebrow>
            <h2 id="how-written-h" className="h-section">Plain steps, from official sources.</h2>
            <ul className="ticks mx-auto text-left lg:mx-0">
              <li>Built from what the issuing authority or employer actually asks for.</li>
              <li>Step by step, with the order to do things in.</li>
              <li>Copy-and-edit templates where a letter or email helps.</li>
              <li>Honest about what takes time and what we cannot do for you.</li>
            </ul>
          </div>
        </div>
      </section>
      <CtaBand heading="Want help with yours?" text="We can turn these steps into a checklist for your exact situation." label="Send an enquiry" />
    </>
  );
}
