import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from './ToastContext';

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('throws error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for the expected error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponent = () => {
      useToast();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useToast must be used within a ToastProvider',
    );

    consoleSpy.mockRestore();
  });

  it('adds and displays a toast message', () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Test Message', 'success')}>
          Add Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const button = screen.getByText('Add Toast');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('auto-removes toast after 3 seconds', () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast('Auto Remove Message', 'info')}>
          Add Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const button = screen.getByText('Add Toast');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Auto Remove Message')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Auto Remove Message')).not.toBeInTheDocument();
  });

  it('manually removes a toast', () => {
    const TestComponent = () => {
      const { addToast } = useToast();

      return (
        <button onClick={() => addToast('Manual Remove Message', 'error')}>
          Add Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    const button = screen.getByText('Add Toast');
    act(() => {
      button.click();
    });

    expect(screen.getByText('Manual Remove Message')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', {
      name: 'Close notification',
    });

    act(() => {
      closeButton.click();
    });

    expect(screen.queryByText('Manual Remove Message')).not.toBeInTheDocument();
  });
});
