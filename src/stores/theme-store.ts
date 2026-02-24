import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDebouncedStorage } from '../lib/storage-utils';
import { StarshipConfig, Theme, ThemeMetadata } from '../types/starship.types';
import { TomlParser } from '../lib/toml-parser';
import { generateId } from '../lib/utils';

interface ThemeStore {
  currentTheme: Theme;
  savedThemes: Theme[];
  selectedModule: string | null;
  past: Theme[];
  future: Theme[];

  // Actions
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  setSelectedModule: (module: string | null) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: () => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;
  undo: () => void;
  redo: () => void;

  // Import/Export
  exportToml: () => string;
  importToml: (tomlString: string) => void;
}

const createDefaultTheme = (): Theme => ({
  metadata: {
    id: generateId(),
    name: 'Untitled Theme',
    created: new Date(),
    updated: new Date(),
  },
  config: TomlParser.getDefaultConfig(),
});

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: createDefaultTheme(),
      savedThemes: [],
      selectedModule: null,
      past: [],
      future: [],

      updateConfig: (newConfig) => {
        set((state) => {
          const newPast = [...state.past, state.currentTheme].slice(-50);
          return {
            past: newPast,
            future: [],
            currentTheme: {
              ...state.currentTheme,
              config: {
                ...state.currentTheme.config,
                // Ensure palettes.global is merged correctly
                palettes: {
                  ...state.currentTheme.config.palettes,
                  global: {
                    ...state.currentTheme.config.palettes?.global,
                    ...newConfig.palettes?.global,
                  },
                },
                // Merge other config directly
                ...Object.fromEntries(
                  Object.entries(newConfig).filter(
                    ([key]) => key !== 'palettes',
                  ),
                ),
              },
              metadata: {
                ...state.currentTheme.metadata,
                updated: new Date(),
              },
            },
          };
        });
      },

      updateMetadata: (newMetadata) => {
        set((state) => {
          const newPast = [...state.past, state.currentTheme].slice(-50);
          return {
            past: newPast,
            future: [],
            currentTheme: {
              ...state.currentTheme,
              metadata: {
                ...state.currentTheme.metadata,
                ...newMetadata,
                updated: new Date(),
              },
            },
          };
        });
      },

      setSelectedModule: (module) => {
        set({ selectedModule: module });
      },

      loadTheme: (theme) => {
        set({
          currentTheme: theme,
          selectedModule: null,
          past: [],
          future: [],
        });
      },

      saveTheme: () => {
        const { currentTheme, savedThemes } = get();
        const existingIndex = savedThemes.findIndex(
          (t) => t.metadata.id === currentTheme.metadata.id,
        );

        const newSavedThemes = [...savedThemes];
        if (existingIndex >= 0) {
          // Update existing
          newSavedThemes[existingIndex] = currentTheme;
        } else {
          // Add new
          newSavedThemes.push(currentTheme);
        }

        set({ savedThemes: newSavedThemes });
      },

      deleteTheme: (id) => {
        set((state) => ({
          savedThemes: state.savedThemes.filter((t) => t.metadata.id !== id),
        }));
      },

      resetTheme: () => {
        set({
          currentTheme: createDefaultTheme(),
          selectedModule: null,
          past: [],
          future: [],
        });
      },

      undo: () => {
        set((state) => {
          if (state.past.length === 0) return {};
          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, -1);
          return {
            past: newPast,
            future: [state.currentTheme, ...state.future],
            currentTheme: previous,
          };
        });
      },

      redo: () => {
        set((state) => {
          if (state.future.length === 0) return {};
          const next = state.future[0];
          const newFuture = state.future.slice(1);
          return {
            past: [...state.past, state.currentTheme],
            future: newFuture,
            currentTheme: next,
          };
        });
      },

      exportToml: () => {
        const { currentTheme } = get();
        return TomlParser.stringify(currentTheme.config);
      },

      importToml: (tomlString) => {
        const config = TomlParser.parse(tomlString);
        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            config,
            metadata: {
              ...state.currentTheme.metadata,
              updated: new Date(),
            },
          },
          selectedModule: null,
          past: [],
          future: [],
        }));
      },
    }),
    {
      name: 'starship-theme-storage',
      storage: createDebouncedStorage(() => localStorage),
      partialize: (state) => ({
        savedThemes: state.savedThemes,
        currentTheme: state.currentTheme,
        // Don't persist undo history to save storage space
      }),
    },
  ),
);
