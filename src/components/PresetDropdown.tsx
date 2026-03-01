import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { PRESET_THEMES } from '../lib/presets';
import { cn } from '../lib/utils';
import { useThemeStore } from '../stores/theme-store';
import { Theme } from '../types/starship.types';

export function PresetDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { loadTheme, past } = useThemeStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (theme: Theme) => {
    // Check for unsaved changes
    const hasHistory = past.length > 0;
    if (hasHistory) {
      if (!confirm('You have unsaved changes. Load preset?')) {
        return;
      }
    }

    loadTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-sm font-medium hover:bg-gray-700"
      >
        <span>Presets</span>
        <ChevronDown
          size={14}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
          <div className="max-h-[300px] overflow-y-auto p-1">
            {PRESET_THEMES.map((theme) => (
              <button
                key={theme.metadata.id}
                onClick={() => handleSelect(theme)}
                className="flex w-full flex-col gap-1 rounded px-3 py-2 text-left hover:bg-gray-700"
              >
                <span className="font-medium text-gray-200">
                  {theme.metadata.name}
                </span>
                <span className="truncate text-xs text-gray-500">
                  {theme.metadata.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
