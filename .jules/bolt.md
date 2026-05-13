## 2026-04-13 - O(N²) Array.prototype.find in Component render loops
**Learning:** React component render loops (like `.filter` or `.map`) that execute `Array.prototype.find()` against another array create a hidden O(N²) bottleneck. This becomes highly visible on lists with complex filtering logic, like the drag-and-drop `ModuleList` which compares `activeModulesStore` against `MODULE_DEFINITIONS`.
**Action:** Always pre-compute a lookup `Map` or `Set` outside the `.map()` or `.filter()` loop using `useMemo` to enable O(1) lookups, dropping the algorithmic complexity to O(N). Ensure that you index by the correct ID field based on the collection's structure.

## 2026-05-13 - O(1) Lookups in setInterval hooks
**Learning:** High-frequency logic like recurring checks inside hooks (e.g. `useDynamicTheme` with `setInterval`) should avoid chained O(N) Array iterations (like `.find()` operations across preset and saved theme lists). This causes unnecessary processing overhead every tick.
**Action:** Pre-compute a lookup Map using `useMemo` outside the interval check to provide O(1) lookups inside the high-frequency tick, reducing the algorithmic cost from O(N) to O(1) for repeated executions.
