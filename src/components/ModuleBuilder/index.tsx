import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState, useEffect } from 'react';
import { useThemeStore } from '../../stores/theme-store';
import { MODULE_DEFINITIONS } from '../../lib/module-definitions';
import { SortableItem } from './SortableItem';

export function ModuleBuilder() {
  const { currentTheme, updateConfig } = useThemeStore();
  const [enabledModules, setEnabledModules] = useState<string[]>([]);

  // Parse format string on load/change
  useEffect(() => {
    const format = currentTheme.config.format || '';
    // Extract module names: $name
    const matches = format.match(/(\$[a-zA-Z0-9_]+)/g);
    if (matches) {
      const modules = matches.map((m) => m.substring(1));
      // Filter out invalid modules (unknown ones)
      const valid = modules.filter((m) =>
        MODULE_DEFINITIONS.find((d) => d.id === m),
      );
      // Remove duplicates
      setEnabledModules([...new Set(valid)]);
    } else {
      setEnabledModules([]);
    }
  }, [currentTheme.config.format]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = enabledModules.indexOf(active.id as string);
      const newIndex = enabledModules.indexOf(over.id as string);

      const newOrder = arrayMove(enabledModules, oldIndex, newIndex);
      // Optimistic update local state
      setEnabledModules(newOrder);

      // Update format string
      // Note: This replaces the entire format string with the new order, losing custom spacing
      const newFormat = newOrder.map((id) => `$${id}`).join('');
      updateConfig({ format: newFormat });
    }
  };

  const handleToggle = (id: string) => {
    if (enabledModules.includes(id)) {
      // Remove
      const newOrder = enabledModules.filter((m) => m !== id);
      const newFormat = newOrder.map((mid) => `$${mid}`).join('');
      updateConfig({ format: newFormat });
    } else {
      // Add (append to end)
      const newOrder = [...enabledModules, id];
      const newFormat = newOrder.map((mid) => `$${mid}`).join('');
      updateConfig({ format: newFormat });
    }
  };

  const disabledModules = MODULE_DEFINITIONS.filter(
    (def) => !enabledModules.includes(def.id),
  );

  return (
    <div className="flex flex-col gap-6 pb-20">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Enabled Modules
          </h3>
          <SortableContext
            items={enabledModules}
            strategy={verticalListSortingStrategy}
          >
            {enabledModules.map((id) => {
              const def = MODULE_DEFINITIONS.find((d) => d.id === id);
              if (!def) return null;
              return (
                <SortableItem
                  key={id}
                  module={def}
                  isEnabled={true}
                  onToggle={handleToggle}
                />
              );
            })}
          </SortableContext>
          {enabledModules.length === 0 && (
            <div className="rounded border border-dashed border-gray-800 p-4 text-center text-sm italic text-gray-500">
              No modules enabled. Drag from below or click toggle to add.
            </div>
          )}
        </div>
      </DndContext>

      <div className="space-y-3 border-t border-gray-800 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Available Modules
        </h3>
        <div className="space-y-2">
          {disabledModules.map((def) => (
            <SortableItem
              key={def.id}
              module={def}
              isEnabled={false}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
