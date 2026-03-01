import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';
import ColorThief from 'colorthief';

import { ColorPalette } from '../types/starship.types';

// Extend colord with necessary plugins
extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

export interface ExtendedColorPalette extends Partial<ColorPalette> {
  extracted16?: string[];
  bg?: string;
  fg?: string;
}

/**
 * Note: A standalone Python utility `color_extractor.py` is available in the root
 * for CLI-based color extraction. This JS implementation provides similar
 * functionality within the browser using ColorThief and node-vibrant.
 */
export class ColorUtils {
  /**
   * Extracts a color palette from an image file
   * @param imageFile - The image file to process
   * @returns Promise resolving to a ColorPalette-like object
   */
  static async extractPaletteFromImage(
    imageFile: File,
  ): Promise<ExtendedColorPalette> {
    return new Promise((resolve, reject) => {
      try {
        const imageUrl = URL.createObjectURL(imageFile);
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;

        img.onload = async () => {
          try {
            // Get standard 6 colors from vibrant for backward compatibility
            const { Vibrant } = await import('node-vibrant/browser');
            const vibrantPalette = await Vibrant.from(imageUrl).getPalette();

            // Use ColorThief to get 20 colors for full terminal generation
            const colorThief = new ColorThief();
            // getPalette returns an array of [r, g, b] arrays
            const rawPalette = colorThief.getPalette(img, 20) || [];

            // Sort by brightness (simple sum of RGB)
            const sortedPalette = rawPalette.sort(
              (a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]),
            );

            // Convert to hex
            const hexPalette = sortedPalette.map((c) =>
              colord({ r: c[0], g: c[1], b: c[2] }).toHex(),
            );

            const bg = hexPalette[0] || '#000000';
            const fg = hexPalette[hexPalette.length - 1] || '#ffffff';

            // Generate 16 colors (duplicate if not enough)
            let colors16 = hexPalette.slice(0, 16);
            while (colors16.length < 16 && colors16.length > 0) {
              colors16 = [...colors16, ...colors16].slice(0, 16);
            }

            URL.revokeObjectURL(imageUrl);

            resolve({
              primary: vibrantPalette.Vibrant?.hex || colors16[8] || '#ffffff',
              secondary:
                vibrantPalette.LightVibrant?.hex || colors16[10] || '#eeeeee',
              accent:
                vibrantPalette.DarkVibrant?.hex || colors16[4] || '#aaaaaa',
              background: bg,
              foreground: fg,
              success: '#10B981',
              error: '#EF4444',
              warning: '#F59E0B',
              extracted16: colors16,
              bg,
              fg,
            });
          } catch (e) {
            reject(e);
          }
        };

        img.onerror = (e) => {
          URL.revokeObjectURL(imageUrl);
          reject(e);
        };
      } catch (error) {
        console.error('Failed to extract palette:', error);
        reject(new Error('Could not extract colors from image'));
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
