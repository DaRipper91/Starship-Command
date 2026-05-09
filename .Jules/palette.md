## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.

## 2024-05-13 - [Focus styles & ARIA labels missing from modal close buttons]
**Learning:** Modal components like `ThemeUploadModal` and `AuthModal` use icon-only close buttons (`<X size={20} />`) without an `aria-label`. This pattern is repeated across several modals, making them inaccessible to screen reader users who cannot determine what the button does.
**Action:** Always verify icon-only interactive elements have an `aria-label` (e.g., `aria-label="Close"`) when creating or modifying modal or dialog components in this application.
