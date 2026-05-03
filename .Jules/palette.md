## 2023-10-24 - Accessibility Labels for Critical Features
**Learning:** Found instances of core, icon-only buttons missing `aria-labels` completely. Specifically, screenshot and export actions which are invisible to screen readers without standard text rendering and missing title elements.
**Action:** Always verify icon-only interactive controls. Added `aria-label`s to FontSelector's download button and ComparisonView's screenshot button to ensure full keyboard and screen reader accessibility context.
