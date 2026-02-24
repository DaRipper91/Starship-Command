import React, { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';
import { Info } from 'lucide-react';
import { StyleEditor } from './StyleEditor';
import { IconBrowser } from './IconBrowser';
import { FormatEditor } from './FormatEditor';

export const ModuleConfig = React.memo(function ModuleConfig() {
  const selectedModule = useThemeStore((state) => state.selectedModule);
  const updateConfig = useThemeStore((state) => state.updateConfig);
  // Selector to only subscribe to the configuration of the selected module
  // This prevents re-renders when other parts of the theme change (like metadata or other modules)
  const moduleConfig = useThemeStore((state) => {
    if (!state.selectedModule) return {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (state.currentTheme.config as any)[state.selectedModule] || {};
  });

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

  if (!selectedModule) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/20 p-8 text-center">
        <Info className="mb-3 h-10 w-10 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-300">
          No Module Selected
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Select a module from the list to edit its configuration.
        </p>
      </div>
    );
  }

  const handleChange = (key: string, value: string | boolean | number) => {
    updateConfig({
      [selectedModule]: {
        ...moduleConfig,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-[#1e1e1e] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold capitalize text-gray-100">
            {selectedModule.replace(/_/g, ' ')}
          </h2>
          <p className="text-sm text-gray-500">Module Configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={moduleConfig.disabled === true}
              onChange={(e) => handleChange('disabled', e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            Disabled
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Style Configuration */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Style
          </label>
          <StyleEditor
            value={moduleConfig.style || ''}
            onChange={(val) => handleChange('style', val)}
          />
        </div>

        {/* Symbol Configuration */}
        <div className="relative space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Symbol
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={moduleConfig.symbol || ''}
              onChange={(e) => handleChange('symbol', e.target.value)}
              placeholder="e.g. ❯ "
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowIconBrowser(!showIconBrowser)}
              className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Browse
            </button>
          </div>

          {showIconBrowser && (
            <div
              ref={iconBrowserRef}
              className="absolute left-0 top-full z-50 mt-1 w-full sm:w-[400px]"
            >
              <IconBrowser
                currentSymbol={moduleConfig.symbol as string}
                onSelect={(symbol) => {
                  handleChange('symbol', symbol);
                  setShowIconBrowser(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Format Configuration - Full Width */}
        <div className="col-span-2 space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Format String
          </label>
          <FormatEditor
            formatString={moduleConfig.format || ''}
            onChange={(newFormat) => handleChange('format', newFormat)}
          />
          <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Visually edit your module's format string. Click on segments to
              edit or add new ones.
            </p>
          </div>
        </div>

        {/* Additional Properties based on Module Type */}
        {selectedModule === 'directory' && (
          <div className="col-span-2 space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-400">
              Directory Options
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">
                  Truncation Length
                </label>
                <input
                  type="number"
                  value={moduleConfig.truncation_length ?? 3}
                  onChange={(e) =>
                    handleChange('truncation_length', parseInt(e.target.value))
                  }
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex h-full items-center pt-4">
                <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={moduleConfig.truncate_to_repo === true}
                    onChange={(e) =>
                      handleChange('truncate_to_repo', e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  Truncate to Repo Root
                </label>
              </div>
            </div>
          </div>
        )}

        {selectedModule === 'git_status' && (
          <div className="col-span-2 space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-400">
              Git Status Symbols
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                'conflicted',
                'ahead',
                'behind',
                'diverged',
                'untracked',
                'stashed',
                'modified',
                'staged',
                'renamed',
                'deleted',
              ].map((key) => (
                <div key={key} className="relative space-y-1">
                  <label className="block text-xs capitalize text-gray-500">
                    {key.replace('_', ' ')} Symbol
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={moduleConfig[key] || ''}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder="e.g. ✖ "
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() =>
                        setShowIconBrowser(
                          showIconBrowser === key ? null : (key as string),
                        )
                      }
                      className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      Browse
                    </button>
                  </div>
                  {showIconBrowser === key && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-full sm:w-[400px]">
                      <IconBrowser
                        currentSymbol={moduleConfig[key] as string}
                        onSelect={(symbol) => {
                          handleChange(key, symbol);
                          setShowIconBrowser(null);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
