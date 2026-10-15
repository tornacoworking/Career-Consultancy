import PageHero from '../components/PageHero.jsx';
import { ButtonLink } from '../components/ui.jsx';

export default function ThankYou() {
  return (
    <PageHero eyebrow="Enquiry received" title="Thank you. Your enquiry has been sent." lede="We'll reply using your preferred contact method." narrow spotlight={false}>
      <div className="mt-4 flex flex-wrap justify-center gap-4 lg:justify-start">
        <ButtonLink to="/services/" arrow>Browse services</ButtonLink>
        <ButtonLink to="/" variant="ghost">Back to home</ButtonLink>
      </div>
    </PageHero>
  );
}
