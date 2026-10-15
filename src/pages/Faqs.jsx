import { useMemo, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { FaqList } from '../components/ui.jsx';
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
      <PageHero eyebrow="FAQs" title="Frequently asked questions"
        lede="Answers about our four services, requirements, fees, timelines and how to contact us." />
      <div className="wrap-narrow">
        <div className="sticky top-[calc(68px+env(safe-area-inset-top,0px))] z-10 mb-4 grid gap-2 bg-paper py-4">
          <label htmlFor="faq-q" className="label-mono">Search questions</label>
          <input id="faq-q" type="search" className="field-input" placeholder="Try “fees”, “visa” or “certificate”" autoComplete="off"
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
      <CtaBand heading="Still have a question?" text="Send it to us and we'll reply using your preferred contact method." label="Ask a question" />
    </>
  );
}
