import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('UIStore', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  afterEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  describe('initialization', () => {
    it('should initialize showWelcomeWizard to true if localStorage is empty', async () => {
      vi.stubGlobal('localStorage', {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        clear: vi.fn(),
      });

      const { useUIStore } = await import('./ui-store');
      const state = useUIStore.getState();
      expect(state.showWelcomeWizard).toBe(true);
    });

    it('should initialize showWelcomeWizard to false if localStorage has seen flag', async () => {
      vi.stubGlobal('localStorage', {
        getItem: vi.fn((key) => {
          if (key === 'welcome-wizard-seen') return 'true';
          return null;
        }),
        setItem: vi.fn(),
        clear: vi.fn(),
      });

      const { useUIStore } = await import('./ui-store');
      const state = useUIStore.getState();
      expect(state.showWelcomeWizard).toBe(false);
    });

    it('should initialize leftSidebarOpen to true if window width >= 1024', async () => {
      vi.stubGlobal('window', {
        innerWidth: 1024,
      });

      const { useUIStore } = await import('./ui-store');
      const state = useUIStore.getState();
      expect(state.leftSidebarOpen).toBe(true);
    });

    it('should initialize leftSidebarOpen to false if window width < 1024', async () => {
      vi.stubGlobal('window', {
        innerWidth: 1023,
      });

      const { useUIStore } = await import('./ui-store');
      const state = useUIStore.getState();
      expect(state.leftSidebarOpen).toBe(false);
    });
  });

  describe('actions', () => {
    let useUIStore: typeof import('./ui-store').useUIStore;

    beforeEach(async () => {
      const module = await import('./ui-store');
      useUIStore = module.useUIStore;
    });

    it('setLayoutMode', () => {
      useUIStore.getState().setLayoutMode('desktop');
      expect(useUIStore.getState().layoutMode).toBe('desktop');
    });

    it('setMode', () => {
      useUIStore.getState().setMode('PREVIEW');
      expect(useUIStore.getState().mode).toBe('PREVIEW');
    });

    it('setShowExportImport', () => {
      useUIStore.getState().setShowExportImport('export');
      expect(useUIStore.getState().showExportImport).toBe('export');
    });

    it('setShowGallery', () => {
      useUIStore.getState().setShowGallery(true);
      expect(useUIStore.getState().showGallery).toBe(true);
    });

    it('setShowComparison', () => {
      useUIStore.getState().setShowComparison(true);
      expect(useUIStore.getState().showComparison).toBe(true);
    });

    it('setShowCommandPalette', () => {
      useUIStore.getState().setShowCommandPalette(true);
      expect(useUIStore.getState().showCommandPalette).toBe(true);
    });

    it('setShowWelcomeWizard', () => {
      useUIStore.getState().setShowWelcomeWizard(true);
      expect(useUIStore.getState().showWelcomeWizard).toBe(true);
    });

    it('setShowDynamicThemeSettings', () => {
      useUIStore.getState().setShowDynamicThemeSettings(true);
      expect(useUIStore.getState().showDynamicThemeSettings).toBe(true);
    });

    it('setShowSolarSystem', () => {
      useUIStore.getState().setShowSolarSystem(true);
      expect(useUIStore.getState().showSolarSystem).toBe(true);
    });

    it('setLeftSidebarOpen', () => {
      useUIStore.getState().setLeftSidebarOpen(false);
      expect(useUIStore.getState().leftSidebarOpen).toBe(false);
    });

    it('setRightSidebarOpen', () => {
      useUIStore.getState().setRightSidebarOpen(true);
      expect(useUIStore.getState().rightSidebarOpen).toBe(true);
    });

    it('setThemeName', () => {
      useUIStore.getState().setThemeName('New Theme Name');
      expect(useUIStore.getState().themeName).toBe('New Theme Name');
    });

    it('setShowAuthModal', () => {
      useUIStore.getState().setShowAuthModal(true);
      expect(useUIStore.getState().showAuthModal).toBe(true);
    });

    it('setShowUploadModal', () => {
      useUIStore.getState().setShowUploadModal(true);
      expect(useUIStore.getState().showUploadModal).toBe(true);
    });

    it('setMockGitStatus', () => {
      useUIStore.getState().setMockGitStatus({ branch: 'feature/new', ahead: 2 });
      expect(useUIStore.getState().mockGitStatus.branch).toBe('feature/new');
      expect(useUIStore.getState().mockGitStatus.ahead).toBe(2);
      expect(useUIStore.getState().mockGitStatus.behind).toBe(0); // Check partial update preserved other fields
    });

    it('setPreferredShell', () => {
      useUIStore.getState().setPreferredShell('zsh');
      expect(useUIStore.getState().preferredShell).toBe('zsh');
    });

    it('setRefreshRate', () => {
      useUIStore.getState().setRefreshRate(30);
      expect(useUIStore.getState().refreshRate).toBe(30);
    });

    it('setCurrentUser', () => {
      const user = { id: 1, name: 'Test User' };
      useUIStore.getState().setCurrentUser(user);
      expect(useUIStore.getState().currentUser).toEqual(user);
    });
  });
});
