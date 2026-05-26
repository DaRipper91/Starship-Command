## 2026-04-13 - O(N²) Array.prototype.find in Component render loops
**Learning:** React component render loops (like `.filter` or `.map`) that execute `Array.prototype.find()` against another array create a hidden O(N²) bottleneck. This becomes highly visible on lists with complex filtering logic, like the drag-and-drop `ModuleList` which compares `activeModulesStore` against `MODULE_DEFINITIONS`.
**Action:** Always pre-compute a lookup `Map` or `Set` outside the `.map()` or `.filter()` loop using `useMemo` to enable O(1) lookups, dropping the algorithmic complexity to O(N). Ensure that you index by the correct ID field based on the collection's structure.

## 2026-04-14 - O(1) Map lookups in recurring logic
**Learning:** High-frequency recurring logic like `setInterval` hooks (e.g. `useDynamicTheme`) or render passes evaluating dropdowns over combined arrays (e.g. `ComparisonView`) that chain `O(N)` array searches (like `.find()` or `.map()` lookups) create severe performance bottlenecks.
**Action:** Always pre-compute a lookup `Map` outside the loop using `useMemo` to enable `O(1)` lookups. When prioritizing specific theme overrides, iterate forward through the combined list and use `!map.has(id)` before setting to ensure the first instance (like the current active state) takes precedence.
