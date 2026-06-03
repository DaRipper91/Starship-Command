import { create } from 'zustand';

import { LayoutMode } from '../types';

export type AppMode = 'BUILD' | 'PREVIEW' | 'EXPORT' | 'SETTINGS' | 'GALLERY';

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface MockGitStatus {
  branch: string;
  isDirty: boolean;
  staged: boolean;
  stashed: boolean;
  ahead: number;
  behind: number;
}

interface UIStore {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;

  mode: AppMode;
  setMode: (mode: AppMode) => void;

  showExportImport: 'export' | 'import' | null;
  setShowExportImport: (state: 'export' | 'import' | null) => void;

  showGallery: boolean;
  setShowGallery: (state: boolean) => void;

  showComparison: boolean;
  setShowComparison: (state: boolean) => void;

  showCommandPalette: boolean;
  setShowCommandPalette: (state: boolean) => void;

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

  mockGitStatus: MockGitStatus;
  setMockGitStatus: (status: Partial<MockGitStatus>) => void;

  preferredShell: string;
  setPreferredShell: (shell: string) => void;

  refreshRate: number;
  setRefreshRate: (rate: number) => void;

  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  layoutMode: 'auto',
  setLayoutMode: (mode) => set({ layoutMode: mode }),

  mode: 'BUILD',
  setMode: (mode) => set({ mode }),

  showExportImport: null,
  setShowExportImport: (state) => set({ showExportImport: state }),

  showGallery: false,
  setShowGallery: (state) => set({ showGallery: state }),

  showComparison: false,
  setShowComparison: (state) => set({ showComparison: state }),

  showCommandPalette: false,
  setShowCommandPalette: (state) => set({ showCommandPalette: state }),

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

  mockGitStatus: {
    branch: 'main',
    isDirty: true,
    staged: false,
    stashed: false,
    ahead: 0,
    behind: 0,
  },
  setMockGitStatus: (status) =>
    set((state) => ({
      mockGitStatus: { ...state.mockGitStatus, ...status },
    })),

  preferredShell: 'bash',
  setPreferredShell: (shell) => set({ preferredShell: shell }),

  refreshRate: 60,
  setRefreshRate: (rate) => set({ refreshRate: rate }),

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
