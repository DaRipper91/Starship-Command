import { StarshipConfig, Theme, ThemeMetadata } from "./starship.types";

export interface DynamicThemeSettings {
  enabled: boolean;
  dayThemeId: string;
  nightThemeId: string;
  dayStartTime: string;
  nightStartTime: string;
}

export interface ThemeStore extends ConfigSlice, UISlice {
  // Actions that might need access to both slices or are top-level
  undo: () => void;
  redo: () => void;
}

export interface ConfigSlice {
  currentTheme: Theme;
  savedThemes: Theme[];

  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: (previewImage?: string) => void;
  addCustomModule: (name: string) => void;
  removeCustomModule: (name: string) => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;

  exportToml: () => string;
  importToml: (tomlString: string) => void;
}

export interface UISlice {
  selectedModule: string | null;
  dynamicSettings: DynamicThemeSettings;
  setSelectedModule: (module: string | null) => void;
  updateDynamicSettings: (settings: Partial<DynamicThemeSettings>) => void;
}
