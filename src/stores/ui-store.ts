import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'welcome' | 'preview' | 'colors' | 'modules' | 'editor';

interface UIStore {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      activeView: 'welcome',
      setActiveView: (view) => set({ activeView: view }),
    }),
    {
      name: 'starship-ui-storage',
    },
  ),
);
