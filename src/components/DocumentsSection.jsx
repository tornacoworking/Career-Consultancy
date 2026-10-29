/* "Documents we help you with" + "What we need from you", for the home page and every city page. */
import ConsultLink from './ConsultLink.jsx';
import { ExperienceDocsTable, ExperienceNeedsTable } from './Requirements.jsx';
import { Arrow, SectionHead } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { serviceUrl } from '../data/services.js';

export default function DocumentsSection({ id = 'doc-table', city, place }) {
  return (
    <section className="section bg-white" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap grid gap-[clamp(2.5rem,5vw,4rem)]">
        <SectionHead eyebrow="Experience certificate" id={`${id}-h`} className="!mb-0"
          lede={`Your experience certificate and the records around it all come from the employers who issued them. This is what we help you obtain, check and organise${place ? ` for people in ${place}` : ''}.`}>
          Documents we <span className="accent">help you with.</span>
        </SectionHead>
        <div className="grid gap-3">
          <h3 className="text-title">Documents we help you obtain and organise</h3>
          <ExperienceDocsTable />
        </div>
        <div className="grid gap-3">
          <h3 className="text-title">What we need from you</h3>
          <ExperienceNeedsTable />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
          <ConsultLink service="experience-certificate" city={city} arrow>Get Consultation</ConsultLink>
          <Link className="text-link" to={serviceUrl('experience-certificate')}>All about experience certificate help <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
