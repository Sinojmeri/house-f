import { create } from 'zustand';

export const useModalStore = create((set) => {
    return {
        isOpen: false,
        openModal: () => { set({ isOpen: true }) },
        closeModal: () => {set({ isOpen: false })},
    }
})