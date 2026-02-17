# AGENTS.md — Starship Theme Creator
# Jules Autonomous Agent System Instructions
# Place this file in the ROOT of your repository

> Jules reads this file automatically before every task.
> Last Updated: 2026 | Version: 2.0

---

## 🚀 PROJECT IDENTITY

**Name:** Starship Theme Creator
**Type:** React 18 + TypeScript + Vite web application
**Purpose:** A visual, no-code drag-and-drop editor for creating Starship shell prompt
themes. Users build, preview, and export `starship.toml` configuration files through
a browser UI without editing text or TOML manually.
**Repo:** starship-theme-creator
**Live Docs:** https://starship.rs/config/ (always reference for module accuracy)

---

## 🧠 JULES OPERATING PRINCIPLES

Before starting any task Jules must:

1. **Read** `AGENTS.md` (this file) completely
2. **Read** `src/types/starship.types.ts` to understand data shapes
3. **Read** `src/stores/theme-store.ts` to understand state management
4. **Read** `src/App.tsx` to understand the layout structure
5. **Run** `npm install` if `node_modules` is missing
6. **Run** `npm run build` before submitting to confirm zero TypeScript errors
7. **Run** `npm test` to confirm no test regressions
8. **Create a PR** with a clear description following the PR template below

Jules must NEVER:
- Push directly to `main` or `master`
- Skip TypeScript type definitions
- Use inline styles instead of Tailwind classes
- Use `any` type without a comment explaining why
- Leave `console.log` statements in production code
- Break existing functionality to add new features
- Use `alert()` — always use the `useToast()` hook instead

---

## 🗂️ PROJECT ARCHITECTURE

### What This App Does

```
User uploads image ──► Extract color palette ──► Apply to theme
User drags modules ──► Reorder format string ──► Live preview
User picks colors  ──► Update module styles  ──► Live preview
User clicks Export ──► Generate TOML string  ──► Download file
```

### Technology Stack

```
Core:        React 18 + TypeScript 5 + Vite 5
Styling:     Tailwind CSS 3 (ONLY — no CSS modules, no styled-components)
State:       Zustand 4 + localStorage persistence
Terminal:    xterm.js 5 + xterm-addon-fit
TOML:        @iarna/toml
Colors:      colord + react-colorful + node-vibrant
Drag/Drop:   @dnd-kit/core + @dnd-kit/sortable
Icons:       lucide-react
Testing:     Vitest + React Testing Library
```

### Full Directory Map

```
starship-theme-creator/
│
├── AGENTS.md                          ← Jules reads this (you are here)
├── .github/
│   ├── copilot-instructions.md        ← GitHub Copilot reads this
│   ├── workflows/
│   │   ├── ci.yml                     ← Main CI pipeline
│   │   ├── jules-daily-deps.yml       ← Jules: daily dependency check
│   │   ├── jules-daily-security.yml   ← Jules: daily security scan
│   │   ├── jules-weekly-quality.yml   ← Jules: weekly code quality
│   │   ├── jules-weekly-perf.yml      ← Jules: weekly performance
│   │   └── jules-starship-sync.yml    ← Jules: weekly Starship compat
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── scripts/
│   ├── setup.sh                       ← One-command setup
│   ├── dev.sh                         ← Start dev environment
│   ├── build.sh                       ← Production build
│   ├── test.sh                        ← Run all tests
│   ├── new-checkpoint.sh              ← Start a new checkpoint task
│   └── deploy.sh                      ← Deploy to hosting
│
├── public/
│   └── nerd-fonts/                    ← Nerd Font subset files
│
├── src/
│   ├── App.tsx                        ← Root: 3-column layout + routing
│   ├── main.tsx                       ← Entry point
│   ├── index.css                      ← Global styles + Tailwind
│   │
│   ├── components/
│   │   ├── TerminalPreview/           ← xterm.js live preview
│   │   │   ├── index.tsx
│   │   │   └── TerminalPreview.test.tsx
│   │   ├── ModuleBuilder/             ← DnD module list + toggles
│   │   │   ├── index.tsx
│   │   │   └── ModuleBuilder.test.tsx
│   │   ├── ColorPicker/               ← Color selector + presets
│   │   │   ├── index.tsx
│   │   │   └── ColorPicker.test.tsx
│   │   ├── ImagePalette/              ← Upload image → extract colors
│   │   │   └── index.tsx
│   │   ├── ModuleConfigPanel/         ← Per-module settings form
│   │   │   └── index.tsx
│   │   ├── IconBrowser/               ← Nerd Font symbol picker
│   │   │   └── index.tsx
│   │   ├── ExportImport/              ← Download/upload .toml files
│   │   │   └── index.tsx
│   │   ├── ThemeGallery/              ← Saved + preset theme cards
│   │   │   └── index.tsx
│   │   ├── ComparisonView/            ← Side-by-side theme diff
│   │   │   └── index.tsx
│   │   ├── SuggestionPanel/           ← Smart recommendations
│   │   │   └── index.tsx
│   │   ├── WelcomeWizard/             ← First-run onboarding flow
│   │   │   └── index.tsx
│   │   ├── CommandPalette.tsx         ← Cmd+K quick action search
│   │   ├── ErrorBoundary.tsx          ← React error catching
│   │   ├── Toast.tsx                  ← Stack notification system
│   │   ├── Tooltip.tsx                ← Hover hint component
│   │   └── LoadingSpinner.tsx         ← Async loading indicator
│   │
│   ├── lib/
│   │   ├── toml-parser.ts             ← Parse/stringify TOML ↔ config
│   │   ├── format-parser.ts           ← Starship format → ANSI codes
│   │   ├── color-utils.ts             ← Color manipulation + presets
│   │   ├── theme-validator.ts         ← Config validation + warnings
│   │   ├── suggestion-engine.ts       ← Environment detection + hints
│   │   ├── mock-data.ts               ← Terminal preview scenarios
│   │   ├── presets.ts                 ← Built-in Nord/Dracula/etc themes
│   │   └── module-definitions.ts      ← Module metadata + categories
│   │
│   ├── stores/
│   │   └── theme-store.ts             ← Zustand: all theme state
│   │
│   ├── hooks/
│   │   ├── useToast.ts                ← Toast notification system
│   │   ├── useDebounce.ts             ← Debounce rapidly changing values
│   │   ├── useUndo.ts                 ← Undo/redo history stack
│   │   ├── useKeyboardShortcuts.ts    ← App-wide keyboard bindings
│   │   └── useWizardState.ts          ← Multi-step wizard progress
│   │
│   ├── types/
│   │   └── starship.types.ts          ← ALL TypeScript interfaces
│   │
│   └── contexts/
│       └── AccessibilityContext.tsx   ← High contrast / reduced motion
│
└── tests/
    ├── unit/                          ← Pure utility function tests
    ├── integration/                   ← Full workflow tests
    └── setup.ts                       ← Vitest + RTL global config
```

---

## 🔑 CORE CONCEPTS JULES MUST UNDERSTAND

### 1. What is Starship?
Starship (https://starship.rs) is a cross-shell prompt configured by `~/.config/starship.toml`.
Users define which "modules" appear and how they look. Our app creates this file visually.

### 2. Starship Format String Syntax
```
$module_name              → Insert a module
[$text](style)            → Styled text block
(optional_text)           → Only shows if content exists
\n                        → New line (multi-line prompts)
${env_var}                → Environment variable

Example full format:
"$username@$hostname $directory$git_branch$nodejs\n$character"
```

### 3. Starship Style String Syntax
```
Colors:      red, blue, green, yellow, purple, cyan, white, black
Hex:         #ff0000
RGB:         rgb(255,0,0)
Modifiers:   bold, italic, underline, dimmed, inverted, blink
Background:  bg:blue  bg:#ff0000
Combined:    "bold red"  "italic bg:blue white"  "underline #00ff00"
```

### 4. The Core Data Flow in Our App
```
User drags module    → format string updated → terminal re-renders
User picks color     → module style updated  → terminal re-renders
User uploads image   → palette extracted     → colors applied → terminal re-renders
User clicks Export   → TOML generated        → file downloaded
User clicks Import   → TOML parsed           → store updated  → terminal re-renders
```

---

## 📋 TYPESCRIPT CONTRACT

### The Theme Object (root of everything)
```typescript
interface Theme {
  metadata: ThemeMetadata;  // Who, when, what
  config: StarshipConfig;   // The actual .toml data
}

interface ThemeMetadata {
  id: string;           // crypto.randomUUID()
  name: string;         // User-chosen name
  author?: string;
  description?: string;
  tags?: string[];
  created: Date;
  updated: Date;
  thumbnail?: string;   // base64 image
}
```

### StarshipConfig (maps 1:1 to .toml sections)
```typescript
interface StarshipConfig {
  format?: string;                        // Module order
  right_format?: string;                  // Right-side prompt
  continuation_prompt?: string;
  add_newline?: boolean;
  palette?: string;                       // Active palette name
  palettes?: Record<string, Record<string, string>>;
  [moduleName: string]: ModuleConfig | any;
}
```

### The Zustand Store Contract
```typescript
// useThemeStore from stores/theme-store.ts
interface ThemeStore {
  currentTheme: Theme;
  savedThemes: Theme[];

  // Config mutations (triggers terminal re-render)
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (meta: Partial<ThemeMetadata>) => void;

  // Theme CRUD
  loadTheme:   (theme: Theme) => void;
  saveTheme:   () => void;
  deleteTheme: (id: string) => void;
  resetTheme:  () => void;

  // Import/export
  exportToml: () => string;
  importToml: (toml: string) => void;
}
```

---

## 📐 CODING STANDARDS

### TypeScript Rules
```typescript
// ✅ Always type props interfaces
interface MyComponentProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

// ✅ Named exports for components
export const MyComponent: React.FC<MyComponentProps> = ({ color, onChange, label }) => {

// ✅ JSDoc on all exported functions
/**
 * Converts a hex color to an ANSI escape code string
 * @param hex - Color in #rrggbb format
 * @param bold - Whether to apply bold modifier
 * @returns ANSI escape sequence string
 */
export function hexToAnsi(hex: string, bold = false): string {

// ❌ Never use any without explanation
const data: any = ...; // OK only with a comment explaining why

// ✅ Use type inference where obvious
const [count, setCount] = useState(0); // TypeScript infers number
```

### Tailwind Styling Rules
```tsx
// ✅ Tailwind classes only
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">

// ✅ Conditional with template literal
<div className={`p-4 border rounded-lg ${isActive ? 'border-blue-500 bg-blue-50' 
                                                   : 'border-gray-200 bg-white'}`}>

// ✅ Complex conditionals use cn() utility
className={cn('px-4 py-2 rounded', { 'bg-blue-500': isActive, 'opacity-50': disabled })}

// ❌ Never inline styles
<div style={{ backgroundColor: 'blue', padding: '16px' }}>

// ❌ Never external CSS files (except index.css for globals)
import styles from './Component.module.css';
```

### Error Handling Rules
```typescript
// ✅ Always use toast for user feedback
import { useToast } from '@/hooks/useToast';
const { toast } = useToast();

try {
  const config = TomlParser.parse(input);
  toast.success('Theme imported successfully!');
} catch (error) {
  toast.error(`Failed to import: ${error instanceof Error ? error.message : 'Unknown error'}`);
}

// ✅ Loading states for async operations
const [isLoading, setIsLoading] = useState(false);
setIsLoading(true);
try { await doAsyncThing(); } finally { setIsLoading(false); }

// ❌ Never use alert() or console.error() for user-facing errors
alert('Something went wrong'); // NEVER
```

### Component Architecture Rules
```typescript
// ✅ Each component in its own folder
// src/components/ColorPicker/index.tsx
// src/components/ColorPicker/ColorPicker.test.tsx

// ✅ Separate data from presentation
// Keep API calls, store access in parent — pass data as props to pure components

// ✅ Custom hooks for complex logic
// src/hooks/useColorExtraction.ts — not inline in the component

// ✅ React.memo for expensive pure components
export const ModuleItem = React.memo(({ id, enabled, onToggle }: ModuleItemProps) => {
```

### Import Order (always follow this sequence)
```typescript
// 1. React
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// 2. Third-party (alphabetical)
import { DndContext } from '@dnd-kit/core';
import { colord } from 'colord';

// 3. Internal stores
import { useThemeStore } from '@/stores/theme-store';

// 4. Internal utilities/lib
import { ColorUtils } from '@/lib/color-utils';
import { TomlParser } from '@/lib/toml-parser';

// 5. Internal hooks
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';

// 6. Internal components
import { ColorPicker } from '@/components/ColorPicker';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// 7. Types (using import type)
import type { StarshipConfig, Theme } from '@/types/starship.types';
```

---

## 🗓️ JULES SCHEDULED TASK SYSTEM

Jules runs automatically via GitHub Actions on the following schedule.
These workflows live in `.github/workflows/` and invoke Jules via the
`google-labs-code/jules-invoke@v1` action.

### Schedule Overview
```
Daily   06:00 UTC  → Security vulnerability scan
Daily   08:00 UTC  → Dependency freshness check
Monday  03:00 UTC  → Full code quality audit
Wednesday 03:00 UTC → Performance + bundle audit
Sunday  10:00 UTC  → Starship compatibility sync
On PR   (trigger)  → Automated code review assist
On Issue (label)   → Feature/bug implementation
```

### How to Add a New Scheduled Task
1. Create `.github/workflows/jules-your-task.yml`
2. Use the template from `scripts/new-checkpoint.sh`
3. Write the Jules prompt with clear, measurable success criteria
4. Test manually with `workflow_dispatch` before scheduling

### Secrets Required in GitHub Repository
```
JULES_API_KEY   → From jules.google Settings → API Keys
```

---

## 🎯 CHECKPOINT SYSTEM

This project uses a checkpoint-based development approach.
Each checkpoint is a named milestone with specific tasks.

### Current Checkpoints
```
CP-01: Foundation Setup       [src/types, src/lib, src/stores]
CP-02: Core Systems           [parsers, validators, suggestions]
CP-03: Terminal Preview       [xterm.js, format parser, mock data]
CP-04: Main Layout            [App.tsx 3-column layout]
CP-05: Module Management      [ModuleBuilder, module-definitions]
CP-06: Color Systems          [ColorPicker, ImagePalette]
CP-07: Module Configuration   [ModuleConfigPanel, IconBrowser]
CP-08: Import/Export          [ExportImport component]
CP-09: Theme Management       [ThemeGallery, header actions]
CP-10: Advanced Features      [ComparisonView, SuggestionPanel, WelcomeWizard]
CP-11: Polish & UX            [Toast, ErrorBoundary, Keyboard, A11y, Animations]
CP-12: Testing & Docs         [Vitest suite, README, guides]
CP-13: Deployment             [Build optimization, Vercel/Netlify]
```

### When Jules Works on a Checkpoint Task
Jules should:
1. Create a branch named `checkpoint/CP-XX-task-name`
2. Complete only the scope of that checkpoint — don't skip ahead
3. Run all checks before opening the PR
4. Label the PR with the checkpoint number

---

## 📝 PR DESCRIPTION TEMPLATE

Every PR Jules creates must follow this template:

```markdown
## 🎯 What This PR Does
[Clear 1-2 sentence summary]

## 🔗 Checkpoint
Checkpoint: CP-XX | Task: X.Y | [Task Name]

## 📁 Files Changed
- `src/components/X/index.tsx` — [what changed and why]
- `src/lib/y.ts` — [what changed and why]
- `src/types/starship.types.ts` — [new types added if any]

## ✅ Verification
- [x] `npm run build` passes with zero TypeScript errors
- [x] `npm test` passes with no regressions
- [x] New code has TypeScript types
- [x] New async operations have loading states
- [x] User feedback uses useToast(), not alert()
- [x] Styling uses Tailwind only
- [x] No console.log statements left in code

## 🧪 How to Test Manually
1. Run `npm run dev`
2. [Specific steps to verify the feature works]
3. Expected result: [what the user should see]

## 🚨 Breaking Changes
None | [Description if any]
```

---

## 🛠️ ENVIRONMENT SETUP SCRIPT

Jules should run this on first use in a new VM:

```bash
#!/bin/bash
# Jules will look for and run this automatically if present
# Save as: scripts/setup-jules-env.sh

set -e

echo "Setting up Starship Theme Creator development environment..."

# Install Node.js 20 if needed
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'.' -f1 | tr -d 'v')" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Install dependencies
npm install

# Verify the build works
npm run build

# Run tests to confirm baseline
npm test

echo "Environment ready. Jules can now begin tasks."
```

---

## 🔍 USEFUL COMMANDS FOR JULES

```bash
# Development
npm run dev           # Start dev server at localhost:5173
npm run build         # TypeScript compile + Vite build
npm run preview       # Preview production build
npm run lint          # ESLint check
npm run type-check    # TypeScript only (no emit)
npm run format        # Prettier format all files

# Testing
npm test              # Run all tests in watch mode
npm run test:run      # Run once (for CI)
npm run coverage      # Generate coverage report

# Jules Tools CLI (if installed)
jules remote list     # See active Jules sessions
jules remote new --repo . --session "task description"
```

---

## 📚 KEY REFERENCE FILES

When working on specific areas Jules should read these files first:

| Area | Read First |
|------|-----------|
| Adding a new module | `src/lib/module-definitions.ts` + `src/types/starship.types.ts` |
| Changing colors | `src/lib/color-utils.ts` + `src/components/ColorPicker/` |
| Terminal rendering | `src/lib/format-parser.ts` + `src/lib/mock-data.ts` |
| State changes | `src/stores/theme-store.ts` |
| Validation logic | `src/lib/theme-validator.ts` |
| Adding presets | `src/lib/presets.ts` |
| UI components | `src/App.tsx` to understand layout |

---

## ⚡ STARSHIP MODULE QUICK REFERENCE

These are the modules our app supports. When adding a new one follow this pattern:

```typescript
// In src/lib/module-definitions.ts
{
  id: 'module_name',           // Matches starship.toml key
  name: 'Module Display Name', // Human readable
  description: 'What it shows in the prompt',
  category: 'core',            // core|vcs|languages|tools|cloud|system
  icon: '🔧',                  // Emoji or symbol
  defaultEnabled: true,
  requiresNerdFont: false,      // True if uses Nerd Font symbols
  expensive: false,            // True if slow (e.g. kubernetes lookup)
}
```

### All Supported Modules by Category
```
Core:      character, directory, line_break
VCS:       git_branch, git_status, git_state, git_commit, git_metrics
Languages: nodejs, python, rust, golang, java, php, ruby, swift, kotlin
           julia, lua, perl, erlang, elixir, nim, crystal, dart, scala
Tools:     docker_context, kubernetes, terraform, package, cmake, gradle
Cloud:     aws, gcloud, azure, openstack
System:    battery, time, username, hostname, cmd_duration, jobs,
           memory_usage, shell, shlvl, status, sudo, os, env_var
```

---

## 🚨 COMMON MISTAKES TO AVOID

```typescript
// ❌ Mutating state directly
state.currentTheme.config.directory = newConfig;

// ✅ Use store action
updateConfig({ directory: newConfig });

// ❌ Forgetting to handle loading states
const result = await expensiveOperation();
render(result);

// ✅ Always show loading
setIsLoading(true);
try { const result = await expensiveOperation(); render(result); }
finally { setIsLoading(false); }

// ❌ Hardcoded TOML sections
if (module === 'git_branch') { /* hardcoded */ }

// ✅ Use module-definitions.ts as the source of truth
const def = MODULE_DEFINITIONS.find(m => m.id === module);

// ❌ Not validating before export
const toml = exportToml();
downloadFile(toml);

// ✅ Validate first
const validation = ThemeValidator.validateTheme(currentTheme);
if (!validation.valid) { toast.warning('Theme has issues...'); }
const toml = exportToml();
downloadFile(toml);
```

---

*This file is the source of truth for Jules. Keep it updated as the project grows.*
*When in doubt, read this file again before proceeding.*
