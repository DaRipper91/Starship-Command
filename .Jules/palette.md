## 2026-06-15 - Missing Interactive States on Icon Buttons

**Learning:** Core navigation components (Sidebar, Header) consistently lack visible focus indicators for keyboard users, relying on default browser styles which are often invisible on dark backgrounds.
**Action:** When implementing new interactive components, always explicitly add `focus-visible` ring styles, especially for icon-only or dark-themed buttons.

## 2026-06-25 - Interactive Div Pattern
**Learning:** The codebase frequently uses `div` with `onClick` for interactive elements (cards, list items), making them inaccessible to keyboard users and screen readers.
**Action:** Default to `<button>` with `w-full text-left` for card-like interactive elements to get native keyboard support and semantics for free.
