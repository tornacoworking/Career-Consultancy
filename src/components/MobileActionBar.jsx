/* Two always-reachable buttons on phones and tablets, so a visitor never has to scroll back up to ask or browse. */
import ConsultLink from './ConsultLink.jsx';
import { ButtonLink } from './ui.jsx';

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_24px_-18px_rgba(25,25,25,.5)] lg:hidden">
      <ConsultLink small>Get Consultation</ConsultLink>
      <ButtonLink to="/services/" variant="ghost" small>All Services</ButtonLink>
    </div>
  );
}
