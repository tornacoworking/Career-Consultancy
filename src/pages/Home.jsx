import Hero from '../components/home/Hero.jsx';
import Audience from '../components/home/Audience.jsx';
import ServiceFinder from '../components/home/ServiceFinder.jsx';
import ServiceExplorer from '../components/home/ServiceExplorer.jsx';
import ServiceCatalogue from '../components/home/ServiceCatalogue.jsx';
import ServiceComparison from '../components/home/ServiceComparison.jsx';
import HomeVisa from '../components/home/HomeVisa.jsx';
import HomeTraining from '../components/home/HomeTraining.jsx';
import Journey from '../components/home/Journey.jsx';
import Transparency from '../components/home/Transparency.jsx';
import Benefits from '../components/home/Benefits.jsx';
import Impact from '../components/home/Impact.jsx';
import Reviews from '../components/home/Reviews.jsx';
import PopularCities from '../components/home/PopularCities.jsx';
import HomeFaq from '../components/home/HomeFaq.jsx';
import DocumentsSection from '../components/DocumentsSection.jsx';
import WhatElse from '../components/WhatElse.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { SHOW_SAMPLE_SECTIONS } from '../lib/flags.js';

/*
 * The sections follow the order a visitor thinks in:
 *   arrive -> who it is for -> pick a path -> the services -> the details of each (experience certificate first)
 *   -> how it works -> what we promise -> why us -> proof -> where we work -> questions -> enquire.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Audience />
      <ServiceFinder />
      <ServiceExplorer />
      <ServiceCatalogue />
      <ServiceComparison />
      <DocumentsSection />
      <HomeVisa />
      <HomeTraining />
      <WhatElse />
      <Journey />
      <Transparency />
      <Benefits />
      {SHOW_SAMPLE_SECTIONS && <Impact />}
      {SHOW_SAMPLE_SECTIONS && <Reviews />}
      <PopularCities />
      <HomeFaq />
      <CtaBand consult={{}} label="Get Free Consultation" />
    </>
  );
}
