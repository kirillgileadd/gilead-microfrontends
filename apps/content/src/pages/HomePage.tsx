import React from 'react';

const CARDS = [
  {
    title: 'Root (host)',
    description:
      'Корневое приложение — загружает страницу, подключает стили и регистрирует микрофронты через single-spa. Точка входа для пользователя.',
  },
  {
    title: 'Navigation',
    description:
      'Микрофронтенд с шапкой и подвалом. Exposes: header, footer. Рендерится в свои контейнеры и живёт по basePath /_navigation.',
  },
  {
    title: 'Content',
    description:
      'Микрофронтенд с основным контентом страницы (эта лендинг). Exposes: landing. Загружается по запросу через Module Federation.',
  },
  {
    title: 'Module Federation',
    description:
      'Vite-плагин @module-federation/vite делит сборку на remote-модули. Каждый микрофронт собирается отдельно, в рантайме подгружается по remoteEntry.',
  },
  {
    title: 'single-spa',
    description:
      'Оркестратор: registerApplication, жизненный цикл bootstrap → mount → unmount. Решает, когда какой микрофронт показывать по роутингу и активности.',
  },
  {
    title: 'Стек',
    description:
      'React, TypeScript, Vite, Tailwind CSS v4. Общие shared-зависимости (react, react-dom) через federation для одного экземпляра на странице.',
  },
];

export function HomePage(): React.JSX.Element {
  return (
    <main className="flex-1">
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Шаблон микрофронтендов
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Пример приложения на single-spa и Module Federation (Vite). Три приложения: root, navigation, content — независимая разработка и общий рантайм.
            </p>
            <a
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              href="#cards"
            >
              О шаблоне
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16 md:py-20" id="cards">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Из чего состоит шаблон
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Коротко про приложения и технологии в этом репозитории.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-muted/50"
              >
                <h3 className="font-semibold text-lg">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
