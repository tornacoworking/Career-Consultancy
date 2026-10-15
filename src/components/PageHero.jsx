import { Eyebrow } from './ui.jsx';

/** Title block for inner pages. Centred on small screens. */
export default function PageHero({ eyebrow, title, lede, narrow = false, spotlight = true, children }) {
  return (
    <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className={`${narrow ? 'wrap-narrow' : 'wrap'} grid justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="page-h my-1" data-spotlight={spotlight ? '' : undefined}>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
