/**
 * Пути маршрутов приложения.
 * Единый источник правды для роутинга во всех микрофронтах.
 */
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CARDS: '/#cards',
} as const;

export type RoutePath = (typeof ROUTE_PATHS)[keyof typeof ROUTE_PATHS];

/**
 * Имена маршрутов (для типизации и навигации).
 */
export type RouteName = keyof typeof ROUTE_PATHS;

/**
 * Конфигурация маршрута для построения меню и роутера.
 */
export interface RouteConfig {
  path: string;
  name: RouteName;
  label: string;
}

export const ROUTES: RouteConfig[] = [
  { path: ROUTE_PATHS.HOME, name: 'HOME', label: 'Главная' },
  { path: ROUTE_PATHS.ABOUT, name: 'ABOUT', label: 'О шаблоне' },
];

/**
 * Параметры для маршрутов с динамическими сегментами (на будущее).
 */
export interface RouteParams {
  [ROUTE_PATHS.HOME]: Record<string, never>;
  [ROUTE_PATHS.ABOUT]: Record<string, never>;
}
