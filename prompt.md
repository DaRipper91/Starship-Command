SYSTEM DIRECTIVE: MASTER PROJECT EXECUTION.

CONTEXT:
You are tasked with completing the frontend UI and integration for the Starship Theme Creator (React 18, TypeScript, Zustand, Tailwind). The core logic (parsers, state, validators) is already implemented.

EXECUTION PROTOCOL:
You must execute Checkpoints 3 through 10 sequentially. 
CRITICAL CONSTRAINT: To prevent output truncation, you will output the exact code for ONE checkpoint, stop generating, and wait for the prompt "CONTINUE" before moving to the next checkpoint. Do not attempt to write the entire application in one response.

ROADMAP TO EXECUTE:

[PHASE 1] CHECKPOINT 3: Terminal Preview
- Implement `src/components/TerminalPreview.tsx`.
- Initialize `xterm.js` with `@xterm/addon-fit`.
- Connect Zustand `currentTheme` to `FormatParser` and render ANSI codes to the terminal.
- Await "CONTINUE".

[PHASE 2] CHECKPOINT 4: Main Layout & Module Builder
- Implement `src/components/Layout.tsx` (3-column responsive grid).
- Implement `src/components/ModuleList.tsx` using `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop module reordering.
- Connect to Zustand store to update module order.
- Await "CONTINUE".

[PHASE 3] CHECKPOINT 5: Module Configuration
- Implement `src/components/ModuleConfig.tsx`.
- Create dynamic forms to edit properties (symbols, truncation, styles) of the currently selected module.
- Await "CONTINUE".

[PHASE 4] CHECKPOINT 6: Color Systems UI
- Implement `src/components/ColorPicker.tsx` and `src/components/ImagePaletteExtractor.tsx`.
- Wire UI to existing `src/lib/color-utils.ts` for contrast checking and image extraction.
- Await "CONTINUE".

[PHASE 5] CHECKPOINT 7: Import / Export
- Implement `src/components/ImportExport.tsx`.
- Build modals for TOML text input (import) and downloading/copying the parsed TOML string (export).
- Await "CONTINUE".

[PHASE 6] CHECKPOINT 8: Theme Management
- Implement `src/components/ThemeGallery.tsx`.
- Display hardcoded presets and read/write saved themes to localStorage via the Zustand store.
- Await "CONTINUE".

[PHASE 7] CHECKPOINT 9 & 10: Advanced Features & Polish
- Implement `ComparisonView.tsx` (Before/After toggle).
- Add `react-error-boundary` around main layout panels.
- Finalize ARIA labels and keyboard navigation.

INITIATE: Acknowledge these instructions and output the code for [PHASE 1] Checkpoint 3 immediately.
