# 📖 Starship Command Enhanced: User Guide

Welcome to the ultimate, visual theme creator for the [Starship](https://starship.rs) shell prompt. Design your perfect prompt on your desktop or directly on your Android device!

## 🚀 Getting Started

### Web Editor (Desktop)

1.  **Open the Editor:** Access the web editor via your browser (default: `localhost:5173`).
2.  **Visual Configuration:** Drag and drop modules like `directory`, `git_branch`, and `character`.
3.  **Real-time Preview:** Watch your prompt update live in the integrated terminal.
4.  **Export:** Download your `starship.toml` and place it in `~/.config/starship.toml`.

### Native APK (Android)

The **Enhanced APK** brings the power of Starship Command to your pocket!

#### Installation Steps:

1.  **Download:** Grab the latest `starship-command-enhanced.apk` from the [GitHub Releases](https://github.com/DaRipper91/Starship-Command-Enhanced/releases) page.
2.  **Install:** Open the APK on your Android device. You may need to enable "Install from Unknown Sources" in your system settings.
3.  **Permissions:** Grant the necessary storage permissions if prompted, as the app needs to save your theme designs locally.

![Screenshot: Android Installation Process](assets/screenshots/android-install.png)

#### Exporting to Termux:

1.  **Design:** Create your perfect prompt in the mobile app.
2.  **Copy TOML:** Go to the **Export** tab and tap the **Copy to Clipboard** button.
3.  **Apply in Termux:**
    *   Open Termux.
    *   Run `nano ~/.config/starship.toml`.
    *   Paste your configuration and save (Ctrl+O, Enter, Ctrl+X).
4.  **Restart Shell:** Run `exec fish` or `exec bash` to see your new prompt!

![Screenshot: Exporting TOML to Termux](assets/screenshots/android-export.png)

## ✨ Key Features

### 🎨 Intelligent Styling

- **Color Palettes:** Use preset themes (Catppuccin, Nord, etc.) or create your own.
- **Image Extraction:** Upload a background image to automatically generate a matching color palette for your terminal.

![Screenshot: Color Extraction from Image](assets/screenshots/color-extraction.png)

### 🧩 Module Builder

- **Drag-and-Drop:** Easily reorder your prompt modules.
- **Module Settings:** Configure icons, styles, and truncation settings for each module individually.

### 🏗️ Advanced Export/Import

- **TOML Support:** Seamlessly import existing `starship.toml` files.
- **Community Themes:** Share your themes or browse the gallery for inspiration.

## 🛠️ Mobile Tips

- **Touch Targets:** All interactive elements are optimized for finger-tapping.
- **Responsive Layout:** The app switches to a single-column view on mobile for maximum visibility.
- **Nerd Font CDN:** Symbols and glyphs are rendered via our integrated CDN—no local font installation required for previews!

---

_Last Updated: 2026-03-26_
