/*
 * A call-to-action that opens the consultation modal with fields prefilled.
 * It renders a real link to the contact form, so it still works with JavaScript off,
 * with a middle-click, and for search engines.
 */
import { Arrow } from './ui.jsx';
import { useConsult } from '../lib/consult.jsx';
import { enquireUrl } from '../data/services.js';

export default function ConsultLink({ service, sub, city, destination, children, variant = 'primary', small, arrow, className = '', plain }) {
  const { openConsult } = useConsult();
  const href = enquireUrl(service, { sub, city, destination });
  const onClick = (e) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    openConsult({ service, sub, city, destination });
  };
  const cls = plain ? className : `btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`;
  return (
    <a href={href} onClick={onClick} className={cls}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
