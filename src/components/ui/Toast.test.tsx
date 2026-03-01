import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToastContainer } from './Toast';

describe('ToastContainer Component', () => {
  it('should render the toast message', () => {
    const { getByText } = render(
      <ToastContainer toasts={[{ id: '1', message: 'Test message', type: 'success' }]} onRemove={() => {}} />
    );
    expect(getByText('Test message')).toBeInTheDocument();
  });

  it('should apply success styles', () => {
    const { container } = render(
      <ToastContainer toasts={[{ id: '1', message: 'Success!', type: 'success' }]} onRemove={() => {}} />
    );
    expect(container.querySelector('.bg-green-900\\/90')).toBeInTheDocument();
  });

  it('should apply error styles', () => {
    const { container } = render(
      <ToastContainer toasts={[{ id: '1', message: 'Error!', type: 'error' }]} onRemove={() => {}} />
    );
    expect(container.querySelector('.bg-red-900\\/90')).toBeInTheDocument();
  });
});
