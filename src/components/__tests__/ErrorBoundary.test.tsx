import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );
    expect(getByText('Normal content')).toBeInTheDocument();
  });

  it('should render fallback UI when a child throws an error', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ProblematicChild = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicChild />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
