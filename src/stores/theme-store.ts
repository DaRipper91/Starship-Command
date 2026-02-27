import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createDebouncedStorage } from '../lib/storage-utils';
import { TomlParser } from '../lib/toml-parser';
import { generateId } from '../lib/utils';
import { StarshipConfig, Theme, ThemeMetadata } from '../types/starship.types';

interface ThemeStore {
  currentTheme: Theme;
  savedThemes: Theme[];
  selectedModule: string | null;

  // History
  past: Theme[];
  future: Theme[];
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Actions
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  setSelectedModule: (module: string | null) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: () => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;

  // Import/Export
  exportToml: () => string;
  importToml: (tomlString: string) => void;
}

const HISTORY_LIMIT = 50;

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

      undo: () => {
        set((state) => {
          if (state.past.length === 0) return {};
          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, -1);
          return {
            past: newPast,
            currentTheme: previous,
            future: [state.currentTheme, ...state.future],
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
            currentTheme: next,
            future: newFuture,
          };
        });
      },

      canUndo: () => get().past.length > 0,
      canRedo: () => get().future.length > 0,

      updateConfig: (newConfig) => {
        set((state) => {
          const nextTheme = {
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
                Object.entries(newConfig).filter(([key]) => key !== 'palettes'),
              ),
            },
            metadata: {
              ...state.currentTheme.metadata,
              updated: new Date(),
            },
          };

          // Optimization: Don't update if config hasn't changed
          if (
            JSON.stringify(state.currentTheme.config) ===
            JSON.stringify(nextTheme.config)
          ) {
            return {};
          }

          // Use the history limit correctly
          const newPast = [...state.past, state.currentTheme];
          if (newPast.length > HISTORY_LIMIT) {
            newPast.shift();
          }

          return {
            past: newPast,
            currentTheme: nextTheme,
            future: [], // Clear redo stack on new change
          };
        });
      },

      updateMetadata: (newMetadata) => {
        set((state) => {
          const nextTheme = {
            ...state.currentTheme,
            metadata: {
              ...state.currentTheme.metadata,
              ...newMetadata,
              updated: new Date(),
            },
          };

          // Also push metadata changes to history so user can undo name changes etc.
          const newPast = [...state.past, state.currentTheme];
          if (newPast.length > HISTORY_LIMIT) {
            newPast.shift();
          }

          return {
            past: newPast,
            currentTheme: nextTheme,
            future: [],
          };
        });
      },

      setSelectedModule: (module) => {
        set({ selectedModule: module });
      },

      loadTheme: (theme) => {
        set((state) => {
          const newPast = [...state.past, state.currentTheme];
          if (newPast.length > HISTORY_LIMIT) {
            newPast.shift();
          }
          return {
            past: newPast,
            currentTheme: theme,
            selectedModule: null,
            future: [],
          };
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
        set((state) => {
          const newPast = [...state.past, state.currentTheme];
          if (newPast.length > HISTORY_LIMIT) {
            newPast.shift();
          }
          return {
            past: newPast,
            currentTheme: createDefaultTheme(),
            selectedModule: null,
            future: [],
          };
        });
      },

      exportToml: () => {
        const { currentTheme } = get();
        return TomlParser.stringify(currentTheme.config);
      },

      importToml: (tomlString) => {
        try {
          const config = TomlParser.parse(tomlString);
          set((state) => {
            const newPast = [...state.past, state.currentTheme];
            if (newPast.length > HISTORY_LIMIT) {
              newPast.shift();
            }
            return {
              past: newPast,
              currentTheme: {
                ...state.currentTheme,
                config,
                metadata: {
                  ...state.currentTheme.metadata,
                  updated: new Date(),
                },
              },
              selectedModule: null,
              future: [],
            };
          });
        } catch (error) {
          console.error('Failed to import TOML:', error);
          throw error;
        }
      },
    }),
    {
      name: 'starship-theme-storage',
      storage: createDebouncedStorage(() => localStorage),
      partialize: (state) => ({
        savedThemes: state.savedThemes,
        currentTheme: state.currentTheme,
        // Don't persist history or selection
      }),
    },
  ),
);
