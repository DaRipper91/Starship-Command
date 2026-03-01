# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Automated Test Suite**: Integrated Vitest natively with Vite for unit and component testing. Configured an initial 40% code coverage threshold. Tests added for pure utility functions, `useDebounce`, Zustand stores, and component fallbacks.

### Changed
- **Web Worker Color Extraction**: Transitioned image-to-theme color extraction to a Web Worker utilizing `OffscreenCanvas` and a histogram algorithm to prevent main thread blocking. Removed heavy dependencies (`node-vibrant`, `colorthief`).
- **Debounced Terminal Preview**: Added a `useDebounce` hook to throttle `xterm.js` terminal writes to 200ms, heavily reducing unnecessary re-renders during rapid configuration edits.
- **Component Memoization**: Wrapped standard list elements like `SortableItem` with `React.memo` and implemented `useCallback` for functions like `handleToggle` in `ModuleList.tsx`. This stabilizes drag-and-drop operations, avoiding full list re-renders.
- **Lazy Loading**: Implemented `<Suspense>` and `React.lazy` in `App.tsx` for heavy components (`ThemeGallery`, `TerminalPreview`, `ExportImport`, `ImagePalette`) to optimize chunk splitting and speed up initial page load.
- **Standardized Async Code**: Refactored `ColorUtils.extractPaletteFromImage` to adhere to modern `async`/`await` patterns with comprehensive `try/catch` error boundaries, replacing nested Promise chains.

### Security
- Updated `minimatch` dependency to `^10.2.1` in `package.json` overrides to resolve high-severity ReDoS vulnerabilities.
