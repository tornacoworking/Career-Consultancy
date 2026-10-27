import { Eyebrow } from './ui.jsx';

/**
 * Title block for inner pages. Centred on small screens.
 * `art` ({ src, alt, width, height }) adds an image beside the text on large screens, so the page does not
 * open with a wide empty space. It sits below the text on small screens.
 */
export default function PageHero({ eyebrow, title, lede, narrow = false, spotlight = true, art, children }) {
  return (
    <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className={`${narrow ? 'wrap-narrow' : 'wrap'} grid gap-[clamp(2rem,5vw,4rem)] ${art ? 'items-center lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]' : ''}`}>
        <div className="grid min-w-0 justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="page-h my-1" data-spotlight={spotlight ? '' : undefined}>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
        {art && (
          <figure className="mx-auto w-full max-w-[26rem] min-w-0">
            <img className="photo h-auto w-full rounded-brand object-cover" src={`${import.meta.env.BASE_URL}images/${art.src}`}
              width={art.width} height={art.height} alt={art.alt} decoding="async" />
          </figure>
        )}
      </div>
    </section>
  );
}
