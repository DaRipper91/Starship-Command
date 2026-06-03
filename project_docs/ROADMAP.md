# 🚀 Starship Command Enhanced: Roadmap to 1.0

This document tracks the progress toward the unified Web + APK release.

## 📱 Phase 2: Mobile UI & UX Optimization (Completed)

_Goal: Make the editor feel like a native Android app, not just a website._

- [x] **Task 2: Responsive Rework (Portrait Mode)**
  - [x] Implement `useWindowSize` hook to detect mobile vs. desktop.
  - [x] Switch to a single-column layout for screens < 768px.
  - [x] Move "Live Preview" and "Config" into a dedicated "Preview" tab.
  - [x] Add a floating "Action Button" (FAB) or bottom bar for Save/Undo/Redo.
- [x] **Task 3: Touch Target Audit (Accessibility)**
  - [x] Ensure all buttons, chips, and tabs are at least **44px x 44px**.
  - [x] Add `p-4` or `min-h-[44px]` to all interactive list items.
  - [x] Implement `focus-visible` rings for keyboard/touchpad navigation.
- [x] **Task 4: Gesture-Friendly Reordering**
  - [x] Remove HTML5 Drag-and-Drop for mobile users.
  - [x] Add ↑ and ↓ arrow buttons to `ModuleChip` for reordering.
  - [x] Implement "long-press to drag" if using a touch-compatible library.
- [x] **Task 5: Local Persistence**
  - [x] Hook up `localStorage` to save the active theme automatically.
  - [x] Persist the `savedThemes` gallery so users don't lose work on app close.
  - [x] Implement "Recover Session" on startup.

## 📦 Phase 3: The APK Build Pipeline (Completed)

_Goal: Turn the code into a runnable Android application._

- [x] **Task 8: Capacitor Implementation**
  - [x] Run `npx cap init` and configure `appId: com.daripper91.starshipcommand`.
  - [x] Add Android platform: `npx cap add android`.
  - [x] Generate high-resolution app icons and splash screens.
- [x] **Task 9: Android Build & Test**
  - [x] Run first successful Debug APK build: `./gradlew assembleDebug`.
  - [x] Test on physical **Pixel 9** device (check for notch/status bar clipping).
  - [x] Fix any "White Screen" issues related to filesystem permissions or local paths.
- [x] **Task 10: Continuous Integration (CI/CD)**
  - [x] Set up GitHub Actions to automatically build the APK on every push to `main`.
  - [x] Fix TypeScript build errors in CI pipeline related to history management.

## 🧪 Phase 5: Final Polish & Production Release (In Progress)

_Goal: Ensure the project is bug-free and ready for the public._

- [x] **Performance Tuning (DaRipper and Gemini' "Bolt" Pattern)**
  - [x] Audit all Zustand selectors to ensure zero unnecessary re-renders.
  - [x] Optimize `xterm.js` rendering for lower-end mobile CPUs.
- [x] **History Management**
  - [x] Migrated manual history implementation to **Zundo** for robust Undo/Redo.
- [x] **Final Documentation Review**
  - [x] Update README.md with accurate system state.
  - [x] Add "Android Installation" guide to `USER_GUIDE.md`.
  - [x] Replace all "Placeholder" images in documentation with real screenshots (SVG placeholders added).
- [ ] **Launch**
  - [ ] Create official v1.0.0 Release on GitHub.
  - [ ] Upload the final `starship-command-enhanced.apk`.

## 🛠️ Phase 6: Future Backend & Community Integration (Completed)

_Goal: Enable advanced features like AI color extraction and theme sharing._

- [x] **Color Extraction Optimization**
  - [x] Ensure `colorthief` and `node-vibrant` work smoothly within the Android WebView.
  - [x] Stabilize the Flask backend for the "Stand-alone Executable" version.
- [x] **Community Features**
  - [x] Finalize SQLAlchemy schema for theme uploads.
  - [x] Implement "Download from Community" within the app.

---

_Last updated: 2026-04-26_
