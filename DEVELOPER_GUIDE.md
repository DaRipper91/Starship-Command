# Developer Guide

## Architecture Overview

The application is built with:

- **React** (UI Framework)
- **Vite** (Build Tool)
- **Zustand** (State Management)
- **Tailwind CSS** (Styling)

## Component Hierarchy

- `App.tsx`: Main container and layout manager.
- `ModuleList.tsx`: Handles the DnD logic for ordering modules.
- `TerminalPreview.tsx`: Uses `xterm.js` to render the ANSI parsed text.
- `ModuleConfig.tsx`: Form configuration for the active module.

## State Management

Zustand is used for the theme store (`stores/theme-store.ts`). It handles persistence to LocalStorage and all theme CRUD operations.

## Adding new features

To add a new Starship module, update `lib/module-definitions.ts` with the module's metadata, and ensure the `types/starship.types.ts` interface accounts for its properties.
