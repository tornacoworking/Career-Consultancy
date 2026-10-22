/* Consultation form in a native <dialog>: focus is trapped and Escape closes it, without extra libraries. */
import { useEffect, useRef } from 'react';
import ConsultationForm from './ConsultationForm.jsx';
import Icon from './Icon.jsx';

export default function ConsultationModal({ state, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return undefined;
    if (state && !d.open) d.showModal();
    if (!state && d.open) d.close();
    document.documentElement.style.overflow = state ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [state]);

  return (
    <dialog ref={ref} onClose={onClose} aria-label="Free consultation enquiry"
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className="m-auto max-h-[94dvh] w-[min(calc(100%-1rem),42rem)] overflow-y-auto border-[1.5px] border-ink bg-paper p-0 text-ink backdrop:bg-ink/60">
      {state && (
        <div className="p-[clamp(1.25rem,4vw,2.25rem)]">
          <button type="button" onClick={onClose} aria-label="Close consultation form"
            className="float-right -mt-2 -mr-2 grid size-11 cursor-pointer place-items-center rounded-brand hover:bg-grey">
            <Icon name="close" />
          </button>
          <p className="eyebrow mb-3">Free consultation</p>
          <ConsultationForm key={state.key} idPrefix="m" prefill={state.prefill} heading="Tell us what you need" onDone={onClose} />
        </div>
      )}
    </dialog>
  );
}
