## 2024-05-23 - [O(n^2) Find in Loops]

**Learning:** O(n^2) `.find()` operations in `.map()` and `.filter()` can cause significant performance degradation when rendering large lists like modules or themes.
**Action:** Replace `Array.prototype.find()` inside loops with a `Map` or `Set` outside the loop for O(1) lookups.
