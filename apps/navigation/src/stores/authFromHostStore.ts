import { create } from 'zustand';
import { getEventBus } from 'contracts';

interface AuthFromHostState {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
  subscribe: () => () => void;
}

export const useAuthFromHostStore = create<AuthFromHostState>((set, get) => ({
  isAuth: typeof window !== 'undefined' ? window.__AUTH__?.getIsAuth() ?? false : false,
  setAuth: (value) => set({ isAuth: value }),
  subscribe: () => {
    const bus = getEventBus();
    const unsub = bus.on('auth:change', (payload) => {
      set({ isAuth: payload.isAuth });
    });
    set({ isAuth: window.__AUTH__?.getIsAuth() ?? get().isAuth });
    return unsub;
  },
}));
