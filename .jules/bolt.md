## 2024-05-14 - [O(1) lookups for theme retrieval]

**Learning:** High-frequency logic like recurring checks in hooks (e.g., `useDynamicTheme`'s `setInterval`) use O(N) array `.find()` operations multiple times.
**Action:** Replace `savedThemes.find(...) || PRESET_THEMES.find(...)` with a memoized `Map` lookup for O(1) retrieval to improve efficiency, per the memory guidelines.
