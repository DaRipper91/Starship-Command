import { describe, it, expect } from 'vitest';
import { ColorUtils } from './color-utils';

describe('ColorUtils.toAnsiStyle', () => {
  it('should return the color string when no options are provided', () => {
    expect(ColorUtils.toAnsiStyle('red')).toBe('red');
    expect(ColorUtils.toAnsiStyle('#ff0000')).toBe('#ff0000');
  });

  it('should handle bold modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { bold: true })).toBe('bold red');
  });

  it('should handle italic modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { italic: true })).toBe('italic red');
  });

  it('should handle dimmed modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { dimmed: true })).toBe('dimmed red');
  });

  it('should handle inverted modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { inverted: true })).toBe(
      'inverted red',
    );
  });

  it('should handle underline modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { underline: true })).toBe(
      'underline red',
    );
  });

  it('should handle background color', () => {
    expect(ColorUtils.toAnsiStyle('white', { bg: 'blue' })).toBe(
      'bg:blue white',
    );
  });

  it('should handle multiple modifiers', () => {
    expect(ColorUtils.toAnsiStyle('red', { bold: true, italic: true })).toBe(
      'bold italic red',
    );
  });

  it('should handle multiple modifiers and background color', () => {
    const options = {
      bold: true,
      italic: true,
      bg: 'blue',
    };
    expect(ColorUtils.toAnsiStyle('white', options)).toBe(
      'bold italic bg:blue white',
    );
  });

  it('should handle all modifiers and background color', () => {
    const options = {
      bold: true,
      italic: true,
      dimmed: true,
      inverted: true,
      underline: true,
      bg: 'black',
    };
    expect(ColorUtils.toAnsiStyle('white', options)).toBe(
      'bold italic dimmed inverted underline bg:black white',
    );
  });

  it('should return only modifiers if color is empty', () => {
    expect(ColorUtils.toAnsiStyle('', { bold: true })).toBe('bold');
    expect(ColorUtils.toAnsiStyle('', { bold: true, italic: true })).toBe(
      'bold italic',
    );
    expect(ColorUtils.toAnsiStyle('', { bg: 'blue' })).toBe('bg:blue');
  });

  it('should return empty string if color is empty and no options provided', () => {
    expect(ColorUtils.toAnsiStyle('')).toBe('');
    expect(ColorUtils.toAnsiStyle('', {})).toBe('');
  });

  it('should ignore modifiers set to false', () => {
    const options = {
      bold: false,
      italic: true,
      underline: false,
    };
    expect(ColorUtils.toAnsiStyle('red', options)).toBe('italic red');
  });
});

describe('ColorUtils', () => {
  describe('generateAnalogous', () => {
    it('should generate analogous colors', () => {
      const baseColor = '#ff0000';
      const colors = ColorUtils.generateAnalogous(baseColor);

      // Check that it returns an array
      expect(Array.isArray(colors)).toBe(true);

      // Colord usually returns 3 colors for analogous harmony
      expect(colors.length).toBe(3);

      // Check that all elements are valid hex strings
      colors.forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should include colors related to the base color', () => {
      const baseColor = '#ff0000';
      const colors = ColorUtils.generateAnalogous(baseColor);
      expect(colors.map((c) => c.toLowerCase())).toContain(
        baseColor.toLowerCase(),
      );
    });

    it('should handle different base colors', () => {
      const baseColor = '#00ff00';
      const colors = ColorUtils.generateAnalogous(baseColor);
      expect(colors.length).toBe(3);
      expect(colors.map((c) => c.toLowerCase())).toContain(
        baseColor.toLowerCase(),
      );
    });

    it('should handle shorthand hex codes', () => {
      const baseColor = '#f00';
      const fullColor = '#ff0000';
      const colors = ColorUtils.generateAnalogous(baseColor);
      expect(colors.length).toBe(3);
      expect(colors.map((c) => c.toLowerCase())).toContain(
        fullColor.toLowerCase(),
      );
    });
  });
});
