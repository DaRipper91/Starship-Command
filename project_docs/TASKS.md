# 📋 Project Tasks: Starship Command Enhanced

> **Focus:** Cross-platform (Web + Android APK) theme editor for Starship.

---

## 🛠️ Phase 1: Consolidation & Stabilization [COMPLETED]

- [x] Merge `Starship_Command_ENHANCED` into `Starship-Command-Enhanced`.
- [x] Synchronize missing components (`PresetSelector`) and tests from base repo.
- [x] Update unified `README.md` with APK goals and combined tech stack.
- [x] Resolve Dependabot security PRs (#12, #13, #14).
- [x] Fix TypeScript errors by migrating legacy `App_Alternative.tsx` to `.jsx`.
- [x] Clean up redundant branches and remote refs.

---

## 📱 Phase 2: Mobile & APK Optimization [COMPLETED]

_Tasks inherited from the DaRipper and Gemini (Google Automatus AI) handoff._

### 🚀 Critical Path

- [x] **Task 2: Rework Portrait Layout**
  - Switch to single-column on screens < 768px.
  - Move Live Preview/Config to a dedicated Tab.
  - Collapse header buttons into a mobile menu or bottom bar.
- [x] **Task 3: Fix Touch Targets**
  - Audit all buttons/chips to ensure ≥ 44px hit areas.
  - Increase padding for Tab bar and `ModuleChip`.
- [x] **Task 4: Touch-Friendly Reordering**
  - Replace HTML5 drag-and-drop with tap-based ↑/↓ arrow buttons.
  - Required because HTML5 DnD is unreliable in Android WebView.
- [x] **Task 5: Data Persistence**
  - Wire up `localStorage` for `savedThemes` and `currentTheme`.
  - Ensure app reopens exactly where the user left off.

### 🧪 Technical Refinement (DaRipper and Gemini' Mandates)

- [x] **State Optimization:** Use specific Zustand property selectors (Bolt pattern) to prevent mobile lag.
- [x] **Accessibility Audit:** Add `focus-visible` ring styles and ARIA labels for icon buttons.
- [x] **Semantic HTML:** Replace interactive `div` elements with proper `<button>` tags.

---

## 📦 Phase 3: APK Build & Deployment [COMPLETED]

- [x] **Task 8: Capacitor & Android Scaffold**
  - [x] Initialize Capacitor: `npx cap init`.
  - [x] Add Android platform: `npx cap add android`.
  - [x] Build first Debug APK: `./gradlew assembleDebug`.
- [x] **Verification:** Test APK on physical Pixel 9 device.
- [x] **CI/CD:** Automate APK builds via GitHub Actions.

---

## 🌟 Phase 4: Future Features [COMPLETED]

- [x] Community Theme Sharing (Flask/SQLAlchemy backend integration).
- [x] Local Nerd Font installation guide for Android/Termux.
- [x] Multi-resolution asset optimization for APK (Dark Pastel Edition).

---

## 🧪 Phase 5: Final Polish & Release Candidate [COMPLETED]

- [x] **Performance Tuning:** Implemented granular Zustand selectors (Bolt pattern).
- [x] **Branding Update:** Generated high-fidelity "Dark Pastel" icons and splash screens.
- [x] **Documentation Overhaul:** Generated the Master Handbook and unified README.
- [x] **Release Candidate:** v1.0-RC tagged and APK committed.

---

_Last updated: 2026-03-26_
