import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TerminalPreview } from '../TerminalPreview';

// Mock xterm globals
vi.mock('xterm', () => {
  return {
    Terminal: class {
      options: Record<string, unknown> = {};
      loadAddon() {}
      open() {}
      dispose() {}
      reset() {}
      write() {}
    },
  };
});

vi.mock('xterm-addon-fit', () => {
  return {
    FitAddon: class {
      fit() {}
    },
  };
});

// Provide ResizeObserver mock to avoid test failures
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(
  globalThis as unknown as { ResizeObserver: typeof MockResizeObserver }
).ResizeObserver = MockResizeObserver;

import { ToastProvider } from '../../contexts/ToastContext';

describe('TerminalPreview', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ToastProvider>
        <TerminalPreview />
      </ToastProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
