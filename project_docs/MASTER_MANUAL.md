# 🪐 Starship Command Enhanced: The Definitive Master Manual (v2.0)

> **"A visual engineering suite for the modern shell architect."**

---

## 📖 Introduction: The Vision
Starship Command Enhanced is not just a "theme editor." It is a cross-platform synchronization and engineering suite designed to bridge the gap between high-performance mobile devices (like the Pixel 9) and professional Linux environments. It allows for the visual design, validation, and instantaneous deployment of Starship configurations across any number of devices.

---

## 🏗️ PART 1: CORE SYSTEM ARCHITECTURE

### 1.1 The "Single Source of Truth" (ThemeEngine)
At the heart of the application lies the `ThemeEngine`. Unlike standard editors that treat the configuration as a simple string, our engine treats it as a **Live Typed Object**.
*   **Bidirectional Mapping:** The engine handles the complex transformation from raw TOML strings to TypeScript objects and back.
*   **Validation Layer:** Every change is validated against the Starship schema before being committed to state, preventing "broken prompt" syndrome.
*   **Parser Isolation:** By decoupling the parser from the React UI, we ensure that whether a change comes from a slider, a raw text edit, or an AI prompt, the resulting logic is consistent.

### 1.2 Global State Management (Zustand & Zundo)
The application uses a high-performance state tree managed by **Zustand**.
*   **The "Bolt" Pattern:** We use granular selectors to ensure that only the specific component needing an update re-renders. This ensures 60FPS performance even on mobile hardware while editing thousands of lines of TOML.
*   **Temporal History (Zundo):** A robust "Time-Travel" system. Every single state change is recorded in a temporal stack, allowing for infinite Undo/Redo.
*   **History Timeline UI:** A visual representation of this stack allows users to scrub through their creative process and jump to any point in time.

### 1.3 Offline-First Storage (SecureStorage)
We implemented a hybrid storage adapter that adapts to your platform:
*   **Native Android:** Uses encrypted `SharedPreferences` via the Capacitor Preferences API.
*   **Desktop/Web:** Uses **IndexedDB** (via `idb-keyval`), providing a massive storage quota compared to the legacy 5MB limit of `localStorage`.
*   **Persistence:** Your themes are saved automatically as you type, but the actual I/O is **debounced** to prevent battery drain and SSD thrashing.

---

## 📱 PART 2: CROSS-PLATFORM ENGINEERING

### 2.1 Native Android (Capacitor)
The Android version is a high-performance wrapper around our React core.
*   **Intent Injection:** We utilize the Android Intent system to bypass "Scoped Storage" restrictions. The "Termux Inject" button fires a `RUN_COMMAND` intent directly to the Termux app.
*   **Native Bridge:** Heavy operations (like image color extraction) are detected and intelligently routed to avoid WebView memory crashes.

### 2.2 Desktop GUI (Electron)
For users on Arch Linux, Windows, or macOS, we provide a native window experience.
*   **Process Isolation:** The GUI runs in an Electron process, while the Python backend runs as a sidecar background process.
*   **File System Access API:** On desktop, the "Save to File" feature opens a native OS dialog, allowing you to overwrite your actual `~/.config/starship.toml` directly.

### 2.3 Arch Linux Ecosystem (PKGBUILD)
We have provided a professional build recipe for Arch Linux.
*   **NATIVE INSTALL:** Any Arch user can clone the repo and run `makepkg -si`.
*   **SOP:** The package installs to `/usr/lib/`, places a launcher in `/usr/bin/`, and adds a `.desktop` entry to your Start Menu.


---

## 🎨 PART 3: VISUAL ENGINEERING

### 3.1 Massive Symbol Library (Virtualized)
The Symbol Browser supports over **5,000 glyphs** from the Nerd Font ecosystem.
*   **Virtualization Logic:** We use `@tanstack/react-virtual` to ensure only the visible rows of icons are in the DOM at any given time. This allows the app to scroll through thousands of items with 0ms lag.
*   **Categorization:** Symbols are divided into Powerline, Font Awesome, Devicons, and Material ranges for easy navigation.
*   **Font Subsetting:** During the build process, a Python script (`subset_fonts.py`) strips unused glyphs from the massive source TTFs, reducing the final APK/binary size while keeping every symbol used in your themes.

### 3.2 Terminal Preview Engine (xterm.js)
The preview pane is a pixel-perfect terminal emulator.
*   **Font Synchronization:** A custom hook awaits `document.fonts.ready` before rendering. This prevents "overlapping text" bugs common in other web-based terminal editors.
*   **Scenario Mocking:** Interactive toggles allow you to simulate complex Git states (e.g., being 3 commits ahead, having staged changes, and being on a specific branch) to see exactly how your `git_status` module will react.
*   **Multi-Shell Support:** Toggle between Bash, Fish, and Zsh rendering modes to verify compatibility with different shell syntax highlights.

### 3.3 Advanced Color Extraction
*   **Local extraction:** Uses Web Workers for parallel processing.
*   **Backend fallback:** On mobile, large images are offloaded to the Flask backend to perform native-speed extraction using `node-vibrant` and Python logic, preventing "White Screen" crashes.

---

## 🌐 PART 4: NETWORK & AI SERVICES

### 4.1 Cross-Device SSH Sync
This is our "Cloud-Killer" feature. You don't need a central server.
*   **Native Pushing:** Your phone acts as the client. When you hit "SSH Sync", the app establishes a secure connection to your target machine (Laptop, Server, Raspberry Pi).
*   **Direct Injection:** The server-side logic (`paramiko`) ensures the `starship.toml` is dropped precisely into `.config/`, creating the directory if it doesn't exist.

### 4.2 AI Palette Generator
*   **Semantic Theming:** Instead of picking hex codes, describe a vibe. 
*   **Logic:** The backend analyzes your text (e.g., "Cyberpunk", "Ocean", "Forest") and uses a themed seed generator to produce a cohesive palette mapping to all Starship variables (Success, Error, Primary, etc.).


---

## 🛠️ PART 5: STANDARD OPERATING PROCEDURES (SOP)

### 5.1 SOP: Deploying a New Theme to Desktop
1.  Open the app on your Phone.
2.  Select a preset or create a custom one using the **Visual Module Editor**.
3.  Navigate to the **Export** tab.
4.  Option A (**Apply to Host**): If you are running the server on your desktop, click this to update the desktop prompt instantly.
5.  Option B (**SSH Sync**): Enter your Desktop's IP and credentials to push the TOML remotely.

### 5.2 SOP: Injecting into Termux
1.  Ensure you have the latest **Starship Command Enhanced APK** installed.
2.  Open the app and finalize your design.
3.  Click the **Termux Inject** button.
4.  Wait for the Termux toast notification: "Starship Config Injected!".
5.  Restart your Termux session to see the new prompt.

### 5.3 SOP: Creating a Custom Module
1.  Open the **Modules** sidebar.
2.  Click **"New Module"**.
3.  Enter a name (e.g., `system_monitor`).
4.  The editor will switch to the **Custom Module Sandbox**.
5.  Define your raw shell command (e.g., `cat /proc/uptime`) and choose a style.

---

## 🧪 PART 6: DEVELOPER REFERENCE

### 6.1 Database Schema (SQLite)
The community backend uses SQLAlchemy.
*   **User Table:** Stores hashed passwords and usernames.
*   **Theme Table:** Stores TOML strings, metadata, and category associations.
*   **Downloads:** Tracks popularity for the "Solar System" feed.

### 6.2 The Build Pipeline (Automated)
Our CI/CD pipeline in `.github/workflows/android-build.yml` performs the following on every push:
1.  **Environment Sync:** Pulls Node.js v24 and Java 21.
2.  **Logic Build:** Compiles the TypeScript frontend.
3.  **Optimization:** Runs `python scripts/subset_fonts.py` to shrink assets.
4.  **Native Sync:** Executes `npx cap sync android` to refresh the native bridge.
5.  **Compilation:** Runs `./gradlew assembleDebug` to produce the APK.

### 6.3 Maintenance
*   **Updating Symbol Library:** Edit `src/data/nerd-font-symbols.ts`. The virtualizer will automatically scale to support any number of new additions.
*   **Adding Nerd Fonts:** Update `FontSelector.tsx` and ensure the source TTF is placed in `public/fonts/` for subsetting.

---

## 🤝 Conclusion
This Master Manual serves as the definitive guide for **DaRipper and Gemini's** Starship Command Enhanced. It is designed to be exhaustive, covering both the simple UI flows and the complex underlying architecture.

---
### Related Documentation
[[README]]
[[ROADMAP]]
[[DEVELOPER_GUIDE]]
