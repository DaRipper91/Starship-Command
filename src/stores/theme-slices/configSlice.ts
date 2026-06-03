import equal from 'fast-deep-equal';
import { StateCreator } from 'zustand';
import { TomlParser } from '../../lib/toml-parser';
import { generateId } from '../../lib/utils';
import { StarshipConfig, Theme, ThemeMetadata } from '../../types/starship.types';
import { ThemeStore, ConfigSlice } from '../../types/theme-store.types';

export const createDefaultTheme = (): Theme => ({
  metadata: {
    id: generateId(),
    name: 'Untitled Theme',
    created: new Date(),
    updated: new Date(),
  },
  config: TomlParser.getDefaultConfig(),
});

// Helper for deep cloning
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  const objCopy = {} as Record<string, unknown>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = deepClone((obj as Record<string, unknown>)[key]);
    }
  }
  return objCopy as T;
};

export const createConfigSlice: StateCreator<
  ThemeStore,
  [['temporal', unknown], ['zustand/persist', unknown]],
  [],
  ConfigSlice
> = (set, get) => ({
  currentTheme: createDefaultTheme(),
  savedThemes: [],

  updateConfig: (newConfig: Partial<StarshipConfig>) => {
    set((state: ThemeStore) => {
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
            Object.entries(newConfig).filter(([key]) => key !== 'palettes'),
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

      return {
        currentTheme: nextTheme,
      };
    });
  },

  updateMetadata: (newMetadata: Partial<ThemeMetadata>) => {
    set((state: ThemeStore) => {
      const nextTheme = {
        ...state.currentTheme,
        metadata: {
          ...state.currentTheme.metadata,
          ...newMetadata,
          updated: new Date(),
        },
      };
      return {
        currentTheme: nextTheme,
      };
    });
  },

  loadTheme: (theme: Theme) => {
    set({
      currentTheme: deepClone(theme),
      selectedModule: null,
    });
  },

  saveTheme: (previewImage?: string) => {
    const { currentTheme, savedThemes } = get();
    const themeToSave = deepClone(currentTheme);
    if (previewImage) {
      themeToSave.metadata.previewImage = previewImage;
    }
    const existingIndex = savedThemes.findIndex(
      (t: Theme) => t.metadata.id === themeToSave.metadata.id,
    );

    const newSavedThemes = [...savedThemes];
    if (existingIndex >= 0) {
      newSavedThemes[existingIndex] = themeToSave;
    } else {
      newSavedThemes.push(themeToSave);
    }

    set({ savedThemes: newSavedThemes });
  },

  deleteTheme: (id: string) => {
    set((state: ThemeStore) => ({
      savedThemes: state.savedThemes.filter((t: Theme) => t.metadata.id !== id),
    }));
  },

  addCustomModule: (name: string) => {
    set((state: ThemeStore) => ({
      currentTheme: {
        ...state.currentTheme,
        config: {
          ...state.currentTheme.config,
          custom: {
            ...state.currentTheme.config.custom,
            [name]: {
              command: 'echo "Hello from custom module"',
              when: 'true',
              style: 'bold green',
              format: '[()]()',
            },
          },
        },
      },
    }));
  },

  removeCustomModule: (name: string) => {
    set((state: ThemeStore) => {
      const nextCustom = { ...state.currentTheme.config.custom };
      delete nextCustom[name];
      return {
        currentTheme: {
          ...state.currentTheme,
          config: {
            ...state.currentTheme.config,
            custom: nextCustom,
          },
        },
      };
    });
  },

  resetTheme: () => {
    set({
      currentTheme: createDefaultTheme(),
      selectedModule: null,
    });
  },

  exportToml: () => {
    const { currentTheme } = get();
    return TomlParser.stringify(currentTheme.config, currentTheme.metadata);
  },

  importToml: (tomlString: string) => {
    const { config, metadata } = TomlParser.parse(tomlString);
    set((state: ThemeStore) => ({
      currentTheme: {
        ...state.currentTheme,
        config,
        metadata: {
          ...state.currentTheme.metadata,
          ...(metadata as any),
          updated: new Date(),
        },
      },
      selectedModule: null,
    }));
  },
});
