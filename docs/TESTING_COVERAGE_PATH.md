# Path to 70% Code Coverage

Currently, the application test suite guarantees a baseline of **40% code coverage** via Vitest. To systematically increase this to the target **70% coverage**, follow the roadmap outlined below:

## Phase 1: Completing Core Utility Coverage (Target: 50%)
- **Action**: Ensure 100% line/branch coverage in `src/lib/`.
- **Files to target**:
  - `theme-validator.ts`: Cover all edge cases related to color contrasts, missing config values, and invalid styles.
  - `format-parser.ts`: Ensure error states, deeply nested unclosed brackets, and unknown module edge cases are tested.
  - `storage-utils.ts`: Write specific tests verifying the exact debounce timing guarantees for localStorage wrapper functions.

## Phase 2: State Management Mastery (Target: 60%)
- **Action**: Achieve full coverage across Zustand store reducers in `src/stores/`.
- **Files to target**:
  - `theme-store.ts`: Test edge cases of deep history limits (50 changes), verifying exact past/future array manipulations during edge-case state updates.
  - Expand tests for `exportToml` and `importToml` actions verifying complex nested custom modules serialize perfectly in tandem with the TOML parser.
  - Test store resets and metadata updates explicitly.

## Phase 3: Component Interactions & Contexts (Target: 70%)
- **Action**: Test complex component states, hooks, and React contexts.
- **Files to target**:
  - Write React Testing Library (RTL) tests for context providers: `AccessibilityContext.tsx`, `ToastContext.tsx`.
  - Provide tests for custom hooks like `useDynamicTheme.ts` testing actual DOM class application (`.dark`, `.light`).
  - Write behavior-driven tests for major UI components: `ModuleConfig.tsx`, validating `onChange` events properly dispatch to the theme store.
  - Test modal interactions in `ExportImport` and `ThemeGallery` focusing on accessibility (keyboard navigation) and conditional rendering based on internal states.

By rigorously pursuing these three phases, the codebase will securely reach and exceed the 70% code coverage threshold while maintaining strong architectural guarantees.
