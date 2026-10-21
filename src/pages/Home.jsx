import Hero from '../components/home/Hero.jsx';
import Impact from '../components/home/Impact.jsx';
import ServiceExplorer from '../components/home/ServiceExplorer.jsx';
import SubServiceExplorer from '../components/home/SubServiceExplorer.jsx';
import PopularCities from '../components/home/PopularCities.jsx';
import ServiceComparison from '../components/home/ServiceComparison.jsx';
import Benefits from '../components/home/Benefits.jsx';
import Audience from '../components/home/Audience.jsx';
import Journey from '../components/home/Journey.jsx';
import ServiceFinder from '../components/home/ServiceFinder.jsx';
import Transparency from '../components/home/Transparency.jsx';
import Reviews from '../components/home/Reviews.jsx';
import HomeFaq from '../components/home/HomeFaq.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { SHOW_SAMPLE_SECTIONS } from '../lib/flags.js';

export default function Home() {
  return (
    <>
      <Hero />
      {SHOW_SAMPLE_SECTIONS && <Impact />}
      <ServiceExplorer />
      <SubServiceExplorer />
      <PopularCities />
      <Benefits />
      <Audience />
      <Journey />
      <ServiceFinder />
      <ServiceComparison />
      <Transparency />
      {SHOW_SAMPLE_SECTIONS && <Reviews />}
      <HomeFaq />
      <CtaBand consult={{}} label="Get Free Consultation" />
    </>
  );
}
