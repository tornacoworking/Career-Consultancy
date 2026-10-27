/* Project training on the home page: every track with the project you build, each linking to its own page. */
import ConsultLink from '../ConsultLink.jsx';
import { DataTable } from '../Requirements.jsx';
import { Arrow, SectionHead } from '../ui.jsx';
import { Link } from '../../lib/router.jsx';
import { serviceUrl, subServiceUrl, subServicesOf } from '../../data/services.js';

export default function HomeTraining() {
  const tracks = subServicesOf('real-time-project-training');
  return (
    <section className="section bg-white" id="project-training" aria-labelledby="ht-h">
      <div className="wrap grid gap-[clamp(2rem,4vw,3rem)]">
        <SectionHead eyebrow="Real time project training" id="ht-h" className="!mb-0"
          lede="Learn by building a working project with a mentor reviewing every milestone. Syllabus, schedule, trainer and fee are shared in writing before you enrol, and no track promises a job.">
          Tracks and <span className="accent">live projects.</span>
        </SectionHead>
        <DataTable caption="Project training tracks and the live project in each"
          head={['Training track', 'Live project', 'Details']}
          rows={tracks.map((x) => [x.name, x.project, <Link key={x.slug} className="text-link" to={subServiceUrl(x)}>View track <Arrow /></Link>])} />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
          <ConsultLink service="real-time-project-training" arrow>Discuss This Training</ConsultLink>
          <Link className="text-link" to={serviceUrl('real-time-project-training')}>Project training details <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
