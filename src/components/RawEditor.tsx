
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle, CheckCircle2, Code } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { ThemeEngine } from '../lib/theme-engine';
import { ThemeStore, useThemeStore } from '../stores/theme-store';

export function RawEditor() {
  const currentTheme = useThemeStore((state: ThemeStore) => state.currentTheme);
  const updateConfig = useThemeStore((state: ThemeStore) => state.updateConfig);

  const [localToml, setLocalToml] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync from Store to Editor
  useEffect(() => {
    setLocalToml(ThemeEngine.stringify(currentTheme.config));
    setError(null);
  }, [currentTheme.config]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLocalToml(value);

    try {
      const parsed = ThemeEngine.parse(value);
      updateConfig(parsed);
      setError(null);
    } catch (err: any) {
      // Don't update store on invalid TOML, just show error
      setError(err.message || 'Invalid TOML syntax');
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <Code size={14} />
          <span>starship.toml</span>
        </div>
        <div className="flex items-center gap-2">
          {error ? (
            <div className="flex items-center gap-1 text-[10px] text-red-400">
              <AlertCircle size={12} />
              <span>Invalid Syntax</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[10px] text-green-400">
              <CheckCircle2 size={12} />
              <span>Synced</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex-1">
        <textarea
          value={localToml}
          onChange={handleChange}
          spellCheck={false}
          className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-gray-300 focus:outline-none"
          placeholder="# Enter your Starship TOML here..."
        />
      </div>

      {error && (
        <div className="border-t border-red-900/30 bg-red-900/20 px-4 py-2 font-mono text-[10px] text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}
