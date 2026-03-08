import { Palette } from 'lucide-react';

import { useConfirmation } from '../contexts/ConfirmationContext';
import { useToast } from '../contexts/ToastContext';
import { PRESET_THEMES } from '../lib/presets';
import { useThemeStore } from '../stores/theme-store';

export function PresetSelector() {
  const { loadTheme, past } = useThemeStore();
  const { addToast } = useToast();
  const confirm = useConfirmation();

  const handleSelectPreset = async (presetId: string) => {
    const preset = PRESET_THEMES.find((p) => p.metadata.id === presetId);
    if (!preset) return;

    if (past && past.length > 0) {
      const confirmed = await confirm({
        title: 'Apply Preset?',
        message:
          'This will overwrite your current theme changes. Are you sure?',
        confirmText: 'Apply',
      });
      if (!confirmed) return;
    }

    loadTheme(preset);
    addToast(`Applied preset: ${preset.metadata.name}`, 'success');
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
        <Palette size={16} /> Theme Presets
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {PRESET_THEMES.map((preset) => (
          <button
            key={preset.metadata.id}
            onClick={() => handleSelectPreset(preset.metadata.id)}
            className="truncate rounded border border-gray-700 bg-gray-800 px-3 py-2 text-left text-xs font-medium text-gray-300 transition-colors hover:border-blue-500 hover:bg-gray-700 hover:text-white"
          >
            {preset.metadata.name}
          </button>
        ))}
      </div>
    </div>
  );
}
