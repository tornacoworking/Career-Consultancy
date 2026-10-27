/*
 * Every public URL, with its page component and SEO metadata.
 * The prerender script renders each path to its own HTML file.
 */
import { SITE } from './data/site.js';
import { SERVICES, SERVICE_BY_SLUG, SUBSERVICES, serviceUrl, subServiceUrl } from './data/services.js';
import { PUBLISHED_CITIES, cityUrl } from './data/cities.js';
import { GUIDES, guideUrl } from './data/guides.js';
import { LEGAL_PAGES } from './data/legal.js';
import Home from './pages/Home.jsx';
import ServicesHub from './pages/ServicesHub.jsx';
import ServicePage from './pages/ServicePage.jsx';
import SubServicePage from './pages/SubServicePage.jsx';
import CityPage from './pages/CityPage.jsx';
import CityDirectory from './pages/CityDirectory.jsx';
import About from './pages/About.jsx';
import Faqs from './pages/Faqs.jsx';
import Contact from './pages/Contact.jsx';
import ThankYou from './pages/ThankYou.jsx';
import Feedback from './pages/Feedback.jsx';
import GuidesHub from './pages/GuidesHub.jsx';
import GuidePage from './pages/GuidePage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFound from './pages/NotFound.jsx';

import { BUILD_DATE } from './lib/flags.js';
const ORG_ID = `${SITE.url}/#organization`;

export const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/images/logo.png`,
  description: SITE.description,
  slogan: SITE.tagline,
  ...(SITE.email ? { email: SITE.email } : {}),
  ...(SITE.phone ? { telephone: SITE.phone } : {}),
  ...(SITE.branch ? {
    address: {
      '@type': 'PostalAddress', streetAddress: SITE.branch.street, addressLocality: SITE.branch.locality,
      addressRegion: SITE.branch.region, postalCode: SITE.branch.postalCode, addressCountry: SITE.branch.country,
    },
  } : {}),
  ...(SITE.socials?.length ? { sameAs: SITE.socials.map(([, u]) => u) } : {}),
});

const crumbs = (...items) => [['Home', '/'], ...items];

export const routes = [
  {
    path: '/',
    Component: Home,
    meta: {
      title: 'Experience Certificate, Visa Documents & Training | Career Consultancy',
      description:
        'Online help with genuine experience certificates, visa documentation (we do not issue visas) and real time project training. Scope and fees in writing.',
      jsonld: [
        orgSchema(),
        { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en-IN' },
      ],
    },
  },
  {
    path: '/services/',
    Component: ServicesHub,
    meta: {
      title: 'Our Services | Career Consultancy',
      description: 'Experience certificate assistance, visa documentation support and real time project training from Career Consultancy, with documents tables for each.',
      crumbs: crumbs(['Services', '/services/']),
    },
  },
  ...SERVICES.map((s) => ({
    path: serviceUrl(s.slug),
    Component: () => <ServicePage service={s} />,
    meta: {
      title: s.title,
      description: s.meta,
      crumbs: crumbs(['Services', '/services/'], [s.name, serviceUrl(s.slug)]),
      jsonld: [
        orgSchema(),
        {
          '@context': 'https://schema.org', '@type': 'Service', name: s.h1, serviceType: s.name, description: s.meta,
          url: `${SITE.url}${serviceUrl(s.slug)}`, provider: { '@id': ORG_ID },
          availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${SITE.url}/contact/` },
        },
      ],
    },
  })),
  ...SUBSERVICES.map((x) => {
    const parent = SERVICE_BY_SLUG[x.parent];
    return {
      path: subServiceUrl(x),
      Component: () => <SubServicePage sub={x} />,
      meta: {
        title: x.title,
        description: x.meta,
        crumbs: crumbs(['Services', '/services/'], [parent.name, serviceUrl(parent.slug)], [x.name, subServiceUrl(x)]),
        jsonld: [
          orgSchema(),
          {
            '@context': 'https://schema.org', '@type': 'Service', name: x.h1, serviceType: x.name, description: x.meta,
            url: `${SITE.url}${subServiceUrl(x)}`, provider: { '@id': ORG_ID }, areaServed: { '@type': 'Country', name: 'India' },
            availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${SITE.url}/contact/` },
          },
        ],
      },
    };
  }),
  {
    path: '/cities/',
    Component: CityDirectory,
    meta: {
      title: `Cities We Support Online: ${PUBLISHED_CITIES.length} Indian Cities | Career Consultancy`,
      description: `Experience certificate, visa documentation and project training help for your city. We work online across India, with ${PUBLISHED_CITIES.length} city pages.`,
      crumbs: crumbs(['Cities', '/cities/']),
    },
  },
  ...PUBLISHED_CITIES.map((c) => ({
    path: cityUrl(c.slug),
    Component: () => <CityPage city={c} />,
    meta: {
      title: `Experience Certificate, Visa & Training in ${c.name}`,
      description: `Online genuine experience certificate help, visa documentation support and project training in ${c.name}, ${c.state}. Free consultation.`,
      crumbs: crumbs(['Cities', '/cities/'], [c.name, cityUrl(c.slug)]),
      jsonld: [
        orgSchema(),
        {
          '@context': 'https://schema.org', '@type': 'Service', name: `Career guidance for people in ${c.name}`,
          serviceType: 'Experience certificate guidance, visa documentation support and real time project training',
          url: `${SITE.url}${cityUrl(c.slug)}`, provider: { '@id': ORG_ID },
          areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'AdministrativeArea', name: c.state } },
        },
      ],
    },
  })),
  {
    path: '/guides/',
    Component: GuidesHub,
    meta: {
      title: 'Guides: Experience Letters and Visa Documents | Career Consultancy',
      description: 'Free guides on requesting genuine experience letters and preparing a visa document checklist from official requirements.',
      crumbs: crumbs(['Guides', '/guides/']),
    },
  },
  ...GUIDES.map((g) => ({
    path: guideUrl(g.slug),
    Component: () => <GuidePage guide={g} />,
    meta: {
      title: g.title,
      description: g.meta,
      ogType: 'article',
      crumbs: crumbs(['Guides', '/guides/'], [g.h1, guideUrl(g.slug)]),
      jsonld: [
        orgSchema(),
        {
          '@context': 'https://schema.org', '@type': 'Article', headline: g.h1, description: g.meta,
          datePublished: BUILD_DATE, dateModified: BUILD_DATE, mainEntityOfPage: `${SITE.url}${guideUrl(g.slug)}`,
          author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, image: `${SITE.url}/og-image.png`,
        },
      ],
    },
  })),
  {
    path: '/about/',
    Component: About,
    meta: {
      title: 'About Us | Career Consultancy',
      description: 'Career Consultancy is an online consultancy for experience certificates, visa documentation and project training, with scope and fees agreed in writing.',
      crumbs: crumbs(['About Us', '/about/']),
    },
  },
  {
    path: '/faqs/',
    Component: Faqs,
    meta: {
      title: 'Frequently Asked Questions | Career Consultancy',
      description: "Answers about our experience certificate, visa documentation and project training services: fees, timelines, and what we can and cannot do.",
      crumbs: crumbs(['FAQs', '/faqs/']),
    },
  },
  {
    path: '/contact/',
    Component: Contact,
    meta: {
      title: 'Contact Career Consultancy | Send an Enquiry',
      description: 'Send Career Consultancy an enquiry about experience certificates, visa documentation or real time project training. No registration needed.',
      crumbs: crumbs(['Contact', '/contact/']),
    },
  },
  {
    path: '/contact/thank-you/',
    Component: ThankYou,
    meta: { title: 'Enquiry Received | Career Consultancy', description: 'Your enquiry has been received.', noindex: true },
  },
  {
    path: '/feedback/',
    Component: Feedback,
    meta: {
      title: 'Share Your Feedback | Career Consultancy',
      description: 'Rate Career Consultancy and share a review of our experience certificate, visa documentation or project training services.',
      crumbs: crumbs(['Share Feedback', '/feedback/']),
    },
  },
  ...LEGAL_PAGES.map((p) => ({
    path: p.path,
    Component: () => <LegalPage page={p} />,
    meta: { title: p.title, description: p.description, crumbs: crumbs([p.name, p.path]) },
  })),
  {
    path: '/404.html',
    Component: NotFound,
    meta: { title: 'Page Not Found | Career Consultancy', description: 'The page you requested could not be found.', noindex: true },
  },
];

const byPath = new Map(routes.map((r) => [r.path, r]));
export const NOT_FOUND = byPath.get('/404.html');
export const matchRoute = (pathname) => byPath.get(pathname) ?? NOT_FOUND;

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE.url}${path}` })),
  };
}

