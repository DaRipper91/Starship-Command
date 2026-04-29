## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.

## 2026-04-29 - [Missing aria attributes on IconBrowser and Format Controls]

**Learning:** Buttons that open popovers or modals (like the 'Browse' button in GlobalFormatControls) often lack `aria-expanded` and `aria-label` attributes. Grid items acting as selectable buttons (like in IconBrowser) frequently miss `aria-pressed` states, making their current selection status opaque to screen readers.
**Action:** Added `aria-label` and `aria-expanded` to the browse toggle, and `aria-label` with `aria-pressed` to individual icon selection buttons to clarify their interactive state.
