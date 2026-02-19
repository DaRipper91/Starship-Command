# Starship Theme Creator

A visual, no-code drag-and-drop editor for creating [Starship](https://starship.rs) shell prompt themes. Build, preview, and export `starship.toml` configuration files through a browser UI — no manual TOML editing required.

## Features

- **Live terminal preview** — See your prompt update in real time as you make changes
- **Drag-and-drop module builder** — Reorder and toggle Starship modules visually
- **Color picker** — Choose colors with a full color picker or apply preset palettes
- **Image-to-palette extraction** — Upload an image to pull its colors into your theme
- **Import / Export** — Load an existing `starship.toml` or download your new one
- **Theme gallery** — Save multiple themes and switch between them
- **Theme validation** — Instant warnings for misconfigured options
- **Smart suggestions** — Environment-aware recommendations for your prompt
- **Keyboard shortcuts & command palette** — Power-user navigation (`Cmd/Ctrl+K`)
- **Accessibility** — High-contrast mode and reduced-motion support

## Tech Stack

| Area | Library |
|------|---------|
| Framework | React 18 + TypeScript 5 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| State | Zustand 4 (with `localStorage` persistence) |
| Terminal emulator | xterm.js 5 + xterm-addon-fit |
| TOML parsing | @iarna/toml |
| Color utilities | colord + react-colorful + node-vibrant |
| Drag and drop | @dnd-kit/core + @dnd-kit/sortable |
| Icons | lucide-react |
| Testing | Vitest + React Testing Library |

## Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 7)
- **npm** (or pnpm — a `pnpm-lock.yaml` is also included)

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/DaRipper91/Starship-Prompt-Theme-Creator.git
cd Starship-Prompt-Theme-Creator

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with hot-reload |
| `npm run build` | Type-check then build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint (zero warnings allowed) |
| `npm run format` | Format all files with Prettier |
| `npm test` | Run the Vitest test suite in watch mode |

## Project Structure

```
src/
├── App.tsx                    # Root component — 3-column layout
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind directives
│
├── components/
│   ├── layout/                # Header, Sidebar, Footer, Layout wrapper
│   ├── TerminalPreview/       # xterm.js live prompt preview
│   ├── ModuleBuilder/         # Drag-and-drop module list
│   ├── ColorPicker/           # Color selector + preset swatches
│   ├── ImagePalette/          # Upload image → extract palette
│   ├── ModuleConfigPanel/     # Per-module settings form
│   ├── ExportImport/          # Download / upload .toml files
│   ├── ThemeGallery/          # Saved + preset theme cards
│   ├── ComparisonView/        # Side-by-side theme diff
│   ├── SuggestionPanel/       # Smart recommendations
│   ├── WelcomeWizard/         # First-run onboarding flow
│   ├── CommandPalette.tsx     # Cmd+K quick-action search
│   ├── ErrorBoundary.tsx      # React error boundary
│   ├── Toast.tsx              # Stacked notification system
│   ├── Tooltip.tsx            # Hover hint component
│   └── LoadingSpinner.tsx     # Async loading indicator
│
├── lib/
│   ├── toml-parser.ts         # Parse / stringify TOML ↔ config
│   ├── format-parser.ts       # Starship format strings → ANSI codes
│   ├── color-utils.ts         # Color manipulation + presets
│   ├── theme-validator.ts     # Config validation + warnings
│   ├── suggestion-engine.ts   # Environment detection + hints
│   ├── mock-data.ts           # Terminal preview scenarios
│   ├── presets.ts             # Built-in Nord / Dracula / etc. themes
│   ├── module-definitions.ts  # Module metadata + categories
│   └── utils.ts               # Shared utilities (cn(), etc.)
│
├── stores/
│   └── theme-store.ts         # Zustand store — all theme state
│
├── hooks/
│   ├── useToast.ts            # Toast notification system
│   ├── useDebounce.ts         # Debounce rapidly changing values
│   ├── useUndo.ts             # Undo / redo history stack
│   ├── useKeyboardShortcuts.ts# App-wide keyboard bindings
│   └── useWizardState.ts      # Multi-step wizard progress
│
├── types/
│   └── starship.types.ts      # All TypeScript interfaces
│
└── contexts/
    └── AccessibilityContext.tsx # High-contrast / reduced-motion
```

## How It Works

```
User drags module    → format string updated → terminal re-renders
User picks color     → module style updated  → terminal re-renders
User uploads image   → palette extracted     → colors applied → terminal re-renders
User clicks Export   → TOML generated        → file downloaded
User clicks Import   → TOML parsed           → store updated  → terminal re-renders
```

## Supported Starship Modules

| Category | Modules |
|----------|---------|
| Core | `character`, `directory`, `line_break` |
| VCS | `git_branch`, `git_status`, `git_state`, `git_commit`, `git_metrics` |
| Languages | `nodejs`, `python`, `rust`, `golang`, `java`, `php`, `ruby`, `swift`, `kotlin`, `julia`, `lua`, `perl`, `erlang`, `elixir`, `nim`, `crystal`, `dart`, `scala` |
| Tools | `docker_context`, `kubernetes`, `terraform`, `package`, `cmake`, `gradle` |
| Cloud | `aws`, `gcloud`, `azure`, `openstack` |
| System | `battery`, `time`, `username`, `hostname`, `cmd_duration`, `jobs`, `memory_usage`, `shell`, `shlvl`, `status`, `sudo`, `os`, `env_var` |

## Contributing

1. Fork the repository and create a feature branch
2. Run `npm install` to set up your environment
3. Make your changes, following the TypeScript and Tailwind conventions in `AGENTS.md`
4. Run `npm run build && npm test` to verify nothing is broken
5. Open a pull request with a clear description of what changed and why

## License

This project is open source. See the repository for license details.
