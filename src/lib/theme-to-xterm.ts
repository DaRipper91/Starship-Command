import { ITheme } from 'xterm';

import { StarshipConfig } from '../types/starship.types';
import { ColorUtils } from './color-utils';

/**
 * Translates a StarshipConfig object's palette into an xterm.js theme.
 * @param {StarshipConfig} config - The Starship configuration.
 * @returns {ITheme} An xterm.js compatible theme object.
 */
export function translateThemeToXterm(config: StarshipConfig): ITheme {
  const xtermTheme: ITheme = {
    background: '#1e1e1e', // Default background
    foreground: '#ffffff', // Default foreground
    cursor: '#ffffff',
    selectionBackground: 'rgba(255, 255, 255, 0.3)',
  };

  const paletteName = config.palette || 'global';
  const customPalette = config.palettes?.[paletteName] || {};

  const getColor = (colorName: string, fallback: string): string => {
    if (customPalette[colorName]) {
      return ColorUtils.resolveColor(customPalette[colorName], customPalette);
    }
    return fallback;
  };

  // Basic colors
  xtermTheme.background = getColor('bg', '#1e1e1e');
  xtermTheme.foreground = getColor('fg', '#ffffff');

  // ANSI colors
  xtermTheme.black = getColor('color0', '#2e3440');
  xtermTheme.red = getColor('color1', '#bf616a');
  xtermTheme.green = getColor('color2', '#a3be8c');
  xtermTheme.yellow = getColor('color3', '#ebcb8b');
  xtermTheme.blue = getColor('color4', '#81a1c1');
  xtermTheme.magenta = getColor('color5', '#b48ead');
  xtermTheme.cyan = getColor('color6', '#88c0d0');
  xtermTheme.white = getColor('color7', '#e5e9f0');

  // Bright ANSI colors
  xtermTheme.brightBlack = getColor('color8', '#4c566a');
  xtermTheme.brightRed = getColor('color9', '#bf616a');
  xtermTheme.brightGreen = getColor('color10', '#a3be8c');
  xtermTheme.brightYellow = getColor('color11', '#ebcb8b');
  xtermTheme.brightBlue = getColor('color12', '#81a1c1');
  xtermTheme.brightMagenta = getColor('color13', '#b48ead');
  xtermTheme.brightCyan = getColor('color14', '#88c0d0');
  xtermTheme.brightWhite = getColor('color15', '#eceff4');

  return xtermTheme;
}
