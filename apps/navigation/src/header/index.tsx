import React from 'react';
import { useEffect } from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { ROUTE_PATHS } from 'contracts';
import { useAuthFromHostStore } from '../stores/authFromHostStore';
import { MobileMenuButton } from './mobile-menu-button';
import '../global.css';
import './header.css';

function navTo(path: string): void {
  if (window.__ROUTER__) {
    window.__ROUTER__.navigate(path);
  }
}

function Header(): React.JSX.Element {
  const isAuth = useAuthFromHostStore((s) => s.isAuth);
  const subscribe = useAuthFromHostStore((s) => s.subscribe);

  useEffect(() => {
    return subscribe();
  }, [subscribe]);

  return (
    <header className="remote:sticky remote:top-0 remote:z-50 remote:w-full remote:border-b remote:border-b-muted remote:bg-background/95 backdrop-blur remote:supports-[backdrop-filter]:bg-background/60">
      <div className="remote:container remote:flex remote:h-16 remote:items-center remote:justify-between">
        <a
          className="remote:flex remote:items-center remote:gap-2"
          href={ROUTE_PATHS.HOME}
          onClick={(e) => {
            e.preventDefault();
            navTo(ROUTE_PATHS.HOME);
          }}
        >
          <img
            alt="Logo"
            className="remote:rounded"
            height="32"
            src="/abstract-geometric-logo.png"
            width="32"
          />
          <span className="remote:text-xl remote:font-bold">Company</span>
        </a>
        <nav className="remote:hidden remote:sm:flex remote:gap-6 remote:items-center">
          <a
            className="remote:text-sm remote:font-medium remote:hover:text-primary"
            href={ROUTE_PATHS.HOME}
            onClick={(e) => {
              e.preventDefault();
              navTo(ROUTE_PATHS.HOME);
            }}
          >
            Главная
          </a>
          <a
            className="remote:text-sm remote:font-medium remote:hover:text-primary"
            href={ROUTE_PATHS.ABOUT}
            onClick={(e) => {
              e.preventDefault();
              navTo(ROUTE_PATHS.ABOUT);
            }}
          >
            О шаблоне
          </a>
          {isAuth ? (
            <button
              className="remote:text-sm remote:font-medium remote:hover:text-primary remote:ml-4"
              type="button"
              onClick={() => window.__AUTH__?.logout()}
            >
              Logout
            </button>
          ) : (
            <button
              className="remote:text-sm remote:font-medium remote:hover:text-primary remote:ml-4"
              type="button"
              onClick={() => window.__AUTH__?.login()}
            >
              Login
            </button>
          )}
        </nav>
        <MobileMenuButton />
      </div>
    </header>
  );
}

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Header,
  errorBoundary() {
    return <></>;
  },
});
