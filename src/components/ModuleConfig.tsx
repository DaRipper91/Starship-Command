import { Info } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useConfirmation } from '../contexts/ConfirmationContext';
import MODULE_DEFINITIONS from '../generated/module-definitions.json';
import { ColorUtils } from '../lib/color-utils';
import { parseFormattedString } from '../lib/format-parser';
import { MOCK_SCENARIOS } from '../lib/mock-data';
import { useThemeStore } from '../stores/theme-store';
import {
  BaseModuleConfig,
  CustomModuleConfig,
  DirectoryConfig,
  GitStatusConfig,
  StarshipConfig,
} from '../types/starship.types';
import { FormatEditor } from './FormatEditor';
import { IconBrowser } from './IconBrowser';
import { StyleEditor } from './StyleEditor';

function segmentStyle(
  style: string,
  config: StarshipConfig,
): React.CSSProperties {
  if (!style) return {};
  const css: React.CSSProperties = {};
  const paletteName = config.palette || 'global';
  const palette = config.palettes?.[paletteName] || {};
  const parts = style.split(/\s+/);

  parts.forEach((part) => {
    if (!part) return;
    if (part === 'bold') {
      css.fontWeight = 'bold';
      return;
    }
    if (part === 'italic') {
      css.fontStyle = 'italic';
      return;
    }
    if (part === 'underline') {
      css.textDecoration = 'underline';
      return;
    }
    if (part === 'dimmed') {
      css.opacity = 0.5;
      return;
    }
    if (part === 'strikethrough') {
      css.textDecoration = 'line-through';
      return;
    }
    if (part === 'hidden') {
      css.visibility = 'hidden';
      return;
    }
    if (part === 'inverted') return;
    if (part.startsWith('bg:')) {
      css.backgroundColor = ColorUtils.resolveColor(part.substring(3), palette);
      return;
    }
    css.color = ColorUtils.resolveColor(part, palette);
  });

  return css;
}

function ModulePreview({
  moduleName,
  config,
}: {
  moduleName: string;
  config: StarshipConfig;
}) {
  const segments = useMemo(
    () => parseFormattedString(`$${moduleName}`, config, MOCK_SCENARIOS.dev),
    [moduleName, config],
  );

  const hasContent = segments.some((s) => s.text.trim());
  if (!hasContent) return null;

  return (
    <div className="rounded-md border border-gray-700 bg-[#0d1117] px-4 py-2">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
        Preview
      </p>
      <pre className="font-mono text-sm leading-relaxed">
        {segments.map((seg, i) => (
          <span key={i} style={segmentStyle(seg.style, config)}>
            {seg.text}
          </span>
        ))}
      </pre>
    </div>
  );
}

function CommaSeparatedInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [raw, setRaw] = useState(values.join(', '));

  useEffect(() => {
    setRaw(values.join(', '));
  }, [values]);

  const handleBlur = () => {
    const parsed = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    onChange(parsed);
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-500">{label}</label>
      <input
        type="text"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export function ModuleConfig() {
  const { currentTheme, selectedModule, updateConfig } = useThemeStore();
  const [showIconBrowser, setShowIconBrowser] = useState<string | null>(null);
  const iconBrowserRef = useRef<HTMLDivElement>(null);
  const confirm = useConfirmation();

  const handleReset = async () => {
    if (!selectedModule) return;

    const confirmed = await confirm({
      title: `Reset ${selectedModule}?`,
      message:
        'Are you sure you want to reset this module to its default settings? All your customizations for this module will be lost.',
      confirmText: 'Reset Module',
    });

    if (confirmed) {
      const moduleDefaults = MODULE_DEFINITIONS.find(
        (m) => m.name === selectedModule,
      );
      const newConfig: Record<string, unknown> = {};
      if (moduleDefaults) {
        moduleDefaults.properties.forEach((prop) => {
          newConfig[prop.name] = prop.default;
        });
      }
      updateConfig({ [selectedModule]: newConfig });
    }
  };

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

  const moduleConfig =
    (currentTheme.config[selectedModule] as BaseModuleConfig) || {};

  const isCustomModule = selectedModule in (currentTheme.config.custom ?? {});
  const customConfig = isCustomModule
    ? ((currentTheme.config.custom?.[selectedModule] ??
        {}) as CustomModuleConfig)
    : null;

  const handleChange = (key: string, value: string | boolean | number) => {
    updateConfig({
      [selectedModule]: {
        ...moduleConfig,
        [key]: value,
      },
    });
  };

  const handleCustomChange = (key: string, value: string | string[]) => {
    if (!isCustomModule) return;
    updateConfig({
      custom: {
        ...currentTheme.config.custom,
        [selectedModule]: {
          ...customConfig,
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-[#1e1e1e] p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold capitalize text-gray-100">
            {selectedModule.replace(/_/g, ' ')}
          </h2>
          <p className="text-sm text-gray-500">Module Configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="rounded bg-red-900/50 px-3 py-1 text-xs font-medium text-red-300 hover:bg-red-800/50"
          >
            Reset to Default
          </button>
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

      {/* Inline Preview */}
      <ModulePreview moduleName={selectedModule} config={currentTheme.config} />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Style */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Style
          </label>
          <StyleEditor
            value={moduleConfig.style || ''}
            onChange={(val) => handleChange('style', val)}
          />
        </div>

        {/* Symbol */}
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
              onClick={() =>
                setShowIconBrowser(
                  showIconBrowser === 'symbol' ? null : 'symbol',
                )
              }
              className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Browse
            </button>
          </div>

          {showIconBrowser === 'symbol' && (
            <div
              ref={iconBrowserRef}
              className="absolute left-0 top-full z-50 mt-1 w-full sm:w-[400px]"
            >
              <IconBrowser
                currentSymbol={moduleConfig.symbol as string}
                onSelect={(symbol) => {
                  handleChange('symbol', symbol);
                  setShowIconBrowser(null);
                }}
              />
            </div>
          )}
        </div>

        {/* Format String — Full Width */}
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
              Visually edit your module&apos;s format string. Click on segments
              to edit or add new ones.
            </p>
          </div>
        </div>

        {/* Custom Module Extended Fields */}
        {isCustomModule && customConfig && (
          <div className="col-span-2 space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-sm font-medium text-gray-400">
              Custom Module Settings
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">Command</label>
                <input
                  type="text"
                  value={customConfig.command || ''}
                  onChange={(e) =>
                    handleCustomChange('command', e.target.value)
                  }
                  placeholder="echo hello"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">
                  When (shell condition)
                </label>
                <input
                  type="text"
                  value={customConfig.when || ''}
                  onChange={(e) => handleCustomChange('when', e.target.value)}
                  placeholder="test -f .env"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <CommaSeparatedInput
                label="Detect Files (comma-separated)"
                values={customConfig.detect_files || []}
                onChange={(v) => handleCustomChange('detect_files', v)}
                placeholder=".env, .envrc"
              />
              <CommaSeparatedInput
                label="Detect Extensions (comma-separated)"
                values={customConfig.detect_extensions || []}
                onChange={(v) => handleCustomChange('detect_extensions', v)}
                placeholder="py, js, ts"
              />
              <CommaSeparatedInput
                label="Detect Folders (comma-separated)"
                values={customConfig.detect_folders || []}
                onChange={(v) => handleCustomChange('detect_folders', v)}
                placeholder=".git, node_modules"
              />
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">Shell</label>
                <input
                  type="text"
                  value={(customConfig.shell || []).join(', ')}
                  onChange={(e) =>
                    handleCustomChange(
                      'shell',
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder="bash, zsh"
                  className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Directory-specific options */}
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
                  value={
                    (moduleConfig as DirectoryConfig).truncation_length ?? 3
                  }
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
                    checked={
                      (moduleConfig as DirectoryConfig).truncate_to_repo ===
                      true
                    }
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

        {/* Git Status symbols */}
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
                      value={
                        ((moduleConfig as GitStatusConfig)[
                          key as keyof GitStatusConfig
                        ] as string) || ''
                      }
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
                        currentSymbol={
                          (moduleConfig as GitStatusConfig)[
                            key as keyof GitStatusConfig
                          ] as string
                        }
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
}
