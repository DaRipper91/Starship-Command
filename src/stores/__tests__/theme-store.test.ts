import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useThemeStore } from '../theme-store';

describe('useThemeStore', () => {
  beforeEach(() => {
    // Reset store state
    useThemeStore.setState({
      currentTheme: {
        metadata: {
          id: 'test',
          name: 'Test',
          created: new Date(),
          updated: new Date(),
        },
        config: {},
      },
      savedThemes: [],
      selectedModule: null,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should update config', () => {
    const { updateConfig } = useThemeStore.getState();
    updateConfig({ format: '$directory' });

    expect(useThemeStore.getState().currentTheme.config.format).toBe(
      '$directory',
    );
  });

  it('should set selected module', () => {
    const { setSelectedModule } = useThemeStore.getState();
    setSelectedModule('directory');

    expect(useThemeStore.getState().selectedModule).toBe('directory');
  });

  it('should merge palettes correctly', () => {
    const { updateConfig } = useThemeStore.getState();

    // Initial update
    updateConfig({
      palettes: {
        global: { color1: '#ffffff' },
      },
    });

    // Second update
    updateConfig({
      palettes: {
        global: { color2: '#000000' },
      },
    });

    const config = useThemeStore.getState().currentTheme.config;
    expect(config.palettes?.global?.color1).toBe('#ffffff');
    expect(config.palettes?.global?.color2).toBe('#000000');
  });
});
