import { describe, expect, it } from 'vitest';
import { ThemeValidator } from './theme-validator';
import { StarshipConfig } from '../types/starship.types';

describe('ThemeValidator', () => {
  describe('checkColorContrast', () => {
    it('should return no issues for high contrast colors', () => {
      const config: StarshipConfig = {
        directory: {
          style: 'bold #ffffff', // White on black is high contrast
        },
      };

      const issues = ThemeValidator.checkColorContrast(config);
      expect(issues).toHaveLength(0);
    });

    it('should return a warning for low contrast colors', () => {
      const config: StarshipConfig = {
        directory: {
          style: 'bold #111111', // Dark gray on black is low contrast
        },
      };

      const issues = ThemeValidator.checkColorContrast(config);
      expect(issues).toHaveLength(1);
      expect(issues[0]).toEqual({
        type: 'visual',
        severity: 'warning',
        message: 'Low contrast color #111111 in directory module',
        fix: 'Choose a lighter color for better readability on dark backgrounds',
      });
    });

    it('should check multiple modules', () => {
      const config: StarshipConfig = {
        directory: {
          style: 'bold #111111', // Low contrast
        },
        git_branch: {
          style: 'bold #000000', // Low contrast (black on black)
        },
      };

      const issues = ThemeValidator.checkColorContrast(config);
      expect(issues).toHaveLength(2);
      expect(issues[0].message).toContain('directory module');
      expect(issues[1].message).toContain('git_branch module');
    });

    it('should ignore styles without hex colors', () => {
      const config: StarshipConfig = {
        directory: {
          style: 'bold red', // Named color, currently ignored by regex
        },
      };

      const issues = ThemeValidator.checkColorContrast(config);
      expect(issues).toHaveLength(0);
    });

    it('should ignore empty styles', () => {
      const config: StarshipConfig = {
        directory: {
          style: '',
        },
      };

      const issues = ThemeValidator.checkColorContrast(config);
      expect(issues).toHaveLength(0);
    });
  });
});
