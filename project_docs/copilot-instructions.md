# GitHub Copilot Instructions — Starship Theme Creator

# Place this file at: .github/copilot-instructions.md

# Copilot reads this automatically for all chat and agent interactions in this repo.

---

## 🚀 PROJECT OVERVIEW

You are working on **Starship Theme Creator** — a React 18 + TypeScript web app that
lets users visually build Starship shell prompt themes and export `starship.toml` files.
Users drag modules, pick colors, upload images for palette extraction, and get a live
terminal preview — all without editing any TOML or config files manually.

**Reference:** https://starship.rs/config/ for Starship module documentation.

---

## 🧰 TECH STACK

```
Framework:   React 18 + TypeScript 5 + Vite 5
Styling:     Tailwind CSS 3 ONLY (no CSS modules, no styled-components)
State:       Zustand 4 with localStorage persistence
Terminal:    xterm.js 5 + FitAddon
TOML:        @iarna/toml
Colors:      colord + react-colorful + node-vibrant
Drag/Drop:   @dnd-kit/core + @dnd-kit/sortable
Icons:       lucide-react
Testing:     Vitest + React Testing Library
```

---

## 📁 KEY FILE LOCATIONS

```
src/types/starship.types.ts    ← ALL TypeScript interfaces (read first)
src/stores/theme-store.ts      ← Zustand store (single source of truth)
src/lib/toml-parser.ts         ← TOML ↔ config conversion
src/lib/format-parser.ts       ← Starship format strings → ANSI codes
src/lib/color-utils.ts         ← Color manipulation + presets
src/lib/theme-validator.ts     ← Config validation
src/lib/module-definitions.ts  ← All supported module metadata
src/lib/presets.ts             ← Built-in Nord/Dracula/Gruvbox themes
src/App.tsx                    ← Root 3-column layout
```

---

## 💡 HOW COPILOT SHOULD HELP

### In VS Code Chat / Agent Mode

When asked to implement features, Copilot should:

1. **Read existing patterns** — look at similar components before creating new ones
2. **Use the store correctly** — all state goes through `useThemeStore()`
3. **Follow file structure** — components in own folder, tests alongside
4. **Apply Tailwind** — never inline styles, never CSS files
5. **Add TypeScript** — all props, returns, and parameters must be typed
6. **Handle errors** — use `useToast()` not `alert()` or `console.error()`
7. **Write tests** — new utilities need unit tests, new components need RTL tests

### In Copilot Chat on GitHub

When reviewing PRs, Copilot should check:

- [ ] TypeScript types present and accurate
- [ ] Tailwind-only styling (no inline styles)
- [ ] `useToast()` used for user feedback (not `alert()`)
- [ ] Loading states for async operations
- [ ] Error boundaries around risky components
- [ ] Accessibility attributes (aria-label, role, etc.)
- [ ] No `console.log` in production code
- [ ] Tests cover the happy path and at least one error case

---

## 📐 CODING STANDARDS

### TypeScript

```typescript
// ✅ Always define prop interfaces
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  showPalettes?: boolean;
}

// ✅ Named exports preferred
export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {

// ✅ JSDoc on all exported functions
/**
 * Extracts a color palette from an uploaded image file
 * @param imageFile - The image file to extract colors from
 * @returns Promise resolving to palette with named color roles
 */
export async function extractPaletteFromImage(imageFile: File): Promise<ColorPalette>

// ✅ Custom hooks for complex logic
export function useColorExtraction() {
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // ...
  return { palette, isLoading, extract };
}
```

### Tailwind Styling

```tsx
// ✅ Correct
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
  Save Theme
</button>

// ✅ Conditional classes
<div className={`p-4 border-2 rounded-lg transition-colors
                ${enabled ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>

// ❌ Never this
<div style={{ padding: '16px', backgroundColor: 'blue' }}>
```

### State Management

```typescript
// ✅ Access store in components
const { currentTheme, updateConfig, saveTheme } = useThemeStore();

// ✅ Update specific module config
updateConfig({
  directory: {
    style: 'bold cyan',
    truncation_length: 3,
    truncate_to_repo: true,
  },
});

// ❌ Never mutate directly
state.currentTheme.config.directory.style = 'bold cyan';
```

### User Feedback Pattern

```typescript
// ✅ Always use toast for feedback
import { useToast } from '@/hooks/useToast';
const { toast } = useToast();

try {
  await saveToGist(toml);
  toast.success('Theme saved to GitHub Gist!');
} catch (err) {
  toast.error(
    `Failed to save: ${err instanceof Error ? err.message : 'Unknown error'}`,
  );
}

// ❌ Never use these
alert('Saved!');
console.error('Failed', err);
```

### Loading States

```typescript
// ✅ Always show loading for async work
const [isExtracting, setIsExtracting] = useState(false);

const handleImageUpload = async (file: File) => {
  setIsExtracting(true);
  try {
    const palette = await ColorUtils.extractPaletteFromImage(file);
    applyPalette(palette);
    toast.success('Palette applied!');
  } catch (err) {
    toast.error('Could not extract colors from image');
  } finally {
    setIsExtracting(false);
  }
};
```

---

## 🏗️ COMPONENT TEMPLATE

When creating a new component, use this structure:

```typescript
// src/components/MyFeature/index.tsx

import React, { useState, useCallback } from 'react';
import { useThemeStore } from '@/stores/theme-store';
import { useToast } from '@/hooks/useToast';
import type { StarshipConfig } from '@/types/starship.types';

interface MyFeatureProps {
  /** Description of this prop */
  value: string;
  /** Called when value changes */
  onChange: (value: string) => void;
  /** Optional additional context */
  label?: string;
}

/**
 * MyFeature - Brief description of what this component does
 *
 * @example
 * <MyFeature value={color} onChange={setColor} label="Directory Color" />
 */
export const MyFeature: React.FC<MyFeatureProps> = ({
  value,
  onChange,
  label
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = useCallback(async () => {
    setIsLoading(true);
    try {
      // Do work
      toast.success('Done!');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {/* Component content */}
      <button
        onClick={handleAction}
        disabled={isLoading}
        aria-label={`Apply ${label ?? 'setting'}`}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Working...' : 'Apply'}
      </button>
    </div>
  );
};
```

---

## ♿ ACCESSIBILITY REQUIREMENTS

Every interactive element must have:

```tsx
// Buttons without visible text
<button aria-label="Close color picker">
  <X className="w-4 h-4" />
</button>

// Form inputs
<label htmlFor="theme-name">Theme Name</label>
<input
  id="theme-name"
  type="text"
  aria-describedby="theme-name-hint"
/>
<p id="theme-name-hint" className="text-xs text-gray-500">
  Used to identify your theme in the gallery
</p>

// Dynamic content
<div role="status" aria-live="polite">
  {isLoading && <span>Extracting colors...</span>}
</div>

// Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
```

---

## 🎯 COPILOT AGENT MODE CAPABILITIES

When you use **Copilot Coding Agent** (assign issue to @copilot or use "Delegate to agent"):

Copilot can autonomously:

- ✅ Implement entire features from issue descriptions
- ✅ Fix bugs by tracing root causes across files
- ✅ Write and run tests via `npm test` in its environment
- ✅ Refactor code while maintaining API compatibility
- ✅ Update TypeScript types and all usages
- ✅ Add accessibility attributes across components
- ✅ Optimize bundle size with code splitting
- ✅ Generate documentation and JSDoc comments
- ✅ Create PRs with detailed descriptions
- ✅ Respond to PR review comments and iterate

### How to Assign Issues to Copilot

**Method 1 — GitHub Issue:**

```
1. Create a GitHub Issue describing the task
2. Set Assignee → Copilot
3. Copilot creates a branch (copilot/issue-XX-...)
4. Copilot opens a draft PR with commits
5. You review and leave comments for iteration
6. Merge when satisfied
```

**Method 2 — VS Code Chat:**

```
1. Open Copilot Chat in VS Code
2. Describe the task in detail
3. Click "Delegate to coding agent"
4. Agent works in background, opens PR
5. Review PR on GitHub
```

**Method 3 — @copilot mention in PR:**

```
Leave a comment on any PR:
"@copilot Can you add error handling for network timeouts in ExportImport.tsx?"
Copilot will respond with code changes directly to the PR.
```

### Recommended Issue Template for Copilot

When assigning issues to Copilot, write issues like this:

```markdown
## Task: [Clear title of what to build]

### Context

[One paragraph explaining what this feature is and why it's needed]

### What to Build

[Specific list of what to implement — the more specific the better]

### Files to Modify

- `src/components/X/index.tsx` — [what to add/change]
- `src/lib/y.ts` — [what to add/change]

### Acceptance Criteria

- [ ] Feature works as described
- [ ] TypeScript types are complete
- [ ] Tests cover the feature
- [ ] `npm run build` passes
- [ ] `npm test` passes
- [ ] Tailwind only (no inline styles)

### Related

Checkpoint: CP-XX | References: #issue-number
```

---

## 🔄 COPILOT CODE REVIEW CHECKLIST

When @copilot reviews a PR, check for:

**TypeScript**

- [ ] All props have typed interfaces
- [ ] No implicit `any`
- [ ] Return types on all exported functions
- [ ] New types added to `starship.types.ts`

**React Patterns**

- [ ] `useCallback` on handlers passed as props
- [ ] `useMemo` on expensive computations
- [ ] `React.memo` on pure components
- [ ] No direct state mutation
- [ ] Correct dependency arrays in `useEffect`

**User Experience**

- [ ] Loading states for async operations
- [ ] Error handling with toast notifications
- [ ] Empty states for empty lists/galleries
- [ ] Responsive layout (mobile + desktop)

**Accessibility**

- [ ] All buttons have `aria-label` if no visible text
- [ ] Form inputs have associated `<label>` elements
- [ ] Focus management for modals/drawers
- [ ] Keyboard navigation works without mouse

**Code Quality**

- [ ] No `console.log` left in code
- [ ] No `alert()` calls
- [ ] Meaningful variable/function names
- [ ] JSDoc on exported functions
- [ ] Component has a test file

---

## 📖 STARSHIP CONTEXT CHEAT SHEET

```typescript
// Common Starship style values to suggest
const COMMON_STYLES = [
  'bold',
  'italic',
  'underline',
  'bold red',
  'bold green',
  'bold blue',
  'bold cyan',
  'bold yellow',
  'bold purple',
  'italic red',
  'bg:blue white',
  'bg:black yellow',
  '#ff0000',
  '#00ff00',
  '#0000ff',
];

// Format string building blocks
const FORMAT_PARTS = {
  directory: '$directory',
  git: '$git_branch$git_status',
  languages: '$nodejs$python$rust$golang',
  cloud: '$aws$gcloud',
  system: '$battery$time',
  newline: '\n',
  character: '$character',
};

// Default module formats
const MODULE_FORMATS = {
  directory: '[$path]($style)[$read_only]($read_only_style) ',
  git_branch: 'on [$symbol$branch(:$remote_branch)]($style) ',
  character: '$symbol ',
  nodejs: 'via [$symbol($version )]($style)',
};
```

---

_These instructions apply to all Copilot features: Chat, Agent, Code Review, and PR Summaries._
_For DaRipper and Gemini-specific instructions, see `AGENTS.md` in the repository root._
