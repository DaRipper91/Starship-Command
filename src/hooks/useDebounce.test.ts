import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce the value change', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    // Value should not be updated immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.runAllTimers();
    });

    // Value should be updated after delay
    expect(result.current).toBe('updated');

    vi.useRealTimers();
  });
});
