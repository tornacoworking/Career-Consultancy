import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import ConsultationForm from '../components/ConsultationForm.jsx';
import BranchCard from '../components/BranchCard.jsx';
import { useLocation } from '../lib/router.jsx';

/** Reads ?service=&sub=&city=&destination= so CTAs elsewhere can send people here with fields filled in. */
const prefillFrom = (search) => Object.fromEntries(new URLSearchParams(search));

export default function Contact() {
  const { search } = useLocation();
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
        <aside className="grid content-start gap-8">
          <BranchCard heading="Contact us directly" />
          <div className="grid gap-3">
            <h2 className="text-title">What happens next</h2>
            <ol className="steps">
              <li><h3>We read your enquiry</h3><p>And ask any questions we need to understand your situation.</p></li>
              <li><h3>You get it in writing</h3><p>Scope, requirements, timeline and fee for the service.</p></li>
              <li><h3>You decide</h3><p>Nothing starts until you agree. No obligation.</p></li>
            </ol>
            <p className="text-[.9375rem] text-muted">Prefer to talk first? Choose <strong className="text-ink">Phone call</strong> as your contact method in the form and tell us a time that suits you.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
