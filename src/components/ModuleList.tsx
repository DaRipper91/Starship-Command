import React, { useMemo, useState } from 'react';
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

interface ModuleItem {
  id: string;
  name: string;
}

function SortableItem({
  item,
  isSelected,
  onSelect,
}: {
  item: ModuleItem;
  isSelected: boolean;
  onSelect: (name: string) => void;
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
          : 'hover:bg-gray-750 border-gray-700 bg-gray-800 hover:border-gray-600',
        isDragging && 'z-50 bg-gray-700 opacity-50 ring-2 ring-blue-500',
      )}
    >
      <button
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-500 hover:text-gray-300 focus:outline-none active:cursor-grabbing"
        aria-label="Drag handle"
        onClick={(e) => e.stopPropagation()} // Prevent selection when dragging
      >
        <GripVertical size={18} />
      </button>
      <span
        className={cn(
          'select-none font-medium',
          isSelected ? 'text-blue-400' : 'text-gray-200',
        )}
      >
        {item.name}
      </span>
    </div>
  );
}

export function ModuleList({ className }: { className?: string }) {
  const { currentTheme, updateConfig, selectedModule, setSelectedModule } =
    useThemeStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Parse modules from format string
  const modules = useMemo(() => {
    const format = currentTheme.config.format || '';
    const matches = format.match(/\$([a-zA-Z0-9_]+)/g) || [];
    return matches.map((m, i) => ({
      id: `${m.substring(1)}-${i}`,
      name: m.substring(1),
    }));
  }, [currentTheme.config.format]);

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
      const oldIndex = modules.findIndex((m) => m.id === active.id);
      const newIndex = modules.findIndex((m) => m.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newModules = arrayMove(modules, oldIndex, newIndex);
        const newFormat = newModules.map((m) => `$${m.name}`).join('');
        updateConfig({ format: newFormat });
      }
    }
  };

  const activeItem = useMemo(
    () => modules.find((m) => m.id === activeId),
    [activeId, modules],
  );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          Active Modules
        </h2>
        <span className="text-xs text-gray-500">{modules.length} modules</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={modules.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {modules.map((module) => (
              <SortableItem
                key={module.id}
                item={module}
                isSelected={selectedModule === module.name}
                onSelect={setSelectedModule}
              />
            ))}

            {modules.length === 0 && (
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
              <span className="font-medium text-white">{activeItem.name}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
