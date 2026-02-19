import { cn } from '../../lib/utils';
import { Palette, Settings, Grid, FileText } from 'lucide-react';
import { useState } from 'react';
import { ModuleBuilder } from '../ModuleBuilder';

interface LeftSidebarProps {
  className?: string;
}

type Tab = 'modules' | 'colors' | 'presets' | 'export';

export function LeftSidebar({ className }: LeftSidebarProps) {
  const [activeTab, setActiveTab] = useState<Tab>('modules');

  const tabs = [
    { id: 'modules', label: 'Modules', icon: Settings },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'presets', label: 'Presets', icon: Grid },
    { id: 'export', label: 'Export', icon: FileText },
  ];

  return (
    <aside
      className={cn(
        'flex w-80 flex-col border-r border-gray-800 bg-gray-900',
        className,
      )}
    >
      <div className="flex shrink-0 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center py-3 text-xs font-medium transition-colors hover:text-gray-200',
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 bg-blue-500/5 text-blue-400'
                : 'text-gray-400',
            )}
            title={tab.label}
          >
            <tab.icon className="mb-1 h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
        {activeTab === 'modules' && <ModuleBuilder />}

        {activeTab === 'colors' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center">
              <Palette className="mx-auto mb-2 h-8 w-8 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-300">Colors</h3>
              <p className="mt-1 text-xs text-gray-500">
                Customize palette and extract from image. (Coming in Checkpoint
                6)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center">
              <Grid className="mx-auto mb-2 h-8 w-8 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-300">Presets</h3>
              <p className="mt-1 text-xs text-gray-500">
                Choose from pre-configured themes. (Coming in Checkpoint 9)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center">
              <FileText className="mx-auto mb-2 h-8 w-8 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-300">Export</h3>
              <p className="mt-1 text-xs text-gray-500">
                View TOML and download config. (Coming in Checkpoint 8)
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
