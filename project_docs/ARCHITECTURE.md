# Application Architecture: Starship Command Enhanced

## Core Principle: Serialization-First

The application exists to generate a `starship.toml` file. It does not control the user's terminal environment directly. The internal state must always perfectly map to valid TOML.

## System Boundaries

1. **The State Layer (Zustand):**
   - `currentTheme.config`: The single source of truth. If a key exists here, it MUST exist in the Starship schema.
   - `currentTheme.metadata`: App-specific data (name, author, preview images). NEVER exported to TOML.
   - `uiStore`: Volatile state for the Preview mode (mock git status, mock directory).

2. **The Validation Gatekeeper:**
   - `TomlParser.ts`: Handles bidirectional conversion between JS Objects and TOML strings. It aggressively strips undefined values and validates against `module-definitions.json`.

3. **The 3-Mode UI Engine:**
   - **Build Mode:** Writes to `currentTheme.config`.
   - **Preview Mode:** Reads from `currentTheme.config`, writes to `uiStore.mockState`.
   - **Export Mode:** Serializes `currentTheme.config` to text.

## Backend (Flask)

Used exclusively for out-of-browser operations:

- SSH deployment (`paramiko`).
- Heavy image processing (Color extraction).
- Native filesystem access (`/api/save-local`).

## Mobile Deployment Strategy (Pixel 9 / 10 Pro)

The application targets high-performance, modern Android hardware, specifically the Google Tensor G3/G4 architecture.

- **Dynamic Refresh Rate (DRR):** UI components and terminal rendering auto-detect the hardware refresh rate (60Hz to 120Hz+). Logic scales dynamically to ensure frame-perfect smoothness on LTPO displays.
- **Tensor-Native Optimization:** Heavy data operations (Nerd Font indexing, color extraction) leverage hardware acceleration and large-heap memory allocation to prevent main-thread jank.
- **Pure Infrastructure:** All legacy Android polyfills and device-specific hacks (e.g., Samsung-specific overrides) have been purged. The codebase remains platform-standard and surgically clean.
