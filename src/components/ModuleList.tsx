import { useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useThemeStore } from '../stores/theme-store';
import { cn } from '../lib/utils';
import { GripVertical } from 'lucide-react';
import { MODULE_DEFINITIONS } from '../lib/module-definitions';

interface ModuleItem {
  id: string;
  name: string;
  isCustom?: boolean;
}

function SortableItem({
  item,
  isSelected,
  onSelect,
  onToggle,
}: {
  item: ModuleItem;
  isSelected: boolean;
  onSelect: (name: string) => void;
  onToggle: (name: string, enabled: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(item.name)}
      className={cn(
        'group flex cursor-pointer items-center gap-3 rounded-md border p-3 shadow-sm transition-colors',
        isSelected
          ? 'border-blue-500 bg-gray-800 ring-1 ring-blue-500'
          : 'border-gray-700 bg-gray-800 hover:border-gray-600',
        isDragging && 'z-50 bg-gray-700 opacity-50 ring-2 ring-blue-500',
      )}
    >
      <button
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-500 hover:text-gray-300 focus:outline-none active:cursor-grabbing"
        aria-label="Drag handle"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={18} />
      </button>

      <input
        type="checkbox"
        checked={true}
        onChange={(e) => {
          e.stopPropagation();
          onToggle(item.name, e.target.checked);
        }}
        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500"
      />

      <span
        className={cn(
          'select-none font-mono text-sm',
          isSelected ? 'text-blue-400' : 'text-gray-200',
        )}
      >
        {item.name}
        {item.isCustom && (
          <span className="ml-2 rounded-full bg-purple-900/30 px-2 py-0.5 text-[10px] font-semibold text-purple-300">
            CUSTOM
          </span>
        )}
      </span>

      <div className="ml-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item.name);
          }}
          className="text-xs text-gray-400 hover:text-blue-400"
        >
          Configure
        </button>
      </div>
    </div>
  );
}

export function ModuleList({ className }: { className?: string }) {
  const { currentTheme, updateConfig, selectedModule, setSelectedModule } =
    useThemeStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Combine predefined and custom modules
  const allModules = useMemo(() => {
    const customModules: ModuleItem[] = Object.keys(
      currentTheme.config.custom || {},
    ).map((id) => ({
      id,
      name: id,
      isCustom: true,
    }));

    // Ensure MODULE_DEFINITIONS are also ModuleItem compatible
    const predefinedModules: ModuleItem[] = MODULE_DEFINITIONS.map((def) => ({
      id: def.id,
      name: def.id,
    }));

    return [...predefinedModules, ...customModules];
  }, [currentTheme.config.custom]);

  // Parse modules from format string, including custom ones
  const activeModules = useMemo(() => {
    const format = currentTheme.config.format || '';
    const matches = format.match(/\$([a-zA-Z0-9_]+)/g) || [];
    const existingModuleNames = new Set(allModules.map((m) => m.name));

    const parsedModules = matches
      .map((m, i) => {
        const name = m.substring(1);
        return {
          id: `${name}-${i}`,
          name: name,
          isCustom:
            allModules.find((mod) => mod.id === name)?.isCustom || false,
        };
      })
      .filter((item) => existingModuleNames.has(item.name));

    return parsedModules;
  }, [currentTheme.config.format, allModules]);

  // Find inactive modules
  const inactiveModules = useMemo(() => {
    const activeNames = new Set(activeModules.map((m) => m.name));
    return allModules.filter((def) => !activeNames.has(def.id));
  }, [activeModules, allModules]);

  const handleToggle = (name: string, enable: boolean) => {
    let newFormat = currentTheme.config.format || '';
    if (enable) {
      newFormat += `$${name}`;
    } else {
      // Remove from format string
      const regex = new RegExp(`\\$${name}\\b`, 'g');
      newFormat = newFormat.replace(regex, '');
    }

    // Also update module config to reflect disabled state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingModuleConfig = (currentTheme.config as any)[name] || {};

    updateConfig({
      format: newFormat,
      [name]: { ...existingModuleConfig, disabled: !enable },
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = activeModules.findIndex((m) => m.id === active.id);
      const newIndex = activeModules.findIndex((m) => m.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newModules = arrayMove(activeModules, oldIndex, newIndex);
        const newFormat = newModules.map((m) => `$${m.name}`).join('');
        updateConfig({ format: newFormat });
      }
    }
  };

  const activeItem = useMemo(
    () => activeModules.find((m) => m.id === activeId),
    [activeId, activeModules],
  );

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Active Modules
          </h2>
          <span className="text-xs text-gray-500">
            {activeModules.length} enabled
          </span>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activeModules.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {activeModules.map((module) => (
                <SortableItem
                  key={module.id}
                  item={module}
                  isSelected={selectedModule === module.name}
                  onSelect={setSelectedModule}
                  onToggle={handleToggle}
                />
              ))}

              {activeModules.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-700 py-8 text-center text-gray-500">
                  No modules active
                </div>
              )}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeItem ? (
              <div className="group flex items-center gap-3 rounded-md border border-blue-500 bg-gray-700 p-3 opacity-90 shadow-lg">
                <button className="cursor-grabbing text-gray-300">
                  <GripVertical size={18} />
                </button>
                <span className="font-medium text-white">
                  {activeItem.name}
                </span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {inactiveModules.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-800 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Disabled Modules
            </h2>
            <span className="text-xs text-gray-600">
              {inactiveModules.length} disabled
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {inactiveModules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module.name)}
                className={cn(
                  'group flex cursor-pointer items-center gap-3 rounded-md border p-3 opacity-60 shadow-sm transition-colors hover:opacity-100',
                  selectedModule === module.name
                    ? 'border-gray-500 bg-gray-800'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600',
                )}
              >
                <div className="w-[18px]" />{' '}
                {/* Spacer for drag handle alignment */}
                <input
                  type="checkbox"
                  checked={false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle(module.name, e.target.checked);
                  }}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500"
                />
                <span className="select-none font-mono text-sm text-gray-400">
                  {module.name}
                </span>
                <div className="ml-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModule(module.name);
                    }}
                    className="text-xs text-gray-500 hover:text-blue-400"
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
