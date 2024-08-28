import { create } from 'zustand';

export const useLocationStore = create((set) => {
  return {
    location: {
      lat: null,
      lng: null,
    },
    updateLocation: () => {
      set({ location });
    },
  };
});
