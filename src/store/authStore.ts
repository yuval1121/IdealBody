import create from 'zustand';

interface State {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string, email: string) => void;
  logout: () => void;
}

//Can derive email from token
export const useAuthStore = create<State>(set => ({
  email: null,
  token: null,
  isAuthenticated: false,
  authenticate: (token, email) => set({ token, email, isAuthenticated: true }),
  logout: () => set({ token: null, email: null, isAuthenticated: false }),
}));
