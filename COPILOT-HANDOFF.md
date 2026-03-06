# Copilot ↔ Gemini Collaboration Handoff
> Last updated: 2026-03-06 | Version: 0.0.0 (v1.3.0 codebase)

This file is the shared context document for AI assistants working on **Starship Command** — a React 18 + TypeScript + Vite visual editor for [Starship](https://starship.rs) shell prompt themes.

---

## 🗂️ What Already EXISTS (don't re-implement)

| Feature | Status | Location |
|---------|--------|----------|
| Live xterm.js terminal preview | ✅ Done | `src/components/TerminalPreview.tsx` |
| Drag-and-drop module reordering | ✅ Done | `src/components/ModuleList.tsx` (dnd-kit) |
| TOML import/export | ✅ Done | `src/lib/toml-parser.ts` |
| Theme gallery + presets (11 presets: Clean, Nord, Dracula, Gruvbox, Catppuccin, Tokyo Night, One Dark, Monokai, Solarized Dark, One Line, Full Stack) | ✅ Done | `src/lib/presets.ts` + `src/components/ThemeGallery.tsx` |
| Undo/redo (50-entry, Zustand + zundo) | ✅ Done | `src/stores/theme-store.ts` |
| Color picker + palette extraction | ✅ Done | `src/components/ColorPicker.tsx` + `src/components/ImagePalette.tsx` |
| `right_format` editor | ✅ Done | `src/components/GlobalFormatControls.tsx:70` |
| `continuation_prompt` editor | ✅ Done | `src/components/GlobalFormatControls.tsx:103` |
| Module type definitions (100 modules in JSON schema) | ✅ Done | `src/generated/module-definitions.json` |
| TypeScript interfaces for ALL major modules | ✅ Done | `src/types/starship.types.ts` |
| Format-string → ANSI renderer | ✅ Done | `src/lib/format-parser.ts` |
| Flask backend for community sharing | ✅ Done | `server/server.py` (optional, port 5001) |
| Auth modal, SolarSystem community view | ✅ Done | `src/components/AuthModal.tsx`, `SolarSystem/` |
| Suggestion panel | ✅ Done | `src/components/SuggestionPanel/` |
| Command palette (Cmd+K) | ✅ Done | `src/components/CommandPalette.tsx` |
| Keyboard shortcuts hook | ✅ Done (buggy) | `src/hooks/useKeyboardShortcuts.ts` |
| Error boundaries | ✅ Done | `src/components/ErrorBoundary.tsx` |
| Toast notifications | ✅ Done | `src/contexts/ToastContext.tsx` |
| Confirmation dialogs | ✅ Done | `src/contexts/ConfirmationContext.tsx` |

---

## 🔧 What NEEDS to be Built (remaining tasks)

### Task A — Fix keyboard shortcut conflict in form inputs [SMALL / BUG]
**File:** `src/hooks/useKeyboardShortcuts.ts`

**Bug:** The current guard at line ~18 is:
```typescript
if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName) && !e.metaKey && !e.ctrlKey) {
  return;
}
```
This allows `Cmd+Z` inside a text input to trigger **theme-level undo** instead of the browser's native text undo. Fix: when focus is in an editable element AND the shortcut is `undo`/`redo`, suppress the theme handler.

**Correct fix:**
```typescript
const target = e.target as HTMLElement;
const isEditable = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
if (isEditable) return; // suppress ALL theme shortcuts; browser handles Cmd+Z natively
```
Exception: keep `Cmd+S` firing from inputs (save is intentional from anywhere).

---

### Task B — Module search/filter in ModuleList [SMALL]
**File:** `src/components/ModuleList.tsx`

Add a `<input type="search">` above the "Active Modules" heading. Filter both active and inactive module arrays by `name` + `description` (case-insensitive). Clear on module toggle.

The module definitions come from `src/generated/module-definitions.json` (schema: `{ name, title, description, properties }`). Use `title` as the display name and `description` for search text.

```typescript
const [query, setQuery] = useState('');
const filtered = useMemo(() =>
  inactiveModules.filter(m => {
    const def = moduleDefs.find(d => d.name === m.id);
    return `${def?.title} ${def?.description}`.toLowerCase().includes(query.toLowerCase());
  }), [inactiveModules, query]);
```

---

### Task C — Screenshot / export as PNG [SMALL]
**File:** `src/components/TerminalPreview.tsx`

`html2canvas` is already in `package.json`. Add **Copy** and **Download** buttons in the MacOS-style header bar of the terminal component.

```typescript
import html2canvas from 'html2canvas';

const canvas = await html2canvas(containerRef.current!, { backgroundColor: '#1e1e1e', scale: 2 });
// Download:
const a = document.createElement('a'); a.href = canvas.toDataURL(); a.download = 'theme-preview.png'; a.click();
// Copy:
canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob! })]));
```

Use `addToast` from `useToast()` for success/error feedback. The container `ref` already exists as `terminalRef`.

---

### Task D — Per-module inline preview in ModuleConfig [MEDIUM]
**File:** `src/components/ModuleConfig.tsx`

Add a small preview strip at the top of the config form showing how the currently selected module renders. Use `parseFormatString` from `src/lib/format-parser.ts` with a synthetic `$module_name` format string and `MOCK_SCENARIOS.clean` from `src/lib/mock-data.ts`.

Convert ANSI output to React spans (don't use xterm for this — it's too heavy):
```typescript
// Simple ANSI → spans parser for the small color codes format-parser produces
function ansiToSpans(ansi: string): React.ReactNode[]
```

Or install `ansi-to-react` (MIT, ~3KB). The preview should update live as `style`/`symbol` fields change.

---

### Task E — Custom module extended fields [SMALL]
**File:** `src/components/ModuleConfig.tsx`, `src/types/starship.types.ts`

Custom modules (modules in `currentTheme.config.custom`) currently only expose `symbol`, `style`, `format`, `command`. Need to also expose: `when`, `detect_files`, `detect_extensions`, `detect_folders`, `shell`.

Detection:
```typescript
const isCustomModule = selectedModule ? selectedModule in (currentTheme.config.custom ?? {}) : false;
```

Comma-separated string inputs for array fields (`detect_files`, `detect_extensions`, `detect_folders`). Split on save, join on load.

Add these to `CustomModuleConfig` in `starship.types.ts`:
```typescript
when?: string;
detect_files?: string[];
detect_extensions?: string[];
detect_folders?: string[];
shell?: string[];
```

---

### Task F — Nerd Font URL loader [MEDIUM]
**File:** `src/components/TerminalPreview.tsx` (or new `FontLoader` component)

Collapsible "Font Settings" section in the terminal header. Two inputs: Font URL (woff2/ttf) + Font family name. "Apply" button loads font via `FontFace` API, then re-initializes xterm with the new `fontFamily`.

```typescript
async function loadFontFromUrl(url: string, family: string) {
  const face = new FontFace(family, `url(${url})`);
  await face.load();
  document.fonts.add(face);
}
```

Re-init xterm by disposing + recreating (the existing `useEffect` will handle recreation). Persist font URL + family to `localStorage` (key: `starship-font-settings`) — NOT to the Zustand theme store (font is device-specific, not theme-specific). Show error toast on invalid URL.

---

## 📋 Open PRs to merge first

| PR | Title | Action |
|----|-------|--------|
| #95 | aria-label on ModuleList clear search button | Merge (small a11y fix) |
| #94 | ToastContext test coverage | Merge (adds tests) |

---

## 🏗️ Architecture Quick Reference

### State Management
- **`useThemeStore`** (Zustand, key: `starship-theme-storage`) — ALL theme data. Use `updateConfig({...})` to update. Never mutate directly. Undo/redo is automatic.
- **`useUIStore`** (Zustand, key: `starship-ui-storage`) — modal visibility flags (ephemeral) + `activeView` (persisted).

### Data Flow
```
User action → useThemeStore.updateConfig() → TerminalPreview re-renders
```

### Module Definitions
`src/generated/module-definitions.json` — 100 modules from Starship's JSON schema. Shape: `{ name, title, description, properties }`. Do NOT edit by hand — regenerate with `npm run sync:schema`.

### Key Conventions
- **No `any`** — TypeScript strict mode
- **No `console.log`** — ESLint error in prod (use `console.warn`/`console.error`)
- **Tailwind only** — no CSS modules, no inline styles. Use `cn()` from `src/lib/utils.ts`
- **`addToast`** from `useToast()` for all user feedback — never `alert()`
- **`useConfirmation()`** for async confirm dialogs — never `window.confirm()`
- **Import order** auto-sorted by `eslint-plugin-simple-import-sort`; run `npm run lint -- --fix`

### Commands
```sh
npm run dev          # Dev server localhost:5173 (proxies /api → localhost:5001)
npm run build        # tsc -b + vite build (must pass before committing)
npm run lint         # ESLint — zero warnings
npm run lint -- --fix  # Auto-fix + sort imports
npm run format       # Prettier
npm run test:run     # Vitest single run (CI)
```

### Layout
`App.tsx` → 3-column layout:
- **Left:** `ModuleList` + `ImagePalette` + `FontSelector`
- **Center:** `TerminalPreview`
- **Right:** `ModuleConfig` + `SuggestionPanel` + `GlobalFormatControls`

### Toast Usage Pattern
```typescript
import { useToast } from '@/contexts/ToastContext';
const { addToast } = useToast();
addToast({ type: 'success', message: 'Done!' });
addToast({ type: 'error', message: 'Something went wrong' });
```

### UpdateConfig Pattern
```typescript
import { useThemeStore } from '@/stores/theme-store';
const { updateConfig } = useThemeStore();
updateConfig({ character: { symbol: '❯', style: 'bold green' } }); // deep merges
```

---

## 📁 Key File Map

```
src/
├── App.tsx                          # Root layout, modal rendering, keyboard shortcuts
├── components/
│   ├── ModuleList.tsx               # Left sidebar — drag-drop module list
│   ├── ModuleConfig.tsx             # Right sidebar — per-module settings form
│   ├── TerminalPreview.tsx          # Center — xterm.js live preview
│   ├── GlobalFormatControls.tsx     # right_format + continuation_prompt editors
│   ├── ThemeGallery.tsx             # Preset/saved themes modal
│   ├── CommandPalette.tsx           # Cmd+K command palette
│   └── ImagePalette.tsx             # Color extraction from images
├── stores/
│   ├── theme-store.ts               # Zustand theme state (source of truth)
│   └── ui-store.ts                  # Zustand UI state (modals, activeView)
├── lib/
│   ├── format-parser.ts             # Format string → ANSI sequences
│   ├── mock-data.ts                 # 4 mock scenarios for preview
│   ├── presets.ts                   # Built-in preset themes
│   ├── color-utils.ts               # Color harmony + WCAG contrast
│   └── toml-parser.ts               # TOML import/export
├── types/
│   └── starship.types.ts            # ALL TypeScript interfaces
├── generated/
│   └── module-definitions.json      # 100 modules from Starship schema (auto-gen)
├── hooks/
│   └── useKeyboardShortcuts.ts      # Keyboard shortcut hook (has bug — see Task A)
└── contexts/
    ├── ToastContext.tsx              # Global toast notifications
    └── ConfirmationContext.tsx      # Global confirm dialogs
```

---

## ⚠️ Local Working Directory Note

The local working tree has ~30 deleted files (docs, lock files) that are **not staged**. These are intentional cleanup deletions but haven't been committed yet. Do not restore them. Run `git status` to see the full list before making changes.

---

*This file is maintained by GitHub Copilot CLI for AI-to-AI collaboration. Update it when tasks are completed.*
