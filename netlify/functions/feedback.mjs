/** Feedback endpoint (/api/feedback). Same delivery options as enquiry.mjs (Resend or webhook).
 *  Reviews are never published automatically: they are emailed/forwarded for the owner to approve. */
const SERVICES = new Set(['real-time-project-training', 'visa-documentation', 'experience-certificate']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async (req) => {
  const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed.' });
  let raw;
  try { raw = await req.json(); } catch { return json(400, { ok: false, error: 'Invalid data.' }); }
  const started = Number(raw.started || 0);
  if (raw._honey || raw.company_website || (started && Date.now() - started < 3000)) return json(200, { ok: true });
  const d = { rating: Number(raw.rating), service: clean(raw.service, 40), name: clean(raw.name, 100),
    email: clean(raw.email, 160).toLowerCase(), review: clean(raw.review, 1500), publish: raw.publish === 'yes', consent: raw.consent === 'yes' };
  if (!(d.rating >= 1 && d.rating <= 5) || !SERVICES.has(d.service) || d.name.length < 2 || !EMAIL.test(d.email) || d.review.length < 20 || !d.consent)
    return json(422, { ok: false, error: 'Some fields need attention.' });

  const env = process.env;
  const subject = `Career Consultancy Feedback (${d.rating}★) — ${d.name}`;
  const text = `Rating: ${d.rating}/5\nService: ${d.service}\nName: ${d.name}\nEmail: ${d.email}\nMay publish: ${d.publish ? 'YES' : 'no'}\n\n${d.review}`;
  try {
    if (env.RESEND_API_KEY && env.ENQUIRY_TO_EMAIL && env.ENQUIRY_FROM_EMAIL) {
      const r = await fetch('https://api.resend.com/emails', { method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.ENQUIRY_FROM_EMAIL, to: env.ENQUIRY_TO_EMAIL.split(','), reply_to: d.email, subject, text,
          html: `<pre style="font:14px/1.5 monospace">${esc(text)}</pre>` }) });
      if (!r.ok) throw new Error('email-failed');
    } else if (env.FEEDBACK_WEBHOOK_URL || env.ENQUIRY_WEBHOOK_URL) {
      const r = await fetch(env.FEEDBACK_WEBHOOK_URL || env.ENQUIRY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'feedback', ...d, subject, received_at: new Date().toISOString() }) });
      if (!r.ok) throw new Error('webhook-failed');
    } else throw new Error('not-configured');
    return json(200, { ok: true });
  } catch (e) {
    console.error('feedback delivery failed:', e.message);
    return json(503, { ok: false, error: 'Feedback is not connected yet.' });
  }
};
