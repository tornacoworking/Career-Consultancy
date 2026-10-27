import Announcement from './Announcement.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SpotlightCursor from './SpotlightCursor.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import MobileActionBar from './MobileActionBar.jsx';
import { ConsultProvider } from '../lib/consult.jsx';

export default function Layout({ crumbs, children }) {
  return (
    <ConsultProvider>
      <a href="#main" className="absolute -top-52 left-4 z-[100] rounded-brand bg-ink px-4 py-3 text-white focus:top-4">Skip to content</a>
      <Announcement />
      <Header />
      <main id="main" tabIndex={-1}>
        {crumbs && <Breadcrumbs items={crumbs} />}
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <SpotlightCursor />
    </ConsultProvider>
  );
}
