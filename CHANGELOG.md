# Changelog

## [1.2.0] - 2026-02-23

### Added

- **Worker**: Offloaded image color extraction to a Web Worker for improved performance and responsiveness.
- **State Management**: Centralized active module parsing logic in `theme-store` selector.
- **Theme Preset System**: Verified and integrated robust preset loading with unsaved changes protection.

### Improved

- **Type Safety**: Enforced strict mode and eliminated `any` usage in critical paths.
- **Linting**: Enforced `no-console` rule and fixed all linting violations.
- **Error Handling**: Enhanced Error Boundaries and async error handling in Theme Gallery and Image Palette.
- **Build**: Optimized Vite build with manual chunks and verified build size.
- **Testing**: Updated tests to support Worker mocking and stricter type checks.

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
