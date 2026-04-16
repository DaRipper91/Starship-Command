## 2024-05-16 - [Lockfile conflicts during sandbox install]

**Learning:** Running `npm i -D` inside the sandbox without caution modifies the `package-lock.json` and overrides `pnpm` config if standard procedures are neglected. Formatting tools like Prettier can also target built outputs (like `dist-v1.3.0`) if not explicitly ignored.
**Action:** Always verify `package.json` package manager (use `pnpm`), and use `git restore` on unneeded lockfile or dist folder changes before committing.
