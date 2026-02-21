import { describe, it, expect } from 'vitest';
import { TomlParser } from './toml-parser';

describe('TomlParser', () => {
  describe('merge', () => {
    it('should merge two objects', () => {
      const base = { a: 1, b: { c: 2 } };
      const override = { b: { d: 3 }, e: 4 };
      const expected = { a: 1, b: { c: 2, d: 3 }, e: 4 };
      expect(TomlParser.merge(base as any, override as any)).toEqual(expected);
    });

    it('should NOT allow prototype pollution via __proto__', () => {
      const base = {};
      const override = JSON.parse('{"__proto__": {"polluted": "yes"}}');

      const result = TomlParser.merge(base as any, override as any);

      // @ts-ignore
      expect(result.polluted).toBeUndefined();
      // @ts-ignore
      expect(({}).polluted).toBeUndefined();
    });

    it('should NOT allow prototype pollution via constructor', () => {
      const base = {};
      const override = JSON.parse('{"constructor": {"prototype": {"polluted": "yes"}}}');

      const result = TomlParser.merge(base as any, override as any);

      // @ts-ignore
      expect(result.polluted).toBeUndefined();
      // @ts-ignore
      expect(({}).polluted).toBeUndefined();
    });

    it('should NOT allow prototype pollution via prototype', () => {
      const base = {};
      const override = JSON.parse('{"prototype": {"polluted": "yes"}}');

      const result = TomlParser.merge(base as any, override as any);

      // @ts-ignore
      expect(result.polluted).toBeUndefined();
      // @ts-ignore
      expect(({}).polluted).toBeUndefined();
    });
  });
});
