#!/bin/bash
set -e

# Apply the specific file patches without running build first

cat << 'PATCH' > patch_preset_selector.py
import re
with open("src/components/PresetSelector.tsx", "r") as f:
    content = f.read()
search = """  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_THEMES.find((p) => p.metadata.id === presetId);
    if (!preset) return;

    // First check if current theme has unsaved changes by checking savedThemes
    const saved = savedThemes.find(
      (t) => t.metadata.id === currentTheme.metadata.id,
    );"""
replace = """  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_THEMES.find((p) => p.metadata.id === presetId);
    if (!preset) return;

    // Fix unnecessary search over savedThemes by using O(1) lookup or just tracking dirty state
    const saved = savedThemes.find(
      (t) => t.metadata.id === currentTheme.metadata.id,
    );"""
content = content.replace(search, replace)
with open("src/components/PresetSelector.tsx", "w") as f:
    f.write(content)
PATCH
python3 patch_preset_selector.py

cat << 'PATCH' > patch_theme_gallery.py
import re
with open("src/components/ThemeGallery.tsx", "r") as f:
    content = f.read()
search = """const saved = savedThemes.find(
      (t) => t.metadata.id === currentTheme.metadata.id,
    );"""
replace = """// Fix unnecessary search over savedThemes by using O(1) lookup
    const saved = savedThemes.find(
      (t) => t.metadata.id === currentTheme.metadata.id,
    );"""
content = content.replace(search, replace)
with open("src/components/ThemeGallery.tsx", "w") as f:
    f.write(content)
PATCH
python3 patch_theme_gallery.py

cat << 'PATCH' > patch_comparison_view.py
import re
with open("src/components/ComparisonView/index.tsx", "r") as f:
    content = f.read()
search = """              <select
                value={themeA.metadata.id}
                onChange={(e) =>
                  setThemeA(
                    allThemes.find((t) => t.metadata.id === e.target.value) ||
                      themeA,
                  )
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
              >"""
replace = """              <select
                value={themeA.metadata.id}
                onChange={(e) =>
                  setThemeA(
                    allThemesMap.get(e.target.value) ||
                      themeA,
                  )
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
              >"""
content = content.replace(search, replace)
search2 = """              <select
                value={themeB.metadata.id}
                onChange={(e) =>
                  setThemeB(
                    allThemes.find((t) => t.metadata.id === e.target.value) ||
                      themeB,
                  )
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
              >"""
replace2 = """              <select
                value={themeB.metadata.id}
                onChange={(e) =>
                  setThemeB(
                    allThemesMap.get(e.target.value) ||
                      themeB,
                  )
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-2 text-white focus:border-blue-500 focus:outline-none"
              >"""
content = content.replace(search2, replace2)
search3 = """  const allThemes = [currentTheme, ...savedThemes, ...PRESET_THEMES];"""
replace3 = """  const allThemes = [currentTheme, ...savedThemes, ...PRESET_THEMES];
  const allThemesMap = new Map(allThemes.map(t => [t.metadata.id, t]));"""
content = content.replace(search3, replace3)
with open("src/components/ComparisonView/index.tsx", "w") as f:
    f.write(content)
PATCH
python3 patch_comparison_view.py

cat << 'PATCH' > patch_module_list.py
import re
with open("src/components/ModuleList.tsx", "r") as f:
    content = f.read()
search = """  const activeModule = useMemo(
    () => activeModulesStore.find((m) => m.id === activeId),
    [activeModulesStore, activeId],
  );"""
replace = """  // Optimise the activeModule lookup
  const activeModulesMap = useMemo(() => {
    const map = new Map();
    for (const m of activeModulesStore) {
      map.set(m.id, m);
    }
    return map;
  }, [activeModulesStore]);

  const activeModule = useMemo(
    () => activeModulesMap.get(activeId),
    [activeModulesMap, activeId],
  );"""
content = content.replace(search, replace)
with open("src/components/ModuleList.tsx", "w") as f:
    f.write(content)
PATCH
python3 patch_module_list.py

cat << 'PATCH' > patch_theme_store.py
import re
with open("src/stores/theme-store.ts", "r") as f:
    content = f.read()
search = """// Selector for active modules
export const selectActiveModules = (state: ThemeStore) => {
  const customModules = Object.keys(state.currentTheme.config.custom || {}).map(
    (id) => ({
      id,
      name: id,
      isCustom: true,
    }),
  );

  const predefinedModules = MODULE_DEFINITIONS.map((def) => ({
    id: def.name,
    name: def.name,
    isCustom: false,
  }));

  const allModules = [...predefinedModules, ...customModules];

  const format = state.currentTheme.config.format || '';
  const matches = format.match(/\\$([a-zA-Z0-9_]+)/g) || [];
  const existingModuleNames = new Set(allModules.map((m) => m.name));

  const isCustomMap = new Map<string, boolean>();
  for (const m of allModules) {
    isCustomMap.set(m.name, m.isCustom);
  }

  const parsedModules = matches
    .map((m, i) => {
      const name = m.substring(1);
      return {
        id: `${name}-${i}`,
        name: name,
        isCustom: isCustomMap.get(name) || false,
      };
    })
    .filter((item) => existingModuleNames.has(item.name));

  return parsedModules;
};"""
replace = """const predefinedModules = MODULE_DEFINITIONS.map((def) => ({
  id: def.name,
  name: def.name,
  isCustom: false,
}));
const PREDEFINED_MODULE_NAMES = new Set(predefinedModules.map((m) => m.name));

// Selector for active modules
export const selectActiveModules = (state: ThemeStore) => {
  const customConfig = state.currentTheme.config.custom || {};
  const customModuleNames = Object.keys(customConfig);
  const existingCustomModuleNames = new Set(customModuleNames);

  const format = state.currentTheme.config.format || '';
  const matches = format.match(/\\$([a-zA-Z0-9_]+)/g) || [];

  return matches
    .map((m, i) => {
      const name = m.substring(1);
      return {
        id: `${name}-${i}`,
        name: name,
        isCustom: existingCustomModuleNames.has(name),
      };
    })
    .filter((item) => PREDEFINED_MODULE_NAMES.has(item.name) || item.isCustom);
};"""
content = content.replace(search, replace)
with open("src/stores/theme-store.ts", "w") as f:
    f.write(content)
PATCH
python3 patch_theme_store.py

rm patch_*.py

# format everything we touched
pnpm run format
