import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { StyleEditor } from '../StyleEditor';

test('renders StyleEditor with default props', () => {
  render(<StyleEditor value="" onChange={vi.fn()} />);

  // Test for Fore/Background label existence
  expect(screen.getByText('Foreground')).toBeInTheDocument();
  expect(screen.getByText('Background')).toBeInTheDocument();

  // Modifiers label
  expect(screen.getByText('Modifiers')).toBeInTheDocument();

  // Modifiers buttons should be present
  expect(
    screen.getByRole('button', { name: 'Toggle Bold' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Toggle Italic' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Toggle Underline' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Dim')).toBeInTheDocument();
  expect(screen.getByText('Inverted')).toBeInTheDocument();
});

test('calls onChange when a modifier is toggled', () => {
  const onChangeMock = vi.fn();
  render(<StyleEditor value="" onChange={onChangeMock} />);

  const boldButton = screen.getByRole('button', { name: 'Toggle Bold' });
  fireEvent.click(boldButton);

  expect(onChangeMock).toHaveBeenCalledWith('bold');
});

test('parses existing style correctly', () => {
  const onChangeMock = vi.fn();
  render(<StyleEditor value="bold bg:red blue" onChange={onChangeMock} />);

  const boldButton = screen.getByRole('button', { name: 'Toggle Bold' });
  expect(boldButton.getAttribute('aria-pressed')).toBe('true');

  // Test toggling off an existing style
  fireEvent.click(boldButton);
  expect(onChangeMock).toHaveBeenCalledWith('bg:red blue');
});
