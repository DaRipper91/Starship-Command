import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StarshipConfig, Theme, ThemeMetadata } from '../types/starship.types';
import { TomlParser } from '../lib/toml-parser';

interface ThemeStore {
  currentTheme: Theme;
  savedThemes: Theme[];

  // Actions
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: () => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;

  // Import/Export
  exportToml: () => string;
  importToml: (tomlString: string) => void;
}

const createDefaultTheme = (): Theme => ({
  metadata: {
    id: crypto.randomUUID(),
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

      updateConfig: (newConfig) => {
        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            config: {
              ...state.currentTheme.config,
              ...newConfig,
            },
            metadata: {
              ...state.currentTheme.metadata,
              updated: new Date(),
            },
          },
        }));
      },

      updateMetadata: (newMetadata) => {
        set((state) => ({
          currentTheme: {
            ...state.currentTheme,
            metadata: {
              ...state.currentTheme.metadata,
              ...newMetadata,
              updated: new Date(),
            },
          },
        }));
      },

      loadTheme: (theme) => {
        set({ currentTheme: theme });
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
        set({ currentTheme: createDefaultTheme() });
      },

      exportToml: () => {
        const { currentTheme } = get();
        return TomlParser.stringify(currentTheme.config);
      },

      importToml: (tomlString) => {
        try {
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
          }));
        } catch (error) {
          console.error('Failed to import TOML:', error);
          throw error;
        }
      },
    }),
    {
      name: 'starship-theme-storage',
      partialize: (state) => ({
        savedThemes: state.savedThemes,
        currentTheme: state.currentTheme,
      }),
    },
  ),
);
