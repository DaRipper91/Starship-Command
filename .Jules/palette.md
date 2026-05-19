## 2025-02-12 - Aria Labels on Close Buttons
**Learning:** Found several modal and panel close/dismiss buttons across the application that were icon-only and missing `aria-label`s. This is a common pattern where visual feedback is adequate for sighted users but screen reader users lack context.
**Action:** Always verify icon-only buttons (`<X size={...} />`, `<TrashIcon />`, etc.) have descriptive `aria-label`s. Added labels to `AuthModal`, `ThemeUploadModal`, `SuggestionPanel`, `App` (Theme Gallery close), and `FormatEditor` / `FormatSegmentEditor` segment remove buttons.
