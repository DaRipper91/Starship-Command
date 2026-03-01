import { describe, expect, it } from 'vitest';
import { parseFormatString, styleToAnsi } from './format-parser';

describe('format-parser', () => {
  describe('styleToAnsi', () => {
    it('should generate ANSI code for bold and a color', () => {
      const result = styleToAnsi('bold red');
      expect(result).toBe('\x1b[1;31m');
    });

    it('should handle background colors', () => {
      const result = styleToAnsi('bg:blue');
      expect(result).toBe('\x1b[44m');
    });

    it('should return empty string for empty style (the implementation actually returns empty string)', () => {
      const result = styleToAnsi('');
      expect(result).toBe('');
    });
  });

  describe('parseFormatString', () => {
    it('should parse a simple string', () => {
      const result = parseFormatString('Hello World', {}, { values: {} });
      expect(result).toContain('Hello World');
    });

    it('should parse styled text blocks', () => {
      const result = parseFormatString('[test](red)', {}, { values: {} });
      expect(result).toContain('test');
      expect(result).toContain('\x1b[31m');
    });

    it('should parse module variables', () => {
      const config = { directory: { style: 'blue' } };
      const scenario = { values: { directory: '~/src' } };
      const result = parseFormatString('$directory', config, scenario as any);
      expect(result).toContain('~/src');
    });
  });
});
