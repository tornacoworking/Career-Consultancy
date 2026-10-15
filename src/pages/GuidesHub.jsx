import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Arrow } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { GUIDES, guideUrl } from '../data/guides.js';
import { SERVICE_BY_SLUG } from '../data/services.js';

export default function GuidesHub() {
  return (
    <>
      <PageHero eyebrow="Guides" title="Practical guides"
        lede="Free, step-by-step help with the paperwork behind your next step. Written from official sources, with no shortcuts." />
      <section className="pt-4 pb-[clamp(4rem,3rem+5vw,8rem)]">
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
      <CtaBand heading="Want help with yours?" text="We can turn these steps into a checklist for your exact situation." label="Send an enquiry" />
    </>
  );
}
