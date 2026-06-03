/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, History } from 'lucide-react';
import { useStore } from 'zustand';

import { useThemeStore } from '../stores/theme-store';

interface TemporalState {
  pastStates: any[];
  futureStates: any[];
  jump: (step: number) => void;
}

export function HistoryTimeline() {
  const temporal = useThemeStore.temporal;
  const { pastStates, futureStates, jump } = useStore(
    temporal,
    (state) => state as unknown as TemporalState,
  );

  const currentIndex = pastStates.length;

  return (
    <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={16} className="text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Theme Time-Travel
          </h3>
        </div>
        <span className="font-mono text-[10px] text-gray-600">
          {pastStates.length} versions back
        </span>
      </div>

      <div className="scrollbar-none flex items-center gap-1 overflow-x-auto pb-2">
        {pastStates.map((_: any, i: number) => (
          <button
            key={`past-${i}`}
            onClick={() => jump(i - currentIndex)}
            className="h-8 w-3 rounded-sm border border-blue-700/30 bg-blue-900/40 transition-colors hover:bg-blue-600"
            title={`Jump to version ${i}`}
          />
        ))}

        <div
          className="h-10 w-4 rounded border-2 border-white/20 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          title="Current Version"
        />

        {futureStates.map((_: any, i: number) => (
          <button
            key={`future-${i}`}
            onClick={() => jump(i + 1)}
            className="h-8 w-3 rounded-sm border border-gray-700 bg-gray-800 transition-colors hover:bg-purple-600"
            title="Jump forward"
          />
        ))}
      </div>

      <div className="flex justify-center">
        <p className="flex items-center gap-1 text-[9px] italic text-gray-500">
          <Clock size={10} /> Scrub through history to undo/redo complex changes
        </p>
      </div>
    </div>
  );
}
