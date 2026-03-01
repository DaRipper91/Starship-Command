import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );
    expect(getByText('Safe Content')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    // Suppress console.error for expected error thrown in test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ProblemChild = () => {
      throw new Error('Test Error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
