import { describe, expect, it } from 'vitest';
import { cn, generateId } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
      expect(cn('px-2 py-1', { 'bg-red-500': true, 'text-white': false })).toBe('px-2 py-1 bg-red-500');
    });

    it('should resolve tailwind conflicts correctly using twMerge', () => {
      expect(cn('px-2 py-1 bg-blue-500', 'bg-red-500')).toBe('px-2 py-1 bg-red-500');
    });
  });

  describe('generateId', () => {
    it('should generate a valid string ID', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });
});
