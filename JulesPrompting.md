SYSTEM DIRECTIVE: MASTER PROJECT EXECUTION - FROM SCRATCH

PROJECT: Starship Theme Creator
STACK: React 18, TypeScript, Vite, Tailwind CSS, Zustand.
DEPENDENCIES (To be installed): @iarna/toml, xterm, @xterm/addon-fit, @dnd-kit/core, @dnd-kit/sortable, lucide-react.

EXECUTION PROTOCOL:
You are tasked with building this application from Checkpoint 1 to completion.
CRITICAL CONSTRAINT: You must execute ONE checkpoint at a time. Output the complete code for that checkpoint, stop generating, and then review your work before moving to the next phase. Do not output partial files or attempt to combine checkpoints.

ROADMAP:

[PHASE 1] CHECKPOINT 1: Foundation & Types
- Define strictly typed TypeScript interfaces for `StarshipConfig`, module structures, and color formats.
- Implement `src/lib/toml-parser.ts` using `@iarna/toml` to parse and stringify `starship.toml` files.
- Review for errors. 

[PHASE 1] CHECKPOINT 2: State & Core Logic
- Implement `src/stores/theme-store.ts` using Zustand with localStorage persistence.
- Implement `src/lib/theme-validator.ts` and `src/lib/format-parser.ts` to handle syntax validation and ANSI conversion.
- Review for errors. 

[PHASE 2] CHECKPOINT 3: Terminal Preview UI
- Create `src/components/TerminalPreview.tsx`.
- Initialize `xterm.js` with `addon-fit`. Read `currentTheme` from Zustand, pipe through `FormatParser`, and render ANSI via `term.write()`. Ensure cleanup on unmount.
- review for errors 

[PHASE 3] CHECKPOINT 4: Main Layout & Drag-and-Drop
- Create `src/components/Layout.tsx` (3-column grid).
- Create `src/components/ModuleList.tsx` using `@dnd-kit` to reorder Starship modules. Update Zustand store on drag end.
- review for errors 

[PHASE 4] CHECKPOINT 5: Module Configuration
- Create `src/components/ModuleConfig.tsx`. Build dynamic forms for editing symbols, truncation, and styles of the currently active module.
- review for errors 

[PHASE 5] CHECKPOINT 6: Color Systems
- Create `src/components/ColorPicker.tsx`. Integrate color contrast checking and hex manipulation.
- review for errors 

[PHASE 6] CHECKPOINT 7: Import / Export I/O
- Create `src/components/ImportExport.tsx`. Build UI to accept raw TOML input and export the generated configuration to clipboard or file.
- review for errors 

[PHASE 7] CHECKPOINT 8 & 9: Gallery & Polish
- Create `src/components/ThemeGallery.tsx` for preset management.
- Add Error Boundaries, basic ARIA accessibility, and toast notifications for user actions.
- Review for errors 

INITIATE: Acknowledge these strict constraints and output the code for [PHASE 1] CHECKPOINT 1 immediately.
