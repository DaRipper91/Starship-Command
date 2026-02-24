import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDynamicTheme } from './useDynamicTheme';
import { useThemeStore } from '../stores/theme-store';
import { TomlParser } from '../lib/toml-parser';

describe('useDynamicTheme', () => {
  const mockDate = new Date('2024-01-01T12:00:00.000Z'); // Noon

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    // Reset store
    useThemeStore.setState({
      currentTheme: {
        metadata: {
          id: 'test-id',
          name: 'Test Theme',
          created: mockDate,
          updated: mockDate,
        },
        config: TomlParser.getDefaultConfig(),
      },
      savedThemes: [],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should not load theme when disabled', () => {
    const loadThemeSpy = vi.fn();

    // Patch the store's loadTheme function
    const originalLoadTheme = useThemeStore.getState().loadTheme;
    useThemeStore.setState({ loadTheme: loadThemeSpy });

    // The hook has enabled: false hardcoded now
    renderHook(() => useDynamicTheme());

    // Should not call loadTheme
    expect(loadThemeSpy).not.toHaveBeenCalled();

    // Restore
    useThemeStore.setState({ loadTheme: originalLoadTheme });
  });
});
