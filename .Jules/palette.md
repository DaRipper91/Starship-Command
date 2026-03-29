## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Icon-only buttons with `title` attributes alone do not reliably convey their purpose to screen readers across all contexts, leading to accessibility gaps. This is a common pattern across this application.
**Action:** Always verify that an `aria-label` is present in addition to `title` for icon-only interactive elements to ensure full accessibility compliance.
