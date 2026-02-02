import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registerApplication, start } from 'single-spa';
import { mountVercelToolbar } from '@vercel/toolbar/vite';
import { ROUTES } from 'contracts';
import './globals.css';

function Layout(): React.JSX.Element {
  return (
    <>
      <div id="single-spa-application:header" />
      <div id="single-spa-application:content" />
      <div id="single-spa-application:footer" />
    </>
  );
}

const routerConfig = [
  ...ROUTES.map((route) => ({
    path: route.path,
    element: <Layout />,
  })),
  { path: '*', element: <Layout /> },
];

const router = createBrowserRouter(routerConfig);

router.subscribe(() => {
  const { pathname, search, hash } = router.state.location;
  window.dispatchEvent(
    new CustomEvent('host-location-change', {
      detail: { pathname, search, hash },
    }),
  );
});

window.dispatchEvent(
  new CustomEvent('host-location-change', {
    detail: {
      pathname: router.state.location.pathname,
      search: router.state.location.search,
      hash: router.state.location.hash,
    },
  }),
);

window.__ROUTER__ = {
  navigate: (to: string) => {
    router.navigate(to);
  },
};

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOMClient.createRoot(rootEl).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}

registerApplication(
  'header',
  () => import('navigation/header'),
  () => true,
);

registerApplication(
  'footer',
  () => import('navigation/footer'),
  () => true,
);

registerApplication(
  'content',
  () => import('content/landing'),
  () => true,
);

start();
mountVercelToolbar();
