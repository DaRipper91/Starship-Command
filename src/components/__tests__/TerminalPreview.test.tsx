import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TerminalPreview } from '../TerminalPreview';

// Mock xterm
vi.mock('xterm', () => ({
  Terminal: class {
    loadAddon = vi.fn();
    open = vi.fn();
    reset = vi.fn();
    write = vi.fn();
    dispose = vi.fn();
  },
}));

// Mock xterm-addon-fit
vi.mock('xterm-addon-fit', () => ({
  FitAddon: class {
    fit = vi.fn();
  },
}));

// Mock useThemeStore
vi.mock('../../stores/theme-store', () => ({
  useThemeStore: () => ({
    currentTheme: {
      config: {},
      metadata: { id: 'test' },
    },
  }),
}));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as any;

describe('TerminalPreview', () => {
  it('renders without crashing', () => {
    render(<TerminalPreview />);
    expect(screen.getByText(/Terminal Preview/i)).toBeInTheDocument();
  });
});
