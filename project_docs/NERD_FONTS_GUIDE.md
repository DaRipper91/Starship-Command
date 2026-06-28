# 🐧 Starship Command: Nerd Fonts Installation Guide (Android/Termux)

To see the icons in your Starship prompt on Android, you need a **Nerd Font** installed in your terminal emulator (like Termux).

## 📥 Option 1: Automatic Script (Easiest)

Run this command inside your Termux terminal:

```bash
# Download and install the 'JetBrainsMono' Nerd Font automatically
curl -fLo $HOME/.termux/font.ttf --create-dirs \
https://github.com/ryanoasis/nerd-fonts/raw/master/patched-fonts/JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf

# Reload Termux settings
termux-reload-settings
```

## 📂 Option 2: Manual Installation (Any Font)

1.  **Download** your favorite Nerd Font `.ttf` file (e.g., _FiraCode_, _Hack_, or _Meslo_).
2.  **Move** the file to the following location in Termux:
    `~/.termux/font.ttf`
    _(Note: The file MUST be named exactly `font.ttf` and placed in the `.termux` folder)._
3.  **Run** the command:
    `termux-reload-settings`

## 🛠️ Verification

After installing, restart your Termux session. If you see icons instead of empty boxes (squares), the installation was successful!

### Common Issues:

- **Icons are too small:** Adjust your Termux font size (Pinch-to-zoom).
- **Icons are squares:** Ensure you downloaded a "Nerd Font" (patched), not the standard version of the font.
- **Starship not showing:** Ensure you've added `eval "$(starship init bash)"` to your `~/.bashrc`.
