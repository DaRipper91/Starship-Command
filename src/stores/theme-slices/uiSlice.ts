import { StateCreator } from "zustand";
import {
  ThemeStore,
  UISlice,
  DynamicThemeSettings,
} from "../../types/theme-store.types";

export const createDefaultDynamicSettings = (): DynamicThemeSettings => ({
  enabled: false,
  dayThemeId: "preset-clean",
  nightThemeId: "preset-dracula",
  dayStartTime: "07:00",
  nightStartTime: "19:00",
});

export const createUISlice: StateCreator<ThemeStore, [], [], UISlice> = (
  set,
) => ({
  selectedModule: null,
  dynamicSettings: createDefaultDynamicSettings(),

  setSelectedModule: (module: string | null) => {
    set({ selectedModule: module });
  },

  updateDynamicSettings: (settings: Partial<DynamicThemeSettings>) => {
    set((state: ThemeStore) => ({
      dynamicSettings: {
        ...state.dynamicSettings,
        ...settings,
      },
    }));
  },
});
