import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Search, X, Check } from 'lucide-react';

interface IconBrowserProps {
  onSelect: (symbol: string) => void;
  currentSymbol?: string;
}

const CATEGORIES = [
  'All',
  'Arrows',
  'Git',
  'Languages',
  'Cloud',
  'Containers',
  'Misc',
] as const;
type Category = (typeof CATEGORIES)[number];

interface SymbolDef {
  icon: string;
  name: string;
  category: Category;
}

const SYMBOLS: SymbolDef[] = [
  // Arrows
  { icon: '→', name: 'Right Arrow', category: 'Arrows' },
  { icon: '⇒', name: 'Right Double Arrow', category: 'Arrows' },
  { icon: '⟶', name: 'Long Right Arrow', category: 'Arrows' },
  { icon: '➔', name: 'Heavy Right Arrow', category: 'Arrows' },
  { icon: '➜', name: 'Heavy Round Right Arrow', category: 'Arrows' },
  { icon: '➡', name: 'Black Right Arrow', category: 'Arrows' },
  { icon: '⇥', name: 'Right Arrow To Bar', category: 'Arrows' },
  { icon: '⇾', name: 'Right Open-Headed Arrow', category: 'Arrows' },
  { icon: '⟹', name: 'Long Right Double Arrow', category: 'Arrows' },
  { icon: '←', name: 'Left Arrow', category: 'Arrows' },
  { icon: '⇐', name: 'Left Double Arrow', category: 'Arrows' },
  { icon: '⟵', name: 'Long Left Arrow', category: 'Arrows' },
  { icon: '⇦', name: 'Leftwards White Arrow', category: 'Arrows' },
  { icon: '⇤', name: 'Left Arrow To Bar', category: 'Arrows' },
  { icon: '⬅', name: 'Black Left Arrow', category: 'Arrows' },
  { icon: '↑', name: 'Up Arrow', category: 'Arrows' },
  { icon: '⇑', name: 'Up Double Arrow', category: 'Arrows' },
  { icon: '↓', name: 'Down Arrow', category: 'Arrows' },
  { icon: '⇓', name: 'Down Double Arrow', category: 'Arrows' },
  { icon: '❯', name: 'Heavy Right Angle Bracket', category: 'Arrows' },

  // Git
  { icon: '🌱', name: 'Seedling (Branch)', category: 'Git' },
  { icon: '', name: 'Branch', category: 'Git' }, // Nerd Font
  { icon: '±', name: 'Plus-Minus (Status)', category: 'Git' },
  { icon: '⇡', name: 'Upwards Dashed Arrow (Ahead)', category: 'Git' },
  { icon: '⇣', name: 'Downwards Dashed Arrow (Behind)', category: 'Git' },
  { icon: '⇕', name: 'Up Down Arrow (Diverged)', category: 'Git' },
  { icon: 'x', name: 'Cross (Conflicted)', category: 'Git' },
  { icon: '!', name: 'Exclamation (Modified)', category: 'Git' },
  { icon: '+', name: 'Plus (Added)', category: 'Git' },
  { icon: '?', name: 'Question (Untracked)', category: 'Git' },

  // Languages
  { icon: '⬢', name: 'Node.js', category: 'Languages' },
  { icon: '🐍', name: 'Python', category: 'Languages' },
  { icon: '🦀', name: 'Rust', category: 'Languages' },
  { icon: '🐹', name: 'Go', category: 'Languages' },
  { icon: '☕', name: 'Java', category: 'Languages' },
  { icon: '🐘', name: 'PHP', category: 'Languages' },
  { icon: '💎', name: 'Ruby', category: 'Languages' },

  // Cloud
  { icon: '☁️', name: 'Cloud (AWS/GCP)', category: 'Cloud' },
  { icon: 'aws', name: 'AWS text', category: 'Cloud' },
  { icon: 'gcp', name: 'GCP text', category: 'Cloud' },

  // Containers
  { icon: '🐳', name: 'Docker', category: 'Containers' },
  { icon: '☸', name: 'Kubernetes', category: 'Containers' },
  { icon: '📦', name: 'Package', category: 'Containers' },

  // Misc
  { icon: '📁', name: 'Folder', category: 'Misc' },
  { icon: '🚀', name: 'Rocket', category: 'Misc' },
  { icon: '⚡', name: 'Lightning', category: 'Misc' },
  { icon: '✓', name: 'Check', category: 'Misc' },
  { icon: '✗', name: 'Cross', category: 'Misc' },
  { icon: '●', name: 'Circle', category: 'Misc' },
  { icon: '○', name: 'Open Circle', category: 'Misc' },
  { icon: '◆', name: 'Diamond', category: 'Misc' },
  { icon: '★', name: 'Star', category: 'Misc' },
  { icon: '🕒', name: 'Clock', category: 'Misc' },
  { icon: '🔋', name: 'Battery', category: 'Misc' },
  { icon: '⏱️', name: 'Stopwatch', category: 'Misc' },
];

export function IconBrowser({ onSelect, currentSymbol }: IconBrowserProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredSymbols = SYMBOLS.filter((symbol) => {
    const matchesCategory =
      activeCategory === 'All' || symbol.category === activeCategory;
    const matchesSearch =
      symbol.name.toLowerCase().includes(search.toLowerCase()) ||
      symbol.icon.includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full max-h-[400px] flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl">
      <div className="flex flex-col gap-3 border-b border-gray-800 p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search symbols..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-9 pr-8 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:bg-gray-700 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors',
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white',
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-gray-700 flex-1 overflow-y-auto p-4">
        {filteredSymbols.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            No symbols found matching "{search}"
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
            {filteredSymbols.map((symbol, idx) => {
              const isSelected = currentSymbol?.includes(symbol.icon);

              return (
                <button
                  key={`${symbol.icon}-${idx}`}
                  onClick={() => onSelect(symbol.icon)}
                  className={cn(
                    'group relative flex aspect-square flex-col items-center justify-center rounded-md border transition-all',
                    isSelected
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-800 bg-gray-800 hover:border-gray-600 hover:bg-gray-700',
                  )}
                  title={symbol.name}
                >
                  <span
                    className={cn(
                      'text-xl',
                      isSelected
                        ? 'text-blue-400'
                        : 'text-gray-200 group-hover:text-white',
                    )}
                  >
                    {symbol.icon}
                  </span>

                  {isSelected && (
                    <div className="absolute -right-1 -top-1 rounded-full bg-blue-500 p-0.5 text-white">
                      <Check size={10} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
