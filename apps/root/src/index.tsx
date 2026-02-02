import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registerApplication, start } from 'single-spa';
import { mountVercelToolbar } from '@vercel/toolbar/vite';
import { ROUTES, getEventBus } from 'contracts';
import { useAuthStore } from './stores/authStore';
import './globals.css';

const queryClient = new QueryClient();

getEventBus();
window.__EVENT_BUS__?.emit('auth:change', {
  isAuth: useAuthStore.getState().isAuth,
});

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
  window.__EVENT_BUS__?.emit('route:change', { pathname, search, hash });
});

const initialLocation = router.state.location;
window.dispatchEvent(
  new CustomEvent('host-location-change', {
    detail: {
      pathname: initialLocation.pathname,
      search: initialLocation.search,
      hash: initialLocation.hash,
    },
  }),
);
window.__EVENT_BUS__?.emit('route:change', {
  pathname: initialLocation.pathname,
  search: initialLocation.search,
  hash: initialLocation.hash,
});

window.__ROUTER__ = {
  navigate: (to: string) => {
    router.navigate(to);
  },
};

window.__AUTH__ = {
  login: () => useAuthStore.getState().setAuth(true),
  logout: () => useAuthStore.getState().setAuth(false),
  getIsAuth: () => useAuthStore.getState().isAuth,
};

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOMClient.createRoot(rootEl).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
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
