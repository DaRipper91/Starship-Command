import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';
import { ColorUtils } from '../lib/color-utils';
import { ColorPalette } from '../types/starship.types';
import { Upload, Image as ImageIcon } from 'lucide-react';

export function ImagePalette() {
  const { updateConfig } = useThemeStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [palette, setPalette] = useState<Partial<ColorPalette> | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    setIsExtracting(true);
    try {
      const extracted = await ColorUtils.extractPaletteFromImage(file);
      setPalette(extracted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExtracting(false);
    }
  };

  const applyPalette = () => {
    if (!palette) return;

    // Apply colors intelligently based on the spec
    updateConfig({
      directory: { style: `bold ${palette.primary}` },
      git_branch: { style: palette.secondary },
      character: {
        success_symbol: `[❯](bold ${palette.success})`,
        error_symbol: `[✖](bold ${palette.error})`,
      },
    });
  };

  return (
    <div className="mt-4 flex flex-col gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4 shadow-sm">
      <h3 className="flex items-center gap-2 font-semibold text-gray-200">
        <ImageIcon size={16} /> Color from Image
      </h3>

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 transition-colors hover:border-gray-500 hover:bg-gray-700">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <>
              <Upload className="mb-2 text-gray-400" size={24} />
              <p className="text-xs text-gray-400">Click or drag image</p>
            </>
          )}
        </div>
      </div>

      {isExtracting && (
        <p className="text-center text-sm text-gray-400">
          Extracting colors...
        </p>
      )}

      {palette && !isExtracting && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(palette).map(([key, hex]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded border border-gray-700 shadow-sm"
                  style={{ backgroundColor: hex as string }}
                />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[10px] uppercase text-gray-500">
                    {key}
                  </span>
                  <span className="font-mono text-xs text-gray-300">
                    {hex as string}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={applyPalette}
            className="w-full rounded bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Apply Palette to Theme
          </button>
        </div>
      )}
    </div>
  );
}
