import { describe, expect, it } from 'vitest';
import { useThemeStore } from './theme-store';

describe('ThemeStore Performance', () => {
  it('should maintain stable config reference when updating metadata', () => {
    // Reset store
    useThemeStore.getState().resetTheme();
    const store = useThemeStore.getState();
    const initialConfig = store.currentTheme.config;
    const initialTheme = store.currentTheme;

    // Update metadata only
    store.updateMetadata({ name: 'Optimized Name' });

    const updatedStore = useThemeStore.getState();
    const updatedTheme = updatedStore.currentTheme;
    const updatedConfig = updatedStore.currentTheme.config;

    // Verify that the theme object reference changed (causing re-render if used as dep)
    expect(updatedTheme).not.toBe(initialTheme);

    // Verify that the config object reference is STABLE (preventing re-render if used as dep)
    expect(updatedConfig).toBe(initialConfig);
  });
});
