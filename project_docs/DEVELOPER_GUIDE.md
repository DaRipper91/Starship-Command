# 🛠️ Starship Command Enhanced: Developer Guide

Welcome to the definitive, cross-platform theme editor for the [Starship](https://starship.rs) prompt. This guide covers the unified architecture for the Web Editor and the Native APK version.

## 🏗️ Project Architecture

The project is built as a **Single Page Application (SPA)** with a **Hybrid Mobile** strategy:

1.  **Core Web App:** Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Zustand**.
2.  **Terminal Engine:** Uses **xterm.js** with a custom Starship format parser for real-time visual preview.
3.  **Backend (Optional):** A **Flask/Python** server for image color extraction and community theme sharing.
4.  **Mobile Bridge:** **Capacitor** wraps the web app into a native **Android APK** with access to Android native features.

## 📁 Repository Structure

- `src/` — Main TypeScript React application (Web + APK).
- `src/components/App_Alternative.jsx` — Legacy mobile-first logic preserved for reference.
- `server/` — Python Flask backend for color extraction.
- `project_docs/` — Comprehensive documentation and research reports.
- `capacitor.config.ts` — Configuration for the native Android APK build.

## 🚀 Development Workflow

### Prerequisites

- Node.js (v18+)
- Python (v3.10+) for backend features
- Android Studio (for APK building)

### Standard Web Development

```bash
npm install
npm run dev
```

### Mobile APK Development

```bash
# Build the web bundle
npm run build

# Synchronize with Android platform
npx cap sync

# Open in Android Studio to build APK
npx cap open android
```

## 🧪 Testing Standards

We use **Vitest** and **React Testing Library**. All new components must have corresponding tests.

```bash
npm test
```

## 🥒 Engineering Mandates (DaRipper and Gemini' Legacy)

- **Mobile First:** Ensure all touch targets are ≥ 44px.
- **State Efficiency:** Use Zustand property selectors to minimize re-renders on low-power mobile devices.
- **Accessibility:** Always include `focus-visible` ring styles and ARIA labels.

---

_Last Updated: 2026-03-26_
