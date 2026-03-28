import { describe, expect, it } from 'vitest';
import { translateThemeToXterm } from './theme-to-xterm';
import { StarshipConfig } from '../types/starship.types';

describe('translateThemeToXterm', () => {
  it('should return default theme values for an empty config', () => {
    const config: StarshipConfig = {};
    const theme = translateThemeToXterm(config);

    expect(theme.background).toBe('#1e1e1e');
    expect(theme.foreground).toBe('#ffffff');
    expect(theme.cursor).toBe('#ffffff');
    expect(theme.selectionBackground).toBe('rgba(255, 255, 255, 0.3)');

    // Check some ANSI defaults
    expect(theme.black).toBe('#2e3440');
    expect(theme.red).toBe('#bf616a');
    expect(theme.brightWhite).toBe('#eceff4');
  });

  it('should apply global palette overrides', () => {
    const config: StarshipConfig = {
      palettes: {
        global: {
          bg: '#000000',
          fg: '#eeeeee',
          color0: '#111111',
          color1: '#ff0000',
          color8: '#222222',
        }
      }
    };
    const theme = translateThemeToXterm(config);

    expect(theme.background).toBe('#000000');
    expect(theme.foreground).toBe('#eeeeee');
    expect(theme.black).toBe('#111111');
    expect(theme.red).toBe('#ff0000');
    expect(theme.brightBlack).toBe('#222222');

    // Check a fallback for a color not in the global palette
    expect(theme.green).toBe('#a3be8c');
  });

  it('should select a specific named palette', () => {
    const config: StarshipConfig = {
      palette: 'my-theme',
      palettes: {
        global: {
          bg: '#000000',
        },
        'my-theme': {
          bg: '#222222',
          fg: '#dddddd',
        }
      }
    };
    const theme = translateThemeToXterm(config);

    expect(theme.background).toBe('#222222');
    expect(theme.foreground).toBe('#dddddd');
  });

  it('should resolve color redirection within a palette', () => {
    const config: StarshipConfig = {
      palettes: {
        global: {
          bg: 'color0',
          color0: '#000000',
          fg: '#ffffff'
        }
      }
    };
    const theme = translateThemeToXterm(config);

    expect(theme.background).toBe('#000000');
    expect(theme.foreground).toBe('#ffffff');
  });

  it('should handle all ANSI color mappings correctly', () => {
    const config: StarshipConfig = {
      palettes: {
        global: {
          color0: '#000000',
          color1: '#000001',
          color2: '#000002',
          color3: '#000003',
          color4: '#000004',
          color5: '#000005',
          color6: '#000006',
          color7: '#000007',
          color8: '#000008',
          color9: '#000009',
          color10: '#00000a',
          color11: '#00000b',
          color12: '#00000c',
          color13: '#00000d',
          color14: '#00000e',
          color15: '#00000f',
        }
      }
    };
    const theme = translateThemeToXterm(config);

    expect(theme.black).toBe('#000000');
    expect(theme.red).toBe('#000001');
    expect(theme.green).toBe('#000002');
    expect(theme.yellow).toBe('#000003');
    expect(theme.blue).toBe('#000004');
    expect(theme.magenta).toBe('#000005');
    expect(theme.cyan).toBe('#000006');
    expect(theme.white).toBe('#000007');
    expect(theme.brightBlack).toBe('#000008');
    expect(theme.brightRed).toBe('#000009');
    expect(theme.brightGreen).toBe('#00000a');
    expect(theme.brightYellow).toBe('#00000b');
    expect(theme.brightBlue).toBe('#00000c');
    expect(theme.brightMagenta).toBe('#00000d');
    expect(theme.brightCyan).toBe('#00000e');
    expect(theme.brightWhite).toBe('#00000f');
  });
});
