## 2026-04-13 - O(N²) Array.prototype.find in Component render loops

**Learning:** React component render loops (like `.filter` or `.map`) that execute `Array.prototype.find()` against another array create a hidden O(N²) bottleneck. This becomes highly visible on lists with complex filtering logic, like the drag-and-drop `ModuleList` which compares `activeModulesStore` against `MODULE_DEFINITIONS`.
**Action:** Always pre-compute a lookup `Map` or `Set` outside the `.map()` or `.filter()` loop using `useMemo` to enable O(1) lookups, dropping the algorithmic complexity to O(N). Ensure that you index by the correct ID field based on the collection's structure.
## 2026-04-14 - Zustand Selectors Mapping Over Static Arrays
**Learning:** Zustand selectors that map over large static arrays on every state change cause significant allocation overhead, creating hidden bottlenecks in component performance. In `src/stores/theme-store.ts`, `selectActiveModules` was recreating a map of `PREDEFINED_MODULE_NAMES` by iterating over all entries in `MODULE_DEFINITIONS` on every selector invocation.
**Action:** Always extract static array mapping or initialization logic outside of the selector definition, creating precomputed static Sets or Maps at the module scope for O(1) lookups inside the selector.
