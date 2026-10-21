import { ButtonLink, Magnetic } from './ui.jsx';
import ConsultLink from './ConsultLink.jsx';

export default function CtaBand({
  heading = 'Not sure where to start?',
  text = 'Tell us what you need, and we will help you understand the next steps.',
  label = 'Send an Enquiry',
  to = '/contact/#enquiry',
  consult, // { service, sub, city, destination }: opens the consultation modal instead of linking to /contact/
}) {
  return (
    <section className="relative overflow-hidden bg-brand py-[clamp(4rem,8vw,7rem)] text-ink [--focus:var(--color-ink)]" aria-labelledby="cta-h">
      <span aria-hidden="true" className="pointer-events-none absolute -right-[8%] -bottom-[55%] aspect-square w-[clamp(240px,38vw,520px)] rounded-full border-[1.5px] border-ink opacity-50" />
      <div className="wrap relative z-10 grid justify-items-center gap-8 text-center lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:justify-items-stretch lg:text-left">
        <Magnetic id="cta-h" className="text-hero leading-[.98] font-extrabold tracking-[-0.045em] lg:max-w-[12ch]">{heading}</Magnetic>
        <div className="grid max-w-[30rem] content-end justify-items-center gap-6 lg:justify-items-start">
          <p className="text-lede leading-normal">{text}</p>
          {consult
            ? <ConsultLink {...consult} variant="dark" arrow>{label}</ConsultLink>
            : <ButtonLink to={to} variant="dark" arrow>{label}</ButtonLink>}
        </div>
      </div>
    </section>
  );
}
