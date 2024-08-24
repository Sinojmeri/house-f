import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));

export default useAuthStore;
