/**
 * Синхронизация location от root-роутера в микрофронты.
 * Root диспатчит событие 'host-location-change' с { pathname, search, hash }.
 * Микрофронты подписываются через useHostLocation().
 */

export type HostLocation = {
  pathname: string;
  search: string;
  hash: string;
};

let currentLocation: HostLocation = {
  pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
  search: typeof window !== 'undefined' ? window.location.search : '',
  hash: typeof window !== 'undefined' ? window.location.hash : '',
};

const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((cb) => cb());
}

if (typeof window !== 'undefined') {
  window.addEventListener('host-location-change', ((e: CustomEvent<HostLocation>) => {
    currentLocation = e.detail;
    notify();
  }) as EventListener);
}

export function subscribeToHostLocation(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getHostLocationSnapshot(): HostLocation {
  return currentLocation;
}

export function setHostLocation(location: HostLocation): void {
  currentLocation = location;
  notify();
}
