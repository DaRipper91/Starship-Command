---
date: 2026-04-10
tags: [gemini, jules, automation, fish-shell, termux]
context: Starship Command Enhanced / AI Orchestration
---

**TL;DR:** High-performance Fish shell functions for the Gemini-to-Jules bridge.

> 🎯 _A set of modular Fish functions that automate the research-to-execution pipeline between Gemini CLI and Jules for Termux users._

## 🪐 Fish Shell Integration: The Orchestrator Suite

The following functions have been installed to `~/.config/fish/functions/` to provide a "Scout & Hammer" workflow.

### 🔍 `scout [task]`

Runs the local Gemini CLI research phase. It analyzes the `AGENTS.md` and project context to generate a high-density `JULES-BRIEFING.md` file. Use this for tasks that require deep architectural context.

### 🔨 `hammer`

The execution command. It invokes the `starship-jules.sh` script, which reads the `JULES-BRIEFING.md` and submits it to the Jules cloud agent for autonomous implementation.

### 🌪️ `sj [task]` (The Full Cycle)

Combines `scout` and `hammer` into a single atomic operation. This is the fastest way to move from "I have an idea" to "Jules is building it."

> 🛠️ **Implementation Idea:** Run `sj "Refactor the theme gallery to support masonry layout"` to see the full pipeline in action.

### 📥 `jl` and `jp [id]`

- **`jl`**: Quickly list all active and past Jules sessions.
- **`jp`**: Pull and apply a patch from a specific Jules session ID to your local working branch.

### 🧬 `g2j [instruction]`

Pipes the current `stdin` (e.g., a file content or git diff) through Gemini for a "quick-fix" instruction, then submits it directly to `jules new`.

> ⚠️ **Watch Out:** Large files might exceed prompt limits; use `g2j` for surgical fixes on individual files.

### Related Notes

[[JULES_STARSHIP_COMMAND_ENHANCED]]
[[AI_Assistant_Guide]]
