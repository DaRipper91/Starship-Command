## 2026-04-13 - O(N²) Array.prototype.find in Component render loops

**Learning:** React component render loops (like `.filter` or `.map`) that execute `Array.prototype.find()` against another array create a hidden O(N²) bottleneck. This becomes highly visible on lists with complex filtering logic, like the drag-and-drop `ModuleList` which compares `activeModulesStore` against `MODULE_DEFINITIONS`.
**Action:** Always pre-compute a lookup `Map` or `Set` outside the `.map()` or `.filter()` loop using `useMemo` to enable O(1) lookups, dropping the algorithmic complexity to O(N). Ensure that you index by the correct ID field based on the collection's structure.
