import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useThemeStore } from './theme-store';
import { TomlParser } from '../lib/toml-parser';
import { Theme } from '../types/starship.types';

describe('ThemeStore', () => {
  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    // Reset the store to a known clean state
    useThemeStore.setState({
      currentTheme: {
        metadata: {
          id: 'test-id',
          name: 'Test Theme',
          created: mockDate,
          updated: mockDate,
        },
        config: TomlParser.getDefaultConfig(),
      },
      savedThemes: [],
      past: [],
      future: [],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('undo/redo', () => {
    it('should push state to past when config updates', () => {
      const store = useThemeStore.getState();
      const initialConfig = store.currentTheme.config;

      store.updateConfig({ format: 'new' });

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.past).toHaveLength(1);
      expect(updatedStore.past[0].config).toEqual(initialConfig);
    });

    it('should undo changes', () => {
      const store = useThemeStore.getState();
      const initialFormat = store.currentTheme.config.format;

      store.updateConfig({ format: 'new' });
      store.undo();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.config.format).toEqual(initialFormat);
      expect(updatedStore.past).toHaveLength(0);
      expect(updatedStore.future).toHaveLength(1);
    });

    it('should redo changes', () => {
      const store = useThemeStore.getState();

      store.updateConfig({ format: 'new' });
      store.undo();
      store.redo();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.config.format).toEqual('new');
      expect(updatedStore.past).toHaveLength(1);
      expect(updatedStore.future).toHaveLength(0);
    });
  });

  describe('updateConfig', () => {
    it('should update configuration and metadata timestamp', () => {
      const store = useThemeStore.getState();
      const initialUpdated = store.currentTheme.metadata.updated;

      // Advance time to ensure timestamp changes
      vi.advanceTimersByTime(1000);
      const newTime = new Date(mockDate.getTime() + 1000);
      vi.setSystemTime(newTime);

      const newConfig = { format: 'new format' };
      store.updateConfig(newConfig);

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.config.format).toBe('new format');
      expect(updatedStore.currentTheme.metadata.updated.getTime()).toBe(
        newTime.getTime(),
      );
      expect(
        updatedStore.currentTheme.metadata.updated.getTime(),
      ).toBeGreaterThan(initialUpdated.getTime());
    });

    it('should merge partial config updates', () => {
      const store = useThemeStore.getState();
      store.updateConfig({ add_newline: false });

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.config.add_newline).toBe(false);
      // Ensure other fields are preserved (format is default)
      expect(updatedStore.currentTheme.config.format).toBeDefined();
    });
  });

  describe('updateMetadata', () => {
    it('should update metadata fields and timestamp', () => {
      const store = useThemeStore.getState();

      vi.advanceTimersByTime(1000);
      const newTime = new Date(mockDate.getTime() + 1000);
      vi.setSystemTime(newTime);

      store.updateMetadata({ name: 'New Name' });

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.metadata.name).toBe('New Name');
      expect(updatedStore.currentTheme.metadata.updated.getTime()).toBe(
        newTime.getTime(),
      );
    });
  });

  describe('loadTheme', () => {
    it('should replace current theme with loaded theme', () => {
      const store = useThemeStore.getState();
      const newTheme: Theme = {
        metadata: {
          id: 'new-id',
          name: 'Loaded Theme',
          created: new Date('2023-01-01'),
          updated: new Date('2023-01-01'),
        },
        config: { format: 'loaded format' },
      };

      store.loadTheme(newTheme);

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme).toEqual(newTheme);
    });
  });

  describe('saveTheme', () => {
    it('should add new theme to savedThemes', () => {
      const store = useThemeStore.getState();

      store.saveTheme();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.savedThemes).toHaveLength(1);
      expect(updatedStore.savedThemes[0]).toEqual(updatedStore.currentTheme);
    });

    it('should update existing theme in savedThemes', () => {
      const store = useThemeStore.getState();

      // First save
      store.saveTheme();
      expect(useThemeStore.getState().savedThemes).toHaveLength(1);

      // Modify current theme (same ID)
      store.updateConfig({ format: 'modified format' });

      // Save again
      store.saveTheme();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.savedThemes).toHaveLength(1);
      expect(updatedStore.savedThemes[0].config.format).toBe('modified format');
    });

    it('should handle multiple themes', () => {
      const store = useThemeStore.getState();
      store.saveTheme(); // Save default theme (id: test-id)

      // Load a different theme
      const secondTheme: Theme = {
        metadata: {
          id: 'second-id',
          name: 'Second Theme',
          created: new Date(),
          updated: new Date(),
        },
        config: TomlParser.getDefaultConfig(),
      };
      store.loadTheme(secondTheme);
      store.saveTheme();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.savedThemes).toHaveLength(2);
      expect(
        updatedStore.savedThemes.find((t) => t.metadata.id === 'test-id'),
      ).toBeDefined();
      expect(
        updatedStore.savedThemes.find((t) => t.metadata.id === 'second-id'),
      ).toBeDefined();
    });
  });

  describe('deleteTheme', () => {
    it('should remove theme from savedThemes by id', () => {
      const store = useThemeStore.getState();
      store.saveTheme(); // Save current (id: test-id)

      expect(useThemeStore.getState().savedThemes).toHaveLength(1);

      store.deleteTheme('test-id');

      expect(useThemeStore.getState().savedThemes).toHaveLength(0);
    });

    it('should do nothing if id not found', () => {
      const store = useThemeStore.getState();
      store.saveTheme();
      expect(useThemeStore.getState().savedThemes).toHaveLength(1);

      store.deleteTheme('non-existent-id');
      expect(useThemeStore.getState().savedThemes).toHaveLength(1);
    });
  });

  describe('resetTheme', () => {
    it('should reset currentTheme to defaults', () => {
      const store = useThemeStore.getState();

      // Modify current theme
      store.updateConfig({ format: 'modified' });
      store.updateMetadata({ name: 'Modified' });

      store.resetTheme();

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.metadata.name).toBe('Untitled Theme');
      expect(updatedStore.currentTheme.config).toEqual(
        TomlParser.getDefaultConfig(),
      );
      // ID should be new (random UUID generated in createDefaultTheme)
      expect(updatedStore.currentTheme.metadata.id).not.toBe('test-id');
    });
  });

  describe('exportToml', () => {
    it('should return TOML string of current config', () => {
      const store = useThemeStore.getState();
      store.updateConfig({ format: 'test format' });

      const toml = store.exportToml();
      expect(toml).toContain('format = "test format"');
    });
  });

  describe('importToml', () => {
    it('should parse TOML and update current config', () => {
      const store = useThemeStore.getState();
      const toml = 'format = "imported format"\nadd_newline = false';

      vi.advanceTimersByTime(1000);
      const newTime = new Date(mockDate.getTime() + 1000);
      vi.setSystemTime(newTime);

      store.importToml(toml);

      const updatedStore = useThemeStore.getState();
      expect(updatedStore.currentTheme.config.format).toBe('imported format');
      expect(updatedStore.currentTheme.config.add_newline).toBe(false);
      expect(updatedStore.currentTheme.metadata.updated.getTime()).toBe(
        newTime.getTime(),
      );
    });

    it('should throw error on invalid TOML', () => {
      const store = useThemeStore.getState();
      const invalidToml = 'invalid = "toml" ='; // Syntax error

      // Need to spy on console.error to suppress output during test
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => store.importToml(invalidToml)).toThrow();

      consoleSpy.mockRestore();
    });
  });
});
