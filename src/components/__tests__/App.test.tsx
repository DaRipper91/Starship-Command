import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import App from '../../App';

// Mock expensive components and those with browser dependencies
vi.mock('../../components/TerminalPreview', () => ({
  TerminalPreview: () => (
    <div data-testid="terminal-preview">Terminal Preview</div>
  ),
}));

vi.mock('../../components/ThemeGallery', () => ({
  ThemeGallery: () => <div data-testid="theme-gallery">Gallery</div>,
}));

// Mock the worker import in color-utils if it's imported transitively
vi.mock('../../workers/color-extraction.worker?worker', () => ({
  default: class MockWorker {
    postMessage() {}
    terminate() {}
  },
}));

describe('App', () => {
  it('renders the header and main sections', () => {
    render(<App />);

    // Check Header
    expect(screen.getByText('Starship Theme Creator')).toBeInTheDocument();

    // Check Terminal Preview Mock
    expect(screen.getByTestId('terminal-preview')).toBeInTheDocument();

    // Check Buttons
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
