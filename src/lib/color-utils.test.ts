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
    expect(ColorUtils.toAnsiStyle('red', { inverted: true })).toBe('inverted red');
  });

  it('should handle underline modifier', () => {
    expect(ColorUtils.toAnsiStyle('red', { underline: true })).toBe('underline red');
  });

  it('should handle background color', () => {
    expect(ColorUtils.toAnsiStyle('white', { bg: 'blue' })).toBe('bg:blue white');
  });

  it('should handle multiple modifiers', () => {
    expect(ColorUtils.toAnsiStyle('red', { bold: true, italic: true })).toBe('bold italic red');
  });

  it('should handle multiple modifiers and background color', () => {
    const options = {
      bold: true,
      italic: true,
      bg: 'blue',
    };
    expect(ColorUtils.toAnsiStyle('white', options)).toBe('bold italic bg:blue white');
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
    expect(ColorUtils.toAnsiStyle('white', options)).toBe('bold italic dimmed inverted underline bg:black white');
  });

  it('should return only modifiers if color is empty', () => {
    expect(ColorUtils.toAnsiStyle('', { bold: true })).toBe('bold');
    expect(ColorUtils.toAnsiStyle('', { bold: true, italic: true })).toBe('bold italic');
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
