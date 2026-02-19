import { cn } from '../../lib/utils';
import { useThemeStore } from '../../stores/theme-store';
import { Rocket, Save, Download, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { currentTheme, updateMetadata, resetTheme, saveTheme, exportToml } =
    useThemeStore();
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMetadata({ name: e.target.value });
  };

  const handleExport = () => {
    const toml = exportToml();
    const blob = new Blob([toml], { type: 'text/toml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTheme.metadata.name
      .toLowerCase()
      .replace(/\s+/g, '-')}.toml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header
      className={cn(
        'z-50 flex h-16 shrink-0 items-center justify-between border-b border-gray-800 bg-gray-900 px-4 shadow-sm',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-blue-400">
          <Rocket className="h-6 w-6" />
          <span className="hidden text-lg font-bold sm:inline-block">
            Starship Theme Creator
          </span>
        </div>

        <div className="h-6 w-px bg-gray-700" />

        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={currentTheme.metadata.name}
              onChange={handleNameChange}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              className="h-8 rounded border border-blue-500 bg-gray-800 px-2 text-sm text-white focus:outline-none"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="rounded px-2 py-1 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-800"
              title="Click to rename"
            >
              {currentTheme.metadata.name}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={resetTheme}
          className="flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          title="Reset to default"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={saveTheme}
          className="flex h-9 items-center gap-2 rounded-md bg-gray-800 px-3 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={handleExport}
          className="flex h-9 items-center gap-2 rounded-md bg-blue-600 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  );
}
