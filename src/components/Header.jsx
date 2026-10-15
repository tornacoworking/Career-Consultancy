import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '../lib/router.jsx';
import { LogoImage } from './Photo.jsx';
import { SITE } from '../data/site.js';

export const NAV = [
  ['Home', '/'],
  ['Services', '/services/'],
  ['About Us', '/about/'],
  ['How It Works', '/#how-it-works'],
  ['FAQs', '/faqs/'],
  ['Contact', '/contact/'],
];

export function Brand({ light = false }) {
  return (
    <Link to="/" aria-label={`${SITE.name} home`}
      className="inline-flex shrink-0 items-center no-underline">
      <LogoImage light={light} className={light ? 'h-14 w-auto' : 'h-11 w-auto sm:h-[3.25rem]'} />
    </Link>
  );
}

export default function Header() {
  const { pathname, key } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setOpen(false), [pathname, key]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 8); ticking = false; });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    menuRef.current?.querySelector('a')?.focus();
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    const onClick = (e) => { if (!e.target.closest('header')) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);

  const isCurrent = (href) => href === pathname || (href === '/services/' && pathname.startsWith('/services/'));

  return (
    <header className={`sticky top-[env(safe-area-inset-top,0px)] z-50 border-b bg-white transition-[border-color,box-shadow] duration-200 ${scrolled ? 'border-line shadow-[0_6px_24px_-18px_rgba(25,25,25,.4)]' : 'border-transparent'}`}>
      <div className="wrap flex min-h-[68px] items-center gap-2 sm:gap-4">
        <Brand />
        <nav id="site-menu" ref={menuRef} aria-label="Main"
          className={`${open ? 'block animate-drop' : 'hidden'} absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-line bg-white px-[clamp(1rem,4vw,3rem)] pt-2 pb-6 lg:static lg:mx-auto lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0`}>
          <ul className="grid divide-y divide-line lg:flex lg:gap-[clamp(1.25rem,2.2vw,2.25rem)] lg:divide-y-0">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <Link to={href} aria-current={isCurrent(href) ? 'page' : undefined}
                  className="group relative flex min-h-[52px] items-center font-display text-[1.35rem] font-semibold tracking-[-0.02em] no-underline lg:min-h-11 lg:font-body lg:text-[.9375rem] lg:font-medium lg:tracking-normal">
                  {label}
                  {isCurrent(href) && <span className="ml-2.5 size-2 rounded-full bg-brand lg:hidden" aria-hidden="true" />}
                  <span aria-hidden="true"
                    className={`absolute inset-x-0 bottom-2 hidden h-0.5 bg-brand transition-transform duration-300 ease-brand lg:block ${isCurrent(href) ? 'origin-left scale-x-100' : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'}`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:ml-0">
          <Link to="/contact/#enquiry" className="btn btn-primary btn-sm">
            <span className="max-[400px]:hidden">Get Assistance</span><span className="hidden max-[400px]:inline">Enquire</span>
          </Link>
          <button ref={btnRef} type="button" aria-expanded={open} aria-controls="site-menu" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
            className="grid size-12 cursor-pointer place-items-center rounded-brand text-ink lg:hidden max-[400px]:w-11">
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" className="relative block h-4 w-[22px]">
              <span className={`absolute left-0 top-[3px] h-0.5 w-full bg-current transition-transform duration-300 ease-brand ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[11px] h-0.5 w-full bg-current transition-transform duration-300 ease-brand ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
