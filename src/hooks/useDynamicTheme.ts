import { useEffect, useMemo } from 'react';

import { PRESET_THEMES } from '../lib/presets';
import { useThemeStore } from '../stores/theme-store';
import { Theme } from '../types/starship.types';

export function useDynamicTheme() {
  const { loadTheme, savedThemes, currentTheme, dynamicSettings } =
    useThemeStore();

  const themeMap = useMemo(() => {
    const map = new Map<string, Theme>();
    for (const theme of savedThemes) {
      if (!map.has(theme.metadata.id)) map.set(theme.metadata.id, theme);
    }
    for (const theme of PRESET_THEMES) {
      if (!map.has(theme.metadata.id)) map.set(theme.metadata.id, theme);
    }
    return map;
  }, [savedThemes]);

  useEffect(() => {
    if (!dynamicSettings.enabled) return;

    const checkAndApplyTheme = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      const [dayHour, dayMinute] = dynamicSettings
        .dayStartTime!.split(':')
        .map(Number);
      const dayTimeInMinutes = dayHour * 60 + dayMinute;

      const [nightHour, nightMinute] = dynamicSettings
        .nightStartTime!.split(':')
        .map(Number);
      const nightTimeInMinutes = nightHour * 60 + nightMinute;

      let themeToApplyId = '';

      if (
        currentTimeInMinutes >= dayTimeInMinutes &&
        currentTimeInMinutes < nightTimeInMinutes
      ) {
        themeToApplyId = dynamicSettings.dayThemeId!;
      } else {
        themeToApplyId = dynamicSettings.nightThemeId!;
      }

      // Only apply if the theme is different from current to avoid unnecessary re-renders
      if (currentTheme.metadata.id !== themeToApplyId) {
        const targetTheme = themeMap.get(themeToApplyId);

        if (targetTheme) {
          loadTheme(targetTheme);
        }
      }
    };

    // Check immediately and then every minute
    checkAndApplyTheme();
    const intervalId = setInterval(checkAndApplyTheme, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [
    loadTheme,
    themeMap,
    currentTheme.metadata.id,
    dynamicSettings.enabled,
    dynamicSettings.dayThemeId,
    dynamicSettings.nightThemeId,
    dynamicSettings.dayStartTime,
    dynamicSettings.nightStartTime,
  ]);
}
