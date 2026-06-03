import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type Mock, vi } from 'vitest';

import { useToast } from '../../../contexts/ToastContext';
import { useThemeStore } from '../../../stores/theme-store';
import { ImportTab } from '../ImportTab';

// Mock dependencies
vi.mock('../../../contexts/ToastContext', () => ({
  useToast: vi.fn(),
}));

vi.mock('../../../stores/theme-store', () => ({
  useThemeStore: vi.fn(),
}));

describe('ImportTab URL Import', () => {
  const mockOnClose = vi.fn();
  const mockAddToast = vi.fn();
  const mockImportToml = vi.fn();
  const mockFetch = vi.fn();
  const mockConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useToast as unknown as Mock).mockReturnValue({
      addToast: mockAddToast,
    });

    (useThemeStore as unknown as Mock).mockReturnValue({
      importToml: mockImportToml,
    });

    mockConfirm.mockReturnValue(true);
    vi.stubGlobal('fetch', mockFetch);
    vi.stubGlobal('confirm', mockConfirm);
  });

  it('displays a validation error when fetch fails (res.ok is false)', async () => {
    // Mock fetch to return a non-ok response
    mockFetch.mockResolvedValue({
      ok: false,
      text: async () => 'Not Found',
    });

    render(<ImportTab onClose={mockOnClose} />);

    // Type a URL
    const urlInput = screen.getByPlaceholderText(
      'https://raw.githubusercontent.com/...',
    );
    await userEvent.type(urlInput, 'https://example.com/starship.toml');

    // Click Fetch button
    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    await userEvent.click(fetchButton);

    // Assert fetch was called with the correct URL
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/starship.toml');

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(
          'Failed to fetch from URL. Make sure it points to a raw text file.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('displays a validation error when fetch rejects completely (network error)', async () => {
    // Mock fetch to simulate a network failure
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<ImportTab onClose={mockOnClose} />);

    // Type a URL
    const urlInput = screen.getByPlaceholderText(
      'https://raw.githubusercontent.com/...',
    );
    await userEvent.type(urlInput, 'https://example.com/network-error.toml');

    // Click Fetch button
    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    await userEvent.click(fetchButton);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(
          'Failed to fetch from URL. Make sure it points to a raw text file.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('successfully fetches and validates TOML on a successful URL import', async () => {
    // Mock fetch to return a valid TOML text
    const validToml = '[character]\nsuccess_symbol = "❯"';
    mockFetch.mockResolvedValue({
      ok: true,
      text: async () => validToml,
    });

    render(<ImportTab onClose={mockOnClose} />);

    const urlInput = screen.getByPlaceholderText(
      'https://raw.githubusercontent.com/...',
    );
    await userEvent.type(urlInput, 'https://example.com/valid.toml');

    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    await userEvent.click(fetchButton);

    await waitFor(() => {
      expect(mockImportToml).toHaveBeenCalledWith(validToml);
      expect(mockAddToast).toHaveBeenCalledWith(
        'Theme imported successfully!',
        'success',
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
