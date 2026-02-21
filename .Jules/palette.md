## 2026-06-15 - Missing Interactive States on Icon Buttons

**Learning:** Core navigation components (Sidebar, Header) consistently lack visible focus indicators for keyboard users, relying on default browser styles which are often invisible on dark backgrounds.
**Action:** When implementing new interactive components, always explicitly add `focus-visible` ring styles, especially for icon-only or dark-themed buttons.
