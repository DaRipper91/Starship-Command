import { beforeEach, describe, expect, it } from 'vitest';

import { TomlParser } from '../lib/toml-parser';
import { useThemeStore } from './theme-store';

describe('Undo/Redo System', () => {
  beforeEach(() => {
    useThemeStore.setState({
      currentTheme: {
        metadata: {
          id: 'test-id',
          name: 'Test Theme',
          created: new Date(),
          updated: new Date(),
        },
        config: TomlParser.getDefaultConfig(),
      },
      savedThemes: [],
      past: [],
      future: [],
    });
  });

  it('should push state to past when config is updated', () => {
    const store = useThemeStore.getState();
    const initialConfig = JSON.stringify(store.currentTheme.config);

    // First update
    store.updateConfig({ format: 'step 1' });

    expect(useThemeStore.getState().past.length).toBe(1);
    expect(JSON.stringify(useThemeStore.getState().past[0].config)).toBe(
      initialConfig,
    );
    expect(useThemeStore.getState().currentTheme.config.format).toBe('step 1');
  });

  it('should allow undoing changes', () => {
    const store = useThemeStore.getState();
    const initialFormat = store.currentTheme.config.format;

    // Make change
    store.updateConfig({ format: 'changed' });

    // Undo
    store.undo();

    expect(useThemeStore.getState().currentTheme.config.format).toBe(
      initialFormat,
    );
    expect(useThemeStore.getState().past.length).toBe(0);
    expect(useThemeStore.getState().future.length).toBe(1);
    expect(useThemeStore.getState().future[0].config.format).toBe('changed');
  });

  it('should allow redoing changes', () => {
    const store = useThemeStore.getState();

    store.updateConfig({ format: 'changed' });
    store.undo();
    store.redo();

    expect(useThemeStore.getState().currentTheme.config.format).toBe('changed');
    expect(useThemeStore.getState().past.length).toBe(1);
    expect(useThemeStore.getState().future.length).toBe(0);
  });

  it('should clear future stack when new change occurs', () => {
    const store = useThemeStore.getState();

    store.updateConfig({ format: 'step 1' });
    store.undo(); // back to initial, future has 'step 1'

    // New divergent change
    store.updateConfig({ format: 'step 2' });

    expect(useThemeStore.getState().currentTheme.config.format).toBe('step 2');
    expect(useThemeStore.getState().future.length).toBe(0); // 'step 1' is lost
    expect(useThemeStore.getState().past.length).toBe(1); // initial state
  });

  it('should maintain immutability of history items', () => {
    const store = useThemeStore.getState();

    store.updateConfig({ format: 'step 1' });
    const pastState = useThemeStore.getState().past[0];

    // Mutate current state deeply
    if (useThemeStore.getState().currentTheme.config.directory) {
      useThemeStore.getState().currentTheme.config.directory!.style = 'mutated';
    }

    // Check past state wasn't affected
    expect(pastState.config.directory?.style).not.toBe('mutated');
  });
});
