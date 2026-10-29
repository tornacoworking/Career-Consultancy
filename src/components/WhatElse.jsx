/*
 * "What else do we have for you?": the four ways work history is commonly verified, how we help you prepare
 * honestly for each, and links to our other services. Used on the home page, every city page and the
 * experience certificate pages.
 */
import Icon from './Icon.jsx';
import ConsultLink from './ConsultLink.jsx';
import { Arrow, SectionHead } from './ui.jsx';
import { Link } from '../lib/router.jsx';
import { serviceUrl } from '../data/services.js';
import { VERIFICATION, VERIFICATION_PROMISE } from '../data/requirements.js';

export default function WhatElse({ id = 'verification', city, place }) {
  return (
    <section className="section on-dark bg-ink text-paper" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <SectionHead eyebrow="Verification support" id={`${id}-h`}
          lede="Worried about fake providers or failed checks? We work only with genuine records from your real employers, so your file stands up when it is checked.">
          What <span className="accent-d">else do we have</span> for you?
        </SectionHead>
        <h3 className="mb-6 text-center text-title lg:text-left">Don&apos;t worry about verifications{place ? ` in ${place}` : ''}. We help you prepare for:</h3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] gap-4">
          {VERIFICATION.map((v) => (
            <li key={v.title} className="grid content-start gap-3 border border-dark-line p-6">
              <span className="grid size-11 place-items-center rounded-full bg-brand text-ink"><Icon name={v.icon} size={22} /></span>
              <h3 className="text-xl leading-tight">{v.title}</h3>
              <p className="text-[.9375rem] text-dark-muted">{v.text}</p>
              <p className="border-t border-dark-line pt-3 text-[.9375rem]"><span className="label-mono mb-1 block text-brand">How we help</span>{v.help}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 rounded-brand bg-paper p-4 text-center font-medium text-ink">{VERIFICATION_PROMISE}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
          <ConsultLink service="experience-certificate" city={city} arrow>Get Consultation</ConsultLink>
          <Link className="text-link !text-paper hover:!text-brand" to="/guides/how-to-request-an-experience-letter/">Read the experience letter guide <Arrow /></Link>
        </div>
        <p className="mt-8 border-t border-dark-line pt-5 text-[.9375rem] text-dark-muted">
          Also from Career Consultancy:{' '}
          <Link className="font-semibold text-paper underline decoration-brand" to={serviceUrl('visa-documentation')}>visa documentation support</Link>{' '}
          (documentation only, we do not issue visas) and{' '}
          <Link className="font-semibold text-paper underline decoration-brand" to={serviceUrl('real-time-project-training')}>real time project training</Link>.
        </p>
      </div>
    </section>
  );
}
