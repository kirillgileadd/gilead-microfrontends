import { create } from 'zustand';
import { getEventBus } from 'contracts';

interface AuthState {
  isAuth: boolean;
  setAuth: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  setAuth: (value) => {
    set({ isAuth: value });
    getEventBus().emit('auth:change', { isAuth: value });
  },
}));
