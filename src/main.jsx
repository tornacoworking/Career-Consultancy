import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Router } from './lib/router.jsx';
import App from './App.jsx';
import './index.css';

const preview = import.meta.env.VITE_PREVIEW === 'true';
const app = (
  <StrictMode>
    <Router memory={preview}>
      <App />
    </Router>
  </StrictMode>
);

const root = document.getElementById('root');
// Pre-rendered pages are hydrated; the dev server and the preview build render from scratch.
if (root.hasChildNodes() && !preview) hydrateRoot(root, app);
else createRoot(root).render(app);
