import { HeroPhoto } from '../Photo.jsx';
import HeroReadiness from './HeroReadiness.jsx';
import CityExplorer from '../CityExplorer.jsx';
import ConsultLink from '../ConsultLink.jsx';
import { Arrow, Eyebrow } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { SITE } from '../../data/site.js';
import { WhatsAppIcon, waUrl } from '../WhatsAppFloat.jsx';
import { SERVICES, serviceUrl } from '../../data/services.js';

export default function Hero() {
  return (
    <section className="pt-[clamp(2.5rem,6vw,5.5rem)] pb-[clamp(2.5rem,5vw,4.5rem)]" aria-labelledby="hero-h">
      <div className="wrap grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 justify-items-center text-center lg:justify-items-start lg:text-left">
          <Eyebrow>{SITE.tagline}</Eyebrow>
          <h1 id="hero-h" className="mt-5 mb-6 text-hero leading-[.98] font-extrabold tracking-[-0.045em]" data-spotlight>
            Fresher? Build experience <span className="accent">you can prove.</span>
          </h1>
          <p className="lede">
            We help freshers get real project experience with a certificate for the work they actually complete. If you have already worked somewhere, we help you get your genuine experience certificate from that employer. Simple steps, fees in writing, nothing hidden.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
            <ConsultLink arrow>Get Free Consultation</ConsultLink>
            {waUrl() && (
              <a href={waUrl()} target="_blank" rel="noopener" className="btn btn-ghost">
                <WhatsAppIcon size={20} /> Chat on WhatsApp
              </a>
            )}
          </div>
          <ul className="mt-5 grid gap-y-1.5 text-[.9375rem] text-muted" aria-label="How we work">
            <li><span className="font-bold text-brand-ink">✓ </span>Free first chat. No payment to ask a question</li>
            <li><span className="font-bold text-brand-ink">✓ </span>You see the fee in writing before you pay</li>
            <li><span className="font-bold text-brand-ink">✓ </span>No job or visa guarantees. Only honest promises</li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[560px] min-w-0">
          <figure>
            <HeroPhoto className="h-auto w-full rounded-brand object-cover" />
          </figure>
          <HeroReadiness />
        </div>
      </div>
      <div className="wrap mt-[clamp(2.5rem,5vw,4rem)]">
        <div className="border border-ink bg-white p-[clamp(1.1rem,3vw,1.75rem)]"><CityExplorer compact /></div>
      </div>
      <div className="wrap">
        <ul className="mt-[clamp(2rem,4vw,3rem)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] border-t border-ink" aria-label="Our services">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link to={serviceUrl(s.slug)}
                className="group flex min-h-16 items-center justify-center gap-3 border-b border-line px-1 py-4 text-center font-display text-[1.05rem] leading-tight font-semibold no-underline lg:justify-start lg:text-left">
                <span className="font-mono text-[.8125rem] font-medium text-muted">{s.num}</span>
                <span>{s.name}</span>
                <Arrow className="text-brand-ink transition-transform duration-300 group-hover:translate-x-1 lg:ml-auto" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
