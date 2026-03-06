import { useEffect, useRef } from 'react';

type KeyCombo = string; // e.g., "meta+s" or "ctrl+k"
type ShortcutHandler = (e: KeyboardEvent) => void;

interface Shortcut {
  keys: KeyCombo;
  handler: ShortcutHandler;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const shortcutsRef = useRef(shortcuts);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isEditable =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable;

      const pressedKey = e.key.toLowerCase();
      const isUndoRedo =
        (e.metaKey || e.ctrlKey) && (pressedKey === 'z' || pressedKey === 'y');

      // Let the browser handle undo/redo natively inside editable elements
      if (isEditable && isUndoRedo) {
        return;
      }

      // Suppress non-modifier shortcuts inside editable elements (allow Cmd/Ctrl combos like Cmd+S, Cmd+K)
      if (isEditable && !e.metaKey && !e.ctrlKey) {
        return;
      }

      shortcutsRef.current.forEach((shortcut) => {
        const keys = shortcut.keys.toLowerCase().split('+');
        const requiresMeta = keys.includes('meta') || keys.includes('cmd');
        const requiresCtrl = keys.includes('ctrl');
        const requiresShift = keys.includes('shift');
        const requiresAlt = keys.includes('alt');
        const mainKey = keys[keys.length - 1];

        const isMatch =
          (requiresMeta ? e.metaKey : !e.metaKey) &&
          (requiresCtrl ? e.ctrlKey : !e.ctrlKey) &&
          (requiresShift ? e.shiftKey : !e.shiftKey) &&
          (requiresAlt ? e.altKey : !e.altKey) &&
          e.key.toLowerCase() === mainKey;

        // On mac we often say "meta" or "cmd" but use e.metaKey.
        // On windows we often say "ctrl" and use e.ctrlKey.
        // We will support a generic "mod" for either.
        const requiresMod = keys.includes('mod');
        const modActive = e.metaKey || e.ctrlKey;

        const isModMatch =
          requiresMod &&
          modActive &&
          (requiresShift ? e.shiftKey : !e.shiftKey) &&
          (requiresAlt ? e.altKey : !e.altKey) &&
          e.key.toLowerCase() === mainKey;

        if (isMatch || isModMatch) {
          e.preventDefault();
          shortcut.handler(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
