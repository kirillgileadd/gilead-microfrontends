import React from 'react';
import { ROUTE_PATHS, ROUTES } from 'contracts';

function navTo(path: string): void {
  if (window.__ROUTER__) {
    window.__ROUTER__.navigate(path);
  }
}

export function AboutPage(): React.JSX.Element {
  return (
    <main className="flex-1">
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              О шаблоне
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Этот шаблон собран из трёх приложений: root (хост), navigation (шапка и подвал), content (основной контент). Роутинг описан в пакете contracts, один роутер в root через createBrowserRouter.
            </p>
            <div className="rounded-lg border bg-card p-6">
              <h2 className="font-semibold text-lg mb-4">Маршруты (из contracts)</h2>
              <ul className="space-y-2 text-muted-foreground">
                {ROUTES.map((route) => (
                  <li key={route.name}>
                    <a
                      href={route.path}
                      className="text-primary hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        navTo(route.path);
                      }}
                    >
                      {route.path}
                    </a>
                    <span className="ml-2">— {route.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              <a
                href={ROUTE_PATHS.HOME}
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navTo(ROUTE_PATHS.HOME);
                }}
              >
                ← На главную
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
