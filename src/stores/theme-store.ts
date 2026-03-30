import equal from 'fast-deep-equal';
import { temporal } from 'zundo';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import MODULE_DEFINITIONS from '../generated/module-definitions.json';
import { createDebouncedStorage } from '../lib/storage-utils';
import { TomlParser } from '../lib/toml-parser';
import { generateId } from '../lib/utils';
import { StarshipConfig, Theme, ThemeMetadata } from '../types/starship.types';

export interface DynamicThemeSettings {
  enabled: boolean;
  dayThemeId: string;
  nightThemeId: string;
  dayStartTime: string;
  nightStartTime: string;
}

interface ThemeState {
  currentTheme: Theme;
  savedThemes: Theme[];
  selectedModule: string | null;
  dynamicSettings: DynamicThemeSettings;
}

interface ThemeActions {
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  setSelectedModule: (module: string | null) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: (previewImage?: string) => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;

  // Import/Export
  exportToml: () => string;
  importToml: (tomlString: string) => void;

  // Dynamic Theme
  updateDynamicSettings: (settings: Partial<DynamicThemeSettings>) => void;
}

export type ThemeStore = ThemeState & ThemeActions;

const createDefaultDynamicSettings = (): DynamicThemeSettings => ({
  enabled: false,
  dayThemeId: 'preset-clean',
  nightThemeId: 'preset-dracula',
  dayStartTime: '07:00',
  nightStartTime: '19:00',
});

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
  temporal(
    persist(
      (set, get) => ({
        currentTheme: createDefaultTheme(),
        savedThemes: [],
        selectedModule: null,
        dynamicSettings: createDefaultDynamicSettings(),

        updateConfig: (newConfig) => {
          set((state) => {
            const nextTheme = {
              ...state.currentTheme,
              config: {
                ...state.currentTheme.config,
                palettes: {
                  ...state.currentTheme.config.palettes,
                  global: {
                    ...state.currentTheme.config.palettes?.global,
                    ...newConfig.palettes?.global,
                  },
                },
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
            };

            if (equal(state.currentTheme.config, nextTheme.config)) {
              return {};
            }

            return { currentTheme: nextTheme };
          });
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

        setSelectedModule: (module) => {
          set({ selectedModule: module });
        },

        loadTheme: (theme) => {
          set({
            currentTheme: theme,
            selectedModule: null,
          });
        },

        saveTheme: (previewImage?: string) => {
          const { currentTheme, savedThemes } = get();
          const themeToSave = { ...currentTheme };
          if (previewImage) {
            themeToSave.metadata.previewImage = previewImage;
          }
          const existingIndex = savedThemes.findIndex(
            (t) => t.metadata.id === themeToSave.metadata.id,
          );

          const newSavedThemes = [...savedThemes];
          if (existingIndex >= 0) {
            newSavedThemes[existingIndex] = themeToSave;
          } else {
            newSavedThemes.push(themeToSave);
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
          }));
        },

        updateDynamicSettings: (settings) => {
          set((state) => ({
            dynamicSettings: {
              ...state.dynamicSettings,
              ...settings,
            },
          }));
        },
      }),
      {
        name: 'starship-theme-storage',
        storage: createDebouncedStorage(() => localStorage),
        partialize: (state) => ({
          savedThemes: state.savedThemes,
          currentTheme: state.currentTheme,
          dynamicSettings: state.dynamicSettings,
        }),
      },
    ),
    {
      limit: 50,
      partialize: (state) => ({
        currentTheme: state.currentTheme,
      }),
    },
  ),
);

// Selector for active modules
export const selectActiveModules = (state: ThemeStore) => {
  const customModuleNames = new Set(
    Object.keys(state.currentTheme.config.custom || {}),
  );

  const format = state.currentTheme.config.format || '';
  const matches = format.match(/\$([a-zA-Z0-9_]+)/g) || [];

  const existingModuleNames = new Set([
    ...MODULE_DEFINITIONS.map((def) => def.name),
    ...customModuleNames,
  ]);

  const parsedModules = matches
    .map((m, i) => {
      const name = m.substring(1);
      return {
        id: `${name}-${i}`,
        name: name,
        isCustom: customModuleNames.has(name),
      };
    })
    .filter((item) => existingModuleNames.has(item.name));

  return parsedModules;
};
