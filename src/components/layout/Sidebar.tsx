import { cn } from '../../lib/utils';
import {
  Settings,
  Palette,
  Terminal,
  FileCode,
  type LucideIcon,
} from 'lucide-react';
import { useUIStore, View } from '../../stores/ui-store';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { activeView, setActiveView } = useUIStore();

  const navItems: { icon: LucideIcon; label: string; view: View }[] = [
    { icon: Terminal, label: 'Preview', view: 'preview' },
    { icon: Palette, label: 'Colors', view: 'colors' },
    { icon: Settings, label: 'Modules', view: 'modules' },
    { icon: FileCode, label: 'Editor', view: 'editor' },
  ];

  return (
    <aside
      className={cn(
        'flex w-64 flex-col border-r border-gray-800 bg-gray-900/30',
        className,
      )}
    >
      <nav
        className="space-y-2 p-4"
        role="tablist"
        aria-label="Main Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              role="tab"
              aria-selected={isActive}
              aria-controls="main-content"
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                isActive
                  ? 'bg-gray-800 text-white shadow-sm'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white focus-visible:text-white',
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-gray-800 p-4">
        <div className="text-xs text-gray-600">v0.1.0 Alpha</div>
      </div>
    </aside>
  );
}
