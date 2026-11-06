/* Floating "Chat on WhatsApp" button on every page. About 90% of enquiries come from freshers,
   so the pre-filled message is written for a fresher. On phones it sits above the bottom action bar. */
import { SITE } from '../data/site.js';

export const FRESHER_WA_MESSAGE = "Hi Career Consultancy, I'm a fresher. Please tell me how I can get genuine experience and a certificate for my resume, and what the fee is.";

export const waUrl = (message = FRESHER_WA_MESSAGE) => (SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}` : null);

export function WhatsAppIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" />
      <path d="M9 8.5c-.4 1.3.5 3.4 2 4.9s3.6 2.4 4.9 2l.8-1.3-2.2-1.2-.9.7c-.8-.3-2-1.5-2.3-2.3l.7-.9L10.8 8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function WhatsAppFloat() {
  const href = waUrl();
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp"
      className="group fixed right-4 bottom-[4.75rem] z-50 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[#1FA855] px-4 text-[1rem] font-bold text-white no-underline shadow-[0_12px_28px_-10px_rgba(0,0,0,.55)] transition-transform duration-300 hover:scale-105 hover:bg-[#188a45] lg:right-6 lg:bottom-6 lg:px-5">
      <span className="absolute -top-1 -right-1 size-3.5 animate-ping rounded-full bg-[#25D366] motion-reduce:hidden" aria-hidden="true" />
      <WhatsAppIcon />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
