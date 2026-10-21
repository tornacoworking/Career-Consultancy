/* Detail explorer: pick one of the three main services and see every sub-service under it.
   All panels are in the server HTML; inactive ones are only hidden. */
import { useState } from 'react';
import { SectionHead } from '../ui.jsx';
import { SubServiceGrid } from '../ServiceSections.jsx';
import { Link } from '../../lib/router.jsx';
import { SERVICE_BY_SLUG, serviceUrl, subServicesOf } from '../../data/services.js';

const GROUPS = ['visa-services', 'experience-documents', 'online-training'];
const TAB = { 'visa-services': 'Visa', 'experience-documents': 'Experience documents', 'online-training': 'Training' };

export default function SubServiceExplorer() {
  const [slug, setSlug] = useState(GROUPS[0]);
  return (
    <section className="section bg-white" id="explore" aria-labelledby="explore-h">
      <div className="wrap">
        <SectionHead eyebrow="Explore in detail" id="explore-h"
          lede="Every service has more than one kind of help. Choose a service to see what sits under it.">
          Find the <span className="accent">exact help</span> you need.
        </SectionHead>
        <div role="group" aria-label="Choose a service" className="mb-8 flex flex-wrap justify-center gap-2 lg:justify-start">
          {GROUPS.map((g) => (
            <button key={g} type="button" aria-pressed={g === slug} onClick={() => setSlug(g)}
              className={`min-h-11 cursor-pointer rounded-full border-[1.5px] px-5 font-semibold transition-colors ${g === slug ? 'border-ink bg-ink text-white' : 'border-line-strong bg-white hover:border-ink'}`}>
              {TAB[g]}
            </button>
          ))}
        </div>
        {GROUPS.map((g) => (
          <div key={g} hidden={g !== slug}>
            <p className="mb-4 max-w-[44rem] text-muted">{SERVICE_BY_SLUG[g].short} <Link to={serviceUrl(g)} className="underline decoration-brand">Read about {SERVICE_BY_SLUG[g].name.toLowerCase()}</Link>.</p>
            <SubServiceGrid items={subServicesOf(g)} />
          </div>
        ))}
      </div>
    </section>
  );
}
