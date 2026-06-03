# 🔤 Nerd Font Installation Guide for Android (Termux)

To get the most out of **Starship Command Enhanced**, you need a **Nerd Font** installed in your terminal. Without one, the icons and symbols in your prompt will appear as broken boxes (`[?]`).

## 📲 Option 1: The One-Line Install (Recommended)

Run this command inside Termux to automatically download and set up **JetBrainsMono Nerd Font**:

```bash
curl -fLo $HOME/.termux/font.ttf --create-dirs \
https://github.com/ryanoasis/nerd-fonts/raw/HEAD/patched-fonts/JetBrainsMono/Ligatures/Regular/JetBrainsMonoNerdFont-Regular.ttf && \
termux-reload-settings
```

## 🛠️ Option 2: Manual Installation (Custom Fonts)

If you want a different font (like FiraCode, Meslo, or Hack), follow these steps:

1.  **Browse Fonts:** Go to [Nerd Fonts Downloads](https://www.nerdfonts.com/font-downloads).
2.  **Download:** Download the `zip` file for your preferred font.
3.  **Extract:** Extract the `.ttf` or `.otf` file.
4.  **Rename:** Rename your chosen file to exactly `font.ttf`.
5.  **Move to Termux:** Move the file to the Termux configuration directory:
    *   If using a file manager: `/data/data/com.termux/files/home/.termux/font.ttf`
    *   Using terminal: `mv my-font.ttf ~/.termux/font.ttf`
6.  **Apply:** Run `termux-reload-settings`.

## 🧪 Verifying the Installation

After installing, run this command to see if the icons render correctly:

```bash
echo -e "\uf17a \uf113 \uf308 \ue718 \ue738 \uf10b"
```

If you see a **Windows icon, GitHub logo, Docker logo, Node.js logo, Java logo, and a Mobile phone**, your installation was successful!

## 💡 Troubleshooting

*   **Icons still broken?** Ensure you are using the **native Termux terminal**. Some 3rd-party keyboards or overlays may interfere with font rendering.
*   **Font looks weird?** Try a different font from the "Ligatures" or "Mono" variants. JetBrainsMono is generally the most stable for mobile screens.
*   **Using Termux-X11?** You may need to install the fonts in your XFCE environment as well:
    ```bash
mkdir -p ~/.local/share/fonts
cp ~/.termux/font.ttf ~/.local/share/fonts/
fc-cache -fv
    ```
