import { useEffect } from 'react';
import { useLocation } from './lib/router.jsx';
import { matchRoute } from './routes.jsx';
import { applyHead } from './lib/head.js';
import Layout from './components/Layout.jsx';

export default function App() {
  const { pathname } = useLocation();
  const route = matchRoute(pathname);
  const { Component } = route;

  useEffect(() => applyHead(route), [route]);

  return (
    <Layout crumbs={route.meta.crumbs}>
      <Component key={route.path} />
    </Layout>
  );
}
