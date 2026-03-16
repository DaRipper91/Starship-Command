import { BaseModuleConfig } from '../types/starship.types';

interface FormatSegmentEditorProps {
  config: BaseModuleConfig;
  onUpdate: (updates: Partial<BaseModuleConfig>) => void;
}

export function FormatSegmentEditor({ onUpdate }: FormatSegmentEditorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-400">
          Format Segments
        </label>
        {/* Format editor implementation would go here */}
      </div>

      {false && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Styled Text Segments
          </label>
          <button
            onClick={() =>
              onUpdate({
                /* styledText removed */
              })
            }
            className="text-xs text-blue-500 hover:underline"
          >
            Clear Styled Text
          </button>
        </div>
      )}
    </div>
  );
}
