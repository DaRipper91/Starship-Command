<div align="center">

# 🚀 STARSHIP COMMAND // UNIFIED ENGINE

> **PRIME DIRECTIVE:** VISUALIZE AND CONFIGURE.

[![Version](https://img.shields.io/badge/Version-2.0.0--beta-gold.svg?style=for-the-badge)](#)
[![Python](https://img.shields.io/badge/Python-3.14+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](#)
[![PySide6](https://img.shields.io/badge/PySide6-6.7+-green.svg?style=for-the-badge&logo=qt&logoColor=white)](#)
[![Platform](https://img.shields.io/badge/Platform-Asahi%20%7C%20Tensor-red.svg?style=for-the-badge)](#)

</div>

**Starship Command Unified** is the definitive, cross-platform visual theme editor for the [Starship](https://starship.rs) shell prompt. This repository has transitioned to a **Full Python Architecture**, combining the high-fidelity rendering of **Aether** with the surgical configuration logic of **Aura**.

This edition is heavily optimized for **Apple Silicon (ARM64)** running **Fedora Asahi Remix** and high-performance **Google Tensor** hardware.

---

## 🏗️ THE HYBRID ARCHITECTURE (Aura + Aether)

By merging the best of both worlds, Starship Command provides a native, hardware-accelerated experience that surpasses traditional web-based editors.

<div align="center">

| Component           | Stack                           | Provenance |
| :------------------ | :------------------------------ | :--------- |
| **Language**        | Python 3.14+ (Strictly Typed)   | **Aether** |
| **GUI Framework**   | PySide6 (Qt 6.7+)               | **Both**   |
| **Prompt Viewport** | High-Fidelity QPainter / Vector | **Aether** |
| **Config Logic**    | Pydantic / Async Daemon         | **Aura**   |
| **Terminal Output** | Rich / ANSI Engine              | **Aura**   |

</div>

---

## 🌟 KEY FEATURES

- **Vortex Viewport:** A custom Aether-style renderer that draws Powerline glyphs and separators as actual geometric shapes with sub-pixel precision. No more font-rendering gaps.
- **Sovereign Editor:** A clean, sidebar-driven "Interchange" UI for dragging, dropping, and configuring modules in real-time.
- **Image-to-Palette:** Automatically extract theme colors from your desktop wallpaper using Python's Pillow and ColorThief libraries.
- **Contrast Guard:** Real-time WCAG AA/AAA contrast checking to ensure your prompt remains readable in all lighting conditions.
- **Self-Healing Sync:** An asynchronous file observer watches your `starship.toml` and updates the UI instantly if external changes are detected.

---

## 🛠️ INSTALLATION & USAGE

### Prerequisites

- Python 3.14+
- PySide6 6.7+
- Nerd Fonts (Recommended: FiraCode Nerd Font)

### Running the Python Engine

```bash
# Clone the repository
git clone https://github.com/DaRipper91/Starship-Command.git
cd Starship-Command

# Launch the unified application
./starship-command-python.sh
```

---

## 📖 LEGACY SUPPORT

The original React + TypeScript frontend is still available in the `src/` directory and can be built for Web and Android (Capacitor) using the legacy build scripts. However, the **Python Engine** is now the primary target for all future feature development.

---

_Built for the community, optimized for the Tensor & Asahi hardware._
