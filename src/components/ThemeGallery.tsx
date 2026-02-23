import React from 'react';
import { useThemeStore } from '../stores/theme-store';
import { PRESET_THEMES } from '../lib/presets';
import { Theme } from '../types/starship.types';
import { cn } from '../lib/utils';
import { Play, Trash2, Clock } from 'lucide-react';

interface ThemeGalleryProps {
  className?: string;
  onSelect?: () => void;
}

export function ThemeGallery({ className, onSelect }: ThemeGalleryProps) {
  const { loadTheme, savedThemes, deleteTheme } = useThemeStore();

  const handleLoad = (theme: Theme) => {
    loadTheme(theme);
    if (onSelect) onSelect();
  };

  return (
    <div className={cn('grid h-full gap-8 overflow-y-auto p-6', className)}>
      {/* Presets Section */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Play className="h-5 w-5 text-blue-500" />
          Preset Themes
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_THEMES.map((theme) => (
            <button
              key={theme.metadata.id}
              type="button"
              className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-gray-700 bg-gray-800 text-left transition-all hover:border-gray-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => handleLoad(theme)}
              aria-label={`Load preset theme: ${theme.metadata.name}`}
            >
              <div className="p-4">
                <h3 className="font-medium text-gray-200 group-hover:text-blue-400">
                  {theme.metadata.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {theme.metadata.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {theme.metadata.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-700 px-2 py-0.5 text-xs font-medium text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Saved Themes Section */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Clock className="h-5 w-5 text-purple-500" />
          Saved Themes
        </h2>

        {savedThemes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/30 py-12 text-center">
            <p className="text-gray-500">No saved themes yet.</p>
            <p className="mt-1 text-xs text-gray-600">
              Save your current customization to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedThemes.map((theme) => (
              <div
                key={theme.metadata.id}
                className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-all hover:border-gray-600 hover:shadow-lg"
              >
                <button
                  type="button"
                  className="w-full cursor-pointer p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                  onClick={() => handleLoad(theme)}
                  aria-label={`Load saved theme: ${theme.metadata.name}`}
                >
                  <h3 className="font-medium text-gray-200 group-hover:text-purple-400">
                    {theme.metadata.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Last updated:{' '}
                    {new Date(theme.metadata.updated).toLocaleDateString()}
                  </p>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      confirm(
                        `Are you sure you want to delete theme "${theme.metadata.name}"?`,
                      )
                    ) {
                      deleteTheme(theme.metadata.id);
                    }
                  }}
                  className="absolute right-2 top-2 rounded p-1.5 text-gray-500 opacity-0 transition-opacity hover:bg-red-900/20 hover:text-red-400 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 group-hover:opacity-100"
                  title="Delete theme"
                  aria-label={`Delete theme ${theme.metadata.name}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
