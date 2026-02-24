import '@testing-library/jest-dom';

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
  constructor() {}
  postMessage() {}
  onmessage = null;
  onerror = null;
  terminate() {}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.Worker = MockWorker as any;

// Mock createImageBitmap
global.createImageBitmap = vi.fn().mockResolvedValue({} as ImageBitmap);

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
