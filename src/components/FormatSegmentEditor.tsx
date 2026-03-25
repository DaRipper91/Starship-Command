import { Smile, Trash2 } from 'lucide-react';

import { FormatSegment } from './FormatEditor';
import { IconBrowser } from './IconBrowser';
import { StyleEditor } from './StyleEditor';

interface FormatSegmentEditorProps {
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
  showIconBrowser,
  setShowIconBrowser,
  onSegmentChange,
  onRemove,
  availableModules,
}: FormatSegmentEditorProps) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200">
          {segment.type === 'text' && 'Edit Text Segment'}
          {segment.type === 'module' && 'Edit Module Segment'}
          {segment.type === 'styledText' && 'Edit Styled Text Segment'}
        </h3>
        <button
          onClick={onRemove}
          className="rounded p-1 text-gray-500 hover:bg-gray-700 hover:text-red-400"
          title="Remove segment"
          aria-label="Remove segment"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {segment.type === 'module' ? (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Module Selection
            </label>
            <select
              value={segment.value}
              onChange={(e) => onSegmentChange({ value: e.target.value })}
              className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
            >
              {availableModules.map((m) => (
                <option key={m} value={m}>
                  ${m}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Text Content
            </label>
            <div className="relative">
              <input
                type="text"
                value={activeText}
                onChange={(e) => {
                  setActiveText(e.target.value);
                  onSegmentChange(
                    segment.type === 'text'
                      ? { value: e.target.value }
                      : { text: e.target.value },
                  );
                }}
                className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="Segment text"
              />
              <button
                onClick={() => setShowIconBrowser(!showIconBrowser)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                title="Browse icons"
                aria-label="Browse icons"
              >
                <Smile size={16} />
              </button>
            </div>

            {showIconBrowser && (
              <div className="mt-2">
                <IconBrowser
                  onSelect={(icon) => {
                    const newText = activeText + icon;
                    setActiveText(newText);
                    onSegmentChange(
                      segment.type === 'text'
                        ? { value: newText }
                        : { text: newText },
                    );
                    setShowIconBrowser(false);
                  }}
                  onClose={() => setShowIconBrowser(false)}
                />
              </div>
            )}
          </div>
        )}

        {segment.type === 'styledText' && (
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Style Configuration
            </label>
            <StyleEditor
              value={activeStyle}
              onChange={(newStyle) => {
                setActiveStyle(newStyle);
                onSegmentChange({ style: newStyle });
              }}
              allowBackground={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
