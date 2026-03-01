import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('Button functionality', () => {
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <button onClick={handleClick}>Click Me</button>
    );
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
