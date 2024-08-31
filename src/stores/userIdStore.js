import { create } from 'zustand';

export const useUserIdStore = create((set) => ({
  id: null,
  setUserId: (id) => set({ id }),
  clearUserId: () => set({ id: null }),
}));
