import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render correctly', () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply custom classname', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
