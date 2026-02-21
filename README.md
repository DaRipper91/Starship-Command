# Starship Theme Creator (Early Development)

> **Current Status:** Foundation Phase. Core logic libraries are implemented, but the UI is a skeleton.

A visual, no-code drag-and-drop editor for creating [Starship](https://starship.rs) shell prompt themes.

## 🚧 Project Status

This project is currently in the **Foundation Phase**. The backend logic for parsing, validating, and manipulating Starship configurations is implemented, but the interactive frontend components (Terminal Preview, Drag & Drop, Color Picker) are still being built.

### ✅ Implemented Features (Core Logic)

- **TOML Parser**: robust parsing/stringifying with `@iarna/toml` (`src/lib/toml-parser.ts`)
- **Theme Validation**: checks for syntax errors, color contrast issues, and performance bottlenecks (`src/lib/theme-validator.ts`)
- **Color Utilities**: comprehensive color manipulation (harmony generation, contrast checking) and image palette extraction (`src/lib/color-utils.ts`)
- **Format Parser**: logic to convert Starship format strings into ANSI codes for preview (`src/lib/format-parser.ts`)
- **State Management**: Zustand store with persistence (`src/stores/theme-store.ts`)
- **Suggestion Engine**: environment detection logic (`src/lib/suggestion-engine.ts`)

### 📅 Planned Features (Coming Soon)

- **Live Terminal Preview**: Real-time rendering of the prompt using xterm.js
- **Module Builder**: Drag-and-drop interface to reorder modules
- **Color Picker**: Visual color selection with presets
- **Image-to-Theme**: Upload an image to generate a matching theme automatically
- **Theme Gallery**: Browse and share community themes

## 🛠 Getting Started (Development)

Since the UI is minimal, these steps will get the development server running so you can inspect the logic or start building components.

### Prerequisites

- Node.js 18+
- npm (or pnpm)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/DaRipper91/Starship-Prompt-Theme-Creator.git
    cd Starship-Prompt-Theme-Creator
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to see the current skeleton app.

## 📚 Documentation & Roadmap

For detailed architectural specs and the implementation plan, see the `project_docs/` directory:

- [**Master Manual**](project_docs/master-manual.md): Comprehensive specification of the intended architecture.
- [**Roadmap**](project_docs/starship-theme-creator-roadmap.md): The phased development plan.
- [**Checkpoint Guide**](project_docs/checkpoint-guide.md): The step-by-step task list we are following.
- [**Current Status**](project_docs/CURRENT_STATUS.md): Detailed breakdown of what is done vs. what is left.

## 🤝 Contributing

We are currently following the [Step-by-Step Guide](project_docs/step-by-step-guide.md). If you'd like to contribute, please pick up from **Checkpoint 3 (Terminal Preview)** or **Checkpoint 5 (Module Management)**.

1.  Check the `project_docs/checkpoint-guide.md` to see the current active task.
2.  Implement the next component following the `master-manual.md` specs.
3.  Submit a PR!

## License

MIT
