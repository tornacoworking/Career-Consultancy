import PageHero from '../components/PageHero.jsx';
import { AboutPhoto } from '../components/Photo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { Link } from '../lib/router.jsx';
import { SERVICES, serviceUrl } from '../data/services.js';
import { COMMITMENTS, TRANSPARENCY } from '../data/home.js';

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="About Career Consultancy"
        lede="Career Consultancy is an online consultancy that helps people with the practical steps between where they are and where they want to be: documents, applications, credentials and skills." />
      <div className="wrap-narrow pt-[clamp(1rem,3vw,2rem)]">
        <AboutPhoto className="h-auto w-full rounded-brand object-cover" />
      </div>
      <div className="wrap-narrow prose-cn pt-[clamp(1rem,3vw,2rem)] pb-[clamp(4rem,3rem+5vw,8rem)]">
        <section>
          <h2>What we do</h2>
          <p>We offer four services, each with its own clearly defined scope:</p>
          <ul className="ticks">{SERVICES.map((s) => <li key={s.slug}><Link to={serviceUrl(s.slug)}>{s.name}</Link>: {s.short}</li>)}</ul>
        </section>
        <section>
          <h2>How we work</h2>
          <p>Before any work begins, we agree four things with you in writing:</p>
          <ul className="ticks">{TRANSPARENCY.map((t) => <li key={t.title}><strong>{t.title}.</strong> {t.text}</li>)}</ul>
          <p>We use official sources for requirements, explain anything that depends on an employer, provider or authority, and keep you informed while your service is in progress.</p>
        </section>
        <section className="border-[1.5px] border-ink bg-white p-[clamp(1.5rem,3vw,2.25rem)]">
          <p className="notice-label">Our commitments</p>
          <h2>What we will never do</h2>
          <ul className="ticks">{COMMITMENTS.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
