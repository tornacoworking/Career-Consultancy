import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { ButtonLink, CopyButton } from '../components/ui.jsx';
import { CheckField, ErrorSummary, Field, Honeypot, StatusMessage, SubmitButton, describe } from '../components/FormBits.jsx';
import { Link, useLocation } from '../lib/router.jsx';
import { failureReason, sendForm } from '../lib/sendForm.js';
import { SITE } from '../data/site.js';
import { SERVICES, SERVICE_BY_SLUG } from '../data/services.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s\-()]{6,18}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e['f-name'] = 'Enter your full name.';
  if (!v.email.trim()) e['f-email'] = 'Enter your email address.';
  else if (!EMAIL.test(v.email.trim())) e['f-email'] = 'Enter an email address in the format name@example.com.';
  if (!v.phone.trim() && v.preferred !== 'email') e['f-phone'] = 'Enter a phone number, or choose email as your contact method.';
  else if (v.phone.trim() && !PHONE.test(v.phone.trim())) e['f-phone'] = 'Enter a valid phone number, including the country code if outside India.';
  if (!v.service) e['f-service'] = 'Choose the service you are interested in.';
  if (v.message.trim().length < 20) e['f-message'] = `Tell us a little more (at least 20 characters, currently ${v.message.trim().length}).`;
  if (!v.consent) e['f-consent'] = 'Tick the box to agree to us using your details to reply.';
  return e;
}

export default function Contact() {
  const { search } = useLocation();
  const [v, setV] = useState({ name: '', email: '', phone: '', service: '', preferred: 'email', message: '', consent: false, _honey: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [sent, setSent] = useState(false);
  const started = useRef(0);
  const summaryRef = useRef(null);
  const successRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    started.current = Date.now();
    let pre = new URLSearchParams(search).get('service');
    try { pre = pre || sessionStorage.getItem('cn-service'); } catch { /* ignore */ }
    if (pre && SERVICE_BY_SLUG[pre]) setV((o) => ({ ...o, service: pre }));
  }, [search]);

  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setV((o) => {
      const next = { ...o, [k]: val };
      if (touched) setErrors(validate(next));
      return next;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setTouched(true);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) { requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    setBusy(true);
    try {
      await sendForm('enquiry', {
        name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim(),
        service: v.service === 'not-sure' ? 'Not sure yet' : SERVICE_BY_SLUG[v.service].name,
        preferred: v.preferred, message: v.message.trim(), consent: 'yes', _honey: v._honey, started: started.current,
      });
      try { sessionStorage.removeItem('cn-service'); } catch { /* ignore */ }
      setSent(true);
    } catch (err) {
      setStatus(`Your enquiry was not sent. ${failureReason(err)}Please try again in a moment${SITE.email ? `, or email us at ${SITE.email}.` : '.'}`);
    } finally {
      setBusy(false);
    }
  };

  const err = (id) => errors[id];

  return (
    <>
      <PageHero eyebrow="Contact" title="Send an enquiry" lede="Tell us what you need. There is no registration and no charge for asking a question." />
      <div id="enquiry" className="wrap grid gap-12 pb-[clamp(4rem,3rem+5vw,8rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
        <div className="min-w-0">
          {sent ? (
            <div ref={successRef} tabIndex={-1} className="grid animate-in justify-items-center gap-4 border-[1.5px] border-ink bg-white p-[clamp(1.5rem,4vw,2.5rem)] text-center lg:justify-items-start lg:text-left">
              <p className="eyebrow">Enquiry received</p>
              <h2 className="text-section">Thank you. Your enquiry has been sent.</h2>
              <p>We&apos;ll reply using your preferred contact method. If you need to add anything, you can send another enquiry or email us.</p>
              <ButtonLink to="/services/" variant="ghost">Browse services</ButtonLink>
            </div>
          ) : (
            <form className="grid gap-[1.4rem]" noValidate onSubmit={onSubmit} aria-describedby="form-privacy">
              {touched && <ErrorSummary errors={errors} refEl={summaryRef} />}
              <Field id="f-name" label="Full name" error={err('f-name')}>
                <input {...describe('f-name', { error: err('f-name') })} name="name" type="text" autoComplete="name" maxLength={100} className="field-input" value={v.name} onChange={set('name')} />
              </Field>
              <div className="grid gap-[1.4rem] sm:grid-cols-2">
                <Field id="f-email" label="Email address" error={err('f-email')}>
                  <input {...describe('f-email', { error: err('f-email') })} name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} className="field-input" value={v.email} onChange={set('email')} />
                </Field>
                <Field id="f-phone" label="Phone number" optional hint="Needed only if you prefer a call." error={err('f-phone')}>
                  <input {...describe('f-phone', { hint: 1, error: err('f-phone') })} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} className="field-input" value={v.phone} onChange={set('phone')} />
                </Field>
              </div>
              <Field id="f-service" label="Service of interest" error={err('f-service')}>
                <select {...describe('f-service', { error: err('f-service') })} name="service" className="field-input" value={v.service} onChange={set('service')}>
                  <option value="">Choose a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  <option value="not-sure">Not sure yet</option>
                </select>
              </Field>
              <fieldset className="grid gap-2">
                <legend className="field-label mb-2">Preferred contact method</legend>
                <div className="flex flex-wrap gap-2">
                  {[['email', 'Email'], ['phone', 'Phone call'], ...(SITE.whatsapp ? [['whatsapp', 'WhatsApp']] : [])].map(([val, label]) => (
                    <label key={val} className="cursor-pointer">
                      <input type="radio" name="preferred" value={val} checked={v.preferred === val} onChange={set('preferred')} className="peer absolute size-px opacity-0" />
                      <span className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-line-strong bg-white px-4 py-2 text-[.9375rem] font-medium transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <Field id="f-message" label="How can we help?" error={err('f-message')}
                hint={<><span>Briefly describe your situation. Please don&apos;t include passport, ID or bank account numbers.</span><span className="tabular-nums">{v.message.length} / 2000</span></>}>
                <textarea {...describe('f-message', { hint: 1, error: err('f-message') })} name="message" rows={6} maxLength={2000} className="field-input min-h-[150px] resize-y" value={v.message} onChange={set('message')} />
              </Field>
              <Honeypot id="f-company" value={v._honey} onChange={set('_honey')} />
              <CheckField id="f-consent" name="consent" checked={v.consent} onChange={set('consent')} error={err('f-consent')}>
                I agree that {SITE.name} may use these details to respond to my enquiry, as described in the <Link to="/privacy-policy/" className="underline decoration-brand">Privacy Policy</Link>.
              </CheckField>
              <p className="hint" id="form-privacy">We only use your details to reply to this enquiry.</p>
              <SubmitButton busy={busy} label="Send enquiry" />
              <StatusMessage text={status} />
            </form>
          )}
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
