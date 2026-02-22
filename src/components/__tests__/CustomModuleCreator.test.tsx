// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { CustomModuleCreator } from '../CustomModuleCreator';
// import { useThemeStore } from '../../stores/theme-store';
// import { useToast } from '../../contexts/ToastContext';

// // Mock dependencies
// vi.mock('../../stores/theme-store', () => ({
//   useThemeStore: vi.fn(),
// }));
// vi.mock('../../contexts/ToastContext', () => ({
//   useToast: vi.fn(),
// }));
// vi.mock('../StyleEditor', () => ({
//   StyleEditor: vi.fn(({ value, onChange }) => (
//     <input data-testid="style-editor" value={value} onChange={(e) => onChange(e.target.value)} />
//   )),
// }));
// vi.mock('../IconBrowser', () => ({
//   IconBrowser: vi.fn(({ onSelect }) => (
//     <button data-testid="icon-browser-button" onClick={() => onSelect('🚀')}>Select Icon</button>
//   )),
// }));
// vi.mock('../FormatEditor', () => ({
//   FormatEditor: vi.fn(({ formatString, onChange }) => (
//     <input data-testid="format-editor" value={formatString} onChange={(e) => onChange(e.target.value)} />
//   )),
// }));

// describe('CustomModuleCreator Component', () => {
//   const mockUpdateConfig = vi.fn();
//   const mockOnClose = vi.fn();
//   const mockAddToast = vi.fn();

//   beforeEach(() => {
//     vi.clearAllMocks();
//     (useThemeStore as unknown as vi.Mock).mockReturnValue({
//       currentTheme: { config: { custom: {} } }, // Initial empty custom modules
//       updateConfig: mockUpdateConfig,
//     });
//     (useToast as unknown as vi.Mock).mockReturnValue({
//       addToast: mockAddToast,
//     });
//   });

//   it('renders correctly and shows validation errors', async () => {
//     render(<CustomModuleCreator onClose={mockOnClose} />);

//     fireEvent.click(screen.getByRole('button', { name: /create module/i }));

//     await waitFor(() => {
//       expect(mockAddToast).toHaveBeenCalledWith(
//         'Module ID and Command are required.',
//         'error',
//       );
//     });
//   });

//   it('creates a custom module successfully', async () => {
//     render(<CustomModuleCreator onClose={mockOnClose} />);

//     fireEvent.change(screen.getByLabelText(/module id/i), { target: { value: 'my_module' } });
//     fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'My Module' } });
//     fireEvent.change(screen.getByLabelText(/command to execute/i), { target: { value: 'echo hello' } });
//     fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'A test module' } });
//     fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'tools' } });

//     // Simulate icon selection
//     fireEvent.click(screen.getByRole('button', { name: /browse/i }));
//     fireEvent.click(screen.getByTestId('icon-browser-button')); // Click mock button

//     fireEvent.click(screen.getByRole('button', { name: /create module/i }));

//     await waitFor(() => {
//       expect(mockUpdateConfig).toHaveBeenCalledWith({
//         custom: {
//           my_module: {
//             command: 'echo hello',
//             description: 'A test module',
//             format: '$symbol$output',
//             shell: undefined,
//             style: 'white',
//             when: undefined,
//             symbol: '🚀', // Expecting the selected icon
//           },
//         },
//       });
//       expect(mockAddToast).toHaveBeenCalledWith(
//         'Custom module "My Module" created!',
//         'success',
//       );
//       expect(mockOnClose).toHaveBeenCalledTimes(1);
//     });
//   });
// });
