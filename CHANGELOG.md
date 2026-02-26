# Changelog

## [1.2.0] - 2026-02-23

### Added
- **Performance**: Implemented a Web Worker for image color extraction to prevent UI freezing.
- **Performance**: Added debouncing (200ms) to the Terminal Preview to optimize rendering during rapid input.
- **Tests**: Added an automated test suite with Vitest, including unit tests and component tests (`TerminalPreview`, `ImagePalette`, `useDebounce`).
- **Scripts**: Added `test:coverage` script to `package.json`.

### Changed
- **Optimization**: Moved `ColorUtils` image processing logic to `src/workers/color-extraction.worker.ts`.
- **Optimization**: Memoized `SortableItem` in `ModuleList` and optimized DnD performance with stable callbacks.
- **Optimization**: Implemented Lazy Loading for `ThemeGallery`, `TerminalPreview`, `ImagePalette`, `ComparisonView`, and `ExportImport` using `React.lazy` and `Suspense`.
- **Dependencies**: Removed heavy dependencies `node-vibrant` and `colorthief` in favor of a lightweight custom extraction algorithm.

## [1.1.0] - 2026-02-22

### Added

- **Theme Import/Export**: Enhanced TOML validation and warning system for unknown modules.
- **Undo/Redo**: Added UI indicators and optimized history stack to prevent duplicate states.
- **Theme Presets**: Added confirmation prompt when loading presets if unsaved changes exist.
- **Type Safety**: Enforced strict TypeScript checks, eliminated `any`, and refined `StarshipConfig` types.
- **Resilience**: Added Error Boundaries to critical sections (ImagePalette, ComparisonView, ExportImport).
- **Build**: Optimized Vite build chunking (limit 400kb) and configured `tsc -b` for reliable type checking.
- **Tooling**: Added `lint-staged` and `husky` for pre-commit checks.

## [1.0.0] - 2026-02-22

### Added

- Complete UI layout.
- Terminal Preview with ANSI formatting.
- Drag and drop module builder.
- Color Picker and Image Palette extractor.
- Export/Import to TOML.
- Theme Gallery.
- Comparison View, Suggestion Panel, and Welcome Wizard.
- Accessibility configurations and Keyboard Command Palette.
