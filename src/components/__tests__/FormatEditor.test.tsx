import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TomlParser } from '../../lib/toml-parser';
import { useThemeStore } from '../../stores/theme-store';
import { FormatEditor } from '../FormatEditor';

// Mock zustand store
vi.mock('../../stores/theme-store', () => ({
  useThemeStore: vi.fn(),
}));

describe('FormatEditor Component', () => {
  const mockOnChange = vi.fn();
  const mockConfig = TomlParser.getDefaultConfig();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useThemeStore as unknown as vi.Mock).mockReturnValue({
      currentTheme: { config: mockConfig },
    });
  });

  it('renders initial format string correctly', () => {
    const formatString = '$directory[$git_branch](bold blue) Text';
    render(
      <FormatEditor formatString={formatString} onChange={mockOnChange} />,
    );

    expect(screen.getByText('$directory')).toBeInTheDocument();
    expect(screen.getByText('[$git_branch]')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('allows adding a text segment', () => {
    const formatString = '';
    render(
      <FormatEditor formatString={formatString} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole('button', { name: /add text/i }));
    expect(screen.getByText('New Text')).toBeInTheDocument();
  });

  it('allows editing a text segment', () => {
    const formatString = 'Hello';
    render(
      <FormatEditor formatString={formatString} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByText('Hello')); // Click to select segment
    const input = screen.getByPlaceholderText('Segment text');
    fireEvent.change(input, { target: { value: 'World' } });

    expect(screen.getByText('World')).toBeInTheDocument();
    // Expect onChange to be called with the updated format string eventually
    // This might be debounced or batched in a real app, so checking the final output is better
  });
});
