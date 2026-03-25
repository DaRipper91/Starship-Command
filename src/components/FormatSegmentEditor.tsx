import { Trash2 } from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';
import { FormatSegment } from './FormatEditor';
import { StyleEditor } from './StyleEditor';

interface FormatSegmentEditorProps {
  segment: FormatSegment;
  activeText: string;
  setActiveText: React.Dispatch<React.SetStateAction<string>>;
  activeStyle: string;
  setActiveStyle: React.Dispatch<React.SetStateAction<string>>;
  showIconBrowser: boolean;
  setShowIconBrowser: React.Dispatch<React.SetStateAction<boolean>>;
  onSegmentChange: (updates: Partial<FormatSegment>) => void;
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
    <div className="mt-4 rounded-md border border-gray-700 bg-gray-800 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-200">Edit Segment</h3>
        <button
          onClick={onRemove}
          className="rounded p-1 text-red-400 hover:bg-red-400/10 hover:text-red-300"
          title="Remove segment"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {segment.type === 'text' && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Text Content
            </label>
            <input
              type="text"
              value={activeText}
              onChange={(e) => {
                setActiveText(e.target.value);
                onSegmentChange({ value: e.target.value } as any);
              }}
              placeholder="Segment text"
              className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {segment.type === 'module' && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Module
            </label>
            <select
              value={activeText}
              onChange={(e) => {
                setActiveText(e.target.value);
                onSegmentChange({ value: e.target.value } as any);
              }}
              className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {availableModules.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>
        )}

        {segment.type === 'styledText' && (
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">
              Text Content
            </label>
            <input
              type="text"
              value={activeText}
              onChange={(e) => {
                setActiveText(e.target.value);
                onSegmentChange({ text: e.target.value } as any);
              }}
              placeholder="Text inside brackets"
              className="w-full rounded border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {(segment.type === 'module' || segment.type === 'styledText') && (
          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-400">
              <span>Style</span>
              {segment.type === 'module' && (
                <span className="text-[10px] text-gray-500">
                  Optional (overrides module config)
                </span>
              )}
            </label>
            <StyleEditor
              value={activeStyle}
              onChange={(newStyle) => {
                setActiveStyle(newStyle);
                onSegmentChange({ style: newStyle } as any);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
