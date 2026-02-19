import { cn } from '../../lib/utils';
import { LayoutTemplate, Download, Check } from 'lucide-react';
import { useState } from 'react';
import { useThemeStore } from '../../stores/theme-store';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isCopied, setIsCopied] = useState(false);
  const exportToml = useThemeStore((state) => state.exportToml);

  const handleExport = async () => {
    try {
      const toml = exportToml();
      await navigator.clipboard.writeText(toml);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy theme:', error);
    }
  };

  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900/50 px-6 backdrop-blur',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <LayoutTemplate className="h-6 w-6 text-blue-500" />
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
          Starship Theme Creator
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          Documentation
        </button>
        <button
          onClick={handleExport}
          className={cn(
            'flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-white transition-all',
            isCopied
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700',
          )}
          aria-label={
            isCopied ? 'Theme copied to clipboard' : 'Export theme to clipboard'
          }
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Export Theme
            </>
          )}
        </button>
      </div>
    </header>
  );
}
