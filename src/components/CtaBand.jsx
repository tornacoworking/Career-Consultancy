import { ButtonLink, Magnetic } from './ui.jsx';
import ConsultLink from './ConsultLink.jsx';

const STEPS = ['Tell us what you need', 'Get the scope, timeline and fee in writing', 'Start only when you agree'];

export default function CtaBand({
  heading = 'Not sure where to start?',
  text = 'Tell us what you need, and we will help you understand the next steps.',
  label = 'Send an Enquiry',
  to = '/contact/#enquiry',
  consult, // { service, sub, city, destination }: opens the consultation modal instead of linking to /contact/
}) {
  return (
    <section className="relative overflow-hidden bg-brand py-[clamp(1.875rem,4.5vw,3.375rem)] text-ink [--focus:var(--color-ink)]" aria-labelledby="cta-h">
      <span aria-hidden="true" className="pointer-events-none absolute -right-[8%] -bottom-[55%] aspect-square w-[clamp(240px,38vw,520px)] rounded-full border-[1.5px] border-ink opacity-50" />
      <div className="wrap relative z-10 grid justify-items-center gap-8 text-center lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:justify-items-stretch lg:text-left">
        <Magnetic id="cta-h" className="text-hero leading-[.98] font-extrabold tracking-[-0.045em] lg:max-w-[12ch]">{heading}</Magnetic>
        <div className="grid w-full max-w-[30rem] content-center justify-items-center gap-6 lg:justify-items-start">
          <p className="text-lede leading-normal">{text}</p>
          <ol className="grid w-full border-t border-ink/60 text-left" aria-label="How it works">
            {STEPS.map((t, i) => (
              <li key={t} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-b border-ink/25 py-3 font-medium">
                <span className="font-mono text-[.8125rem]">{String(i + 1).padStart(2, '0')}</span>{t}
              </li>
            ))}
          </ol>
          {consult
            ? <ConsultLink {...consult} variant="dark" arrow>{label}</ConsultLink>
            : <ButtonLink to={to} variant="dark" arrow>{label}</ButtonLink>}
        </div>
      </div>
    </section>
  );
}
