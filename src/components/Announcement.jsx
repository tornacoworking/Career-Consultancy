import ConsultLink from './ConsultLink.jsx';

/** Thin strip above the header. Plain text first; the link opens the consultation form. */
export default function Announcement() {
  return (
    <div className="on-dark bg-ink px-4 py-2 text-center text-[.8125rem] text-paper sm:text-[.875rem]">
      Free consultation for experience certificate, visa documentation and project training enquiries, online across India.{' '}
      <ConsultLink plain className="font-semibold text-brand underline">Ask a question</ConsultLink>
    </div>
  );
}
