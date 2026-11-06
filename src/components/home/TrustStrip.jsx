/* Four plain promises directly under the hero. Every line is something the site really does:
   no invented numbers, ratings or logos. */
import Icon from '../Icon.jsx';
import { Link } from '../../lib/router.jsx';

const ITEMS = [
  { icon: 'file', title: 'Fees in writing first', text: 'You see the scope and price before you pay anything.' },
  { icon: 'check', title: 'Free first chat', text: 'Ask your questions. No sign-up, no payment.' },
  { icon: 'users', title: 'Real people, now online', text: 'We have helped clients face to face. Now you can reach us from anywhere, on WhatsApp, phone or email.' },
  { icon: 'shield', title: 'Honest, always', text: 'Genuine records only. No fake promises of jobs or visas.', to: '/refund-and-cancellation-policy/', link: 'Read our refund policy' },
];

export default function TrustStrip() {
  return (
    <section aria-label="Why people trust us" className="on-dark border-y border-ink bg-ink text-paper">
      <ul className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-x-8 gap-y-6 py-7">
        {ITEMS.map((t) => (
          <li key={t.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3.5">
            <span className="grid size-11 place-items-center rounded-full bg-brand text-ink"><Icon name={t.icon} size={22} /></span>
            <div>
              <h3 className="font-display text-[1.05rem] leading-tight font-bold">{t.title}</h3>
              <p className="mt-1 text-[.9375rem] text-dark-muted">{t.text}</p>
              {t.to && <Link to={t.to} className="mt-1 inline-block text-[.875rem] font-semibold text-brand underline">{t.link}</Link>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
