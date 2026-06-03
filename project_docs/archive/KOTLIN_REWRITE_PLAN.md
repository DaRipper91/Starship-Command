# Kotlin Rewrite Plan

## Goal

Replace the legacy web/capacitor editor with a native Kotlin Android app that preserves Starship theme editing, preview, and export workflows.

## Migration Phases

1. Foundation (done)
- Native module scaffold (`android-native`)
- Compose navigation shell
- Theme state + persistence
- Basic TOML export

2. Core Editor Parity
- Module picker and module-specific editors
- Drag/reorder format builder
- Undo/redo history
- Preset theme support

3. Preview Parity
- Rich terminal preview composable
- Font selection and symbol validation
- Git/context simulation controls

4. Import/Export Parity
- TOML import with validation errors
- File save/share intents
- Termux integration flow

5. Community + Backend Parity
- Auth screens
- Theme upload/download
- Offline-first sync queue

6. Cutover
- Replace legacy Android entrypoint
- Move release pipeline to native app
- Archive legacy web UI as reference
