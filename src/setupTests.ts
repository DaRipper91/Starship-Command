import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock localStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0, // Add length property
  key: vi.fn(), // Add key method
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock Worker
class MockWorker {
  url: string | URL;
  onmessage: ((this: Worker, ev: MessageEvent) => unknown) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => unknown) | null = null;

  constructor(stringUrl: string | URL) {
    this.url = stringUrl;
  }

  postMessage(_message: unknown) {
    // Dummy implementation
  }

  terminate() {
    // Dummy implementation
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
}

(globalThis as unknown as { Worker: typeof MockWorker }).Worker = MockWorker;

// Mock createImageBitmap
(globalThis as unknown as { createImageBitmap: unknown }).createImageBitmap = vi
  .fn()
  .mockResolvedValue({});
