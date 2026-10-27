/* Visa documentation on the home page: the "documentation only" statement and the requirements table. */
import ConsultLink from '../ConsultLink.jsx';
import { VisaClarity, VisaMatrix } from '../Requirements.jsx';
import { Arrow, SectionHead } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { serviceUrl } from '../../data/services.js';

export default function HomeVisa() {
  return (
    <section className="section" id="visa-requirements" aria-labelledby="hv-h">
      <div className="wrap grid gap-[clamp(2rem,4vw,3rem)]">
        <SectionHead eyebrow="Visa documentation" id="hv-h" className="!mb-0"
          lede="Planning to study, work, travel or settle abroad? Here are the documents commonly asked for, by visa purpose, and the part we play in preparing them.">
          Visa documents, <span className="accent">in order.</span>
        </SectionHead>
        <VisaClarity />
        <VisaMatrix />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
          <ConsultLink service="visa-documentation" arrow>Get Consultation</ConsultLink>
          <Link className="text-link" to={serviceUrl('visa-documentation')}>Visa documentation details <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
