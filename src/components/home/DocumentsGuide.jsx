/* "Documents, explained simply": goes right after the experience certificate documents table.
   Written for someone who has never needed these papers. Left: people who have worked. Right: freshers. */
import ConsultLink from '../ConsultLink.jsx';
import { SectionHead } from '../ui.jsx';
import { DOC_GLOSSARY, FRESHER_READY } from '../../data/home.js';

export default function DocumentsGuide() {
  return (
    <section className="section" id="documents-simple" aria-labelledby="dg-h">
      <div className="wrap">
        <SectionHead eyebrow="In simple words" id="dg-h"
          lede="New to all this? No problem. Here is what each document means, and what you should keep ready.">
          Documents, <span className="accent">explained simply.</span>
        </SectionHead>

        <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h3 className="text-title">If you have worked before</h3>
            <p className="mt-1 mb-4 text-muted">These papers come from your old company. We help you ask for them, check them and keep them in order.</p>
            <dl className="border-t border-ink">
              {DOC_GLOSSARY.map((d) => (
                <div key={d.name} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-x-6">
                  <dt className="font-display text-[1.05rem] leading-snug font-bold">{d.name}</dt>
                  <dd>
                    <p>{d.plain}</p>
                    <p className="mt-1 text-[.9375rem] text-muted"><span className="font-semibold text-brand-ink">Why it matters: </span>{d.need}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="grid content-start gap-4 border-[1.5px] border-ink border-t-[6px] border-t-brand bg-white p-[clamp(1.25rem,3vw,1.75rem)]" aria-labelledby="dg-fresher-h">
            <p className="label-mono text-brand-ink">For freshers</p>
            <h3 id="dg-fresher-h" className="text-title">No job yet? You are not behind.</h3>
            <p>You do not need old company papers. A fresher only needs to keep these ready:</p>
            <ul className="ticks">{FRESHER_READY.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="border-l-[3px] border-brand pl-3 text-[.9375rem] text-muted">
              Any certificate we mention is for work you really complete, and it says exactly what you did. We never write a certificate for a job you did not do.
            </p>
            <div className="pt-1"><ConsultLink service="real-time-project-training" arrow>Ask how it works for freshers</ConsultLink></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
