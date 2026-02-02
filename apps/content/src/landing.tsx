import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import './globals.css';

function Landing(): React.JSX.Element {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Gilead Microfrontend
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Единая платформа для корпоративных приложений Gilead. Модульная архитектура, быстрая доставка контента и единый опыт для пользователей.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                href="#therapeutic-areas"
              >
                Терапевтические области
              </a>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
                href="#innovation"
              >
                Исследования и разработки
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* О Gilead */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                О Gilead
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Gilead Sciences — глобальная биофармацевтическая компания, которая уже более 35 лет открывает и разрабатывает инновационные лекарства для лечения тяжёлых заболеваний. Наша миссия — создавать возможности для более здоровой жизни людей по всему миру.
              </p>
              <ul className="mt-6 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Фокус на вирусологии, онкологии и воспалительных заболеваниях
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Глобальное присутствие и локальные команды
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span> Наука и доступность терапии в центре решений
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-8 border">
              <h3 className="font-semibold text-lg mb-4">Ключевые цифры</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-primary">35+</div>
                  <div className="text-sm text-muted-foreground">лет на рынке</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">~15 000</div>
                  <div className="text-sm text-muted-foreground">сотрудников по всему миру</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">стран присутствия</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">30+</div>
                  <div className="text-sm text-muted-foreground">одобренных препаратов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Терапевтические области */}
      <section className="py-16 md:py-20" id="therapeutic-areas">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Терапевтические области
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Мы концентрируем усилия в областях с высокой неудовлетворённой потребностью пациентов.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Вирусология',
                description: 'ВИЧ, вирусные гепатиты B и C, COVID-19 и другие вирусные инфекции.',
                icon: '🦠',
              },
              {
                title: 'Онкология',
                description: 'Гематологические и солидные опухоли, целевая и иммунотерапия.',
                icon: '🎗️',
              },
              {
                title: 'Воспалительные заболевания',
                description: 'Аутоиммунные и хронические воспалительные заболевания.',
                icon: '🔬',
              },
              {
                title: 'Фиброз и НАЖБП',
                description: 'Неалкогольная жировая болезнь печени и связанный фиброз.',
                icon: '🫀',
              },
              {
                title: 'Респираторные заболевания',
                description: 'Терапии для пациентов с тяжёлыми респираторными состояниями.',
                icon: '🫁',
              },
              {
                title: 'Кардиология',
                description: 'Сердечно-сосудистые заболевания и метаболические факторы риска.',
                icon: '❤️',
              },
            ].map((area) => (
              <div
                key={area.title}
                className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-muted/50"
              >
                <div className="text-2xl mb-3">{area.icon}</div>
                <h3 className="font-semibold text-lg">{area.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Исследования и разработки */}
      <section className="bg-muted/50 py-16 md:py-20" id="innovation">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Исследования и разработки
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Мы инвестируем в научные исследования и разработку новых терапевтических опций. Наш R&D охватывает малые молекулы, антитела, клеточную терапию и другие современные платформы.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['Малые молекулы', 'Биологические препараты', 'Клеточная терапия', 'Генная терапия'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Принципы нашей работы</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-medium">1.</span>
                  Пациент в центре — наука на службе здоровья
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">2.</span>
                  Доступность терапии и устойчивое развитие
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">3.</span>
                  Партнёрство с врачами, пациентами и обществом
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-medium">4.</span>
                  Высокие стандарты качества и этики
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Микрофронтенд-платформа */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Микрофронтенд-платформа
            </h2>
            <p className="mt-4 text-muted-foreground">
              Этот контент загружается как отдельный микрофронтенд (content) в рамках единого приложения. Header и footer — из приложения navigation, корневая оболочка — root. Module Federation и single-spa обеспечивают независимую разработку и деплой модулей.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>Root (host)</span>
              <span>•</span>
              <span>Navigation (header, footer)</span>
              <span>•</span>
              <span>Content (эта страница)</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Landing,
  errorBoundary() {
    return <></>;
  },
});
