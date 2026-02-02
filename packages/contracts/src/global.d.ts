/**
 * Глобальные типы контрактов (видны всем микрофронтам при импорте из 'contracts').
 */
declare global {
  interface Window {
    __ROUTER__?: { navigate(to: string): void };
  }
}

export {};
