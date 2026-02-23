import { useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';
import { PRESET_THEMES } from '../lib/presets';

// Define a basic interface for dynamic theme settings
interface DynamicThemeSettings {
  enabled: boolean;
  dayThemeId?: string; // ID of theme to use during day
  nightThemeId?: string; // ID of theme to use during night
  dayStartTime?: string; // e.g., "07:00"
  nightStartTime?: string; // e.g., "19:00"
}

// This hook would be integrated into App.tsx or a global settings provider
// For MVP, we'll hardcode some settings or assume they come from themeStore.settings
export function useDynamicTheme() {
  const { loadTheme, savedThemes, currentTheme } = useThemeStore();

  useEffect(() => {
    // For now, let's hardcode a simple dynamic setting for demonstration
    const dynamicSettings: DynamicThemeSettings = {
      enabled: true, // Assume dynamic themes are enabled
      dayThemeId: 'preset-clean', // Use a preset as day theme
      nightThemeId: 'preset-dracula', // Use another preset as night theme
      dayStartTime: '07:00',
      nightStartTime: '19:00',
    };

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
        const targetTheme = [...savedThemes, ...PRESET_THEMES].find(
          (theme) => theme.metadata.id === themeToApplyId,
        );
        if (targetTheme) {
          loadTheme(targetTheme);
        }
      }
    };

    // Check immediately and then every minute
    checkAndApplyTheme();
    const intervalId = setInterval(checkAndApplyTheme, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [loadTheme, savedThemes, currentTheme.metadata.id]);
}
