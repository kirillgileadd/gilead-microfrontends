import React from 'react';
import { useSyncExternalStore } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import {
  ROUTE_PATHS,
  subscribeToHostLocation,
  getHostLocationSnapshot,
} from 'contracts';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import './globals.css';

function ContentByLocation(): React.JSX.Element {
  const location = useSyncExternalStore(
    subscribeToHostLocation,
    getHostLocationSnapshot,
    getHostLocationSnapshot,
  );

  if (location.pathname === ROUTE_PATHS.ABOUT) {
    return <AboutPage />;
  }

  return <HomePage />;
}

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: ContentByLocation,
  errorBoundary() {
    return <></>;
  },
});
