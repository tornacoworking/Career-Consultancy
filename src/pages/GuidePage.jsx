import { useEffect, useRef } from 'react';
import PageHero from '../components/PageHero.jsx';
import Toc from '../components/Toc.jsx';
import { Arrow, ButtonLink, Html } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { GUIDES, guideUrl } from '../data/guides.js';
import { SERVICE_BY_SLUG, enquireUrl, serviceUrl } from '../data/services.js';
import { SITE } from '../data/site.js';
import { BUILD_DATE } from '../lib/flags.js';

export default function GuidePage({ guide: g }) {
  const ref = useRef(null);
  const s = SERVICE_BY_SLUG[g.service];

  // Copy buttons inside the guide's HTML (request templates)
  useEffect(() => {
    const buttons = [...ref.current.querySelectorAll('[data-copy-tpl]')];
    const handlers = buttons.map((b) => {
      const h = async () => {
        const t = document.getElementById(b.dataset.copyTpl);
        try { await navigator.clipboard.writeText(t.textContent); b.textContent = 'Copied'; }
        catch {
          const r = document.createRange(); r.selectNodeContents(t);
          const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
          b.textContent = 'Selected, press Ctrl+C';
        }
        setTimeout(() => { b.textContent = 'Copy template'; }, 2500);
      };
      b.addEventListener('click', h);
      return h;
    });
    return () => buttons.forEach((b, i) => b.removeEventListener('click', handlers[i]));
  }, [g]);

  const toc = g.sections.map((x, i) => [`g${i}`, x.title]);
  return (
    <>
      <PageHero eyebrow={`Guide · ${g.read}`} title={g.h1} lede={g.summary} narrow>
        <p className="font-mono text-[.8125rem] text-muted">Updated {BUILD_DATE} · By the {SITE.name} team</p>
      </PageHero>
      <div className="wrap grid gap-12 pt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(4rem,3rem+5vw,8rem)] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[clamp(3rem,6vw,6rem)]">
        <article ref={ref} className="prose-cn guide min-w-0">
          {g.sections.map((x, i) => (
            <section key={x.title} id={`g${i}`}>
              <h2>{x.title}</h2>
              <Html html={x.html} className="grid gap-4" />
            </section>
          ))}
          <section className="justify-items-center bg-grey p-[clamp(1.5rem,3vw,2rem)] text-center lg:justify-items-start lg:text-left">
            <h2>Need help with this?</h2>
            <p>Our {s.name.toLowerCase()} service covers this, with the scope and fee agreed in writing first.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <ButtonLink to={enquireUrl(s.slug)} small arrow>Enquire</ButtonLink>
              <Link className="text-link !no-underline" to={serviceUrl(s.slug)}>About {s.name.toLowerCase()} <Arrow /></Link>
            </div>
          </section>
          <section>
            <h2>More guides</h2>
            <ul className="ticks">{GUIDES.filter((x) => x !== g).map((x) => <li key={x.slug}><Link to={guideUrl(x.slug)}>{x.h1}</Link></li>)}</ul>
          </section>
        </article>
        <aside className="hidden lg:block" aria-label="Page tools">
          <div className="sticky top-[100px]"><Toc items={toc} /></div>
        </aside>
      </div>
    </>
  );
}
