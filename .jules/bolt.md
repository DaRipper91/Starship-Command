## 2026-03-25 - [Test Environment Globals in TypeScript]
**Learning:** In Vitest environments for this project, mocking global APIs (like `fetch`) using `global.fetch = vi.fn()` leads to TypeScript build errors (`Cannot find name 'global'`).
**Action:** Always use `globalThis` instead of `global` (e.g., `globalThis.fetch`) when mocking global APIs in test files to maintain strict type safety and avoid compilation failures.
