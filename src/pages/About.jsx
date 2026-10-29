import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import BranchCard from '../components/BranchCard.jsx';
import { Link } from '../lib/router.jsx';
import { SERVICES, serviceUrl } from '../data/services.js';
import { COMMITMENTS, TRANSPARENCY } from '../data/home.js';

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="About Career Consultancy"
        lede="Career Consultancy is an online consultancy that helps people with the practical steps between where they are and where they want to be: experience certificates, visa documents and project skills."
        art={{ src: 'about.jpg', width: 1200, height: 675, alt: 'A consultant and a client talking through their situation across a table' }} />
      <div className="wrap grid gap-[clamp(1.125rem,3vw,1.875rem)] pt-[clamp(1rem,3vw,2rem)] pb-[clamp(1.875rem,1.375rem+3vw,3.875rem)]">
        <div className="prose-cn grid gap-[clamp(1.125rem,3vw,1.875rem)] lg:grid-cols-2 lg:gap-x-[clamp(3rem,6vw,6rem)]">
          <section>
            <h2>What we do</h2>
            <p>We offer three services, each with its own clearly defined scope:</p>
            <ul className="ticks">{SERVICES.map((s) => <li key={s.slug}><Link to={serviceUrl(s.slug)}>{s.name}</Link>: {s.short}</li>)}</ul>
          </section>
          <section>
            <h2>How we work</h2>
            <p>Before any work begins, we agree four things with you in writing:</p>
            <ul className="ticks">{TRANSPARENCY.map((t) => <li key={t.title}><strong>{t.title}.</strong> {t.text}</li>)}</ul>
            <p>We use official sources for requirements, explain anything that depends on an employer, provider or authority, and keep you informed while your service is in progress.</p>
          </section>
        </div>
        <section className="border-[1.5px] border-ink bg-white p-[clamp(1.5rem,3vw,2.25rem)]" aria-labelledby="never-h">
          <p className="notice-label">Our commitments</p>
          <h2 id="never-h" className="mt-1 mb-4 text-title">What we will never do</h2>
          <ul className="ticks grid gap-3 md:grid-cols-2 md:gap-x-10">{COMMITMENTS.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
        <BranchCard heading="Where to find us" cta className="lg:max-w-[40rem]" />
      </div>
      <CtaBand />
    </>
  );
}
