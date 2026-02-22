import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Upload, Download, AlertCircle } from 'lucide-react';
import { useThemeStore } from '../stores/theme-store';
import { cn } from '../lib/utils';
import { TomlParser } from '../lib/toml-parser';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const { currentTheme, importToml } = useThemeStore();
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importValue, setImportValue] = useState('');
  const [exportValue, setExportValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate TOML when opening
      try {
        const toml = TomlParser.stringify(currentTheme.config);
        setExportValue(toml);
        setImportValue(''); // Reset import
        setError(null);
      } catch (e) {
        setExportValue('Error generating TOML');
      }
    }
  }, [isOpen, currentTheme]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportValue);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleImport = () => {
    try {
      if (!importValue.trim()) {
        setError('Please paste a configuration first');
        return;
      }

      // Attempt import
      importToml(importValue);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid TOML configuration');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Theme Configuration
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            className={cn(
              'flex-1 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'export'
                ? 'border-b-2 border-blue-500 bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200',
            )}
            onClick={() => setActiveTab('export')}
          >
            <div className="flex items-center justify-center gap-2">
              <Download size={16} />
              Export
            </div>
          </button>
          <button
            className={cn(
              'flex-1 px-6 py-3 text-sm font-medium transition-colors',
              activeTab === 'import'
                ? 'border-b-2 border-blue-500 bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200',
            )}
            onClick={() => setActiveTab('import')}
          >
            <div className="flex items-center justify-center gap-2">
              <Upload size={16} />
              Import
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  readOnly
                  value={exportValue}
                  className="h-64 w-full resize-none rounded-md border border-gray-700 bg-gray-950 p-4 font-mono text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCopy}
                  className="absolute right-4 top-4 flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Copy this configuration to your{' '}
                <code>~/.config/starship.toml</code> file.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                placeholder="Paste your starship.toml content here..."
                className="h-64 w-full resize-none rounded-md border border-gray-700 bg-gray-950 p-4 font-mono text-sm text-gray-300 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {error && (
                <div className="flex items-center gap-2 rounded-md bg-red-900/20 p-3 text-sm text-red-400">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleImport}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Import Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
