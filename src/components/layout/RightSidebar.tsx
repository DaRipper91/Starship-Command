import { cn } from '../../lib/utils';
import { Sliders } from 'lucide-react';

interface RightSidebarProps {
  className?: string;
}

export function RightSidebar({ className }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        'flex w-80 flex-col border-l border-gray-800 bg-gray-900',
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
        <h2 className="text-sm font-semibold text-gray-200">Configuration</h2>
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <Sliders className="mb-4 h-12 w-12 text-gray-700" />
          <h3 className="text-sm font-medium text-gray-400">
            No Module Selected
          </h3>
          <p className="mt-2 max-w-[200px] text-xs text-gray-500">
            Select a module from the list on the left to configure its settings.
          </p>
        </div>
      </div>
    </aside>
  );
}
