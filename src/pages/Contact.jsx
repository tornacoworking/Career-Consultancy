import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import ConsultationForm from '../components/ConsultationForm.jsx';
import { CopyButton } from '../components/ui.jsx';
import { useLocation } from '../lib/router.jsx';
import { SITE } from '../data/site.js';

/** Reads ?service=&sub=&city=&destination= so CTAs elsewhere can send people here with fields filled in. */
const prefillFrom = (search) => Object.fromEntries(new URLSearchParams(search));

export default function Contact() {
  const { search } = useLocation();
  const emailRef = useRef(null);
  // Prefill is applied after hydration so the server-rendered form and the first client render match.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <>
      <PageHero eyebrow="Contact" title="Send an enquiry" lede="Tell us what you need. There is no registration and no charge for asking a question." />
      <div id="enquiry" className="wrap grid gap-12 pb-[clamp(4rem,3rem+5vw,8rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
        <div className="min-w-0">
          <ConsultationForm key={ready ? search : 'ssr'} idPrefix="c" prefill={ready ? prefillFrom(search) : {}} />
        </div>
        <aside className="grid content-start gap-5 text-center lg:text-left">
          <h2 className="text-title">Other ways to reach us</h2>
          <dl className="mb-6 grid gap-4">
            {SITE.email && (
              <div>
                <dt className="label-mono text-muted">Email</dt>
                <dd className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-semibold [overflow-wrap:anywhere] lg:justify-start">
                  <span ref={emailRef} className="select-all">{SITE.email}</span>
                  <CopyButton getText={() => SITE.email} targetRef={emailRef} />
                </dd>
              </div>
            )}
            {SITE.phone && <div><dt className="label-mono text-muted">Phone</dt><dd className="mt-1.5 font-semibold">{SITE.phone}</dd></div>}
            {SITE.whatsapp && <div><dt className="label-mono text-muted">WhatsApp</dt><dd className="mt-1.5 font-semibold"><a href={`https://wa.me/${SITE.whatsapp}`} rel="noopener" target="_blank">Message us on WhatsApp</a></dd></div>}
            {SITE.hours && <div><dt className="label-mono text-muted">Hours</dt><dd className="mt-1.5 font-semibold">{SITE.hours}</dd></div>}
            {SITE.address && <div><dt className="label-mono text-muted">Address</dt><dd className="mt-1.5 font-semibold">{SITE.address}</dd></div>}
          </dl>
          <h2 className="text-title">What happens next</h2>
          <ol className="steps text-left">
            <li><h3>We read your enquiry</h3><p>And ask any questions we need to understand your situation.</p></li>
            <li><h3>You get it in writing</h3><p>Scope, requirements, timeline and fee for the service.</p></li>
            <li><h3>You decide</h3><p>Nothing starts until you agree. No obligation.</p></li>
          </ol>
        </aside>
      </div>
    </>
  );
}
