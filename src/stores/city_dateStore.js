import { create } from 'zustand';

const useCity_dateStore = create((set) => {
    return {
        inputValue: 'Where are you going ?',
        setInputValue: (value) => set({ inputValue: value }),

        dateRange: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
        setDateRange: (range) => set({ dateRange: range }),
    }

});

export default useCity_dateStore;