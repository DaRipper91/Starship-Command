import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';

import { ColorPalette } from '../types/starship.types';
// Import the worker using Vite's special syntax
import ColorWorker from '../workers/color-extraction.worker?worker';

// Extend colord with necessary plugins
extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

export interface ExtendedColorPalette extends Partial<ColorPalette> {
  extracted16?: string[];
  bg?: string;
  fg?: string;
}

export class ColorUtils {
  /**
   * Extracts a color palette from an image file using a Web Worker
   * @param imageFile - The image file to process
   * @returns Promise resolving to a ColorPalette-like object
   */
  static async extractPaletteFromImage(
    imageFile: File,
  ): Promise<ExtendedColorPalette> {
    const bitmap = await createImageBitmap(imageFile);

    return new Promise((resolve, reject) => {
      const worker = new ColorWorker();

      worker.onmessage = (e) => {
        const { result, error } = e.data;
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result);
        }
        worker.terminate();
      };

      worker.onerror = (e) => {
        reject(e);
        worker.terminate();
      };

      try {
        worker.postMessage({ imageBitmap: bitmap }, [bitmap]);
      } catch (err) {
        reject(err);
        worker.terminate();
      }
    });
  }

  /**
   * Generates complementary colors
   */
  static generateComplementary(baseColor: string): string[] {
    return colord(baseColor)
      .harmonies('complementary')
      .map((c) => c.toHex());
  }

  /**
   * Generates analogous colors
   */
  static generateAnalogous(baseColor: string): string[] {
    return colord(baseColor)
      .harmonies('analogous')
      .map((c) => c.toHex());
  }

  /**
   * Generates triadic colors
   */
  static generateTriadic(baseColor: string): string[] {
    return colord(baseColor)
      .harmonies('triadic')
      .map((c) => c.toHex());
  }

  /**
   * Checks contrast ratio between two colors
   */
  static checkContrast(foreground: string, background: string) {
    const contrast = colord(background).contrast(foreground);
    return {
      ratio: contrast,
      AA: contrast >= 4.5,
      AAA: contrast >= 7,
    };
  }

  /**
   * Converts a color and modifiers to Starship style string
   */
  static toAnsiStyle(
    color: string,
    options: {
      bold?: boolean;
      italic?: boolean;
      dimmed?: boolean;
      inverted?: boolean;
      underline?: boolean;
      bg?: string;
    } = {},
  ): string {
    const parts: string[] = [];

    if (options.bold) parts.push('bold');
    if (options.italic) parts.push('italic');
    if (options.dimmed) parts.push('dimmed');
    if (options.inverted) parts.push('inverted');
    if (options.underline) parts.push('underline');

    if (options.bg) {
      parts.push(`bg:${options.bg}`);
    }

    if (color) {
      parts.push(color);
    }

    return parts.join(' ');
  }

  /**
   * Preset color schemes
   */
  static presets: Record<string, ColorPalette> = {
    Nord: {
      primary: '#88C0D0',
      secondary: '#81A1C1',
      accent: '#5E81AC',
      background: '#2E3440',
      foreground: '#D8DEE9',
      success: '#A3BE8C',
      warning: '#EBCB8B',
      error: '#BF616A',
    },
    Dracula: {
      primary: '#BD93F9',
      secondary: '#6272A4',
      accent: '#FF79C6',
      background: '#282A36',
      foreground: '#F8F8F2',
      success: '#50FA7B',
      warning: '#F1FA8C',
      error: '#FF5555',
    },
    Gruvbox: {
      primary: '#d79921',
      secondary: '#458588',
      accent: '#b16286',
      background: '#282828',
      foreground: '#ebdbb2',
      success: '#98971a',
      warning: '#fabd2f',
      error: '#cc241d',
    },
    Catppuccin: {
      primary: '#cba6f7',
      secondary: '#89b4fa',
      accent: '#f5c2e7',
      background: '#1e1e2e',
      foreground: '#cdd6f4',
      success: '#a6e3a1',
      warning: '#f9e2af',
      error: '#f38ba8',
    },
    TokyoNight: {
      primary: '#7aa2f7',
      secondary: '#7dcfff',
      accent: '#bb9af7',
      background: '#1a1b26',
      foreground: '#c0caf5',
      success: '#9ece6a',
      warning: '#e0af68',
      error: '#f7768e',
    },
    OneDark: {
      primary: '#61afef',
      secondary: '#c678dd',
      accent: '#98c379',
      background: '#282c34',
      foreground: '#abb2bf',
      success: '#98c379',
      warning: '#e5c07b',
      error: '#e06c75',
    },
    Monokai: {
      primary: '#fd971f',
      secondary: '#66d9ef',
      accent: '#ae81ff',
      background: '#272822',
      foreground: '#f8f8f2',
      success: '#a6e22e',
      warning: '#f4bf75',
      error: '#f92672',
    },
    Solarized: {
      primary: '#268bd2',
      secondary: '#2aa198',
      accent: '#d33682',
      background: '#002b36',
      foreground: '#839496',
      success: '#859900',
      warning: '#b58900',
      error: '#dc322f',
    },
  };
}
