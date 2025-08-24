import { create } from 'zustand';

export const useToast = create((set) => ({
  message: '',
  show: (m) => set({ message: m }),
  clear: () => set({ message: '' })
}));
