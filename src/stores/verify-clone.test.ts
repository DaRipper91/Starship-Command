import { describe, expect, it } from 'vitest';

import { deepClone } from './theme-slices/configSlice';

describe('deepClone logic verification', () => {
  it('clones Date objects', () => {
    const d = new Date('2023-01-01');
    const clonedD = deepClone(d);
    expect(clonedD).toBeInstanceOf(Date);
    expect(clonedD.getTime()).toBe(d.getTime());
    expect(clonedD).not.toBe(d);
  });

  it('clones arrays', () => {
    const arr = [1, { a: 1 }, [2]];
    const clonedArr = deepClone(arr);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
    expect(clonedArr[1]).not.toBe(arr[1]);
    expect(clonedArr[2]).not.toBe(arr[2]);
  });

  it('clones objects', () => {
    const obj = { a: 1, b: { c: 2 }, d: new Date() };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
    expect(clonedObj.d).toBeInstanceOf(Date);
    expect(clonedObj.d).not.toBe(obj.d);
  });

  it('handles null and primitives', () => {
    expect(deepClone(null)).toBe(null);
    expect(deepClone(123)).toBe(123);
    expect(deepClone('abc')).toBe('abc');
    expect(deepClone(true)).toBe(true);
  });
});
