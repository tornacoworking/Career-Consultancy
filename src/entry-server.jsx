import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Router } from './lib/router.jsx';
import App from './App.jsx';
import { routes } from './routes.jsx';
import { headTags } from './lib/head.js';
import { SITE } from './data/site.js';

/** Used by scripts/prerender.mjs */
export function render(url) {
  return renderToString(
    <StrictMode>
      <Router url={url}>
        <App />
      </Router>
    </StrictMode>,
  );
}

export { routes, headTags, SITE };
