import { create } from 'zustand';

export type LayoutMode = 'desktop' | 'mobile' | 'auto';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface UIStore {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  showThemeGallery: boolean;
  setShowThemeGallery: (state: boolean) => void;
  showWelcomeWizard: boolean;
  setShowWelcomeWizard: (state: boolean) => void;
  showDynamicThemeSettings: boolean;
  setShowDynamicThemeSettings: (state: boolean) => void;
  showSolarSystem: boolean;
  setShowSolarSystem: (state: boolean) => void;
  leftSidebarOpen: boolean;
  setLeftSidebarOpen: (state: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (state: boolean) => void;
  themeName: string;
  setThemeName: (name: string) => void;
  showAuthModal: boolean;
  setShowAuthModal: (state: boolean) => void;
  showUploadModal: boolean;
  setShowUploadModal: (state: boolean) => void;
  showExportImport: 'import' | 'export' | null;
  setShowExportImport: (state: 'import' | 'export' | null) => void;
  showGallery: boolean;
  setShowGallery: (state: boolean) => void;
  showComparison: boolean;
  setShowComparison: (state: boolean) => void;
  showCommandPalette: boolean;
  setShowCommandPalette: (state: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  layoutMode: 'auto',
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  showThemeGallery: false,
  setShowThemeGallery: (state) => set({ showThemeGallery: state }),
  showWelcomeWizard: !localStorage.getItem('welcome-wizard-seen'),
  setShowWelcomeWizard: (state) => set({ showWelcomeWizard: state }),
  showDynamicThemeSettings: false,
  setShowDynamicThemeSettings: (state) =>
    set({ showDynamicThemeSettings: state }),
  showSolarSystem: false,
  setShowSolarSystem: (state) => set({ showSolarSystem: state }),
  leftSidebarOpen: window.innerWidth >= 1024,
  setLeftSidebarOpen: (state) => set({ leftSidebarOpen: state }),
  rightSidebarOpen: false,
  setRightSidebarOpen: (state) => set({ rightSidebarOpen: state }),
  themeName: 'Untitled Theme',
  setThemeName: (name) => set({ themeName: name }),
  showAuthModal: false,
  setShowAuthModal: (state) => set({ showAuthModal: state }),
  showUploadModal: false,
  setShowUploadModal: (state) => set({ showUploadModal: state }),
  showExportImport: null,
  setShowExportImport: (state) => set({ showExportImport: state }),
  showGallery: false,
  setShowGallery: (state) => set({ showGallery: state }),
  showComparison: false,
  setShowComparison: (state) => set({ showComparison: state }),
  showCommandPalette: false,
  setShowCommandPalette: (state) => set({ showCommandPalette: state }),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
