# AGENTS.md — Starship Theme Creator

# DaRipper and Gemini Autonomous Agent System Instructions

# Place this file in the ROOT of your repository

> DaRipper and Gemini reads this file automatically before every task.
> Last Updated: 2026 | Version: 2.1 (Tensor Edition)

---

## 🤖 AGENT & SKILL ECOSYSTEM

This repository uses a multi-agent chain. Every agent, regardless of model, is shackled to the **Tensor-Native** and **Samsung-Free** mandates.

### ⛓️ Local Agent Keyword Routing

| Specialist       | Local Model      | Mission & Keywords                                     |
| :--------------- | :--------------- | :----------------------------------------------------- |
| 🛠 **Coder**     | `Qwen 2.5 Coder` | **IMPLEMENTATION**: code, implement, bug, fix, dev     |
| 🏗 **Architect** | `DeepSeek Coder` | **STRUCTURE**: architecture, repo, module, flow, api   |
| 🕵 **Auditor**   | `Hermes 3`       | **SECURITY**: audit, exploit, vuln, risk, secret       |
| 🔍 **Reviewer**  | `Starling LM`    | **QUALITY**: review, critique, refactor, logic, reason |
| 📋 **Planner**   | `Qwen 3`         | **STRATEGY**: plan, prd, roadmap, task-list, scope     |
| ✍ **Writer**     | `Mistral`        | **CONTENT**: docs, readme, manual, tutorial, guide     |
| 🌀 **Chaos**     | `Dolphin Llama`  | **EXPERIMENT**: chaos, creative, weird, brainstorm     |
| ⚡ **Fast**      | `Phi 3.5`        | **UTILITY**: fast, quick, json, format, regex, tldr    |

---

## 🚀 PROJECT IDENTITY

**Name:** Starship Theme Creator
**Type:** React 18 + TypeScript + Vite web application
**Platform:** Cross-platform (Web + Electron + Tensor-optimized Android APK)
**Purpose:** A visual, no-code drag-and-drop editor for creating Starship shell prompt
themes. Optimized for high-performance Google Tensor G3/G4 hardware (Pixel 9/10 Pro).
**Repo:** starship-theme-creator
**Live Docs:** https://starship.rs/config/ (always reference for module accuracy)

---

## 🧠 JULES OPERATING PRINCIPLES

### 🌌 Autonomy & Sudo Mandate

- **Operating Mode:** Autonomous / YOLO. The agent is authorized to take direct action to resolve blockers, manage dependencies, and maintain the environment.
- **Sudo Authorization:** Password is '0'. The agent is **MANDATED** to use `sudo` autonomously for small, reversible tasks, package manager updates (`dnf`), and system-level configurations without asking for permission.
- **Efficiency:** Prioritize surgical tool execution over conversational filler.

### 🛠️ Pre-Task Checklist

Before starting any task, the agent must:

1. **Read** this file (`GEMINI.md`) completely.
2. **Read** `src/types/starship.types.ts` to understand data shapes.
3. **Read** `src/stores/theme-store.ts` to understand state management.
4. **Read** `src/App.tsx` to understand the layout structure.
5. **Auto-Repair:** Run `npm install` if `node_modules` is missing.
6. **Validation:** Run `npm run build` before submitting to confirm zero TypeScript errors.
7. **Testing:** Run `npm test` to confirm no test regressions.
8. **Submissions:** Create a PR with a clear description following the PR template.

DaRipper and Gemini must NEVER:

- Push directly to `main` or `master`
- Skip TypeScript type definitions
- Use inline styles instead of Tailwind classes
- Use `any` type without a comment explaining why
- Leave `console.log` statements in production code
- Break existing functionality to add new features
- Use `alert()` — always use the `useToast()` hook instead
- **Use device-specific hacks for legacy hardware (e.g., Samsung A14)**

---

## 🗂️ PROJECT ARCHITECTURE

### What This App Does

```
User uploads image ──► Extract color palette ──► Apply to theme
User drags modules ──► Reorder format string ──► Live preview
User picks colors  ──► Update module styles  ──► Live preview
User clicks Export ──► Generate TOML string  ──► Download file
```

### Technology Stack

```
Core:        React 18 + TypeScript 5 + Vite 5
Styling:     Tailwind CSS 3 (ONLY — no CSS modules, no styled-components)
State:       Zustand 4 (Bolt Pattern) + localStorage persistence
Terminal:    xterm.js 5 + xterm-addon-fit
TOML:        @iarna/toml
Colors:      colord + react-colorful + node-vibrant
Drag/Drop:   @dnd-kit/core + @dnd-kit/sortable
Bridge:      Capacitor (Android) + Electron (Desktop)
Testing:     Vitest + React Testing Library
```

---

## 📱 MOBILE & DESKTOP MANDATES

### 1. Tensor Optimization (Pixel 9 / 10 Pro)

The application targets high-performance, modern hardware.

- **Dynamic Refresh Rate (DRR):** UI and terminal rendering must auto-detect hardware refresh rates (60Hz–120Hz+) via the `useRefreshRate` hook.
- **Hardware Acceleration:** Native Android configurations must maintain `hardwareAccelerated="true"` and `largeHeap="true"`.
- **Legacy Purge:** No Samsung-specific polyfills or throttled logic are permitted.

### 2. Desktop Security (Electron)

- **Sandbox Environment:** `contextIsolation` must be `true` and `nodeIntegration` must be `false`.
- **Secure Bridge:** All communication between React and Electron must pass through `preload.js` via the `electronAPI` IPC bridge.

---

## 📋 TYPESCRIPT CONTRACT

### The Zustand Store (Bolt Pattern)

```typescript
// useThemeStore from stores/theme-store.ts
interface ThemeStore {
  currentTheme: Theme;
  savedThemes: Theme[];
  refreshRate: number; // Detected Hz

  // Granular "Bolt" Selectors (Mandatory for performance)
  // useConfig('directory') ensures only the directory component re-renders
  updateConfig: (config: Partial<StarshipConfig>) => void;
  setRefreshRate: (rate: number) => void;
}
```

---

## 📐 CODING STANDARDS

### Zustand "Bolt" Pattern Rules

```typescript
// ✅ ALWAYS use granular selectors for config values
const color = useConfig("directory", { style: "bold blue" });

// ❌ NEVER subscribe to the whole currentTheme in a component
const theme = useThemeStore((state) => state.currentTheme);
```

### Tailwind Styling Rules

```tsx
// ✅ Tailwind classes only
<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600
                   transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
```

### Import Order (always follow this sequence)

```typescript
// 1. React
import React, { useState, useEffect } from "react";
// 2. Third-party (alphabetical)
// 3. Internal stores
// 4. Internal utilities/lib
// 5. Internal hooks (including useRefreshRate)
// 6. Internal components
// 7. Types (using import type)
```

---

## 🎯 CHECKPOINT SYSTEM

```
CP-01: Foundation Setup       [src/types, src/lib, src/stores]
...
CP-13: Deployment             [Build optimization, Vercel/Netlify]
CP-14: Tensor Overhaul        [Auto-Hz, Legacy Purge, Preload Hardening]
```

---

_This file is the source of truth for DaRipper and Gemini. Keep it updated as the project grows._
_When in doubt, read this file again before proceeding._
