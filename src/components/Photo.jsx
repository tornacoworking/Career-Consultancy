// Real photographs, free for commercial use under the Pexels licence (see IMAGE-CREDITS.md).
// Files live in /public/images and are pre-cropped to the ratios below.
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;

export const HERO_ALT = 'Two professionals in a consultation at a desk, going through documents together';

export function HeroPhoto({ alt = HERO_ALT, className = '' }) {
  return (
    <img className={`photo ${className}`} src={asset('hero.jpg')} width="1040" height="910" alt={alt}
      fetchPriority="high" decoding="async" />
  );
}

export function ServicePhoto({ slug, alt, className = '', eager = false }) {
  return (
    <img className={`photo ${className}`} src={asset(`${slug}.jpg`)} width="960" height="720" alt={alt}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
  );
}

export function AboutPhoto({ className = '' }) {
  return (
    <img className={`photo ${className}`} src={asset('about.jpg')} width="1200" height="675" loading="lazy" decoding="async"
      alt="A consultant and a client talking through their situation across a table" />
  );
}

export function LogoImage({ light = false, className = '' }) {
  return (
    <img className={className} src={asset(light ? 'logo-light.png' : 'logo.png')} width="480" height="155" alt=""
      loading={light ? 'lazy' : undefined} decoding="async" />
  );
}

/** Reviewer portrait (sample). Falls back to the reviewer's initial when no file is set. */
export function Avatar({ name, file, className = '' }) {
  if (!file) {
    return <span aria-hidden="true" className={`grid size-11 place-items-center rounded-full bg-brand font-display font-bold ${className}`}>{name[0]}</span>;
  }
  return <img className={`size-11 rounded-full object-cover ${className}`} src={asset(`avatars/${file}.jpg`)} width="160" height="160" alt="" loading="lazy" decoding="async" />;
}
