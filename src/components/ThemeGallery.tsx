import React from "react";
import { useThemeStore } from "../stores/theme-store";
import { PRESET_THEMES } from "../lib/presets";
import { cn } from "../lib/utils";
import { Play, Trash2, Clock } from "lucide-react";

interface ThemeGalleryProps {
  className?: string;
  onSelect?: () => void;
}

export function ThemeGallery({ className, onSelect }: ThemeGalleryProps) {
  const { loadTheme, savedThemes, deleteTheme } = useThemeStore();

  const handleLoad = (theme: any) => {
    loadTheme(theme);
    if (onSelect) onSelect();
  };

  return (
    <div className={cn("grid gap-8 p-6 overflow-y-auto h-full", className)}>
      {/* Presets Section */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Play className="h-5 w-5 text-blue-500" />
          Preset Themes
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_THEMES.map((theme) => (
            <div
              key={theme.metadata.id}
              className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-all hover:border-gray-600 hover:shadow-lg cursor-pointer"
              onClick={() => handleLoad(theme)}
            >
              <div className="p-4">
                <h3 className="font-medium text-gray-200 group-hover:text-blue-400">
                  {theme.metadata.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">
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
            </div>
          ))}
        </div>
      </section>

      {/* Saved Themes Section */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-500" />
          Saved Themes
        </h2>

        {savedThemes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/30 py-12 text-center">
            <p className="text-gray-500">No saved themes yet.</p>
            <p className="text-xs text-gray-600 mt-1">Save your current customization to see it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedThemes.map((theme) => (
              <div
                key={theme.metadata.id}
                className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-all hover:border-gray-600 hover:shadow-lg"
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => handleLoad(theme)}
                >
                  <h3 className="font-medium text-gray-200 group-hover:text-purple-400">
                    {theme.metadata.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Last updated: {new Date(theme.metadata.updated).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTheme(theme.metadata.id);
                  }}
                  className="absolute right-2 top-2 rounded p-1.5 text-gray-500 opacity-0 transition-opacity hover:bg-red-900/20 hover:text-red-400 group-hover:opacity-100"
                  title="Delete theme"
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
