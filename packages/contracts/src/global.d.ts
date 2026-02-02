/**
 * Глобальные типы контрактов (видны всем микрофронтам при импорте из 'contracts').
 */
declare global {
  interface Window {
    __ROUTER__?: { navigate(to: string): void };
    __EVENT_BUS__?: import('./event-bus').EventBus;
    /** Фасад авторизации (выставляется в root). login(), logout(), getIsAuth() из любого микрофронта. */
    __AUTH__?: { login(): void; logout(): void; getIsAuth(): boolean };
  }
}

export {};
