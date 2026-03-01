# Changelog

## [1.2.0] - Performance & Quality Update

### Added
- **Performance:** Debounced live terminal preview updates to reduce excessive xterm writes during rapid typing.
- **Performance:** Offloaded image color extraction to an `OffscreenCanvas` Web Worker, keeping the main thread interactive, and added a visible `LoadingSpinner` state.
- **Performance:** Implemented `React.lazy` and `Suspense` for heavy components (e.g., `ThemeGallery`, `TerminalPreview`), drastically reducing the initial JavaScript payload.
- **Testing:** Established a baseline `vitest` suite, adding coverage tests for `format-parser.ts`, `utils.ts`, `Toast.tsx`, `ErrorBoundary.tsx`, and `LoadingSpinner.tsx`. Configured `@vitest/coverage-v8` to track progress towards a 70% coverage goal.

### Changed
- **Performance:** Memoized `FormatEditor` and `SortableItem` with `React.memo` and stabilized DND callbacks using `useCallback` to eliminate unnecessary full-list re-renders.
- **Performance:** Standardized asynchronous logic across the project, eliminating raw `.then()` chains in favor of consistent `async`/`await` patterns for better error handling.

### Removed
- **Dependencies:** Removed outdated and heavy image processing libraries (`node-vibrant`, `colorthief`) in favor of native web APIs.

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
