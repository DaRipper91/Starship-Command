import { cn } from '../../lib/utils';
import { Settings, Palette, Terminal, FileCode } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const navItems = [
    { icon: Terminal, label: 'Preview' },
    { icon: Palette, label: 'Colors' },
    { icon: Settings, label: 'Modules' },
    { icon: FileCode, label: 'Editor' },
  ];

  return (
    <aside
      className={cn(
        'flex w-64 flex-col border-r border-gray-800 bg-gray-900/30',
        className,
      )}
    >
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-400 transition-all hover:bg-gray-800 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-800 p-4">
        <div className="text-xs text-gray-600">v0.1.0 Alpha</div>
      </div>
    </aside>
  );
}
