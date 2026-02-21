import {
  createJSONStorage,
  StateStorage,
  PersistStorage,
  StorageValue,
} from 'zustand/middleware';

interface DebouncedStorageOptions {
  debounceTime?: number;
}

export function createDebouncedStorage<S>(
  getStorage: () => StateStorage,
  options?: DebouncedStorageOptions,
): PersistStorage<S> | undefined {
  const storage = createJSONStorage(getStorage) as
    | PersistStorage<S>
    | undefined;

  if (!storage) {
    return undefined;
  }

  const debounceTime = options?.debounceTime ?? 1000;
  const timers: Record<string, ReturnType<typeof setTimeout>> = {};

  return {
    ...storage,
    setItem: (name: string, value: StorageValue<S>) => {
      if (timers[name]) {
        clearTimeout(timers[name]);
      }
      timers[name] = setTimeout(() => {
        void storage.setItem(name, value);
        delete timers[name];
      }, debounceTime);
    },
  };
}
