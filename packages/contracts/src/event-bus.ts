/**
 * Универсальная шина событий для общения между микрофронтами.
 * Один экземпляр на вкладку (хранится в window.__EVENT_BUS__).
 *
 * @example
 * // В любом микрофронте:
 * import { getEventBus } from 'contracts';
 *
 * const bus = getEventBus();
 *
 * // Подписка
 * const unsub = bus.on('route:change', (payload) => console.log(payload.pathname));
 *
 * // Публикация
 * bus.emit('user:action', { action: 'click', payload: { id: 'btn-1' } });
 *
 * // Отписаться
 * unsub();
 *
 * // Расширение типов событий — добавить ключи в EventPayloadMap в contracts.
 */

export type EventPayloadMap = {
  'route:change': { pathname: string; search?: string; hash?: string };
  'user:action': { action: string; payload?: unknown };
  'auth:change': { isAuth: boolean };
  [key: string]: unknown;
};

type Listener<Payload = unknown> = (payload: Payload) => void;

function createEventBus(): EventBus {
  const listeners = new Map<string, Set<Listener>>();

  return {
    on<K extends keyof EventPayloadMap>(
      event: K,
      handler: Listener<EventPayloadMap[K]>,
    ): () => void {
      const set = listeners.get(event as string) ?? new Set();
      set.add(handler as Listener);
      listeners.set(event as string, set);
      return () => {
        set.delete(handler as Listener);
        if (set.size === 0) listeners.delete(event as string);
      };
    },

    once<K extends keyof EventPayloadMap>(
      event: K,
      handler: Listener<EventPayloadMap[K]>,
    ): () => void {
      const unsubscribe = this.on(event, ((payload: EventPayloadMap[K]) => {
        unsubscribe();
        handler(payload);
      }) as Listener<EventPayloadMap[K]>);
      return unsubscribe;
    },

    emit<K extends keyof EventPayloadMap>(
      event: K,
      payload: EventPayloadMap[K],
    ): void {
      const set = listeners.get(event as string);
      if (set) {
        set.forEach((handler) => {
          try {
            handler(payload);
          } catch (err) {
            console.error(`[event-bus] handler error for "${String(event)}":`, err);
          }
        });
      }
    },

    off<K extends keyof EventPayloadMap>(
      event: K,
      handler?: Listener<EventPayloadMap[K]>,
    ): void {
      if (handler) {
        const set = listeners.get(event as string);
        if (set) {
          set.delete(handler as Listener);
          if (set.size === 0) listeners.delete(event as string);
        }
      } else {
        listeners.delete(event as string);
      }
    },
  };
}

export interface EventBus {
  on<K extends keyof EventPayloadMap>(
    event: K,
    handler: Listener<EventPayloadMap[K]>,
  ): () => void;
  once<K extends keyof EventPayloadMap>(
    event: K,
    handler: Listener<EventPayloadMap[K]>,
  ): () => void;
  emit<K extends keyof EventPayloadMap>(
    event: K,
    payload: EventPayloadMap[K],
  ): void;
  off<K extends keyof EventPayloadMap>(
    event: K,
    handler?: Listener<EventPayloadMap[K]>,
  ): void;
}

const GLOBAL_KEY = '__EVENT_BUS__';

export function getEventBus(): EventBus {
  if (typeof window === 'undefined') {
    return createEventBus();
  }
  const w = window as Window & { [GLOBAL_KEY]?: EventBus };
  if (!w[GLOBAL_KEY]) {
    w[GLOBAL_KEY] = createEventBus();
  }
  return w[GLOBAL_KEY];
}
