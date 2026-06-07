## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.

## 2024-05-13 - [Focus styles & ARIA labels missing from modal instances and sub-components]

**Learning:** Found several close buttons within Modals that lacked aria-labels and explicit `focus-visible` styling which reduces accessibility for keyboard navigation. I also noticed some other icon-only buttons like those in IconBrowser lacking `aria-label`.
**Action:** Will ensure to implement proper aria-labels and focus-visible styles for close buttons on any new modal instance components in the future.

## 2026-06-07 - [Tooltips and keyboard focus styles missing from layout switcher and key actions]

**Learning:** Discovered that highly trafficked action buttons in `src/App.tsx` (like Undo, Redo, Save, Gallery) and the mobile/auto/desktop Layout Switcher buttons lacked proper `focus-visible` keyboard styling. Also learned that adding `focus-visible` Tailwind classes randomly to a `className` string causes ESLint to fail if Prettier sorting isn't run afterwards via `npx prettier --write <file>`.
**Action:** Will ensure `npx prettier --write <file>` is always run after modifying Tailwind classes in a React component to maintain strict linting compliance.
