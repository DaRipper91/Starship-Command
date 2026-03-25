import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useKeyboardShortcuts } from './useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  it('should trigger shortcut when no element is focused', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { keys: 'ctrl+k', handler, description: 'test shortcut' },
      ]),
    );

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it('should suppress non-save shortcuts when an input is focused', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { keys: 'ctrl+k', handler, description: 'test shortcut' },
      ]),
    );

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    expect(handler).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);

    document.body.removeChild(input);
  });

  it('should allow save shortcut with metaKey even when an input is focused', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { keys: 'mod+s', handler, description: 'save theme' },
      ]),
    );

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', {
      key: 's',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);

    document.body.removeChild(input);
  });

  it('should allow save shortcut with ctrlKey even when an input is focused', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { keys: 'mod+s', handler, description: 'save theme' },
      ]),
    );

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent('keydown', {
      key: 's',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);

    document.body.removeChild(input);
  });

  it('should respect requiresMod for Cmd on Mac', () => {
    const handler = vi.fn();
    renderHook(() =>
      useKeyboardShortcuts([
        { keys: 'mod+k', handler, description: 'test mod' },
      ]),
    );

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);

    expect(handler).toHaveBeenCalled();
  });
});
