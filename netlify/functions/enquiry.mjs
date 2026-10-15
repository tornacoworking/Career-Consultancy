/**
 * Career Consultancy enquiry endpoint (Netlify Functions v2). Mapped to /api/enquiry in netlify.toml.
 *
 * Validates on the server, filters spam, then delivers the enquiry by:
 *   1. Resend email API      — set RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *   2. or a webhook / CRM    — set ENQUIRY_WEBHOOK_URL (Zapier, Make, Slack, HubSpot form, etc.)
 * If neither is configured it returns 503, so the site never claims an enquiry was sent when it wasn't.
 *
 * Accepts JSON (from the JS form) and urlencoded posts (no-JS fallback, answered with a 303 redirect).
 */
const SERVICES = new Set(['experience-documents', 'visa-services', 'online-certifications', 'online-training', 'not-sure']);
const PREFERRED = new Set(['email', 'phone', 'whatsapp']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9][0-9\s\-()]{6,18}$/;
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function validate(raw) {
  const d = {
    name: clean(raw.name, 100), email: clean(raw.email, 160).toLowerCase(), phone: clean(raw.phone, 20),
    service: clean(raw.service, 40), preferred: clean(raw.preferred, 20) || 'email',
    message: clean(raw.message, 2000), consent: raw.consent === 'yes' || raw.consent === true,
  };
  const errors = [];
  if (d.name.length < 2) errors.push('name');
  if (!EMAIL.test(d.email)) errors.push('email');
  if (!SERVICES.has(d.service)) errors.push('service');
  if (!PREFERRED.has(d.preferred)) errors.push('preferred');
  if (d.phone && !PHONE.test(d.phone)) errors.push('phone');
  if (d.preferred !== 'email' && !d.phone) errors.push('phone');
  if (d.message.length < 20) errors.push('message');
  if (!d.consent) errors.push('consent');
  return { d, errors };
}

async function deliver(d) {
  const env = process.env;
  const subject = `Career Consultancy Enquiry — ${d.name}`;
  const text = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || '-'}\nService: ${d.service}\n` +
    `Preferred contact: ${d.preferred}\nConsent: yes\nReceived: ${new Date().toISOString()}\n\n${d.message}`;
  if (env.RESEND_API_KEY && env.ENQUIRY_TO_EMAIL && env.ENQUIRY_FROM_EMAIL) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.ENQUIRY_FROM_EMAIL, to: env.ENQUIRY_TO_EMAIL.split(','), reply_to: d.email,
        subject, text, html: `<pre style="font:14px/1.5 monospace">${esc(text)}</pre>` }),
    });
    if (!r.ok) throw new Error('email-failed');
    return;
  }
  if (env.ENQUIRY_WEBHOOK_URL) {
    const r = await fetch(env.ENQUIRY_WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...d, consent: true, subject, received_at: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error('webhook-failed');
    return;
  }
  throw new Error('not-configured');
}

export default async (req) => {
  const isJson = (req.headers.get('content-type') || '').includes('application/json');
  const reply = (status, body, redirect) => {
    if (!isJson && redirect) return new Response(null, { status: 303, headers: { Location: redirect } });
    return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  };
  if (req.method !== 'POST') return reply(405, { ok: false, error: 'Method not allowed.' });

  let raw = {};
  try {
    raw = isJson ? await req.json() : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch { return reply(400, { ok: false, error: 'The form data could not be read.' }, '/contact/?status=error#enquiry'); }

  // Spam filters: honeypot field filled, or submitted implausibly fast. Answer as if accepted.
  const started = Number(raw.started || 0);
  if (raw._honey || raw.company_website || (started && Date.now() - started < 3000)) return reply(200, { ok: true }, '/contact/thank-you/');

  const { d, errors } = validate(raw);
  if (errors.length) return reply(422, { ok: false, error: 'Some fields need attention.', fields: errors }, '/contact/?status=invalid#enquiry');

  try {
    await deliver(d);
    return reply(200, { ok: true }, '/contact/thank-you/');
  } catch (e) {
    console.error('enquiry delivery failed:', e.message);
    const msg = e.message === 'not-configured' ? 'Online enquiries are not connected yet.' : 'The message service is unavailable.';
    return reply(503, { ok: false, error: msg }, '/contact/?status=error#enquiry');
  }
};
