import { ChevronDown, Palette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';

import { useConfirmation } from '../contexts/ConfirmationContext';
import { useToast } from '../contexts/ToastContext';
import { PRESET_THEMES } from '../lib/presets';
import { useThemeStore } from '../stores/theme-store';

export function PresetSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { currentTheme, loadTheme, savedThemes } = useThemeStore();
  const pastStates = useStore(
    useThemeStore.temporal,
    (state) => state.pastStates,
  );
  const { addToast } = useToast();
  const confirm = useConfirmation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectPreset = async (presetId: string) => {
    setIsOpen(false);

    const preset = PRESET_THEMES.find((p) => p.metadata.id === presetId);
    if (!preset) return;

    // Check if unsaved
    const saved = savedThemes.find(
      (t) => t.metadata.id === currentTheme.metadata.id,
    );
    let hasUnsavedChanges = false;

    if (!saved) {
      hasUnsavedChanges = true;
    } else {
      if (
        new Date(currentTheme.metadata.updated) >
        new Date(saved.metadata.updated)
      ) {
        hasUnsavedChanges = true;
      }
    }

    const hasHistory = pastStates.length > 0;

    if (hasUnsavedChanges && hasHistory) {
      const confirmed = await confirm({
        title: 'Apply Preset?',
        message:
          'This will overwrite your current theme changes. Are you sure?',
        confirmText: 'Apply Anyway',
      });
      if (!confirmed) return;
    }

    try {
      loadTheme(preset);
      addToast(`Applied preset: ${preset.metadata.name}`, 'success');
    } catch (err) {
      addToast('Failed to load preset.', 'error');
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded bg-gray-800 px-3 py-1.5 text-xs font-medium hover:bg-gray-700"
      >
        <Palette size={14} /> Presets <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {PRESET_THEMES.map((preset) => (
              <button
                key={preset.metadata.id}
                onClick={() => handleSelectPreset(preset.metadata.id)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-blue-600 hover:text-white"
              >
                {preset.metadata.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
