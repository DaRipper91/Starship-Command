import { describe, it, expect, vi, afterEach } from 'vitest';
import { createDebouncedStorage } from './storage-utils';
import { StateStorage } from 'zustand/middleware';

describe('createDebouncedStorage', () => {
  const mockStorage: StateStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  const getStorage = () => mockStorage;

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should debounce setItem calls', () => {
    vi.useFakeTimers();
    const storage = createDebouncedStorage<string>(getStorage, { debounceTime: 100 });

    // Initial call
    storage.setItem('key', { state: 'value1', version: 0 });

    // Should not call underlying storage yet
    expect(mockStorage.setItem).not.toHaveBeenCalled();

    // Advance time partially
    vi.advanceTimersByTime(50);
    expect(mockStorage.setItem).not.toHaveBeenCalled();

    // Second call before debounce finishes
    storage.setItem('key', { state: 'value2', version: 0 });

    // Advance time past first debounce but not second
    vi.advanceTimersByTime(60); // Total 110 from start, but reset at 50 -> 60 elapsed since second call
    expect(mockStorage.setItem).not.toHaveBeenCalled();

    // Advance time past second debounce
    vi.advanceTimersByTime(50); // Total 110 since second call
    expect(mockStorage.setItem).toHaveBeenCalledTimes(1);
    // createJSONStorage stringifies the value
    expect(mockStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify({ state: 'value2', version: 0 }));
  });
});
