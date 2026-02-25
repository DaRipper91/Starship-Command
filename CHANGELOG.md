# Changelog

## [1.0.1] - 2026-03-01 - Bolt Performance & Quality Improvements

### Performance
- ⚡ **Debounced Live Preview**: Implemented debounced terminal rendering (200ms) to eliminate lag during rapid typing.
- ⚡ **Web Worker Color Extraction**: Offloaded image processing to a Web Worker, removing main-thread blocking `colorthief` and `node-vibrant` dependencies.
- ⚡ **Lazy Loading**: Implemented `React.lazy` and `Suspense` for heavy components (`ThemeGallery`, `ComparisonView`, `ExportImport`), reducing initial bundle size.
- ⚡ **Memoization**: Optimized `ModuleList` rendering by memoizing `SortableModuleItem` to prevent unnecessary re-renders during drag-and-drop.

### Quality
- 🧪 **Automated Testing**: Established a testing foundation with Vitest, adding unit tests for `ModuleList`, `ColorUtils`, and `useDebounce`.
- 🧹 **Dependency Cleanup**: Removed unused dependencies (`colorthief`, `node-vibrant`, `html2canvas` from manual chunks).
- 🔄 **Consistent Async**: Standardized async/await usage across the codebase.

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
