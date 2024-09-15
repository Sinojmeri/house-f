import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    console.log('Setting token', token);
    
    set({ token })
  },
  clearToken: () => set({ token: null }),
}));
