import { useEffect, useMemo, useRef } from 'react';

type KeyCombo = string; // e.g., "meta+s" or "ctrl+k"
type ShortcutHandler = (e: KeyboardEvent) => void;

interface Shortcut {
  keys: KeyCombo;
  handler: ShortcutHandler;
  description: string;
}

interface ParsedShortcut extends Shortcut {
  requiresMeta: boolean;
  requiresCtrl: boolean;
  requiresShift: boolean;
  requiresAlt: boolean;
  requiresMod: boolean;
  mainKey: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const parsedShortcuts = useMemo(() => {
    return shortcuts.map((shortcut) => {
      const keys = shortcut.keys.toLowerCase().split('+');
      return {
        ...shortcut,
        requiresMeta: keys.includes('meta') || keys.includes('cmd'),
        requiresCtrl: keys.includes('ctrl'),
        requiresShift: keys.includes('shift'),
        requiresAlt: keys.includes('alt'),
        requiresMod: keys.includes('mod'),
        mainKey: keys[keys.length - 1],
      };
    });
  }, [shortcuts]);

  const shortcutsRef = useRef<ParsedShortcut[]>(parsedShortcuts);

  useEffect(() => {
    shortcutsRef.current = parsedShortcuts;
  }, [parsedShortcuts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isEditable =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName) ||
        target?.isContentEditable;

      // When in an input, suppress all custom shortcuts (like Cmd+Z for theme undo)
      // so the browser can handle text editing natively.
      // Exception: Allow Cmd+S (Save) to trigger from anywhere.
      if (isEditable) {
        const isSave = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's';
        if (!isSave) {
          return;
        }
      }

      shortcutsRef.current.forEach((shortcut) => {
        const {
          requiresMeta,
          requiresCtrl,
          requiresShift,
          requiresAlt,
          requiresMod,
          mainKey,
          handler,
        } = shortcut;

        const isMatch =
          (requiresMeta ? e.metaKey : !e.metaKey) &&
          (requiresCtrl ? e.ctrlKey : !e.ctrlKey) &&
          (requiresShift ? e.shiftKey : !e.shiftKey) &&
          (requiresAlt ? e.altKey : !e.altKey) &&
          e.key.toLowerCase() === mainKey;

        // Special handling for 'mod' (Cmd on Mac, Ctrl on Win/Linux)
        const modActive = e.metaKey || e.ctrlKey;

        const isModMatch =
          requiresMod &&
          modActive &&
          (requiresShift ? e.shiftKey : !e.shiftKey) &&
          (requiresAlt ? e.altKey : !e.altKey) &&
          e.key.toLowerCase() === mainKey;

        if (isMatch || isModMatch) {
          e.preventDefault();
          handler(e);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
