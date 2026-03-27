import { beforeEach, describe, expect, it } from 'vitest';

import { useThemeStore } from './theme-store';

describe('Undo/Redo Logic', () => {
  beforeEach(() => {
    // Reset state before each test
    useThemeStore.setState({
      currentTheme: {
        metadata: {
          id: 'initial',
          name: 'Initial',
          created: new Date(),
          updated: new Date(),
        },
        config: { format: 'initial' },
      },
    });
    useThemeStore.temporal.getState().clear();
  });

  it('should push to past on updateConfig', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });

    const temporalState = useThemeStore.temporal.getState();
    expect(temporalState.pastStates.length).toBe(1);
    expect(temporalState.pastStates[0].currentTheme.config.format).toBe(
      'initial',
    );

    const newStore = useThemeStore.getState();
    expect(newStore.currentTheme.config.format).toBe('changed');
  });

  it('should undo correctly', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });

    useThemeStore.temporal.getState().undo();

    const restoredStore = useThemeStore.getState();
    expect(restoredStore.currentTheme.config.format).toBe('initial');
  });

  it('should redo correctly', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });

    useThemeStore.temporal.getState().undo();
    useThemeStore.temporal.getState().redo();

    const redoneStore = useThemeStore.getState();
    expect(redoneStore.currentTheme.config.format).toBe('changed');
  });

  it('should clear future on new change', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'change1' });

    useThemeStore.temporal.getState().undo(); // back to initial, future has change1

    store.updateConfig({ format: 'change2' });

    const temporalState = useThemeStore.temporal.getState();
    expect(temporalState.futureStates.length).toBe(0);
    expect(useThemeStore.getState().currentTheme.config.format).toBe('change2');
  });
});
