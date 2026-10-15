import PageHero from '../components/PageHero.jsx';
import { ButtonLink } from '../components/ui.jsx';
import { Link } from '../lib/router.jsx';
import { SERVICES, serviceUrl } from '../data/services.js';

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title="This page took a different step." narrow
      lede="The page you're looking for doesn't exist or has moved. Try one of these instead:">
      <ul className="ticks text-left">
        {SERVICES.map((s) => <li key={s.slug}><Link to={serviceUrl(s.slug)} className="underline decoration-brand">{s.name}</Link></li>)}
        <li><Link to="/contact/" className="underline decoration-brand">Contact us</Link></li>
      </ul>
      <div className="mt-6"><ButtonLink to="/" arrow>Back to home</ButtonLink></div>
    </PageHero>
  );
}
