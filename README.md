# Starship Command

A professional, web-based theme creator and visual editor for the [Starship](https://starship.rs) cross-shell prompt.

![Starship Command Preview](https://raw.githubusercontent.com/starship/starship/master/media/demo.gif) _(Placeholder for actual preview image)_

## 🚀 Features

- **Visual Module Configuration:** Edit modules like `directory`, `git_status`, `character`, and more through a clean, intuitive UI.
- **Live Terminal Preview:** Real-time preview of your prompt using `xterm.js`, supporting custom Nerd Fonts.
- **Smart Style Editor:** Easily manage colors and text attributes (bold, italic, etc.) using your theme's palette.
- **Preset Gallery:** Choose from 8+ professional presets to jumpstart your configuration.
- **TOML Import/Export:** Seamlessly import existing `starship.toml` files and export your creations.
- **Undo/Redo History:** Never lose a change with built-in state history management.
- **Image Palette Extraction:** Extract color palettes directly from images to create coordinated themes.
- **Community Sharing:** (Experimental) Upload and share your themes with the Starship Command community.

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **State Management:** Zustand
- **Preview Engine:** xterm.js, custom Starship format parser
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Testing:** Vitest, React Testing Library
- **Backend (Optional):** Flask, SQLAlchemy (for community sharing)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DaRipper91/Starship-Command.git
   cd Starship-Command
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`.

### Backend Setup (Community Features)

If you wish to use the community sharing features, you'll need Python 3 installed:

```bash
cd server
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python server.py
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Generate a coverage report:

```bash
npm run test:coverage
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

Made with ❤️ by [DaRipper91](https://github.com/DaRipper91)
