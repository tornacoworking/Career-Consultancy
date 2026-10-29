import { useMemo, useState } from 'react';
import CtaBand from '../components/CtaBand.jsx';
import { Eyebrow, FaqList } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { GENERAL_FAQS } from '../data/home.js';
import { SERVICES } from '../data/services.js';

const GROUPS = [{ id: 'general', name: 'General questions', items: GENERAL_FAQS }, ...SERVICES.map((s) => ({ id: s.slug, name: s.name, items: s.faqs }))];
const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function Faqs() {
  const [q, setQ] = useState('');
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const groups = useMemo(() => GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((f) => words.every((w) => `${f.q} ${f.a}`.toLowerCase().includes(w))),
  })).filter((g) => g.items.length), [q]); // eslint-disable-line react-hooks/exhaustive-deps
  const matches = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <section className="pt-[clamp(2rem,5vw,4rem)] pb-[clamp(1.375rem,3.5vw,2.875rem)]">
        <div className="wrap grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="grid justify-items-center gap-[1.1rem] text-center lg:justify-items-start lg:text-left">
              <Eyebrow>FAQs</Eyebrow>
              <h1 className="page-h my-1" data-spotlight>Frequently asked questions</h1>
              <p className="lede">Answers about our three services, requirements, fees, timelines and how to contact us.</p>
            </div>
            <div className="sticky top-[calc(68px+env(safe-area-inset-top,0px))] z-10 mt-6 mb-4 grid gap-2 bg-paper py-4">
              <label htmlFor="faq-q" className="label-mono">Search questions</label>
              <input id="faq-q" type="search" className="field-input" placeholder="Try “fees”, “visa” or “experience certificate”" autoComplete="off"
                value={q} onChange={(e) => setQ(e.target.value)} />
              <p className="text-[.8125rem] text-muted" aria-live="polite">{q ? `${matches} of ${TOTAL} questions match` : `${TOTAL} questions`}</p>
            </div>
            {groups.map((g) => (
              <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`fg-${g.id}`} className="grid gap-4 pt-6 pb-8">
                <h2 id={`fg-${g.id}`} className="text-title">{g.name}</h2>
                <div className="border-t border-ink"><FaqList key={q} items={g.items} openFirst={q.length > 2} /></div>
              </section>
            ))}
            {matches === 0 && (
              <p className="py-8">No questions match that search. <Link to="/contact/#enquiry" className="underline decoration-brand">Ask us directly</Link> and we&apos;ll answer.</p>
            )}
          </div>
          <aside aria-hidden="true" className="hidden lg:block">
            <div className="sticky top-[100px] h-[calc(100vh-130px)] min-h-[28rem] overflow-hidden rounded-brand">
              <img className="size-full object-cover object-bottom" src={`${import.meta.env.BASE_URL}images/faq-panel.svg`} width="600" height="900" alt="" decoding="async" />
            </div>
          </aside>
        </div>
      </section>
      <CtaBand heading="Still have a question?" text="Send it to us and we'll reply using your preferred contact method." label="Ask a question" />
    </>
  );
}
