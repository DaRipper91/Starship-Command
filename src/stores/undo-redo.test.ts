import { beforeEach, describe, expect, it } from 'vitest';

import { useThemeStore } from './theme-store';

describe('Undo/Redo Logic', () => {
  beforeEach(() => {
    useThemeStore.setState({
      past: [],
      future: [],
      currentTheme: {
        metadata: {
          id: 'test',
          name: 'Initial',
          created: new Date(),
          updated: new Date(),
        },
        config: { format: 'initial' },
      },
    });
  });

  it('should push to past on updateConfig', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });

    const newStore = useThemeStore.getState();
    expect(newStore.past.length).toBe(1);
    expect(newStore.past[0].config.format).toBe('initial');
    expect(newStore.currentTheme.config.format).toBe('changed');
  });

  it('should undo correctly', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });

    useThemeStore.getState().undo();

    const restoredStore = useThemeStore.getState();
    expect(restoredStore.currentTheme.config.format).toBe('initial');
    expect(restoredStore.past.length).toBe(0);
    expect(restoredStore.future.length).toBe(1);
    expect(restoredStore.future[0].config.format).toBe('changed');
  });

  it('should redo correctly', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'changed' });
    store.undo();
    store.redo();

    const redoneStore = useThemeStore.getState();
    expect(redoneStore.currentTheme.config.format).toBe('changed');
    expect(redoneStore.past.length).toBe(1);
    expect(redoneStore.future.length).toBe(0);
  });

  it('should clear future on new change', () => {
    const store = useThemeStore.getState();
    store.updateConfig({ format: 'change1' });
    store.undo(); // back to initial, future has change1
    store.updateConfig({ format: 'change2' });

    const newStore = useThemeStore.getState();
    expect(newStore.currentTheme.config.format).toBe('change2');
    expect(newStore.future.length).toBe(0); // change1 lost
    expect(newStore.past.length).toBe(1); // initial
  });
});
