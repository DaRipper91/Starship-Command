import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker } from '../ColorPicker';

describe('ColorPicker Component', () => {
  it('renders with initial color', () => {
    render(
      <ColorPicker color="#ff0000" onChange={vi.fn()} label="Test Color" />,
    );
    expect(screen.getByText('Test Color')).toBeInTheDocument();
    // The input should have the color value
    expect(screen.getByDisplayValue('#ff0000')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = vi.fn();
    render(<ColorPicker color="#ff0000" onChange={handleChange} />);

    const input = screen.getByDisplayValue('#ff0000');
    fireEvent.change(input, { target: { value: '#00ff00' } });

    expect(handleChange).toHaveBeenCalledWith('#00ff00');
  });
});
