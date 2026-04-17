# Changelog

## [1.6.0] - 2026-03-08

### Audited and Verified

- **Theme Import/Export Engine**: Verified full theme import/export system functionality and validations.
- **Undo/Redo Stack**: Audited immutable history stack pattern and keyboard shortcuts.
- **Theme Preset System**: Audited 11 built-in theme presets and the preset selector component.
- **Type Safety Audit**: Checked TypeScript files for strict mode and removed all explicit `any` usages.
- **Vite Build Optimization**: Verified manual chunk splitting and build size targets.
- **Error Boundary & Runtime Resilience**: Checked React Error Boundaries and async error handling.
- **Code Consistency & Linting Enforcement**: Confirmed ESLint rules and fixed zero violations.

# Changelog

## [1.5.0] - 2026-03-04

### Improved

- **Format Parser Performance**: Replaced the regex `while`-loop in `parseFormatString` with an O(N) single-pass stack-based parser. Eliminates polynomial re-scanning for deeply nested `[text](style)` groups and correctly handles embedded ANSI escape sequences.

## [1.4.0] - 2026-03-03

### Audited and Verified

- **Theme Import/Export Engine**: Verified full theme import/export system functionality and validations.
- **Undo/Redo Stack**: Audited immutable history stack pattern and keyboard shortcuts.
- **Theme Preset System**: Audited 8+ built-in theme presets and the preset selector component.
- **Type Safety Audit**: Checked TypeScript files for strict mode and absence of `any`.
- **State Management Refactor**: Confirmed centralized Zustand stores.
- **Vite Build Optimization**: Verified manual chunk splitting and build size targets.
- **Error Boundary & Runtime Resilience**: Checked React Error Boundaries and async error handling.
- **Code Consistency & Linting Enforcement**: Confirmed ESLint rules and zero violations.

## [1.3.0] - 2026-02-24

### Added

- **Theme Import/Export Engine**: Full theme import/export system with validation, serialization, and error handling.
- **Undo/Redo Stack**: Full undo/redo system with configurable limit of 50 steps using immutable history for all editor state.
- **Theme Preset System**: Curated set of 8 built-in theme presets with single-click application and unsaved changes prompt.

### Improved

- **Type Safety**: Audited all TypeScript files, removed all implicit and explicit uses of `any`, and fortified types across configuration parsing.
- **State Management**: Refactored logic to centralize editor/theme state through Zustand `theme-store.ts`.
- **Vite Build Optimization**: Implemented manual chunk splitting to isolate large vendor dependencies (`xterm`, `colord`, `@dnd-kit`) ensuring smaller chunk sizes under 400kb.
- **Runtime Resilience**: Wrapped major features with React Error Boundaries to prevent unexpected crashes.
- **Linting & Code Consistency**: Enforced strict rules in `.eslintrc.cjs` (no unused vars, no `any`, no production logs) and added `lint-staged` pre-commit hooks.

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

## [1.4.0] - 2024-10-27

### Added

- **Theme Import/Export Engine**: Full system to serialize theme state to a valid Starship TOML config file and download it. Implemented a robust import parser that validates and handles unsupported modules.
- **Undo/Redo History Stack**: Full history system with zundo for all editor state mutations. Wired Ctrl+Z / Ctrl+Shift+Z globally.
- **Theme Preset System**: Built-in curated set of 8+ presets including Dracula, Nord, Solarized, and more. Easily applied via a single click.

### Changed

- **State Management Refactor**: Centralized UI state inside `ui-store.ts` and Domain state inside `theme-store.ts` ensuring clean separation without scattered UI state hooks.
- **Code Consistency & Linting Enforcement**: Implemented strict ESLint rules (no console, hook rules, unused variables) and ran full lint auto-fix. Added Husky and lint-staged pre-commit hooks to ensure quality before commits. Added Contributing guidelines.
- **Type Safety Audit**: Replaced `any` across the codebase ensuring complete type coverage with `unknown` and strict mode enablement.
- **Vite Build Optimization**: Implemented manual chunk splitting for `vendor-ui`, `vendor-core`, `vendor-utils`, and `vendor-terminal`. Ensured all chunks pass the 400kb threshold. Tree-shaking enabled.

### Fixed

- **Error Boundary & Runtime Resilience**: Ensured all major feature sections (terminal preview, module builder, gallery) are wrapped inside comprehensive `<ErrorBoundary>` tags. Included try-catch blocks across all async fetch / IO operations.
