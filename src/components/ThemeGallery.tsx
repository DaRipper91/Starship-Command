import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../stores/theme-store';
import { PRESET_THEMES } from '../lib/presets';
import { Trash2, Check } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { ThemeMetadata } from '../types/starship.types';

export function ThemeGallery() {
  const { currentTheme, loadTheme } = useThemeStore();
  const { toast } = useToast();
  const [savedThemes, setSavedThemes] = useState<ThemeMetadata[]>([]);

  // Load saved themes from local storage on mount
  useEffect(() => {
    const loadSaved = () => {
      const themes: ThemeMetadata[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key?.startsWith('starship-theme-') &&
          key !== 'starship-theme-storage'
        ) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '');
            if (data.metadata) {
              themes.push(data.metadata);
            }
          } catch (e) {
            console.error('Failed to parse theme', key);
          }
        }
      }
      setSavedThemes(
        themes.sort(
          (a, b) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime(),
        ),
      );
    };

    loadSaved();
    // Listen for storage events to update list
    window.addEventListener('storage', loadSaved);
    return () => window.removeEventListener('storage', loadSaved);
  }, []);

  const handleLoad = async (preset: ThemeMetadata) => {
    if (confirm('Load this theme? Unsaved changes will be lost.')) {
      // If it's a preset, we need to load it from PRESET_THEMES map (which we need to expose or handle)
      // For now, we assume PRESET_THEMES is an array of full theme objects, but here we imported PRESET_THEMES which is just metadata in this context?
      // Actually PRESET_THEMES in lib/presets.ts is likely the full object. Let's check imports.

      // In a real app, we might fetch by ID.
      // For this demo, let's assume if it's a preset we find it in the PRESET_THEMES list.
      const foundPreset = PRESET_THEMES.find(
        (p) => p.metadata.id === preset.id,
      );

      if (foundPreset) {
        loadTheme(foundPreset);
        toast(`Loaded preset: ${preset.name}`, 'success');
      } else {
        // Try loading from local storage
        const stored = localStorage.getItem(`starship-theme-${preset.id}`);
        if (stored) {
          const data = JSON.parse(stored);
          loadTheme(data);
          toast(`Loaded theme: ${preset.name}`, 'success');
        } else {
          toast('Theme not found', 'error');
        }
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this saved theme?')) {
      localStorage.removeItem(`starship-theme-${id}`);
      setSavedThemes((prev) => prev.filter((t) => t.id !== id));
      toast('Theme deleted', 'info');
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      <div className="border-b border-gray-700 p-4">
        <h2 className="text-xl font-bold text-gray-100">Theme Gallery</h2>
        <p className="text-sm text-gray-400">Choose a preset or saved theme</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Presets */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Presets
          </h3>
          <div className="grid gap-3">
            {PRESET_THEMES.map((theme) => (
              <div
                key={theme.metadata.id}
                className={`group relative cursor-pointer rounded-lg border p-3 transition-all hover:border-blue-500 hover:bg-gray-800 ${currentTheme.metadata.id === theme.metadata.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-900/40'}`}
                onClick={() => handleLoad(theme.metadata)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-200">
                    {theme.metadata.name}
                  </span>
                  {currentTheme.metadata.id === theme.metadata.id && (
                    <Check size={16} className="text-blue-400" />
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {theme.metadata.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Themes */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            My Themes
          </h3>
          {savedThemes.length === 0 ? (
            <p className="text-sm italic text-gray-500">No saved themes yet.</p>
          ) : (
            <div className="grid gap-3">
              {savedThemes.map((meta) => (
                <div
                  key={meta.id}
                  className={`group relative rounded-lg border p-3 transition-all hover:border-blue-500 hover:bg-gray-800 ${currentTheme.metadata.id === meta.id ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-900/40'}`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleLoad(meta)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-200">
                        {meta.name}
                      </span>
                      {currentTheme.metadata.id === meta.id && (
                        <Check size={16} className="text-blue-400" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Updated: {new Date(meta.updated).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(meta.id);
                    }}
                    className="absolute bottom-2 right-2 rounded p-1.5 text-gray-500 opacity-0 transition-opacity hover:bg-red-900/50 hover:text-red-400 group-hover:opacity-100"
                    title="Delete Theme"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
