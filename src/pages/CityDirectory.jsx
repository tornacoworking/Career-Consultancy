import PageHero from '../components/PageHero.jsx';
import CityExplorer from '../components/CityExplorer.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { PUBLISHED_CITIES } from '../data/cities.js';

export default function CityDirectory() {
  return (
    <>
      <PageHero eyebrow="Cities" title="Guidance in your city"
        lede={`Career Consultancy is online, so you can use any service from anywhere in India. These ${PUBLISHED_CITIES.length} city pages describe how our visa, experience document and training guidance applies where you live.`} />
      <section className="pb-[clamp(4rem,3rem+5vw,8rem)]">
        <div className="wrap">
          <CityExplorer />
          <p className="mt-10 max-w-[44rem] text-[.9375rem] text-muted">
            Don&apos;t see your city? You can still enquire: choose &ldquo;Other city&rdquo; in the form. We add a city page only once we can say something specific and useful about it.
          </p>
        </div>
      </section>
      <CtaBand consult={{}} label="Get Free Consultation" />
    </>
  );
}
