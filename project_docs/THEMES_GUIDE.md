# 🎨 Starship Themes: Creating, Saving, and Sharing

**Starship Command Enhanced** allows you to design high-fidelity terminal themes with zero code. This guide covers the full lifecycle of a theme.

## 🛠️ Creating Your First Theme

1.  **Start with a Preset:** Open the **Gallery** and pick a preset (e.g., "Dracula" or "Clean") to use as a base.
2.  **Add Modules:** Use the **Module List** to add new elements like `git_status`, `battery`, or `kubernetes`.
3.  **Customize Style:** Click on a module to change its color, symbol, and format string.
4.  **Live Preview:** Watch the terminal at the bottom update in real-time as you make changes.

## 💾 Saving Your Work

### Local Save (Browser)
*   Click the **Save** button in the top toolbar.
*   This saves the theme to your browser's local storage.
*   You can access these later in the **Saved Themes** section of the Gallery.

### Exporting to TOML
*   Click the **Export/Import** icon.
*   Copy the generated TOML code.
*   To apply it to your actual shell, paste it into `~/.config/starship.toml`.

## 🌐 Sharing with the Community

Phase 6 introduces the **Community Gallery**, where you can publish your designs.

1.  **Authenticate:** Click the **Profile/Auth** icon and Log In or Register.
2.  **Upload:** Once logged in, click **Publish Theme** (Share icon).
3.  **Details:** Add a name, description, and category. 
4.  **Publish:** Your theme will now appear in the **Community Gallery** for all users to download and enjoy!

## 📥 Using Community Themes

1.  Open the **Gallery**.
2.  Scroll down to the **Community Gallery** section.
3.  Click on any theme card to load it into your editor.
4.  If you like it, click **Save** to keep a copy in your local collection.

## 🚀 Advanced: Remote Sync (SSH)

If you are using Starship Command on your phone but want to update the prompt on your laptop:
1.  Open the **Sync Settings**.
2.  Enter your laptop's **SSH IP, Username, and Password**.
3.  Click **Push to Remote**.
4.  The editor will automatically update `~/.config/starship.toml` on your remote machine!
