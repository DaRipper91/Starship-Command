import { cn } from '../../lib/utils';
import { LayoutTemplate } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
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
        <button className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Export Theme
        </button>
      </div>
    </header>
  );
}
