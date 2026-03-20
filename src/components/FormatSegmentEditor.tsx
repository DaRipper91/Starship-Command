import { FormatSegment } from './FormatEditor';

export interface FormatSegmentEditorProps {
  segment: FormatSegment;
  activeText: string;
  setActiveText: (text: string) => void;
  activeStyle: string;
  setActiveStyle: (style: string) => void;
  showIconBrowser: boolean;
  setShowIconBrowser: (show: boolean) => void;
  onSegmentChange: (newProps: Partial<FormatSegment>) => void;
  onRemove: () => void;
  availableModules: string[];
}

export function FormatSegmentEditor({
  segment,
  activeText,
  setActiveText,
  activeStyle,
  setActiveStyle,

  onSegmentChange,
  onRemove,
  availableModules,
}: FormatSegmentEditorProps) {
  return (
    <div className="space-y-4 rounded-md border border-gray-700 bg-gray-800 p-4">
      <div>
        <label className="mb-2 block text-xs font-medium text-gray-400">
          Edit {segment.type}
        </label>
        {segment.type === 'text' && (
          <input
            type="text"
            value={activeText}
            onChange={(e) => {
              setActiveText(e.target.value);
              onSegmentChange({ type: 'text', value: e.target.value });
            }}
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          />
        )}
        {segment.type === 'module' && (
          <select
            value={
              (segment as Extract<FormatSegment, { type: 'module' }>).value
            }
            onChange={(e) => {
              onSegmentChange({ type: 'module', value: e.target.value });
            }}
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
          >
            {availableModules.map((m) => (
              <option key={m} value={m}>
                ${m}
              </option>
            ))}
          </select>
        )}
        {segment.type === 'styledText' && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={activeText}
              onChange={(e) => {
                setActiveText(e.target.value);
                onSegmentChange({
                  type: 'styledText',
                  text: e.target.value,
                  style: activeStyle,
                });
              }}
              className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              placeholder="Text"
            />
            <input
              type="text"
              value={activeStyle}
              onChange={(e) => {
                setActiveStyle(e.target.value);
                onSegmentChange({
                  type: 'styledText',
                  text: activeText,
                  style: e.target.value,
                });
              }}
              className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              placeholder="Style (e.g., bold red)"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:underline"
        >
          Remove Segment
        </button>
      </div>
    </div>
  );
}
