
import {
  BookOpen,
  FileText,
  RotateCcw,
  Settings,
  Trash2,
  Type,
} from 'lucide-react';
import { useState } from 'react';

import { useThemeStore } from '../stores/theme-store';
import { useUIStore } from '../stores/ui-store';
import { DocumentViewer } from './DocumentViewer';
import { Modal } from './ui/Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { layoutMode, setLayoutMode, preferredShell, setPreferredShell } =
    useUIStore();

  const { currentTheme, resetTheme } = useThemeStore();
  const [activeDoc, setActiveDoc] = useState<'manual' | 'readme' | null>(null);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Application Settings">
        <div className="space-y-6 text-gray-300">
          {/* Documentation Section */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-semibold text-green-400">
              <BookOpen size={16} /> Knowledge Base
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveDoc('manual')}
                className="flex items-center justify-center gap-2 rounded border border-gray-700 bg-gray-800 py-2 text-xs transition-colors hover:bg-gray-700"
              >
                <BookOpen size={14} /> Master Manual
              </button>
              <button
                onClick={() => setActiveDoc('readme')}
                className="flex items-center justify-center gap-2 rounded border border-gray-700 bg-gray-800 py-2 text-xs transition-colors hover:bg-gray-700"
              >
                <FileText size={14} /> README
              </button>
            </div>
          </section>

          {/* Editor Settings */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-semibold text-blue-400">
              <Settings size={16} /> Editor Preferences
            </h3>

            <div className="flex items-center justify-between">
              <label className="text-xs">Layout Mode</label>
              <select
                value={layoutMode}
                onChange={(e) =>
                  setLayoutMode(e.target.value as 'auto' | 'desktop' | 'mobile')
                }
                className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
              >
                <option value="auto">Auto (Responsive)</option>
                <option value="desktop">Desktop Force</option>
                <option value="mobile">Mobile Force</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs">Target Shell</label>
              <select
                value={preferredShell}
                onChange={(e) =>
                  setPreferredShell(
                    e.target.value as 'bash' | 'fish' | 'powershell',
                  )
                }
                className="rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs"
              >
                <option value="bash">Bash / Zsh</option>
                <option value="fish">Fish Shell</option>
                <option value="powershell">PowerShell</option>
              </select>
            </div>
          </section>

          {/* Preview Settings */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-semibold text-purple-400">
              <Type size={16} /> Terminal Preview
            </h3>
            <div className="flex items-center justify-between">
              <label className="text-xs">Active Font</label>
              <span className="rounded bg-gray-900 px-2 py-1 font-mono text-[10px] text-gray-500">
                {currentTheme.metadata.fontFamily || 'FiraCode NF'}
              </span>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="space-y-3 pt-4">
            <h3 className="flex items-center gap-2 border-b border-gray-800 pb-2 text-sm font-semibold text-red-500">
              <Trash2 size={16} /> Danger Zone
            </h3>
            <button
              onClick={() => {
                if (
                  confirm(
                    'Are you sure? This will wipe your current theme and settings.',
                  )
                ) {
                  resetTheme();
                  onClose();
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded border border-red-900/50 bg-red-900/20 py-2 text-xs text-red-400 transition-colors hover:bg-red-900/40"
            >
              <RotateCcw size={14} /> Factory Reset Theme
            </button>
          </section>
        </div>
      </Modal>

      {/* Internal Doc Viewer */}
      {activeDoc && (
        <DocumentViewer
          isOpen={true}
          onClose={() => setActiveDoc(null)}
          docType={activeDoc}
        />
      )}
    </>
  );
}
