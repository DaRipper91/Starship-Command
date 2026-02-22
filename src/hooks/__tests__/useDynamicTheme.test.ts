// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { renderHook, act } from '@testing-library/react';
// import { useDynamicTheme } from '../useDynamicTheme';
// import { useThemeStore } from '../../stores/theme-store';
// import { Theme } from '../../types/starship.types';

// // Mock Date to control time
// const MOCK_DATE = new Date('2026-02-22T10:00:00Z'); // 10:00 AM UTC
// const advanceTimersBy = vi.fn();

// const mockDate = (date: Date) => {
//   const _Date = Date;
//   // @ts-expect-error - Mocking Date constructor
//   global.Date = class extends _Date {
//     constructor(dateString?: string | number | Date) {
//       if (dateString) {
//         return new _Date(dateString);
//       }
//       return date;
//     }
//     static now() {
//       return date.getTime();
//     }
//   };
//   global.Date.now = vi.fn(() => date.getTime());
// };

// const MOCKED_PRESET_THEMES: Theme[] = [
//   {
//     metadata: {
//       id: 'preset-clean',
//       name: 'Clean',
//       created: new Date('2024-01-01'),
//       updated: new Date('2024-01-01'),
//       isPreset: true,
//     },
//     config: {
//       format: '$directory$git_branch$character',
//       directory: { style: 'bold cyan', truncation_length: 3 },
//       git_branch: { style: 'bold purple', symbol: '🌱 ' },
//       character: { success_symbol: '[❯](bold green)', error_symbol: '[❯](bold red)' },
//     },
//   },
//   {
//     metadata: {
//       id: 'preset-dracula',
//       name: 'Dracula',
//       created: new Date('2024-01-01'),
//       updated: new Date('2024-01-01'),
//       isPreset: true,
//     },
//     config: {
//       format: '$username$hostname$directory$git_branch$git_state$git_status$cmd_duration$line_break$character',
//       directory: { style: '#BD93F9' },
//       git_branch: { style: '#6272A4' },
//       character: { success_symbol: '[⚡](#50FA7B)', error_symbol: '[⚡](#FF5555)' },
//       git_status: { ahead: '🏎💨', behind: '😰', conflicted: '🏳', deleted: '🗑', diverged: '😵', format: '([$all_status$ahead_behind]($style) )', modified: '📝', renamed: '👅', staged: '[++()](green)', stashed: '📦', untracked: '🤷', up_to_date: '✓' },
//       nodejs: { format: 'via [⬢ $version](bold green) ' },
//     },
//   },
// ];

// // Mock the presets module so useDynamicTheme uses our MOCKED_PRESET_THEMES
// vi.mock('../../lib/presets', () => ({
//   PRESET_THEMES: MOCKED_PRESET_THEMES,
// }));

// // Mock zustand store
// vi.mock('../../stores/theme-store', () => ({
//   useThemeStore: vi.fn(),
// }));

// describe('useDynamicTheme Hook', () => {
//   const mockLoadTheme = vi.fn();

//   const mockSavedThemes = [
//     { metadata: { id: 'my-custom-day', name: 'My Custom Day' }, config: {} },
//     { metadata: { id: 'my-custom-night', name: 'My Custom Night' }, config: {} },
//   ];

//   beforeEach(() => {
//     vi.useFakeTimers();
//     mockDate(MOCK_DATE);
//     vi.clearAllMocks();
//     (useThemeStore as unknown as vi.Mock).mockReturnValue({
//       currentTheme: { metadata: { id: 'initial-theme' }, config: {} },
//       savedThemes: mockSavedThemes,
//       loadTheme: mockLoadTheme,
//     });
//   });

//   afterEach(() => {
//     vi.useRealTimers();
//   });

//   it('applies day theme during day time', () => {
//     const dayTheme = MOCKED_PRESET_THEMES.find(t => t.metadata.id === 'preset-clean');
//     mockDate(new Date('2026-02-22T08:00:00Z')); // 8:00 AM

//     renderHook(() => useDynamicTheme());

//     act(() => { vi.advanceTimersByTime(100); });

//     expect(mockLoadTheme).toHaveBeenCalledWith(dayTheme);
//   });

//   it('applies night theme during night time', () => {
//     const nightTheme = MOCKED_PRESET_THEMES.find(t => t.metadata.id === 'preset-dracula');
//     mockDate(new Date('2026-02-22T20:00:00Z')); // 8:00 PM

//     renderHook(() => useDynamicTheme());

//     act(() => { vi.advanceTimersByTime(100); });

//     expect(mockLoadTheme).toHaveBeenCalledWith(nightTheme);
//   });

//   it('does not re-apply theme if already active', () => {
//     const dayTheme = MOCKED_PRESET_THEMES.find(t => t.metadata.id === 'preset-clean');
//     mockDate(new Date('2026-02-22T08:00:00Z')); // 8:00 AM
//     (useThemeStore as unknown as vi.Mock).mockReturnValue({
//       currentTheme: dayTheme, // Provide the exact object reference
//       savedThemes: mockSavedThemes,
//       loadTheme: mockLoadTheme,
//     });

//     renderHook(() => useDynamicTheme());

//     act(() => { vi.advanceTimersByTime(100); });

//     expect(mockLoadTheme).not.toHaveBeenCalled();
//   });
// });
