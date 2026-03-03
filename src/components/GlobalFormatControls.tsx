import { Info, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useThemeStore } from '../stores/theme-store';
import { FormatEditor } from './FormatEditor';
import { IconBrowser } from './IconBrowser';

export function GlobalFormatControls() {
  const { currentTheme, updateConfig } = useThemeStore();
  const [showIconBrowser, setShowIconBrowser] = useState<string | null>(null);
  const iconBrowserRef = useRef<HTMLDivElement>(null);

  // Click outside to close icon browser
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        iconBrowserRef.current &&
        !iconBrowserRef.current.contains(event.target as Node) &&
        showIconBrowser
      ) {
        setShowIconBrowser(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showIconBrowser]);

  const handleChange = (
    key: keyof typeof currentTheme.config,
    value: string | boolean,
  ) => {
    updateConfig({
      [key]: value,
    });
  };

  const handleSymbolChange = (key: string, symbol: string) => {
    if (key === 'continuation_prompt') {
      handleChange(key, symbol);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
        <Settings size={20} className="text-gray-400" /> Global Format Settings
      </h2>

      {/* Main Format String */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Left Prompt Format
        </label>
        <FormatEditor
          formatString={currentTheme.config.format || ''}
          onChange={(newFormat) => handleChange('format', newFormat)}
        />
        <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Visually edit the main format string for your left prompt.</p>
        </div>
      </div>

      {/* Right Format String */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Right Prompt Format (optional)
        </label>
        <FormatEditor
          formatString={currentTheme.config.right_format || ''}
          onChange={(newFormat) => handleChange('right_format', newFormat)}
        />
        <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Define a separate format string for a right-aligned prompt.</p>
        </div>
      </div>

      {/* Add Newline Toggle */}
      <div>
        <label className="flex cursor-pointer select-none items-center gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={currentTheme.config.add_newline !== false}
            onChange={(e) => handleChange('add_newline', e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
          />
          Add Newline (before prompt)
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Whether to add a newline before the prompt. Recommended.
        </p>
      </div>

      {/* Continuation Prompt */}
      <div className="relative space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Continuation Prompt
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentTheme.config.continuation_prompt || ''}
            onChange={(e) =>
              handleChange('continuation_prompt', e.target.value)
            }
            placeholder="e.g. '[∙](bright-black) '
"
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() =>
              setShowIconBrowser(
                showIconBrowser === 'continuation_prompt'
                  ? null
                  : 'continuation_prompt',
              )
            }
            className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Browse
          </button>
        </div>
        {showIconBrowser === 'continuation_prompt' && (
          <div
            ref={iconBrowserRef}
            className="absolute left-0 top-full z-50 mt-1 w-full sm:w-[400px]"
          >
            <IconBrowser
              currentSymbol={currentTheme.config.continuation_prompt as string}
              onSelect={(symbol) => {
                handleSymbolChange('continuation_prompt', symbol);
                setShowIconBrowser(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
