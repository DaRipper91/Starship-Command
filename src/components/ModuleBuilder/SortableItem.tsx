import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Settings } from 'lucide-react';
import { ModuleDefinition } from '../../lib/module-definitions';
import { cn } from '../../lib/utils';

interface SortableItemProps {
  module: ModuleDefinition;
  isEnabled: boolean;
  onToggle: (id: string) => void;
}

export function SortableItem({
  module,
  isEnabled,
  onToggle,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id, disabled: !isEnabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-center justify-between rounded-md border p-2 transition-all',
        isEnabled
          ? 'border-l-4 border-gray-700 border-l-green-500 bg-gray-800'
          : 'border-gray-800 bg-gray-900 opacity-60 hover:opacity-100',
        isDragging && 'z-50 opacity-90 shadow-xl ring-2 ring-blue-500',
      )}
    >
      <div className="flex items-center gap-3">
        {isEnabled && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-500 hover:text-gray-300 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>
        )}

        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => onToggle(module.id)}
          className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
        />

        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={module.name}>
            {module.icon}
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-medium text-gray-200">
              {module.name}
            </span>
            <span className="line-clamp-1 text-[10px] text-gray-500">
              {module.description}
            </span>
          </div>
        </div>
      </div>

      <button
        className={cn(
          'rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white',
          !isEnabled && 'invisible group-hover:visible',
        )}
        title="Configure"
      >
        <Settings className="h-4 w-4" />
      </button>
    </div>
  );
}
