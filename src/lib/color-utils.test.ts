import { describe, it, expect } from 'vitest';
import { ColorUtils } from './color-utils';

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
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should include colors related to the base color', () => {
      const baseColor = '#ff0000';
      const colors = ColorUtils.generateAnalogous(baseColor);
      expect(colors.map(c => c.toLowerCase())).toContain(baseColor.toLowerCase());
    });

    it('should handle different base colors', () => {
        const baseColor = '#00ff00';
        const colors = ColorUtils.generateAnalogous(baseColor);
        expect(colors.length).toBe(3);
        expect(colors.map(c => c.toLowerCase())).toContain(baseColor.toLowerCase());
    });

    it('should handle shorthand hex codes', () => {
        const baseColor = '#f00';
        const fullColor = '#ff0000';
        const colors = ColorUtils.generateAnalogous(baseColor);
        expect(colors.length).toBe(3);
        expect(colors.map(c => c.toLowerCase())).toContain(fullColor.toLowerCase());
    });
  });
});
