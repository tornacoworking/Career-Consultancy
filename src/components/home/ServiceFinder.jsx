/* "What brings you here?": plain cards, one per situation, each with its own button.
   No hidden panels and no animation: a first-time visitor sees every option and the next step at once. */
import { Arrow, SectionHead } from '../ui.jsx';
import ConsultLink from '../ConsultLink.jsx';
import Icon from '../Icon.jsx';
import { Link } from '../../lib/router.jsx';
import { NEEDS } from '../../data/home.js';
import { serviceUrl } from '../../data/services.js';

export default function ServiceFinder() {
  return (
    <section className="section bg-white" id="find-your-service" aria-labelledby="find-h">
      <div className="wrap">
        <SectionHead eyebrow="Start here" id="find-h" lede="Pick the one that sounds like you. Asking a question is free and needs no sign-up.">
          What brings <span className="accent">you here?</span>
        </SectionHead>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,19rem),1fr))] gap-5">
          {NEEDS.map((n, i) => (
            <li key={n.key} className="grid">
              <article className={`relative flex flex-col gap-4 border bg-paper p-[clamp(1.25rem,3vw,1.75rem)] ${i === 0 ? 'border-ink border-t-[6px] border-t-brand' : 'border-line'}`}>
                {n.badge && <p className="label-mono self-start bg-brand-soft px-2.5 py-1 text-brand-ink">{n.badge}</p>}
                <span className="grid size-12 place-items-center rounded-full bg-ink text-brand"><Icon name={n.icon} size={24} /></span>
                <h3 className="text-title">{n.label}</h3>
                <p className="text-muted">{n.text}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                  <ConsultLink service={n.slug} arrow>{n.cta}</ConsultLink>
                  <Link className="text-link" to={serviceUrl(n.slug)}>Read details <Arrow /></Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
