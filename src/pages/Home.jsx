import Hero from '../components/home/Hero.jsx';
import TrustStrip from '../components/home/TrustStrip.jsx';
import ServiceFinder from '../components/home/ServiceFinder.jsx';
import DocumentsGuide from '../components/home/DocumentsGuide.jsx';
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
import { STATS, TESTIMONIALS } from '../data/site.js';

/*
 * Order, written for a first-time visitor (about 90% are freshers):
 *   hero -> trust -> "what brings you here" -> experience certificate documents -> those documents in plain words
 *   -> how it works -> every service -> compare -> visa / training detail -> verification -> promises -> proof
 *   -> cities -> questions -> enquire.
 * (Audience and ServiceExplorer were removed from the page: they repeated "what brings you here" and the catalogue.)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceFinder />
      <DocumentsSection />
      <DocumentsGuide />
      <Journey />
      <ServiceCatalogue />
      <ServiceComparison />
      <HomeVisa />
      <HomeTraining />
      <WhatElse />
      <Transparency />
      <Benefits />
      {STATS.length > 0 && <Impact />}
      {TESTIMONIALS.length > 0 && <Reviews />}
      <PopularCities />
      <HomeFaq />
      <CtaBand consult={{}} label="Get Free Consultation" />
    </>
  );
}
