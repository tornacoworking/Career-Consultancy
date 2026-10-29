import { useEffect, useRef, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { ButtonLink } from '../components/ui.jsx';
import { Picture } from '../components/Photo.jsx';
import { CheckField, ErrorSummary, Field, Honeypot, StatusMessage, SubmitButton, describe } from '../components/FormBits.jsx';
import { Link, useLocation } from '../lib/router.jsx';
import { failureReason, sendForm } from '../lib/sendForm.js';
import { SITE } from '../data/site.js';
import { SERVICES, SERVICE_BY_SLUG } from '../data/services.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WORDS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very good', 5: 'Excellent' };

function validate(v) {
  const e = {};
  if (!v.rating) e.r5 = 'Choose a star rating.';
  if (!v.service) e['fb-service'] = 'Choose the service you used.';
  if (v.name.trim().length < 2) e['fb-name'] = 'Enter your name.';
  if (!EMAIL.test(v.email.trim())) e['fb-email'] = 'Enter an email address in the format name@example.com.';
  if (v.review.trim().length < 20) e['fb-review'] = 'Write at least 20 characters about your experience.';
  if (!v.consent) e['fb-consent'] = 'Tick the box to agree to us storing your feedback.';
  return e;
}

export default function Feedback() {
  const [v, setV] = useState({ rating: 0, service: '', name: '', email: '', review: '', publish: false, consent: false, _honey: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [sent, setSent] = useState(false);
  const started = useRef(0);
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  const { search } = useLocation();
  useEffect(() => {
    started.current = Date.now();
    const r = Number(new URLSearchParams(search).get('rating'));
    if (Number.isInteger(r) && r >= 1 && r <= 5) setV((o) => ({ ...o, rating: r }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (sent) successRef.current?.focus(); }, [sent]);

  const set = (k, cast = (x) => x) => (e) => {
    const val = cast(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
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
      await sendForm('feedback', {
        rating: `${v.rating} / 5`, service: SERVICE_BY_SLUG[v.service].name, name: v.name.trim(), email: v.email.trim(),
        review: v.review.trim(), may_publish: v.publish ? 'yes' : 'no', consent: 'yes', _honey: v._honey, started: started.current,
      });
      setSent(true);
    } catch (err) {
      setStatus(`Your feedback was not sent. ${failureReason(err)}Please try again in a moment.`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero eyebrow="Feedback" title="Share your feedback"
        lede="Used one of our services? Tell us how it went. Your feedback helps us improve, and with your permission it helps others decide." />
      <div className="wrap grid gap-12 pb-[clamp(1.875rem,1.375rem+3vw,3.875rem)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-[clamp(3rem,6vw,6rem)]">
        <div className="min-w-0">
          {sent ? (
            <div ref={successRef} tabIndex={-1} className="grid animate-in justify-items-center gap-4 border-[1.5px] border-ink bg-white p-[clamp(1.5rem,4vw,2.5rem)] text-center lg:justify-items-start lg:text-left">
              <p className="eyebrow">Feedback received</p>
              <h2 className="text-section">Thank you for your feedback.</h2>
              <p>We read every review. If you agreed to publication, we may show it on our website after a short check.</p>
              <ButtonLink to="/" variant="ghost">Back to home</ButtonLink>
            </div>
          ) : (
            <form className="grid gap-[1.4rem]" noValidate onSubmit={onSubmit}>
              {touched && <ErrorSummary errors={errors} refEl={summaryRef} verb="send your feedback" />}
              <fieldset className="grid gap-2">
                <legend className="field-label mb-2">Your rating</legend>
                <div className="star-input">
                  {[5, 4, 3, 2, 1].map((n) => (
                    <span key={n} className="contents">
                      <input type="radio" id={`r${n}`} name="rating" value={n} checked={v.rating === n} onChange={set('rating', Number)} />
                      <label htmlFor={`r${n}`} title={`${n} star${n > 1 ? 's' : ''}`}>
                        <span className="sr-only">{n} star{n > 1 ? 's' : ''}</span><span aria-hidden="true">★</span>
                      </label>
                    </span>
                  ))}
                </div>
                <p className="hint" aria-live="polite">{v.rating ? `${v.rating} out of 5: ${WORDS[v.rating]}` : 'Choose 1 to 5 stars.'}</p>
                {errors.r5 && <p className="err">{errors.r5}</p>}
              </fieldset>
              <Field id="fb-service" label="Service you used" error={errors['fb-service']}>
                <select {...describe('fb-service', { error: errors['fb-service'] })} className="field-input" value={v.service} onChange={set('service')}>
                  <option value="">Choose a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </Field>
              <div className="grid gap-[1.4rem] sm:grid-cols-2">
                <Field id="fb-name" label="Your name" error={errors['fb-name']}>
                  <input {...describe('fb-name', { error: errors['fb-name'] })} type="text" autoComplete="name" maxLength={100} className="field-input" value={v.name} onChange={set('name')} />
                </Field>
                <Field id="fb-email" label="Email address" hint="Never published. Used only if we need to follow up." error={errors['fb-email']}>
                  <input {...describe('fb-email', { hint: 1, error: errors['fb-email'] })} type="email" autoComplete="email" maxLength={160} className="field-input" value={v.email} onChange={set('email')} />
                </Field>
              </div>
              <Field id="fb-review" label="Your review" hint="What did we help with, and how did it go?" error={errors['fb-review']}>
                <textarea {...describe('fb-review', { hint: 1, error: errors['fb-review'] })} rows={5} maxLength={1500} className="field-input min-h-[150px] resize-y" value={v.review} onChange={set('review')} />
              </Field>
              <Honeypot id="fb-company" value={v._honey} onChange={set('_honey')} />
              <CheckField id="fb-publish" name="publish" checked={v.publish} onChange={set('publish')}>
                You may publish my review on this website with my first name and last initial.
              </CheckField>
              <CheckField id="fb-consent" name="consent" checked={v.consent} onChange={set('consent')} error={errors['fb-consent']}>
                I agree that {SITE.name} may store this feedback as described in the <Link to="/privacy-policy/" className="underline decoration-brand">Privacy Policy</Link>.
              </CheckField>
              <SubmitButton busy={busy} label="Send feedback" />
              <StatusMessage text={status} />
            </form>
          )}
        </div>
        <aside className="grid content-start gap-5 text-center lg:text-left">
          <h2 className="text-title">How we handle reviews</h2>
          <ul className="ticks mx-auto mb-6 text-left lg:mx-0">
            <li>We publish reviews only with your permission.</li>
            <li>We show your first name and last initial, never your email.</li>
            <li>We don&apos;t edit what you say, apart from removing personal details.</li>
            <li>We publish critical reviews too, and reply to them.</li>
          </ul>
          <h2 className="text-title">Need help instead?</h2>
          <p>If something went wrong and you need it fixed, <Link to="/contact/#enquiry" className="underline decoration-brand">contact us directly</Link> so we can respond quickly.</p>
          <Picture name="training-enquiry.jpg" width={800} height={600} alt="A learner smiling as she writes notes beside her laptop"
            className="mt-2 h-auto w-full rounded-brand object-cover" />
          <p className="text-left text-[.9375rem] text-muted">A few honest lines are plenty. Say what you needed, what we did and what could have been better.</p>
        </aside>
      </div>
    </>
  );
}