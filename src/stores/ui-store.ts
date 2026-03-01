import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'welcome' | 'preview' | 'colors' | 'modules' | 'editor';

interface UIStore {
  activeView: View;
  setActiveView: (view: View) => void;

  // Modal States
  showExportImport: 'export' | 'import' | null;
  setShowExportImport: (state: 'export' | 'import' | null) => void;

  showGallery: boolean;
  setShowGallery: (show: boolean) => void;

  showComparison: boolean;
  setShowComparison: (show: boolean) => void;

  showCommandPalette: boolean;
  setShowCommandPalette: (show: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      activeView: 'welcome',
      setActiveView: (view) => set({ activeView: view }),

      showExportImport: null,
      setShowExportImport: (state) => set({ showExportImport: state }),

      showGallery: false,
      setShowGallery: (show) => set({ showGallery: show }),

      showComparison: false,
      setShowComparison: (show) => set({ showComparison: show }),

      showCommandPalette: false,
      setShowCommandPalette: (show) => set({ showCommandPalette: show }),
    }),
    {
      name: 'starship-ui-storage',
      partialize: (state) => ({
        // Only persist activeView if needed, or nothing for modals
        activeView: state.activeView,
      }),
    },
  ),
);
