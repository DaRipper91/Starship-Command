# 🚀 Starship Command Enhanced: Fedora Asahi Remix

**Starship Command Enhanced** is the definitive, cross-platform visual theme editor for the [Starship](https://starship.rs) shell prompt. 

This repository has been fully unified and modernized to provide a drag-and-drop, no-code editor that works flawlessly across the Web, Android devices, and Linux Desktop.

This specific edition has been heavily optimized for **Apple Silicon (ARM64)** running **Fedora Asahi Remix**, featuring hardware-accelerated terminal rendering and native binaries.

## 🌟 Key Features

*   **No-Code Visual Editor:** Drag and drop modules, pick colors visually, and construct complex format strings without touching a TOML file.
*   **Live Terminal Preview:** High-fidelity, real-time preview powered by `@xterm/xterm` (v6+).
*   **Image-to-Palette:** Upload an image or wallpaper to automatically extract a matching color palette using `node-vibrant`.
*   **Dynamic Themes:** Configure day/night themes that switch automatically based on the time of day.
*   **Asahi Linux Optimized:** The desktop Electron wrapper forces Mesa driver overrides and disables GPU sandboxing to run natively at 60fps+ on Apple Silicon (M1/M2/M3).
*   **Cross-Platform:** Available as a web app, a native Android APK (via Capacitor), and a Linux AppImage (x64 and ARM64).

## 🛠️ Platforms & Builds

### 1. Linux Desktop (Electron)
The desktop version provides the most integrated experience. It includes a local Python backend (Flask + SQLAlchemy) to handle local theme saving and advanced native extraction logic.

*   **Arch Linux:** Install via the included `PKGBUILD`.
*   **Fedora Asahi / AppImage:** Download the ARM64 AppImage from the [Releases](#) page.

### 2. Android (Capacitor)
A fully responsive, touch-optimized mobile experience.
*   Download the `app-debug.apk` from the [Releases](#) page.

### 3. Web
The frontend is built with React 18, Vite, and TailwindCSS. It can be hosted on any static site provider.

## 🚀 Development Quick Start

### Web Frontend
```bash
pnpm install
pnpm dev
```

### Linux Desktop (Electron)
```bash
# Install frontend and desktop dependencies
pnpm install
cd platforms/desktop
pnpm install

# Run the Electron app (Asahi/ARM64 Optimized)
MESA_LOADER_DRIVER_OVERRIDE=asahi pnpm exec electron main.js --no-sandbox --disable-gpu-sandbox
```

## 📖 Documentation
All developer guides, persona files, and historical milestones have been consolidated into the `project_docs/` directory. For a quick start on module creation or architecture, see `project_docs/MASTER_MANUAL.md`.

---
*Built for the community, optimized for the Tensor & Asahi hardware.*
