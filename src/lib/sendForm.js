import { SITE } from '../data/site.js';

/**
 * Sends a form. With SITE.form_provider === 'formsubmit' the data is emailed to SITE.form_email
 * through FormSubmit.co; with 'netlify' it posts to the bundled Netlify functions.
 * Resolves only when the service confirms delivery, otherwise throws, so the UI never
 * claims a message was sent when it was not.
 */
export async function sendForm(kind, fields) {
  const started = Number(fields.started || 0);
  // Spam: honeypot filled, or submitted implausibly fast. Pretend success, send nothing.
  if (fields._honey || (started && Date.now() - started < 3000)) return { ok: true, skipped: true };

  const { started: _s, ...data } = fields;
  let url;
  if (SITE.form_provider === 'formsubmit') {
    url = `https://formsubmit.co/ajax/${SITE.form_email}`;
    Object.assign(data, {
      _subject: kind === 'enquiry' ? 'Career Consultancy Enquiry' : 'Career Consultancy Feedback',
      _template: 'table',
      _captcha: 'false',
      _replyto: data.email,
      page: typeof window !== 'undefined' ? window.location.href.split('?')[0] : '',
    });
  } else {
    url = kind === 'enquiry' ? SITE.enquiry_endpoint : SITE.feedback_endpoint;
    data.started = started;
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
      signal: ctrl.signal,
    });
    let body = {};
    try { body = await res.json(); } catch { /* not JSON */ }
    const ok = res.ok && (body.ok === true || body.success === true || body.success === 'true');
    if (!ok) throw new Error(body.message || body.error || 'not-ok');
    return body;
  } finally {
    clearTimeout(timer);
  }
}

/** A readable reason for the visitor, or '' for network/timeouts. */
export function failureReason(err) {
  if (!err || err.name === 'AbortError' || err.name === 'TypeError' || err.message === 'not-ok') return '';
  return `${err.message} `;
}
