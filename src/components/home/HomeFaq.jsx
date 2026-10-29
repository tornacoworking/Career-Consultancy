import { Arrow, Eyebrow, FaqList } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { GENERAL_FAQS } from '../../data/home.js';

export default function HomeFaq() {
  return (
    <section className="section bg-grey" id="faqs" aria-labelledby="faq-h">
      <div className="wrap grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative order-last min-h-[22rem] overflow-hidden rounded-brand lg:order-first lg:min-h-0">
          <img className="photo absolute inset-0 size-full object-cover object-[50%_70%]" src={`${import.meta.env.BASE_URL}images/faq-panel.svg`}
            alt="A young woman resting her chin on her hand, thinking, with question marks floating around her" loading="lazy" decoding="async" />
        </div>
        <div className="min-w-0">
          <div className="grid justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
            <Eyebrow>FAQs</Eyebrow>
            <h2 id="faq-h" className="h-section" data-spotlight>Common questions</h2>
            <p className="lede">Service-specific answers are on each service page and in the <Link to="/faqs/" className="underline decoration-brand">full FAQ</Link>.</p>
          </div>
          <div className="mt-8 border-t border-ink">
            <FaqList items={GENERAL_FAQS} />
          </div>
          <div className="mt-7 text-center lg:text-left"><Link className="text-link" to="/faqs/">See all questions <Arrow /></Link></div>
        </div>
      </div>
    </section>
  );
}
