// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { GlobalPaletteEditor } from '../GlobalPaletteEditor';
// import { useThemeStore } from '../../stores/theme-store';
// import { TomlParser } from '../../lib/toml-parser';
// import { ColorPicker } from '../ColorPicker';

// // Mock ColorPicker component
// vi.mock('../ColorPicker', () => ({
//   ColorPicker: vi.fn(({ label, color, onChange }) => (
//     <input type="text" aria-label={label} value={color} onChange={(e) => onChange(e.target.value)} />
//   )),
// }));

// // Mock zustand store
// vi.mock('../../stores/theme-store', () => ({
//   useThemeStore: vi.fn(),
// }));

// describe('GlobalPaletteEditor Component', () => {
//   const mockUpdateConfig = vi.fn();
//   const initialConfig = TomlParser.getDefaultConfig();

//   // Add a global palette to the default config for testing
//   initialConfig.palettes = {
//     global: {
//       primary: '#123456',
//       customColor1: '#abcdef',
//     },
//   };

//   beforeEach(() => {
//     vi.clearAllMocks();
//     (useThemeStore as unknown as vi.Mock).mockReturnValue({
//       currentTheme: { config: initialConfig },
//       updateConfig: mockUpdateConfig,
//     });
//   });

//   it('renders default global colors', () => {
//     render(<GlobalPaletteEditor />);
//     expect(screen.getByLabelText('Primary')).toBeInTheDocument();
//     expect(screen.getByLabelText('Background')).toBeInTheDocument();
//   });

//   it('renders custom global colors', () => {
//     render(<GlobalPaletteEditor />);
//     expect(screen.getByLabelText('CustomColor1')).toBeInTheDocument();
//   });

//   it('calls updateConfig on color change', () => {
//     render(<GlobalPaletteEditor />);
//     const primaryColorPicker = screen.getByLabelText('Primary'); // Assuming ColorPicker has a label
//     fireEvent.change(primaryColorPicker, { target: { value: '#ff0000' } });
//     // Check if updateConfig was called with the correct structure
//     expect(mockUpdateConfig).toHaveBeenCalledWith({
//       palettes: {
//         global: {
//           primary: '#ff0000',
//         },
//       },
//     });
//   });

//   it('allows adding a custom color', () => {
//     render(<GlobalPaletteEditor />);
//     fireEvent.click(screen.getByRole('button', { name: /add custom color/i }));

//     // Verify updateConfig was called for the new color
//     expect(mockUpdateConfig).toHaveBeenCalledWith({
//       palettes: {
//         global: {
//           customColor2: '#cccccc',
//         },
//       },
//     });
//   });

//   it('allows removing a custom color', async () => {
//     // Re-mock to include existing custom color
//     (useThemeStore as unknown as vi.Mock).mockReturnValue({
//       currentTheme: {
//         config: {
//           palettes: {
//             global: {
//               primary: '#123456',
//               customToRemove: '#abcdef',
//             },
//           },
//         },
//       },
//       updateConfig: mockUpdateConfig,
//     });

//     render(<GlobalPaletteEditor />);
//     const removeButton = screen.getByTitle('Remove custom color');
//     fireEvent.click(removeButton);

//     // Expect updateConfig to be called with the custom color removed
//     expect(mockUpdateConfig).toHaveBeenCalledWith({
//       palettes: {
//         global: {
//           primary: '#123456',
//         },
//       },
//     });
//   });
// });
