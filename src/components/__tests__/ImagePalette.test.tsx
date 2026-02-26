import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ImagePalette } from '../ImagePalette';

// Mock worker import
vi.mock('../../workers/color-extraction.worker?worker', () => ({
  default: vi.fn().mockImplementation(() => ({
    postMessage: vi.fn(),
    onmessage: null,
    onerror: null,
    terminate: vi.fn(),
  })),
}));

// Mock useThemeStore
vi.mock('../../stores/theme-store', () => ({
  useThemeStore: () => ({
    updateConfig: vi.fn(),
  }),
}));

// Mock useToast
vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

// Mock global APIs
global.URL.createObjectURL = vi.fn(() => 'blob:test');
global.URL.revokeObjectURL = vi.fn();
global.createImageBitmap = vi.fn().mockResolvedValue({} as ImageBitmap);

describe('ImagePalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders upload area', () => {
    render(<ImagePalette />);
    expect(screen.getByText(/Color from Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Click or drag image/i)).toBeInTheDocument();
  });

  it('handles file upload interaction', async () => {
    const { container } = render(<ImagePalette />);
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = container.querySelector('input[type="file"]');

    expect(input).toBeInTheDocument();

    // Simulate upload
    fireEvent.change(input!, { target: { files: [file] } });

    // Check if loading state appears (this requires worker interaction to complete, which is mocked but async)
    // Here we mainly test that it doesn't crash and triggers the flow.
    // To verify worker message, we'd need to access the mock instance.
  });
});
