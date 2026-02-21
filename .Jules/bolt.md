## 2026-02-21 - Optimizing Zustand Selectors
**Learning:** Components subscribed to the entire state object (`state.currentTheme`) re-render on *any* update, even if only metadata changes. This causes expensive re-computations (like `parseFormatString`) unnecessarily.
**Action:** When subscribing to Zustand state in React components, always extract specific properties (e.g., `state.currentTheme.config`) for `useMemo` dependencies to leverage reference stability for nested objects that haven't changed.
