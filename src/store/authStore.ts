import create from 'zustand';

interface State {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<State>(set => ({
  token: null,
  isAuthenticated: false,
  authenticate: token => set({ token, isAuthenticated: true }),
  logout: () => set({ token: null, isAuthenticated: false }),
}));
