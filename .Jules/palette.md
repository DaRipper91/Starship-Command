## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.

## 2024-05-14 - [Adding keyboard shortcuts to tooltips for better discoverability]

**Learning:** Discovered that key header actions (Save, Undo, Redo, Command Palette) have keyboard shortcuts implemented, but these were not visible to users unless they opened the command palette. Users were missing out on efficiency gains.
**Action:** Added keyboard shortcut hints to the `title` tooltips of these buttons to improve discoverability of power user features.
