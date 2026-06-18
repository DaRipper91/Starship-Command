/* eslint-disable @typescript-eslint/no-explicit-any */
import { GitBranch } from 'lucide-react';

import { cn } from '../lib/utils';
import { useUIStore } from '../stores/ui-store';

export function GitMockToggles() {
  const { mockGitStatus, setMockGitStatus } = useUIStore();

  const toggle = (key: string) => {
    const status = mockGitStatus as any;
    setMockGitStatus({ [key]: !status[key] });
  };

  const increment = (key: 'ahead' | 'behind', val: number) => {
    const newVal = Math.max(0, mockGitStatus[key] + val);
    setMockGitStatus({ [key]: newVal });
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <GitBranch size={16} className="text-pink-500" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Mock Git State
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Branch Input */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase text-gray-500">
            Branch Name
          </label>
          <input
            type="text"
            value={mockGitStatus.branch}
            onChange={(e) => setMockGitStatus({ branch: e.target.value })}
            className="w-full rounded border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-200"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-2 pt-4">
          <button
            aria-pressed={mockGitStatus.isDirty}
            title="Toggle mock dirty state"
            onClick={() => toggle('isDirty')}
            className={cn(
              'rounded border px-3 py-1 text-[10px] transition-all',
              mockGitStatus.isDirty
                ? 'border-yellow-600 bg-yellow-900/20 text-yellow-400'
                : 'border-gray-700 bg-gray-800 text-gray-500',
            )}
          >
            Dirty
          </button>
          <button
            aria-pressed={mockGitStatus.staged}
            title="Toggle mock staged state"
            onClick={() => toggle('staged')}
            className={cn(
              'rounded border px-3 py-1 text-[10px] transition-all',
              mockGitStatus.staged
                ? 'border-green-600 bg-green-900/20 text-green-400'
                : 'border-gray-700 bg-gray-800 text-gray-500',
            )}
          >
            Staged
          </button>
          <button
            aria-pressed={mockGitStatus.stashed}
            title="Toggle mock stashed state"
            onClick={() => toggle('stashed')}
            className={cn(
              'rounded border px-3 py-1 text-[10px] transition-all',
              mockGitStatus.stashed
                ? 'border-blue-600 bg-blue-900/20 text-blue-400'
                : 'border-gray-700 bg-gray-800 text-gray-500',
            )}
          >
            Stashed
          </button>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Ahead</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease ahead count"
              title="Decrease ahead count"
              onClick={() => increment('ahead', -1)}
              className="flex h-5 w-5 items-center justify-center rounded bg-gray-800 text-gray-400"
            >
              -
            </button>
            <span className="w-4 text-center text-xs text-gray-200">
              {mockGitStatus.ahead}
            </span>
            <button
              aria-label="Increase ahead count"
              title="Increase ahead count"
              onClick={() => increment('ahead', 1)}
              className="flex h-5 w-5 items-center justify-center rounded bg-gray-800 text-gray-400"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Behind</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease behind count"
              title="Decrease behind count"
              onClick={() => increment('behind', -1)}
              className="flex h-5 w-5 items-center justify-center rounded bg-gray-800 text-gray-400"
            >
              -
            </button>
            <span className="w-4 text-center text-xs text-gray-200">
              {mockGitStatus.behind}
            </span>
            <button
              aria-label="Increase behind count"
              title="Increase behind count"
              onClick={() => increment('behind', 1)}
              className="flex h-5 w-5 items-center justify-center rounded bg-gray-800 text-gray-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
