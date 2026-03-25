import React from 'react';
import { FormatSegment } from './FormatEditor';

interface FormatSegmentEditorProps {
  segment: FormatSegment;
  activeText: string;
  setActiveText: React.Dispatch<React.SetStateAction<string>>;
  activeStyle: string;
  setActiveStyle: React.Dispatch<React.SetStateAction<string>>;
  showIconBrowser: boolean;
  setShowIconBrowser: React.Dispatch<React.SetStateAction<boolean>>;
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
    <div className="space-y-4 rounded-md border border-gray-700 bg-gray-800 p-4 mt-2">
      <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-2">
        <h4 className="text-sm font-medium text-gray-300">
          Edit {segment.type === 'text' ? 'Text' : segment.type === 'module' ? 'Module' : 'Styled Text'} Segment
        </h4>
        <button
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-300 hover:underline"
        >
          Remove Segment
        </button>
      </div>

      {segment.type === 'text' && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Text Value
          </label>
          <input
            type="text"
            value={activeText}
            onChange={(e) => {
              setActiveText(e.target.value);
              onSegmentChange({ value: e.target.value } as Partial<FormatSegment>);
            }}
            placeholder="Segment text"
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      {segment.type === 'module' && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Module
          </label>
          <select
            value={segment.value}
            onChange={(e) => {
              onSegmentChange({ value: e.target.value } as Partial<FormatSegment>);
            }}
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {availableModules.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      )}

      {segment.type === 'styledText' && (
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Text
            </label>
            <input
              type="text"
              value={activeText}
              onChange={(e) => {
                setActiveText(e.target.value);
                onSegmentChange({ text: e.target.value } as Partial<FormatSegment>);
              }}
              placeholder="Styled text content"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Style (e.g. bold blue)
            </label>
            <input
              type="text"
              value={activeStyle}
              onChange={(e) => {
                setActiveStyle(e.target.value);
                onSegmentChange({ style: e.target.value } as Partial<FormatSegment>);
              }}
              placeholder="bold blue"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
