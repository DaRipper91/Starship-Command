## 2024-05-13 - [Focus styles & ARIA labels missing from modal close buttons & header buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation. Additionally, noticed close buttons within WelcomeWizard and IconBrowser components lacking explicit `focus-visible` styling.

**Action:** Will implement proper aria-labels and focus-visible styles (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`) for these highly trafficked buttons across App.tsx, IconBrowser, and WelcomeWizard components.
