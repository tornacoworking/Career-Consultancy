import CityExplorer from '../CityExplorer.jsx';
import { SectionHead } from '../ui.jsx';
import { PUBLISHED_CITIES } from '../../data/cities.js';

export default function PopularCities() {
  return (
    <section className="section" id="cities" aria-labelledby="cities-h">
      <div className="wrap">
        <SectionHead eyebrow="Cities" id="cities-h"
          lede={`We work online across India. Choose your city for guidance that reflects where you live. There are ${PUBLISHED_CITIES.length} city pages so far, and we add more as we can say something genuinely useful about them.`}>
          Guidance in <span className="accent">your city.</span>
        </SectionHead>
        <CityExplorer />
      </div>
    </section>
  );
}
