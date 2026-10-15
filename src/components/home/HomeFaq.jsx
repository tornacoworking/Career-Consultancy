import { Arrow, Eyebrow, FaqList } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { GENERAL_FAQS } from '../../data/home.js';

export default function HomeFaq() {
  return (
    <section className="section bg-grey" id="faqs" aria-labelledby="faq-h">
      <div className="wrap grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid content-start justify-items-center gap-[1.1rem] text-center lg:sticky lg:top-[110px] lg:justify-items-start lg:text-left">
          <Eyebrow>FAQs</Eyebrow>
          <h2 id="faq-h" className="h-section" data-spotlight>Common questions</h2>
          <p className="lede">Service-specific answers are on each service page and in the <Link to="/faqs/" className="underline decoration-brand">full FAQ</Link>.</p>
        </div>
        <div className="min-w-0 border-t border-ink">
          <FaqList items={GENERAL_FAQS.slice(0, 5)} />
          <div className="mt-7 text-center lg:text-left"><Link className="text-link" to="/faqs/">See all questions <Arrow /></Link></div>
        </div>
      </div>
    </section>
  );
}
