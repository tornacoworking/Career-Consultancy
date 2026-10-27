/*
 * The one enquiry form used on the Contact page, city pages, sub-service pages and in the consultation modal.
 * Delivery goes through lib/sendForm.js (email to SITE.form_email). Entered details are kept in component
 * state only: nothing is written to localStorage, sessionStorage or any database.
 */
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from './ui.jsx';
import { CheckField, ErrorSummary, Field, Honeypot, StatusMessage, SubmitButton, describe } from './FormBits.jsx';
import { Link } from '../lib/router.jsx';
import { failureReason, sendForm } from '../lib/sendForm.js';
import { SITE } from '../data/site.js';
import { PUBLISHED_CITIES, CITY_BY_SLUG } from '../data/cities.js';
import { DESTINATIONS } from '../data/visaServices.js';
import { SERVICES, SERVICE_BY_SLUG, SUBSERVICES, subServicesOf } from '../data/services.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const OTHER = 'other';
const NOT_SURE = 'not-sure';

/** Indian mobile (optional +91 / 91 / 0 prefix, then 10 digits starting 6-9), or an international +number. */
export function isValidPhone(raw) {
  const s = raw.replace(/[\s\-().]/g, '');
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(s) || /^\+(?!91)\d{8,15}$/.test(s);
}

/** Wording for the conditional sub-service field, by main service. */
const SUB_LABEL = {
  'visa-documentation': 'Type of visa',
  'experience-certificate': 'Type of documentation help',
  'real-time-project-training': 'Preferred training domain',
};

/** Turns URL parameters or CTA props into the form's starting values, ignoring anything unknown. */
function initialValues(prefill = {}) {
  const service = SERVICE_BY_SLUG[prefill.service] ? prefill.service : prefill.service === NOT_SURE ? NOT_SURE : '';
  const subId = prefill.sub ?? prefill.domain;
  const sub = service && subServicesOf(service).some((x) => x.slug === subId) ? subId : '';
  return {
    name: '', email: '', phone: '',
    city: CITY_BY_SLUG[prefill.city] ? prefill.city : '', otherCity: '',
    service, sub,
    destination: service === 'visa-documentation' && DESTINATIONS.some((d) => d.slug === prefill.destination) ? prefill.destination : '',
    preferred: 'email', message: '', consent: false, _honey: '',
  };
}

export default function ConsultationForm({ prefill, idPrefix = 'f', heading, headingLevel = 'h2', onDone }) {
  const [v, setV] = useState(() => initialValues(prefill));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ text: '', mail: '' });
  const [sent, setSent] = useState(false);
  const started = useRef(0);
  const summaryRef = useRef(null);
  const successRef = useRef(null);
  const p = idPrefix;
  const id = (k) => `${p}-${k}`;
  const Heading = headingLevel;

  useEffect(() => { started.current = Date.now(); }, []);
  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);

  const subs = v.service && v.service !== NOT_SURE ? subServicesOf(v.service) : [];
  const cityName = v.city === OTHER ? v.otherCity.trim() : CITY_BY_SLUG[v.city]?.name ?? '';

  function validate(x) {
    const e = {};
    if (x.name.trim().length < 2) e[id('name')] = 'Enter your full name.';
    if (!x.email.trim()) e[id('email')] = 'Enter your email address.';
    else if (!EMAIL.test(x.email.trim())) e[id('email')] = 'Enter an email address in the format name@example.com.';
    if (!x.phone.trim()) e[id('phone')] = 'Enter your phone number.';
    else if (!isValidPhone(x.phone)) e[id('phone')] = 'Enter a valid 10-digit Indian mobile number (with or without +91), or an international number starting with +.';
    if (!x.city) e[id('city')] = 'Choose your preferred city, or “Other city”.';
    else if (x.city === OTHER && x.otherCity.trim().length < 2) e[id('otherCity')] = 'Enter the name of your city.';
    if (!x.service) e[id('service')] = 'Choose the service you are interested in.';
    if (!x.consent) e[id('consent')] = 'Tick the box to agree to us using your details to reply.';
    return e;
  }

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setV((o) => {
      const next = { ...o, [k]: val };
      // Sub-service and destination only apply to some services, so clear them when the service changes.
      if (k === 'service') { next.sub = ''; next.destination = ''; }
      if (touched) setErrors(validate(next));
      return next;
    });
  };

  const subName = SUBSERVICES.find((x) => x.slug === v.sub && x.parent === v.service)?.name ?? '';
  const payload = () => ({
    name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim(),
    city: cityName,
    service: v.service === NOT_SURE ? 'Not sure yet' : SERVICE_BY_SLUG[v.service].name,
    ...(subName ? { sub_service: subName } : {}),
    ...(v.destination ? { destination_country: DESTINATIONS.find((d) => d.slug === v.destination).name } : {}),
    preferred_contact: v.preferred, message: v.message.trim(), consent: 'yes',
  });

  /** Last-resort link for when automatic delivery fails. It only opens the visitor's own email app. */
  const mailtoFallback = () => {
    const body = Object.entries(payload()).map(([k, val]) => `${k.replace(/_/g, ' ')}: ${val}`).join('\n');
    return `mailto:${SITE.form_email}?subject=${encodeURIComponent('Career Consultancy enquiry')}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return; // prevents duplicate submissions from double clicks
    setStatus({ text: '', mail: '' });
    setTouched(true);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) { requestAnimationFrame(() => summaryRef.current?.focus()); return; }
    setBusy(true);
    try {
      await sendForm('enquiry', { ...payload(), _honey: v._honey, started: started.current });
      setSent(true);
    } catch (err) {
      setStatus({
        text: `Your enquiry was not sent. ${failureReason(err)}Your details are still in the form, so you can try again in a moment.`,
        mail: mailtoFallback(),
      });
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div ref={successRef} tabIndex={-1} className="grid animate-in justify-items-center gap-4 border-[1.5px] border-ink bg-white p-[clamp(1.5rem,4vw,2.5rem)] text-center lg:justify-items-start lg:text-left">
        <p className="eyebrow">Enquiry received</p>
        <Heading className="text-section">Thank you. Your enquiry has been sent.</Heading>
        <p>We&apos;ll reply using your preferred contact method. Scope, requirements, timeline and fee come in writing before anything starts.</p>
        {onDone
          ? <button type="button" className="btn btn-ghost" onClick={onDone}>Close</button>
          : <ButtonLink to="/services/" variant="ghost">Browse services</ButtonLink>}
      </div>
    );
  }

  const err = (k) => errors[id(k)];
  const showDestination = v.service === 'visa-documentation';
  const showSub = subs.length > 0;

  return (
    <form className="grid gap-[1.4rem]" noValidate onSubmit={onSubmit} aria-describedby={id('privacy')} aria-labelledby={heading ? id('h') : undefined}>
      {heading && <Heading id={id('h')} className="text-title text-center lg:text-left">{heading}</Heading>}
      {touched && <ErrorSummary errors={errors} refEl={summaryRef} />}
      <Field id={id('name')} label="Full name" error={err('name')}>
        <input {...describe(id('name'), { error: err('name') })} name="name" type="text" autoComplete="name" maxLength={100} className="field-input" value={v.name} onChange={set('name')} />
      </Field>
      <div className="grid gap-[1.4rem] sm:grid-cols-2">
        <Field id={id('email')} label="Email address" error={err('email')}>
          <input {...describe(id('email'), { error: err('email') })} name="email" type="email" inputMode="email" autoComplete="email" maxLength={160} className="field-input" value={v.email} onChange={set('email')} />
        </Field>
        <Field id={id('phone')} label="Phone number" error={err('phone')}>
          <input {...describe(id('phone'), { error: err('phone') })} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="98765 43210" className="field-input" value={v.phone} onChange={set('phone')} />
        </Field>
      </div>
      <div className="grid gap-[1.4rem] sm:grid-cols-2">
        <Field id={id('city')} label="Preferred city" error={err('city')}>
          <select {...describe(id('city'), { error: err('city') })} name="city" autoComplete="address-level2" className="field-input" value={v.city} onChange={set('city')}>
            <option value="">Choose your city</option>
            {PUBLISHED_CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            <option value={OTHER}>Other city</option>
          </select>
        </Field>
        {v.city === OTHER && (
          <Field id={id('otherCity')} label="Your city" error={err('otherCity')}>
            <input {...describe(id('otherCity'), { error: err('otherCity') })} name="other_city" type="text" maxLength={80} className="field-input" value={v.otherCity} onChange={set('otherCity')} />
          </Field>
        )}
      </div>
      <Field id={id('service')} label="Main service" error={err('service')}>
        <select {...describe(id('service'), { error: err('service') })} name="service" className="field-input" value={v.service} onChange={set('service')}>
          <option value="">Choose a service</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          <option value={NOT_SURE}>Not sure yet</option>
        </select>
      </Field>
      {(showSub || showDestination) && (
        <div className="grid gap-[1.4rem] sm:grid-cols-2">
          {showSub && (
            <Field id={id('sub')} label={SUB_LABEL[v.service] ?? 'Sub-service'} optional>
              <select {...describe(id('sub'))} name="sub_service" className="field-input" value={v.sub} onChange={set('sub')}>
                <option value="">Not sure yet</option>
                {subs.map((s) => <option key={s.slug} value={s.slug}>{v.service === 'real-time-project-training' ? s.domain : s.name}</option>)}
              </select>
            </Field>
          )}
          {showDestination && (
            <Field id={id('destination')} label="Destination country" optional>
              <select {...describe(id('destination'))} name="destination_country" className="field-input" value={v.destination} onChange={set('destination')}>
                <option value="">Not decided yet</option>
                {DESTINATIONS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </Field>
          )}
        </div>
      )}
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
      <Field id={id('message')} label="How can we help?" optional
        hint={<><span>Briefly describe your situation. Please don&apos;t include passport, ID or bank account numbers.</span><span className="tabular-nums">{v.message.length} / 2000</span></>}>
        <textarea {...describe(id('message'), { hint: 1 })} name="message" rows={5} maxLength={2000} className="field-input min-h-[130px] resize-y" value={v.message} onChange={set('message')} />
      </Field>
      <Honeypot id={id('company')} value={v._honey} onChange={set('_honey')} />
      <CheckField id={id('consent')} name="consent" checked={v.consent} onChange={set('consent')} error={err('consent')}>
        I agree that {SITE.name} may use these details to respond to my enquiry, as described in the <Link to="/privacy-policy/" className="underline decoration-brand">Privacy Policy</Link>.
      </CheckField>
      <p className="hint" id={id('privacy')}>We only use your details to reply to this enquiry. Nothing is stored in your browser.</p>
      <SubmitButton busy={busy} label="Send enquiry" />
      <StatusMessage text={status.text} />
      {status.mail && (
        <p className="hint">
          You can also <a className="underline decoration-brand" href={status.mail}>open your email app with these details</a>.
          This is a manual fallback: it does not send anything until you press send in your own email program.
        </p>
      )}
    </form>
  );
}
