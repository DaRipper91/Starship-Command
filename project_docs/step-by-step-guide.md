# Starship Theme Creator - Step-by-Step Implementation Guide

**Goal:** Build a complete Starship prompt theme creator web application
**Timeline:** 7-14 days (depending on pace)
**Tools:** Jules (Google AI), VS Code, Node.js, Git

---

## 📋 Pre-Flight Checklist

Before you start, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] VS Code or preferred code editor
- [ ] Git installed (optional but recommended)
- [ ] A modern browser (Chrome, Firefox, Edge)
- [ ] Access to Jules (Google AI bot)
- [ ] Downloaded the three reference documents:
  - starship-theme-creator-roadmap.md
  - starship-code-templates.md
  - jules-prompts.md

---

## DAY 1: Project Foundation

### Step 1: Initialize the Project

**📝 Prompt for Jules:**

```
I'm building a Starship prompt theme creator web app. This is a visual tool to create and customize Starship shell prompts without editing TOML files manually.

Please create a React + TypeScript + Vite project setup with:
- Tailwind CSS for styling
- xterm.js for terminal preview
- Zustand for state management
- @iarna/toml for TOML parsing
- react-colorful for color picking
- colord for color manipulation
- @dnd-kit/core and @dnd-kit/sortable for drag-and-drop
- node-vibrant for image color extraction

Give me the complete package.json with all dependencies, vite.config.ts, tailwind.config.js, and postcss.config.js files.

Also show me the folder structure I should create in the src directory.
```

**✅ What Jules will give you:**

- Complete package.json with all dependencies
- Configuration files (vite.config.ts, tailwind.config.js, postcss.config.js)
- Recommended folder structure

**💻 Your actions:**

1. Open your terminal
2. Navigate to where you want to create the project
3. Run these commands:
   ```bash
   npm create vite@latest starship-theme-creator -- --template react-ts
   cd starship-theme-creator
   ```
4. Replace the generated `package.json` with the one Jules provided
5. Create the configuration files Jules gave you
6. Install dependencies:
   ```bash
   npm install
   ```
7. Create the folder structure Jules recommended:
   ```bash
   mkdir -p src/components/ui
   mkdir -p src/components/ColorPicker
   mkdir -p src/components/IconBrowser
   mkdir -p src/components/ModuleBuilder
   mkdir -p src/components/TerminalPreview
   mkdir -p src/components/ThemeGallery
   mkdir -p src/lib
   mkdir -p src/stores
   mkdir -p src/types
   mkdir -p src/hooks
   ```

**🧪 Test it works:**

```bash
npm run dev
```

You should see a basic Vite React app at http://localhost:5173

**⏱️ Time:** 15 minutes

---

### Step 2: Create TypeScript Types

**📝 Prompt for Jules:**

```
Create comprehensive TypeScript types for Starship configuration in a file called starship.types.ts

Include detailed types for:
1. StarshipConfig (main configuration object)
2. All module configs including:
   - character (success_symbol, error_symbol, vim symbols)
   - directory (truncation, symbols, paths)
   - git_branch (symbol, truncation, remote)
   - git_status (all status symbols)
   - nodejs, python, rust, golang, java, php (language modules)
   - docker_context, kubernetes (container modules)
   - aws, gcloud, azure (cloud modules)
   - battery (threshold displays)
   - time (format options)
   - username, hostname, cmd_duration
   - package, memory_usage, env_var

3. ThemeMetadata interface (name, author, description, tags, dates, stats)
4. Theme interface (metadata + config)
5. ColorPalette interface

Make all module properties optional since users can configure any subset.
Reference the official Starship docs at https://starship.rs/config/ for accuracy.
```

**✅ What Jules will give you:**

- Complete TypeScript type definitions
- Proper interface hierarchy
- Well-documented types

**💻 Your actions:**

1. Create file: `src/types/starship.types.ts`
2. Copy the code Jules provides into this file
3. Save the file

**🧪 Test it works:**

```bash
npm run dev
```

Should compile without errors.

**⏱️ Time:** 10 minutes

---

### Step 3: Build the TOML Parser

**📝 Prompt for Jules:**

```
Create a comprehensive TOML parser utility class in toml-parser.ts that:

1. Parses TOML strings to StarshipConfig objects
2. Converts StarshipConfig objects back to TOML strings
3. Provides a getDefaultConfig() method with sensible Starship defaults
4. Validates configurations with a validate() method that checks:
   - Valid color formats (hex, rgb, named colors)
   - Required fields are present
   - No invalid module configurations
   - Returns object with {valid: boolean, errors: string[]}
5. Merges configurations with a merge() method (useful for applying presets)

Use the @iarna/toml library.
Import the StarshipConfig type from '../types/starship.types'.
Include proper error handling and helpful error messages.
Add JSDoc comments for each method.
```

**✅ What Jules will give you:**

- Complete TomlParser class with all methods
- Error handling
- Type-safe implementation

**💻 Your actions:**

1. Create file: `src/lib/toml-parser.ts`
2. Copy the code Jules provides
3. Save the file

**🧪 Test it works:**
Create a test file `src/test-parser.ts`:

```typescript
import { TomlParser } from './lib/toml-parser';

const config = TomlParser.getDefaultConfig();
console.log('Default config:', config);

const toml = TomlParser.stringify(config);
console.log('TOML output:', toml);

const parsed = TomlParser.parse(toml);
console.log('Parsed back:', parsed);
```

Run: `npm run dev` and check console - no errors should appear.

**⏱️ Time:** 15 minutes

---

### Step 4: Build Color Utilities

**📝 Prompt for Jules:**

```
Create a comprehensive color utility library in color-utils.ts that includes:

1. extractPaletteFromImage(imageFile: File): Promise<Record<string, string>>
   - Uses node-vibrant to extract dominant colors
   - Returns palette with keys: primary, secondary, accent, background, foreground, success, error, warning
   - Each value is a hex color string

2. generateComplementary(baseColor: string): string[]
   - Returns array of complementary colors (0°, 180°, 120°, 240° rotations)

3. generateAnalogous(baseColor: string): string[]
   - Returns analogous colors (-30°, 0°, +30°)

4. generateTriadic(baseColor: string): string[]
   - Returns triadic colors (0°, 120°, 240°)

5. checkContrast(foreground: string, background: string)
   - Returns {ratio: number, AA: boolean, AAA: boolean}
   - Uses WCAG contrast standards

6. toAnsiStyle(color: string, bold?: boolean, italic?: boolean): string
   - Converts to Starship style format like "bold red" or "italic #ff0000"

7. Static presets object with popular color schemes:
   - Nord
   - Dracula
   - Gruvbox Dark
   - Catppuccin Mocha
   - Tokyo Night

Use the colord library with a11y plugin for color manipulation.
Use node-vibrant for image palette extraction.
Export as a class called ColorUtils.
```

**✅ What Jules will give you:**

- Complete ColorUtils class
- All color manipulation methods
- Preset color schemes

**💻 Your actions:**

1. Create file: `src/lib/color-utils.ts`
2. Copy the code Jules provides
3. Save the file

**🧪 Test it works:**
Add to your test file:

```typescript
import { ColorUtils } from './lib/color-utils';

const complementary = ColorUtils.generateComplementary('#3b82f6');
console.log('Complementary colors:', complementary);

const contrast = ColorUtils.checkContrast('#ffffff', '#000000');
console.log('Contrast ratio:', contrast);

console.log('Presets:', Object.keys(ColorUtils.presets));
```

**⏱️ Time:** 15 minutes

---

### Step 5: Set Up State Management

**📝 Prompt for Jules:**

```
Create a Zustand store in theme-store.ts with localStorage persistence that manages:

State:
- currentTheme: Theme (the theme being edited)
- savedThemes: Theme[] (array of saved themes)

Actions:
- updateConfig(config: Partial<StarshipConfig>): void
  Updates current theme config, sets updated timestamp

- updateMetadata(metadata: Partial<ThemeMetadata>): void
  Updates current theme metadata

- loadTheme(theme: Theme): void
  Loads a theme for editing

- saveTheme(): void
  Saves current theme to savedThemes array
  Creates new ID if not exists, updates if exists

- deleteTheme(id: string): void
  Removes theme from savedThemes

- resetTheme(): void
  Resets to default configuration

- exportToml(): string
  Returns TOML string of current theme

- importToml(tomlString: string): void
  Parses TOML and loads as current theme

Use zustand with persist middleware.
Import types from '../types/starship.types'.
Import TomlParser from '../lib/toml-parser'.
Initialize with a default theme using TomlParser.getDefaultConfig().
```

**✅ What Jules will give you:**

- Complete Zustand store
- Persistence setup
- All CRUD operations

**💻 Your actions:**

1. Create file: `src/stores/theme-store.ts`
2. Copy the code Jules provides
3. Save the file

**🧪 Test it works:**
Add to App.tsx temporarily:

```typescript
import { useThemeStore } from './stores/theme-store';

function App() {
  const { currentTheme, updateConfig } = useThemeStore();

  console.log('Current theme:', currentTheme);

  return <div>Theme Creator</div>;
}
```

Check console - should see the default theme.

**⏱️ Time:** 15 minutes

**✅ END OF DAY 1 - You now have a solid foundation!**

---

## DAY 2: Terminal Preview (Most Important!)

### Step 6: Create Terminal Preview Component

**📝 Prompt for Jules:**

```
Create a terminal preview component in components/TerminalPreview/index.tsx that:

1. Uses xterm.js to render a terminal window
2. Uses FitAddon to properly size the terminal
3. Displays a macOS-style terminal window with:
   - Header bar with red/yellow/green traffic light buttons
   - Title showing "Terminal Preview"
   - Dark terminal background

4. Renders a mock shell prompt showing:
   - Username and hostname
   - Current directory path
   - Git branch indicator
   - Command prompt symbol
   - Multiple example lines showing different states

5. Re-renders when currentTheme changes (use useEffect)

6. Integrates with useThemeStore to get the current theme

For now, render a simple static prompt. We'll make it dynamic in the next step.

Import 'xterm/css/xterm.css' for styling.
Use Tailwind CSS for the window chrome.
Make the terminal container responsive (fill parent).
```

**✅ What Jules will give you:**

- Complete React component
- xterm.js integration
- Terminal window UI

**💻 Your actions:**

1. Create file: `src/components/TerminalPreview/index.tsx`
2. Copy the code Jules provides
3. Save the file

**🧪 Test it works:**
Update App.tsx:

```typescript
import { TerminalPreview } from './components/TerminalPreview';

function App() {
  return (
    <div className="h-screen w-screen p-8 bg-gray-100">
      <TerminalPreview />
    </div>
  );
}
```

You should see a terminal window with a basic prompt!

**⏱️ Time:** 20 minutes

---

### Step 7: Build Format String Parser

**📝 Prompt for Jules:**

```
Create a format string parser in lib/format-parser.ts that converts Starship format strings to rendered terminal text with ANSI escape codes.

The parser should handle:

1. Module variables like $directory, $git_branch, $nodejs, etc.
2. Style syntax like [$text](style) where style can be:
   - Colors: red, blue, #ff0000, rgb(255,0,0)
   - Modifiers: bold, italic, underline
   - Combined: "bold red", "italic #00ff00"
   - Background: bg:blue, bg:#ff0000

3. Literal text outside of brackets

4. Special characters and symbols

Create these functions:

parseFormatString(format: string, config: StarshipConfig): string
  - Main parser that converts format to ANSI-colored text
  - Returns string with ANSI escape codes

styleToAnsi(style: string): string
  - Converts style like "bold red" to ANSI codes
  - Returns the ANSI escape sequence

renderModule(moduleName: string, config: StarshipConfig): string
  - Renders a module like "directory" with its symbol and current value
  - Uses mock data (e.g., ~/projects/my-app for directory)
  - Returns styled text

Example usage:
const format = "[$directory](bold cyan) on [$git_branch](purple) ";
const rendered = parseFormatString(format, config);
// Should return: "\x1b[1;36m~/projects/my-app\x1b[0m on \x1b[35m main\x1b[0m "

Use ANSI escape codes for terminal colors.
Export all functions.
```

**✅ What Jules will give you:**

- Format string parser
- ANSI code converter
- Module renderer

**💻 Your actions:**

1. Create file: `src/lib/format-parser.ts`
2. Copy the code Jules provides
3. Save the file

**⏱️ Time:** 25 minutes

---

### Step 8: Integrate Parser with Terminal Preview

**📝 Prompt for Jules:**

```
Update the TerminalPreview component to use the format parser.

Changes needed:

1. Import parseFormatString from '../lib/format-parser'
2. Import useThemeStore to get currentTheme
3. In the renderPrompt function:
   - Get the format string from currentTheme.config.format
   - Use parseFormatString to convert it to ANSI text
   - Write the result to the terminal

4. Show multiple example scenarios:
   - Clean git repository
   - Repository with changes (show modified, staged, ahead/behind)
   - Different directory paths
   - Different language contexts (node, python, rust)

5. Add a demo mode that cycles through scenarios every 3 seconds

Make the preview realistic and showcase all the modules the user has enabled.

Provide the complete updated TerminalPreview component.
```

**✅ What Jules will give you:**

- Updated TerminalPreview component
- Format parsing integration
- Dynamic prompt rendering

**💻 Your actions:**

1. Replace the contents of `src/components/TerminalPreview/index.tsx`
2. Copy the updated code Jules provides
3. Save the file

**🧪 Test it works:**
The terminal should now show a properly formatted, colorful prompt!
Try changing colors in the store and watch it update.

**⏱️ Time:** 20 minutes

**✅ END OF DAY 2 - You have a working terminal preview!**

---

## DAY 3: Configuration UI

### Step 9: Create Main App Layout

**📝 Prompt for Jules:**

```
Create the main application layout in App.tsx with a three-column design:

Layout structure:
1. Header (full width, sticky):
   - Logo/title "Starship Theme Creator"
   - Theme name input (editable)
   - Action buttons: New, Save, Export, Import
   - Style: white background, border bottom, shadow

2. Main content (three columns):

   LEFT SIDEBAR (320px, scrollable):
   - "Modules" section with module list
   - "Colors" section
   - "Settings" section

   CENTER (flex-1):
   - TerminalPreview component (large, full height)

   RIGHT SIDEBAR (320px, scrollable):
   - "Module Configuration" section
   - Shows settings for selected module
   - Empty state: "Select a module to configure"

3. Responsive design:
   - On mobile: stack vertically
   - On tablet: two columns (combine left + right)
   - On desktop: three columns

Use Tailwind CSS for all styling.
Import TerminalPreview component.
Import useThemeStore for state.
Add placeholder content for the sidebars (we'll fill these in next).

Make it clean, modern, and professional looking.
```

**✅ What Jules will give you:**

- Complete app layout
- Three-column design
- Responsive structure
- Header with controls

**💻 Your actions:**

1. Replace `src/App.tsx` with Jules' code
2. Save the file

**🧪 Test it works:**
You should see a complete layout with the terminal in the center!

**⏱️ Time:** 25 minutes

---

### Step 10: Build Module Builder Component

**📝 Prompt for Jules:**

```
Create a ModuleBuilder component in components/ModuleBuilder/index.tsx that allows users to:

1. See a list of all available Starship modules
2. Drag and drop to reorder modules
3. Toggle modules on/off with checkboxes
4. Click "Configure" to edit module settings

Features:
- Use @dnd-kit for drag and drop
- Modules include: character, directory, git_branch, git_status, git_state, nodejs, python, rust, golang, java, php, docker_context, kubernetes, aws, gcloud, azure, battery, time, username, hostname, cmd_duration, package, memory_usage, env_var, line_break
- Show drag handle (☰) for reordering
- Update the format string when modules are reordered or toggled
- Integrate with useThemeStore
- Display enabled modules at top, disabled at bottom
- Each module item should show:
  - Drag handle
  - Checkbox (enabled/disabled)
  - Module name (monospace font)
  - Configure button

Styling:
- Use cards for each module
- Green background for enabled, gray for disabled
- Smooth transitions
- Clear visual feedback

Export as ModuleBuilder component.
```

**✅ What Jules will give you:**

- Complete ModuleBuilder component
- Drag and drop functionality
- Module toggle system
- Visual feedback

**💻 Your actions:**

1. Create file: `src/components/ModuleBuilder/index.tsx`
2. Copy the code Jules provides
3. Import and add to App.tsx left sidebar:

   ```tsx
   import { ModuleBuilder } from './components/ModuleBuilder';

   // In left sidebar:
   <section className="p-4">
     <h2 className="mb-3 font-semibold">Modules</h2>
     <ModuleBuilder />
   </section>;
   ```

4. Save all files

**🧪 Test it works:**

- Drag modules to reorder them
- Toggle checkboxes on/off
- Watch the terminal preview update!

**⏱️ Time:** 30 minutes

---

### Step 11: Create Color Picker Component

**📝 Prompt for Jules:**

```
Create a ColorPicker component in components/ColorPicker/index.tsx that:

1. Props:
   - color: string (current color)
   - onChange: (color: string) => void
   - label?: string (optional label)
   - showPalettes?: boolean (show preset palettes tab)

2. UI Features:
   - Button showing current color swatch and hex value
   - Dropdown that opens on click
   - Two tabs: "Picker" and "Palettes"

3. Picker Tab:
   - HexColorPicker from react-colorful
   - Shows current color
   - Input field to type hex values
   - "Color Suggestions" section showing:
     - Complementary colors
     - Analogous colors
     - All clickable to apply

4. Palettes Tab:
   - List all presets from ColorUtils
   - Show all colors in each palette
   - Click any color to apply it
   - Palette names: Nord, Dracula, Gruvbox, Catppuccin, Tokyo Night

5. Accessibility:
   - Show contrast ratio if background color prop provided
   - Warning if contrast is poor (< 4.5:1)

Use Tailwind for styling.
Import ColorUtils from lib/color-utils.
Make the dropdown close when clicking outside.
Add smooth transitions.

Export as ColorPicker component.
```

**✅ What Jules will give you:**

- Complete ColorPicker component
- Preset palettes integration
- Color suggestions
- Accessibility features

**💻 Your actions:**

1. Create file: `src/components/ColorPicker/index.tsx`
2. Copy the code Jules provides
3. Test by adding to App.tsx temporarily:

   ```tsx
   import { ColorPicker } from './components/ColorPicker';

   const [testColor, setTestColor] = useState('#3b82f6');

   <ColorPicker
     color={testColor}
     onChange={setTestColor}
     label="Test Color"
     showPalettes={true}
   />;
   ```

4. Save the file

**🧪 Test it works:**

- Click the color swatch
- Try the color picker
- Switch to palettes tab
- Apply different colors

**⏱️ Time:** 25 minutes

---

### Step 12: Create Image to Palette Component

**📝 Prompt for Jules:**

```
Create an ImagePalette component in components/ImagePalette/index.tsx that:

1. Allows users to upload an image file
2. Shows image preview
3. Extracts a color palette from the image
4. Displays the extracted colors with names
5. Applies the palette to the theme

Features:
- File input accepting image/* files
- Image preview (max height 200px)
- Loading state while extracting colors
- Display extracted palette with color swatches and hex values
- Color names: Primary, Secondary, Accent, Background, Foreground, Success, Error, Warning
- "Apply Palette to Theme" button

Implementation:
- Use ColorUtils.extractPaletteFromImage()
- Update theme config with extracted colors
- Map palette colors to appropriate module styles
- Show before/after comparison

Apply colors intelligently:
- Background → terminal background
- Foreground → default text color
- Primary → directory color
- Secondary → username/hostname
- Accent → git branch
- Success → git clean state
- Error → error symbols
- Warning → battery warning

Styling:
- Clean card design
- Grid layout for palette colors
- Nice hover states
- Tailwind CSS

Export as ImagePalette component.
```

**✅ What Jules will give you:**

- Complete ImagePalette component
- Color extraction integration
- Smart color mapping
- Clean UI

**💻 Your actions:**

1. Create file: `src/components/ImagePalette/index.tsx`
2. Copy the code Jules provides
3. Add to App.tsx left sidebar in Colors section:

   ```tsx
   import { ImagePalette } from './components/ImagePalette';

   <section className="p-4">
     <h2 className="mb-3 font-semibold">Color from Image</h2>
     <ImagePalette />
   </section>;
   ```

4. Save all files

**🧪 Test it works:**

- Upload an image (try a colorful photo or screenshot)
- Watch colors being extracted
- Click "Apply Palette"
- See your theme change colors!

**⏱️ Time:** 25 minutes

**✅ END OF DAY 3 - You can now configure modules and colors!**

---

## DAY 4: Module Configuration

### Step 13: Create Module Config Panel

**📝 Prompt for Jules:**

```
Create a ModuleConfigPanel component in components/ModuleConfigPanel/index.tsx that shows configuration options for individual modules.

The component should:

1. Accept props:
   - moduleName: string (e.g., "directory", "git_branch")
   - config: ModuleConfig (current module configuration)
   - onChange: (config: ModuleConfig) => void

2. Render different inputs based on module type:

For ALL modules:
- Symbol input (text field with icon preview)
- Style input (ColorPicker)
- Format string (text area with syntax help)
- Disabled toggle

For DIRECTORY module specifically:
- truncation_length (number slider 0-10)
- truncate_to_repo (checkbox)
- fish_style_pwd_dir_length (number input)
- home_symbol (text input)
- read_only symbol (text input)

For GIT_BRANCH module:
- always_show_remote (checkbox)
- truncation_length (slider)
- truncation_symbol (text input)
- only_attached (checkbox)

For GIT_STATUS module:
- Symbol inputs for each state:
  - conflicted, ahead, behind, diverged
  - untracked, stashed, modified
  - staged, renamed, deleted

For CHARACTER module:
- success_symbol (text input with preview)
- error_symbol (text input with preview)
- Various vim mode symbols

For BATTERY module:
- Display thresholds (array of threshold/style pairs)
- Symbols for each state

3. Show live preview of the module output

4. Use a nice form layout with:
   - Section headers
   - Input labels
   - Help text for complex options
   - Reset to default button

Styling:
- Tailwind CSS
- Clean form design
- Good spacing
- Clear visual hierarchy

Export as ModuleConfigPanel component.
```

**✅ What Jules will give you:**

- Complete module configuration panel
- Type-specific inputs
- Live preview
- Reset functionality

**💻 Your actions:**

1. Create file: `src/components/ModuleConfigPanel/index.tsx`
2. Copy the code Jules provides
3. Add state to App.tsx to track selected module
4. Show ModuleConfigPanel in right sidebar when a module is selected
5. Save files

**🧪 Test it works:**

- Click "Configure" on a module in the ModuleBuilder
- Right sidebar should show config options
- Change values and watch terminal update

**⏱️ Time:** 35 minutes

---

### Step 14: Create Icon Browser

**📝 Prompt for Jules:**

```
Create an IconBrowser component in components/IconBrowser/index.tsx that helps users find and select Nerd Font symbols.

Features:

1. Props:
   - onSelect: (symbol: string) => void
   - currentSymbol?: string (highlight currently selected)

2. UI Layout:
   - Modal or drawer that can be opened
   - Search bar at top
   - Category tabs: All, Arrows, Git, Languages, Files, Misc
   - Grid of icons with unicode characters
   - Each icon shows:
     - The symbol (large)
     - Unicode value
     - Name/description

3. Popular symbols to include:

Arrows:
- → ⇒ ⟶ ➔ ➜ ➡ ⇥ ⇾ ⟹
- ← ⇐ ⟵ ← ⇦ ⇤ ⬅
- ↑ ⇑ ↓ ⇓

Git:
-  (branch)
-  (commit)
-  (merge)
-  (repo)

Languages:
-  (JavaScript)
-  (Python)
-  (Rust)
-  (Go)
-  (Java)
-  (PHP)
-  (Ruby)
-  (Node)

Files/Folders:
-
-

Cloud:
-  (AWS)
-  (Azure)
-  (GCP)

Containers:
-  (Docker)
- ☸ (Kubernetes)

Other:
- ⚡ ✓ ✗ ● ○ ◆ ★

4. Search functionality:
   - Filter by symbol name
   - Case insensitive
   - Instant results

5. Click to select:
   - Clicking a symbol calls onSelect()
   - Shows checkmark on selected symbol
   - Closes modal/drawer

Styling:
- Professional design
- Grid layout (6-8 columns)
- Hover effects
- Search bar with icon
- Tailwind CSS

Export as IconBrowser component and a useIconBrowser hook to control open/close state.
```

**✅ What Jules will give you:**

- Complete IconBrowser component
- Symbol categories
- Search functionality
- Selection handler

**💻 Your actions:**

1. Create file: `src/components/IconBrowser/index.tsx`
2. Copy the code Jules provides
3. Integrate with ModuleConfigPanel for symbol inputs
4. Save files

**🧪 Test it works:**

- Open icon browser from a symbol input
- Search for symbols
- Click to select
- Symbol should appear in the input

**⏱️ Time:** 30 minutes

**✅ END OF DAY 4 - Full module configuration is working!**

---

## DAY 5: Export, Import, and Presets

### Step 15: Create Export/Import Component

**📝 Prompt for Jules:**

```
Create an ExportImport component in components/ExportImport/index.tsx that provides multiple ways to export and import themes.

Export Options:

1. Download .toml file
   - Button: "Download starship.toml"
   - Uses FileSaver.js or manual blob download
   - Filename: starship.toml

2. Copy to Clipboard
   - Button: "Copy TOML"
   - Copies TOML string to clipboard
   - Show success toast/notification

3. Share via URL
   - Button: "Share Link"
   - Encodes theme as base64 in URL parameter
   - Copies share URL to clipboard
   - Format: https://app.com/theme?data=base64string

4. Generate Install Script
   - Button: "Get Install Command"
   - Shows bash/zsh commands to install theme
   - Includes:
     - Where to save the file
     - How to backup existing config
     - How to reload shell

5. Preview TOML
   - Code editor showing the TOML output
   - Syntax highlighting (use Monaco or CodeMirror lite)
   - Read-only

Import Options:

1. Upload .toml file
   - File input button
   - Parses and loads theme
   - Validates before loading
   - Shows errors if invalid

2. Paste from clipboard
   - Textarea to paste TOML
   - "Import" button
   - Validates and loads

3. Import from URL
   - Text input for URL
   - Fetches and parses
   - Loads theme

4. Import from GitHub Gist
   - Text input for Gist URL
   - Fetches raw content
   - Loads theme

Features:
- Show confirmation before overwriting current theme
- Validate imported TOML
- Show helpful error messages
- Progress indicators for async operations

Layout:
- Two sections: Export | Import
- Tabbed interface or accordion
- Clear buttons with icons
- Help text for each option

Styling:
- Tailwind CSS
- Clean, organized layout
- Icons from lucide-react

Export as ExportImport component.
```

**✅ What Jules will give you:**

- Complete ExportImport component
- All export methods
- All import methods
- Validation

**💻 Your actions:**

1. Create file: `src/components/ExportImport/index.tsx`
2. Copy the code Jules provides
3. Add to App.tsx (perhaps in a modal or dedicated section)
4. Save files

**🧪 Test it works:**

- Download a .toml file
- Copy to clipboard
- Upload the file back
- Verify it loads correctly

**⏱️ Time:** 30 minutes

---

### Step 16: Create Preset Gallery

**📝 Prompt for Jules:**

```
Create a ThemeGallery component in components/ThemeGallery/index.tsx that shows saved and preset themes.

Features:

1. Display modes:
   - Grid view (default)
   - List view
   - Toggle button to switch

2. Theme cards showing:
   - Theme name
   - Author
   - Description (truncated)
   - Preview thumbnail (mini terminal screenshot)
   - Tags
   - Last updated date
   - Action buttons:
     - Load (for editing)
     - Duplicate
     - Export
     - Delete (with confirmation)

3. Filters:
   - Search by name/description
   - Filter by tags
   - Sort by: Name, Date, Popularity

4. Tabs:
   - My Themes (saved by user)
   - Presets (built-in themes)
   - Community (if backend exists)

5. Built-in preset themes:

Minimal:
- Name: "Clean"
  Just directory, git, and character

- Name: "One Line"
  All on one line, compact

Developer:
- Name: "Full Stack"
  All language modules

- Name: "DevOps Pro"
  Cloud, Docker, K8s focus

Aesthetic:
- Name: "Nord"
  Nord color scheme

- Name: "Dracula"
  Dracula colors

- Name: "Gruvbox"
  Gruvbox theme

- Name: "Tokyo Night"
  Tokyo Night colors

Each preset should be a complete, working theme configuration.

6. Create thumbnail:
   - Render prompt to canvas
   - Convert to base64 image
   - Store with theme metadata

Layout:
- Header with search and filters
- Grid/list of theme cards
- Empty state when no themes match
- Loading state

Styling:
- Modern card design
- Hover effects
- Smooth transitions
- Tailwind CSS

Export as ThemeGallery component.
```

**✅ What Jules will give you:**

- Complete ThemeGallery component
- Built-in presets
- Search/filter functionality
- Card and list views

**💻 Your actions:**

1. Create file: `src/components/ThemeGallery/index.tsx`
2. Create file: `src/lib/presets.ts` with preset theme definitions
3. Copy the code Jules provides
4. Add gallery to app (maybe in a modal or dedicated page)
5. Save files

**🧪 Test it works:**

- View preset themes
- Search and filter
- Load a preset theme
- Save your own theme

**⏱️ Time:** 35 minutes

---

### Step 17: Create Theme Validator

**📝 Prompt for Jules:**

````
Create a theme validator in lib/theme-validator.ts that checks themes for issues.

The validator should check:

1. Configuration Validity:
   - Valid TOML syntax
   - Valid color formats (hex, rgb, named)
   - No unknown module names
   - Required fields present
   - Boolean values are actual booleans
   - Numbers are in valid ranges

2. Visual Issues:
   - Color contrast (warn if text hard to read)
   - Missing symbols (warn if using symbols without Nerd Fonts)
   - Duplicate modules in format string
   - Empty format string

3. Performance:
   - Too many modules enabled (>15 modules warning)
   - Expensive modules enabled (git_status, kubernetes)
   - Estimate render time

4. Compatibility:
   - Shell-specific features
   - OS-specific symbols
   - Terminal emulator requirements

Return a validation result object:
```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];   // Critical issues
  warnings: ValidationIssue[]; // Non-critical issues
  suggestions: string[];       // Improvement suggestions
  estimatedRenderTime: number; // In milliseconds
}

interface ValidationIssue {
  type: 'config' | 'visual' | 'performance' | 'compatibility';
  severity: 'error' | 'warning';
  message: string;
  fix?: string; // Suggested fix
  module?: string; // Which module has the issue
}
````

Functions:

- validateTheme(theme: Theme): ValidationResult
- validateConfig(config: StarshipConfig): ValidationResult
- checkColorContrast(config: StarshipConfig): ValidationIssue[]
- estimateRenderTime(config: StarshipConfig): number

Export as ThemeValidator class.

```

**✅ What Jules will give you:**
- Complete theme validator
- Comprehensive checks
- Helpful error messages
- Performance estimation

**💻 Your actions:**
1. Create file: `src/lib/theme-validator.ts`
2. Copy the code Jules provides
3. Create a ValidationPanel component to display results
4. Add validation check before export
5. Save files

**🧪 Test it works:**
- Validate current theme
- Create intentional errors and see warnings
- Check performance estimation

**⏱️ Time:** 25 minutes

**✅ END OF DAY 5 - Export/import and presets are done!**

---

## DAY 6: Advanced Features

### Step 18: Create Comparison View

**📝 Prompt for Jules:**
```

Create a ComparisonView component in components/ComparisonView/index.tsx that shows before/after theme comparison.

Features:

1. Side-by-side terminal previews:
   - Left: "Before" / Theme A
   - Right: "After" / Theme B
   - Split view (50/50)

2. Controls:
   - Select themes to compare from dropdown
   - Swap themes button
   - Export comparison as image
   - Share comparison URL

3. Diff highlighting:
   - Show what changed between themes
   - Highlight differences in config
   - Color-code: added (green), removed (red), changed (yellow)

4. Statistics:
   - Modules added/removed
   - Colors changed
   - Performance difference

5. Export options:
   - Screenshot of both terminals
   - Side-by-side PNG
   - Config diff as markdown

Implementation:

- Use two TerminalPreview instances
- Diff library for config comparison
- html2canvas for screenshot export
- Tailwind for layout

Layout:

- Header with controls
- Two terminals side by side
- Diff panel below (collapsible)
- Export buttons

Export as ComparisonView component.

````

**✅ What Jules will give you:**
- Comparison view component
- Diff highlighting
- Export functionality

**💻 Your actions:**
1. Create file: `src/components/ComparisonView/index.tsx`
2. Install additional dependencies if needed:
   ```bash
   npm install html2canvas diff
````

3. Copy the code Jules provides
4. Add to app (modal or dedicated route)
5. Save files

**🧪 Test it works:**

- Select two themes
- View differences
- Export comparison image

**⏱️ Time:** 30 minutes

---

### Step 19: Create Suggestion Engine

**📝 Prompt for Jules:**

````
Create a suggestion engine in lib/suggestion-engine.ts that provides intelligent recommendations.

The engine should:

1. Detect user environment:
```typescript
interface Environment {
  os: 'windows' | 'macos' | 'linux' | 'unknown';
  shell: 'bash' | 'zsh' | 'fish' | 'pwsh' | 'unknown';
  terminal: string;
  hasNerdFont: boolean;
  installedTools: string[]; // git, docker, node, etc.
}
````

2. Suggest relevant modules:
   - If git detected → enable git_branch, git_status
   - If node detected → enable nodejs, package
   - If docker detected → enable docker_context
   - If in AWS env → enable aws module

3. Suggest optimizations:
   - Disable unused modules
   - Use simpler symbols if no Nerd Fonts
   - Reduce modules for slow terminals
   - Suggest format string improvements

4. Suggest color schemes:
   - Match terminal color scheme
   - High contrast for accessibility
   - Color blind friendly options

5. Provide contextual help:
   - Tips based on current config
   - Common mistakes to avoid
   - Best practices

Functions:

- detectEnvironment(): Promise<Environment>
- suggestModules(env: Environment): string[]
- suggestOptimizations(config: StarshipConfig, env: Environment): Suggestion[]
- suggestColorScheme(env: Environment): ColorPalette[]

```typescript
interface Suggestion {
  type: 'module' | 'performance' | 'visual' | 'compatibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: () => void; // Auto-apply function
}
```

Export as SuggestionEngine class.

```

**✅ What Jules will give you:**
- Environment detection
- Smart suggestions
- Auto-apply actions

**💻 Your actions:**
1. Create file: `src/lib/suggestion-engine.ts`
2. Create a SuggestionPanel component to show suggestions
3. Copy the code Jules provides
4. Add to app sidebar
5. Save files

**🧪 Test it works:**
- View suggestions
- Apply a suggestion
- See theme update

**⏱️ Time:** 25 minutes

---

### Step 20: Create Welcome Wizard

**📝 Prompt for Jules:**
```

Create a WelcomeWizard component in components/WelcomeWizard/index.tsx that guides new users through setup.

Multi-step wizard:

Step 1: Welcome

- Brief intro to Starship
- "What is this tool?"
- Quick video/GIF demo
- "Get Started" button

Step 2: Choose Starting Point

- Start from scratch
- Use a preset theme
- Import existing config
- Grid of preset previews

Step 3: Detect Environment

- Run environment detection
- Show detected tools
- Suggest modules to enable
- Checkboxes to confirm

Step 4: Choose Colors

- Quick color scheme picker
- Show preset palettes
- Option to upload image
- Live preview

Step 5: Customize

- "You're all set!"
- Link to full editor
- Tips for customization
- Export button

Features:

- Progress indicator (1/5, 2/5, etc.)
- Back/Next buttons
- Skip wizard option
- Save progress
- Don't show again checkbox

Implementation:

- Multi-step form
- State management for wizard progress
- Integration with store
- Smooth transitions

Styling:

- Modern wizard UI
- Large, clear steps
- Helpful illustrations
- Tailwind CSS

Export as WelcomeWizard component.

Also create a hook: useWizardState to manage wizard progress.

```

**✅ What Jules will give you:**
- Complete wizard component
- Step management
- Environment detection integration

**💻 Your actions:**
1. Create file: `src/components/WelcomeWizard/index.tsx`
2. Copy the code Jules provides
3. Show wizard on first visit (check localStorage)
4. Save files

**🧪 Test it works:**
- Clear localStorage to trigger wizard
- Go through all steps
- Create a theme from the wizard

**⏱️ Time:** 35 minutes

**✅ END OF DAY 6 - Advanced features complete!**

---

## DAY 7: Polish & Final Touches

### Step 21: Add Error Handling & Loading States

**📝 Prompt for Jules:**
```

Add comprehensive error handling and loading states throughout the app.

Create these components:

1. ErrorBoundary (src/components/ErrorBoundary.tsx):
   - Catches React errors
   - Shows friendly error page
   - Reset button
   - Error reporting option

2. LoadingSpinner (src/components/LoadingSpinner.tsx):
   - Reusable loading indicator
   - Sizes: sm, md, lg
   - Optional text label

3. Toast notification system (src/components/Toast.tsx):
   - Success, error, warning, info types
   - Auto-dismiss
   - Stacks multiple toasts
   - Swipe to dismiss

4. useToast hook (src/hooks/useToast.ts):
   - toast.success(message)
   - toast.error(message)
   - toast.warning(message)
   - toast.info(message)

5. Error handling for:
   - TOML parsing failures
   - Image upload errors
   - Network errors (future API)
   - Validation failures
   - File system errors

Add loading states for:

- Initial app load
- Theme loading
- Image processing
- TOML import
- File downloads

Use toast notifications for:

- Theme saved
- Copied to clipboard
- Export successful
- Import successful
- Validation errors

Update all components to use these utilities.
Provide updated versions of key components with error handling.

```

**✅ What Jules will give you:**
- Error boundary component
- Loading states
- Toast system
- Updated components with error handling

**💻 Your actions:**
1. Create the error handling components
2. Create the toast system
3. Wrap App in ErrorBoundary
4. Add loading states to async operations
5. Replace alert() calls with toast notifications
6. Save all files

**🧪 Test it works:**
- Trigger an error (invalid TOML)
- See error toast
- Test loading states
- Verify error boundary catches errors

**⏱️ Time:** 30 minutes

---

### Step 22: Add Keyboard Shortcuts

**📝 Prompt for Jules:**
```

Add keyboard shortcut support throughout the app.

Create useKeyboardShortcuts hook (src/hooks/useKeyboardShortcuts.ts):

Shortcuts to implement:

- Cmd/Ctrl + S: Save theme
- Cmd/Ctrl + E: Export TOML
- Cmd/Ctrl + I: Import (open import modal)
- Cmd/Ctrl + N: New theme
- Cmd/Ctrl + O: Open theme gallery
- Cmd/Ctrl + D: Duplicate current theme
- Cmd/Ctrl + /: Open keyboard shortcuts help
- Cmd/Ctrl + K: Open command palette
- Escape: Close modals/dropdowns

Navigation shortcuts:

- Tab: Move between inputs
- Arrow keys: Navigate module list
- Enter: Open selected module config
- Space: Toggle selected module

Also create:

1. CommandPalette component (src/components/CommandPalette.tsx):
   - Cmd/Ctrl + K to open
   - Searchable list of all actions
   - Keyboard hints for each action
   - Fuzzy search
   - Recently used actions at top

2. KeyboardShortcutsHelp component (src/components/KeyboardShortcutsHelp.tsx):
   - Modal showing all shortcuts
   - Organized by category
   - Visual keyboard keys
   - Searchable

Implementation:

- Listen for keyboard events
- Handle Cmd on Mac, Ctrl on Windows/Linux
- Prevent default browser shortcuts
- Show visual feedback
- Accessibility support

Export hooks and components.

```

**✅ What Jules will give you:**
- Keyboard shortcuts hook
- Command palette
- Shortcuts help modal

**💻 Your actions:**
1. Create keyboard shortcuts hook
2. Create CommandPalette component
3. Create KeyboardShortcutsHelp component
4. Integrate into App.tsx
5. Save files

**🧪 Test it works:**
- Try Cmd/Ctrl + S to save
- Open command palette with Cmd/Ctrl + K
- View shortcuts help with Cmd/Ctrl + /
- Navigate with keyboard

**⏱️ Time:** 25 minutes

---

### Step 23: Accessibility Improvements

**📝 Prompt for Jules:**
```

Improve accessibility throughout the app.

Make these changes:

1. ARIA labels and roles:
   - All buttons have aria-label
   - Form inputs have aria-labelledby
   - Modals have aria-modal
   - Live regions for dynamic content

2. Keyboard navigation:
   - All interactive elements focusable
   - Logical tab order
   - Focus indicators (visible outline)
   - Skip to content link

3. Screen reader support:
   - Descriptive labels
   - Status announcements
   - Error announcements
   - Loading state announcements

4. Visual accessibility:
   - High contrast mode support
   - Respects prefers-reduced-motion
   - Respects prefers-color-scheme
   - Minimum 4.5:1 contrast ratios
   - Focus indicators

5. Form accessibility:
   - Labels for all inputs
   - Error messages associated with inputs
   - Helper text
   - Required field indicators

Create:

1. AccessibilityProvider (src/contexts/AccessibilityContext.tsx):
   - Tracks accessibility preferences
   - High contrast mode toggle
   - Reduced motion toggle
   - Font size controls

2. useAccessibility hook:
   - Access preferences
   - Announce to screen reader

3. VisuallyHidden component:
   - For screen reader only text

Update components to be fully accessible:

- ColorPicker
- ModuleBuilder
- TerminalPreview
- Modals
- Forms

Provide accessibility audit checklist.

```

**✅ What Jules will give you:**
- Accessibility context and provider
- Updated components with ARIA
- Screen reader support
- Audit checklist

**💻 Your actions:**
1. Create accessibility context
2. Update components with ARIA labels
3. Add focus indicators
4. Test with keyboard only
5. Test with screen reader (if possible)
6. Save files

**🧪 Test it works:**
- Navigate with keyboard only
- Check focus indicators
- Test with browser accessibility tools
- Verify ARIA labels in DevTools

**⏱️ Time:** 30 minutes

---

### Step 24: Performance Optimization

**📝 Prompt for Jules:**
```

Optimize app performance.

Implement these optimizations:

1. Code splitting:
   - Lazy load routes
   - Lazy load heavy components (Gallery, Wizard)
   - Dynamic imports for libraries

2. React optimization:
   - Memoize expensive computations
   - Use React.memo for components
   - useCallback for event handlers
   - useMemo for derived data

3. Debouncing:
   - Color picker changes (300ms)
   - Search inputs (300ms)
   - Config updates (150ms)

4. Virtual scrolling:
   - Module list (if >50 modules)
   - Theme gallery (if >50 themes)
   - Icon browser grid

5. Image optimization:
   - Compress uploaded images
   - Generate thumbnails
   - Lazy load images in gallery

6. Bundle optimization:
   - Tree shaking
   - Remove unused dependencies
   - Analyze bundle size

Create:

1. useDebounce hook (src/hooks/useDebounce.ts):
   - Debounces values
   - Configurable delay

2. useMemo helpers:
   - Memoize format parsing
   - Memoize color calculations
   - Memoize validation

3. Performance monitoring:
   - Track render times
   - Log slow operations
   - Performance budgets

Update critical components:

- TerminalPreview (memoize rendering)
- ColorPicker (debounce changes)
- ModuleBuilder (virtual list if needed)
- ThemeGallery (lazy load images)

Provide before/after performance metrics.

```

**✅ What Jules will give you:**
- Performance optimizations
- Debounce/memoization hooks
- Lazy loading setup
- Performance improvements

**💻 Your actions:**
1. Implement lazy loading
2. Add memoization to components
3. Add debouncing to inputs
4. Analyze bundle with `npm run build`
5. Save files

**🧪 Test it works:**
- Check bundle size
- Test interaction speed
- Monitor with React DevTools Profiler
- Verify no unnecessary re-renders

**⏱️ Time:** 30 minutes

---

### Step 25: Final Polish

**📝 Prompt for Jules:**
```

Add final polish and nice-to-have features.

1. Animations:
   - Smooth transitions between states
   - Modal slide-in animations
   - Button hover effects
   - Loading animations

2. Better empty states:
   - No themes saved → helpful message
   - No modules enabled → suggestion
   - No search results → search tips

3. Helpful tooltips:
   - Hover hints on complex options
   - Keyboard shortcut hints
   - Module explanations

4. Improved UX:
   - Autosave draft themes
   - Undo/redo support
   - Theme history (versions)
   - Recent themes quick access

5. Easter eggs:
   - Konami code → special theme
   - Click logo 10 times → ???
   - Hidden developer options

Create:

1. Tooltip component (src/components/Tooltip.tsx):
   - Hover tooltips
   - Keyboard accessible
   - Position: top, bottom, left, right

2. useUndo hook (src/hooks/useUndo.ts):
   - Track history
   - Undo/redo functions
   - Keyboard shortcuts (Cmd+Z, Cmd+Shift+Z)

3. AnimatedTransition component:
   - Smooth enter/exit animations
   - Respects reduced motion

4. Autosave functionality:
   - Save draft every 30 seconds
   - Restore on reload
   - Clear draft on explicit save

Polish these areas:

- Better spacing and alignment
- Consistent button styles
- Improved color scheme
- Professional typography
- Smooth animations

Provide a final checklist of polish items.

```

**✅ What Jules will give you:**
- Animation components
- Tooltip system
- Undo/redo
- Autosave
- Polish improvements

**💻 Your actions:**
1. Add animations
2. Create tooltip component
3. Implement undo/redo
4. Add autosave
5. Final visual tweaks
6. Save files

**🧪 Test it works:**
- All animations smooth
- Tooltips appear on hover
- Undo/redo works
- Autosave restores drafts

**⏱️ Time:** 30 minutes

**✅ END OF DAY 7 - App is polished and complete!**

---

## DAY 8 (Optional): Testing & Documentation

### Step 26: Add Tests

**📝 Prompt for Jules:**
```

Create a comprehensive test suite.

1. Unit tests (Vitest):

Test these utilities:

- TomlParser: parse, stringify, validate, merge
- ColorUtils: all color functions
- ThemeValidator: validation logic
- FormatParser: format string parsing

2. Component tests (React Testing Library):

Test these components:

- ColorPicker: color selection, palette switching
- ModuleBuilder: drag/drop, toggle
- TerminalPreview: rendering
- ExportImport: export/import flows

3. Integration tests:

Test complete workflows:

- Create theme → configure → export
- Import theme → modify → save
- Apply preset → customize → export

4. E2E tests (optional, Playwright):

Test user journeys:

- First time user → wizard → create theme
- Power user → import → customize → share

Set up:

- Vitest configuration
- Testing utilities
- Mock data
- Test helpers

Generate:

- Test files for each utility
- Test files for key components
- Integration test suite
- Coverage report script

Target: >70% code coverage for critical paths.

````

**✅ What Jules will give you:**
- Complete test suite
- Test configuration
- Mock data
- Coverage setup

**💻 Your actions:**
1. Install test dependencies:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
````

2. Create test files
3. Run tests: `npm test`
4. Check coverage: `npm run coverage`
5. Save files

**⏱️ Time:** 60 minutes

---

### Step 27: Create Documentation

**📝 Prompt for Jules:**

```
Create comprehensive documentation.

Generate these documents:

1. README.md:
   - Project overview
   - Features list
   - Screenshots
   - Quick start guide
   - Development setup
   - Build instructions
   - Deployment guide

2. USER_GUIDE.md:
   - How to use the app
   - Feature walkthrough
   - Tips and tricks
   - Keyboard shortcuts
   - Troubleshooting
   - FAQ

3. DEVELOPER_GUIDE.md:
   - Architecture overview
   - Component hierarchy
   - State management
   - Adding new modules
   - Adding new features
   - Code style guide

4. API.md (if backend added):
   - API endpoints
   - Request/response formats
   - Authentication
   - Rate limits

5. CONTRIBUTING.md:
   - How to contribute
   - Code of conduct
   - Pull request process
   - Issue templates

6. CHANGELOG.md:
   - Version history
   - Release notes
   - Breaking changes

Also create:
- Component documentation comments (JSDoc)
- Inline code comments
- Type documentation
- README for each major directory

Make docs clear, comprehensive, and beginner-friendly.
Include code examples and screenshots where helpful.
```

**✅ What Jules will give you:**

- Complete documentation set
- README with badges
- Comprehensive guides
- Code comments

**💻 Your actions:**

1. Create each documentation file
2. Add JSDoc comments to components
3. Take screenshots for docs
4. Review and refine
5. Save files

**⏱️ Time:** 45 minutes

---

## Final Steps: Deployment

### Step 28: Prepare for Production

**📝 Prompt for Jules:**

```
Prepare the app for production deployment.

1. Build configuration:
   - Optimize Vite config
   - Set up environment variables
   - Configure build output
   - Add asset optimization

2. SEO & Meta tags:
   - Add meta tags to index.html
   - Open Graph tags
   - Twitter Card tags
   - Favicon set (multiple sizes)
   - robots.txt
   - sitemap.xml

3. PWA setup (optional):
   - Service worker
   - Web manifest
   - Offline support
   - Install prompt
   - App icons

4. Analytics:
   - Google Analytics setup
   - Privacy-friendly analytics option
   - Event tracking
   - Error tracking (Sentry)

5. Performance:
   - Lighthouse score >90
   - Bundle size optimization
   - Image optimization
   - Code splitting

Create:
- Production build script
- Environment variable template
- Deployment config for Vercel/Netlify
- Docker configuration (optional)

Generate deployment guide for:
- Vercel
- Netlify
- GitHub Pages
- Self-hosted

Include checklist of pre-deployment tasks.
```

**✅ What Jules will give you:**

- Production configuration
- SEO setup
- Deployment configs
- Deployment guide

**💻 Your actions:**

1. Update vite.config.ts
2. Add meta tags
3. Create deployment configs
4. Test production build:
   ```bash
   npm run build
   npm run preview
   ```
5. Save files

**⏱️ Time:** 30 minutes

---

### Step 29: Deploy

**Choose your deployment platform:**

**Option A: Vercel (Recommended)**

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Done! Your app is live.

**Option B: Netlify**

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow prompts
4. Done!

**Option C: GitHub Pages**

1. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/starship-theme-creator",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. Install: `npm install gh-pages --save-dev`
3. Run: `npm run deploy`
4. Enable GitHub Pages in repo settings

**⏱️ Time:** 15 minutes

---

### Step 30: Post-Launch

**Launch checklist:**

- [ ] Test live site on multiple devices
- [ ] Test all features work in production
- [ ] Verify analytics tracking
- [ ] Test share URLs
- [ ] Check mobile responsiveness
- [ ] Test performance with Lighthouse
- [ ] Verify all external links work
- [ ] Test import/export on live site

**Share your project:**

- [ ] Post on Product Hunt
- [ ] Share on Reddit (r/commandline, r/unixporn)
- [ ] Tweet about it
- [ ] Post on Hacker News (Show HN)
- [ ] Share on Dev.to
- [ ] Add to Starship community

**Gather feedback:**

- [ ] Set up issue templates on GitHub
- [ ] Create feedback form
- [ ] Monitor analytics
- [ ] Watch for error reports
- [ ] Engage with users

**⏱️ Time:** Ongoing

---

## 🎉 Congratulations!

You've built a complete Starship Theme Creator!

### What you've accomplished:

✅ Full-featured web application
✅ Terminal preview with real-time updates
✅ Drag-and-drop module builder
✅ Color picker with palette extraction
✅ Image to color palette tool
✅ Export/Import functionality
✅ Theme gallery with presets
✅ Validation and suggestions
✅ Keyboard shortcuts
✅ Accessibility features
✅ Performance optimizations
✅ Complete documentation
✅ Production deployment

### Next steps:

1. **Gather user feedback** and iterate
2. **Add requested features** from community
3. **Fix bugs** as they're reported
4. **Optimize performance** based on usage
5. **Expand preset library** with community themes
6. **Add backend** for cloud theme storage (optional)
7. **Create video tutorials** to help users
8. **Build community** around the tool

### Keep improving:

- Monitor error rates
- Track popular features
- Listen to user requests
- Stay updated with Starship changes
- Add new modules as Starship adds them

**You did it! 🚀**
