import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TomlParser } from '../lib/toml-parser';
import { useThemeStore } from '../stores/theme-store';
import { useDynamicTheme } from './useDynamicTheme';

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

    // Set up the store so it has enabled: false
    useThemeStore.setState({
      dynamicSettings: {
        enabled: false,
        dayThemeId: 'preset-clean',
        nightThemeId: 'preset-dracula',
        dayStartTime: '07:00',
        nightStartTime: '19:00',
      },
    });

    renderHook(() => useDynamicTheme());

    // Should not call loadTheme
    expect(loadThemeSpy).not.toHaveBeenCalled();

    // Restore
    useThemeStore.setState({ loadTheme: originalLoadTheme });
  });

  it('should load day theme when time is within day start and night start times', () => {
    const loadThemeSpy = vi.fn();

    // Patch the store's loadTheme function
    const originalLoadTheme = useThemeStore.getState().loadTheme;
    useThemeStore.setState({ loadTheme: loadThemeSpy });

    // Set up the store with enabled: true and 12:00 PM time (which is day)
    useThemeStore.setState({
      dynamicSettings: {
        enabled: true,
        dayThemeId: 'preset-clean',
        nightThemeId: 'preset-dracula',
        dayStartTime: '07:00',
        nightStartTime: '19:00',
      },
      currentTheme: {
        ...useThemeStore.getState().currentTheme,
        metadata: {
          ...useThemeStore.getState().currentTheme.metadata,
          id: 'test-id', // Not day theme
        },
      },
    });

    renderHook(() => useDynamicTheme());

    // Since mockDate is 12:00 PM, which is between 07:00 and 19:00, day theme should load
    expect(loadThemeSpy).toHaveBeenCalled();
    const calledTheme = loadThemeSpy.mock.calls[0][0];
    expect(calledTheme.metadata.id).toBe('preset-clean');

    // Restore
    useThemeStore.setState({ loadTheme: originalLoadTheme });
  });

  it('should load night theme when time is outside day start and night start times', () => {
    const nightDate = new Date('2024-01-01T21:00:00.000Z'); // 9 PM
    vi.setSystemTime(nightDate);

    const loadThemeSpy = vi.fn();

    // Patch the store's loadTheme function
    const originalLoadTheme = useThemeStore.getState().loadTheme;
    useThemeStore.setState({ loadTheme: loadThemeSpy });

    // Set up the store with enabled: true
    useThemeStore.setState({
      dynamicSettings: {
        enabled: true,
        dayThemeId: 'preset-clean',
        nightThemeId: 'preset-dracula',
        dayStartTime: '07:00',
        nightStartTime: '19:00',
      },
      currentTheme: {
        ...useThemeStore.getState().currentTheme,
        metadata: {
          ...useThemeStore.getState().currentTheme.metadata,
          id: 'test-id', // Not night theme
        },
      },
    });

    renderHook(() => useDynamicTheme());

    // Since mockDate is 21:00, which is after 19:00, night theme should load
    expect(loadThemeSpy).toHaveBeenCalled();
    const calledTheme = loadThemeSpy.mock.calls[0][0];
    expect(calledTheme.metadata.id).toBe('preset-dracula');

    // Restore
    useThemeStore.setState({ loadTheme: originalLoadTheme });
  });
});
