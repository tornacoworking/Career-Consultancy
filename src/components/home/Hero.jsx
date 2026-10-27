import { HeroPhoto } from '../Photo.jsx';
import HeroReadiness from './HeroReadiness.jsx';
import CityExplorer from '../CityExplorer.jsx';
import ConsultLink from '../ConsultLink.jsx';
import { Arrow, ButtonLink, Eyebrow } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { SITE } from '../../data/site.js';
import { SERVICES, serviceUrl } from '../../data/services.js';

export default function Hero() {
  return (
    <section className="pt-[clamp(2.5rem,6vw,5.5rem)] pb-[clamp(2.5rem,5vw,4.5rem)]" aria-labelledby="hero-h">
      <div className="wrap grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="grid min-w-0 justify-items-center text-center lg:justify-items-start lg:text-left">
          <Eyebrow>{SITE.tagline}</Eyebrow>
          <h1 id="hero-h" className="mt-5 mb-6 text-hero leading-[.98] font-extrabold tracking-[-0.045em]" data-spotlight>
            Your goals. Your <span className="accent">next&nbsp;step.</span> Our guidance.
          </h1>
          <p className="lede">
            Get genuine experience certificates from your past employers, prepare your visa documentation carefully (we do not offer visas, only the documents you need to apply), and build real skills with project training, wherever you are in India.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
            <ConsultLink arrow>Get Free Consultation</ConsultLink>
            <ButtonLink to="/services/" variant="ghost">Explore Our Services</ButtonLink>
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[.875rem] text-muted lg:justify-start" aria-label="How we work">
            <li>Transparent scope and fees in writing</li>
            <li>Personal support</li>
            <li>No approval or job guarantees</li>
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
