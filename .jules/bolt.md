## 2026-04-13 - O(N²) Array.prototype.find in Component render loops
**Learning:** React component render loops (like `.filter` or `.map`) that execute `Array.prototype.find()` against another array create a hidden O(N²) bottleneck. This becomes highly visible on lists with complex filtering logic, like the drag-and-drop `ModuleList` which compares `activeModulesStore` against `MODULE_DEFINITIONS`.
**Action:** Always pre-compute a lookup `Map` or `Set` outside the `.map()` or `.filter()` loop using `useMemo` to enable O(1) lookups, dropping the algorithmic complexity to O(N). Ensure that you index by the correct ID field based on the collection's structure.

## 2026-05-17 - O(1) Lookups in setInterval hooks
**Learning:** In hooks that run frequently, such as `useDynamicTheme` with a `setInterval`, executing `.find()` on arrays like `savedThemes` and `PRESET_THEMES` can cause unnecessary O(N) operations. While the array might not be huge, it's executed every minute.
**Action:** Use a `useMemo`-ized Map to pre-compute the lookup table for O(1) access inside the interval.
