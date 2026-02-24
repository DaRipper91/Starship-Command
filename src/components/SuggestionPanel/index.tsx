import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../stores/theme-store';
import { SuggestionEngine } from '../../lib/suggestion-engine';
import { Eye, Info, Lightbulb, ShieldAlert, X, Zap } from 'lucide-react';

interface Suggestion {
  type: 'module' | 'performance' | 'visual' | 'compatibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: () => void;
}

export function SuggestionPanel() {
  const { currentTheme } = useThemeStore();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSuggestions = async () => {
      const env = await SuggestionEngine.detectEnvironment();
      const opts = SuggestionEngine.suggestOptimizations(
        currentTheme.config,
        env,
      );
      setSuggestions(opts as Suggestion[]);
    };
    fetchSuggestions();
  }, [currentTheme.config]);

  const handleDismiss = (title: string) => {
    setDismissed((prev) => new Set(prev).add(title));
  };

  const visibleSuggestions = suggestions.filter((s) => !dismissed.has(s.title));

  if (visibleSuggestions.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-lg border border-blue-900/30 bg-blue-900/10 p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
        <Lightbulb size={16} />
        Suggestions
      </h3>

      <div className="flex flex-col gap-2">
        {visibleSuggestions.map((s, idx) => {
          const Icon =
            s.type === 'performance'
              ? Zap
              : s.type === 'visual'
                ? Eye
                : s.type === 'compatibility'
                  ? ShieldAlert
                  : Info;

          const iconColor =
            s.priority === 'high'
              ? 'text-red-400'
              : s.priority === 'medium'
                ? 'text-yellow-400'
                : 'text-blue-400';

          return (
            <div
              key={idx}
              className="group relative flex flex-col gap-1 rounded border border-gray-700 bg-gray-800 p-3 pr-8 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon size={14} className={iconColor} />
                <span className="text-xs font-semibold text-gray-200">
                  {s.title}
                </span>
              </div>
              <p className="text-[11px] leading-snug text-gray-400">
                {s.description}
              </p>

              <button
                onClick={() => handleDismiss(s.title)}
                className="absolute right-2 top-2 text-gray-500 opacity-0 transition-opacity hover:text-white group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
