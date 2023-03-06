import create from 'zustand';

interface State {
  isAuthenticated: boolean;
  authenticate: () => void;
  logout: () => void;
}

//Can derive email from token
export const useAuthStore = create<State>(set => ({
  isAuthenticated: false,
  authenticate: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
