import PageHero from '../components/PageHero.jsx';
import { Html } from '../components/ui.jsx';
import { SITE } from '../data/site.js';
import { BUILD_DATE } from '../lib/flags.js';

export default function LegalPage({ page }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={page.name} lede={`Last updated ${BUILD_DATE}`} narrow spotlight={false} />
      <div className="wrap-narrow prose-cn pt-[clamp(1rem,3vw,2rem)] pb-[clamp(4rem,3rem+5vw,8rem)] [&_p]:text-[#3d3b39]">
        {page.sections.map((s) => (
          <section key={s.title} className="!gap-3.5">
            <h2>{s.title}</h2>
            <Html html={s.html.replaceAll('{{email}}', SITE.email)} className="grid gap-3.5" />
          </section>
        ))}
      </div>
    </>
  );
}
