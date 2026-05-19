## 2025-02-12 - Aria Labels on Close Buttons
**Learning:** Found several modal and panel close/dismiss buttons across the application that were icon-only and missing `aria-label`s. This is a common pattern where visual feedback is adequate for sighted users but screen reader users lack context.
**Action:** Always verify icon-only buttons (`<X size={...} />`, `<TrashIcon />`, etc.) have descriptive `aria-label`s. Added labels to `AuthModal`, `ThemeUploadModal`, `SuggestionPanel`, `App` (Theme Gallery close), and `FormatEditor` / `FormatSegmentEditor` segment remove buttons.
## 2025-02-12 - CI Workflow failing due to missing `npm` lockfile and hardcoded npm setup
**Learning:** The `package-lock.json` was missing causing the CI `actions/setup-node` `cache: 'npm'` configuration to fail, and the Github Action was attempting to run `npm` instead of `pnpm`.
**Action:** Replaced `npm` commands with `pnpm`, added the `pnpm/action-setup@v4` action, switched the node cache to `cache: 'pnpm'`, and explicitly declared `"packageManager": "pnpm@10.30.3"` in `package.json` to ensure consistency.
