## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.
