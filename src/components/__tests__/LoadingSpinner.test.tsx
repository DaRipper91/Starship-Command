import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toBeInTheDocument();
    // Use .lucide-loader2 since the component uses `<Loader2>` which gets this class
    expect(container.querySelector('.lucide-loader2')).toBeInTheDocument();
  });

  it('renders with custom class', () => {
    const { container } = render(<LoadingSpinner className="custom-spinner" />);
    expect(container.querySelector('.custom-spinner')).toBeInTheDocument();
  });
});
