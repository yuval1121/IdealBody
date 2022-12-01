import create from 'zustand';

type State = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuthStore = create<State>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
}));
