# 🚩 CURRENT PROGRESS: Completed Checkpoints 1 2. Next: Checkpoint 3 (Terminal Preview).

# Starship Theme Creator - Checkpoint Task Guide

**Build at your own pace with clear milestones and completion criteria**

---

## 📋 Pre-Flight Checklist

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] VS Code or code editor
- [ ] Git (optional but recommended)
- [ ] Modern browser
- [ ] Access to Jules (Google AI)
- [ ] Reference documents downloaded

---

## 🎯 Overall Progress Tracker

```
Progress: [░░░░░░░░░░░░░] 0/13 Checkpoints Complete

[ ] CHECKPOINT 1: Foundation Setup (5 tasks) - ⏱️ ~60 min
[ ] CHECKPOINT 2: Core Systems (4 tasks) - ⏱️ ~60 min
[ ] CHECKPOINT 3: Terminal Preview (3 tasks) - ⏱️ ~65 min
[ ] CHECKPOINT 4: Main Layout (1 task) - ⏱️ ~25 min
[ ] CHECKPOINT 5: Module Management (2 tasks) - ⏱️ ~55 min
[ ] CHECKPOINT 6: Color Systems (2 tasks) - ⏱️ ~50 min
[ ] CHECKPOINT 7: Module Configuration (2 tasks) - ⏱️ ~65 min
[ ] CHECKPOINT 8: Import/Export (1 task) - ⏱️ ~30 min
[ ] CHECKPOINT 9: Theme Management (2 tasks) - ⏱️ ~65 min
[ ] CHECKPOINT 10: Advanced Features (3 tasks) - ⏱️ ~90 min
[ ] CHECKPOINT 11: Polish & UX (4 tasks) - ⏱️ ~115 min
[ ] CHECKPOINT 12: Testing & Docs (2 tasks) - ⏱️ ~105 min
[ ] CHECKPOINT 13: Deployment (2 tasks) - ⏱️ ~45 min

Total Estimated Time: ~12-15 hours
```

---

# CHECKPOINT 1: Foundation Setup

**🎯 Checkpoint Goal:** Working React + TypeScript project with all dependencies

**✅ Checkpoint Complete When:**

- [ ] Project runs with `npm run dev`
- [ ] All core dependencies installed
- [ ] TypeScript types defined
- [ ] TOML parser working
- [ ] Color utilities functional
- [ ] State store configured

---

## Task 1.1: Initialize Project Structure

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

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

**✅ WHAT JULES WILL GIVE YOU:**

- Complete package.json
- Configuration files
- Recommended folder structure

**💻 YOUR ACTIONS:**

```bash
# 1. Create project
npm create vite@latest starship-theme-creator -- --template react-ts
cd starship-theme-creator

# 2. Replace package.json with Jules' version

# 3. Create config files Jules provided

# 4. Install dependencies
npm install

# 5. Create folder structure
mkdir -p src/components/ui
mkdir -p src/components/{ColorPicker,IconBrowser,ModuleBuilder,TerminalPreview,ThemeGallery}
mkdir -p src/{lib,stores,types,hooks}

# 6. Test it works
npm run dev
```

**🧪 COMPLETION TEST:**

```bash
npm run dev
# Should see Vite dev server running
# Visit http://localhost:5173
# See basic React app
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] Project created
- [x] Dependencies installed
- [x] Folders created
- [x] Dev server runs
- [x] No errors in console

---

## Task 1.2: Create TypeScript Types

**⏱️ Estimated Time:** 10 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/types/starship.types.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**

```bash
npm run dev
# Should compile without TypeScript errors
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] File created at correct location
- [x] All major module types included
- [x] No TypeScript errors
- [x] Code compiles

---

## Task 1.3: Build TOML Parser

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/lib/toml-parser.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**
Create temporary test in `src/App.tsx`:

```typescript
import { TomlParser } from './lib/toml-parser';

const config = TomlParser.getDefaultConfig();
console.log('Default config:', config);
const toml = TomlParser.stringify(config);
console.log('TOML:', toml);
```

Check browser console - should see output without errors.

**✅ TASK COMPLETE CHECKLIST:**

- [x] File created
- [x] All methods implemented
- [x] Test shows output
- [x] No errors

---

## Task 1.4: Build Color Utilities

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/lib/color-utils.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**
Add to `src/App.tsx`:

```typescript
import { ColorUtils } from './lib/color-utils';

const complementary = ColorUtils.generateComplementary('#3b82f6');
console.log('Colors:', complementary);
console.log('Presets:', Object.keys(ColorUtils.presets));
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] File created
- [x] All color methods work
- [x] Presets defined
- [x] Test shows output

---

## Task 1.5: Set Up State Store

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/stores/theme-store.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**
In `src/App.tsx`:

```typescript
import { useThemeStore } from './stores/theme-store';

function App() {
  const { currentTheme } = useThemeStore();
  console.log('Current theme:', currentTheme);
  return <div>Theme Creator</div>;
}
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] Store created
- [x] All actions implemented
- [x] Persistence works
- [x] Theme shows in console

---

**🎉 CHECKPOINT 1 COMPLETE!**

Verify before continuing:

- [ ] `npm run dev` works
- [ ] No console errors
- [ ] All 5 tasks checked off
- [ ] Files created in correct locations

---

# CHECKPOINT 2: Core Systems

**🎯 Checkpoint Goal:** Format parser and validation systems working

**✅ Checkpoint Complete When:**

- [ ] Format strings parse to ANSI codes
- [ ] Theme validator checks configs
- [ ] Suggestion engine detects environment
- [ ] All utilities have basic tests

---

## Task 2.1: Build Format String Parser

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/lib/format-parser.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**

```typescript
import { parseFormatString } from './lib/format-parser';
import { TomlParser } from './lib/toml-parser';

const config = TomlParser.getDefaultConfig();
const format = '[$directory](bold cyan)';
const result = parseFormatString(format, config);
console.log('Parsed:', result);
// Should see ANSI codes in output
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] Parser handles module variables
- [x] Style conversion works
- [x] ANSI codes generated
- [x] Test shows colored output

---

## Task 2.2: Create Theme Validator

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

```
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

Functions:
- validateTheme(theme: Theme): ValidationResult
- validateConfig(config: StarshipConfig): ValidationResult
- checkColorContrast(config: StarshipConfig): ValidationIssue[]
- estimateRenderTime(config: StarshipConfig): number

Export as ThemeValidator class.
```

**💻 YOUR ACTIONS:**

1. Create `src/lib/theme-validator.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**

```typescript
import { ThemeValidator } from './lib/theme-validator';

const result = ThemeValidator.validateTheme(currentTheme);
console.log('Validation:', result);
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] Validator created
- [x] All check types implemented
- [x] Returns proper structure
- [x] Test shows validation results

---

## Task 2.3: Build Suggestion Engine

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

```
Create a suggestion engine in lib/suggestion-engine.ts that provides intelligent recommendations.

The engine should:

1. Detect user environment:
interface Environment {
  os: 'windows' | 'macos' | 'linux' | 'unknown';
  shell: 'bash' | 'zsh' | 'fish' | 'pwsh' | 'unknown';
  terminal: string;
  hasNerdFont: boolean;
  installedTools: string[]; // git, docker, node, etc.
}

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
- suggestColorScheme(): ColorPalette[]

interface Suggestion {
  type: 'module' | 'performance' | 'visual' | 'compatibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: () => void; // Auto-apply function
}

Export as SuggestionEngine class.
```

**💻 YOUR ACTIONS:**

1. Create `src/lib/suggestion-engine.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**

```typescript
import { SuggestionEngine } from './lib/suggestion-engine';

const env = await SuggestionEngine.detectEnvironment();
const suggestions = SuggestionEngine.suggestModules(env);
console.log('Environment:', env);
console.log('Suggestions:', suggestions);
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] Environment detection works
- [x] Module suggestions generated
- [x] Optimization suggestions work
- [x] Test shows suggestions

---

## Task 2.4: Create Preset Themes

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

```
Create a presets library in lib/presets.ts with built-in theme configurations.

Include these preset themes:

1. Minimal Themes:
   - "Clean" - Just directory, git, and character
   - "Simple" - Basic info only
   - "One Line" - Everything on one line, compact

2. Developer Themes:
   - "Full Stack" - All language modules enabled
   - "DevOps Pro" - Cloud, Docker, K8s focused
   - "Git Focused" - Detailed git status

3. Aesthetic Themes:
   - "Nord" - Nord color scheme
   - "Dracula" - Dracula colors
   - "Gruvbox" - Gruvbox theme
   - "Catppuccin" - Catppuccin Mocha
   - "Tokyo Night" - Tokyo Night colors

Each preset should be a complete Theme object with:
- metadata (name, author, description, tags)
- config (complete StarshipConfig)

Use the color palettes from ColorUtils.presets where applicable.

Export as an array: export const PRESET_THEMES: Theme[]
```

**💻 YOUR ACTIONS:**

1. Create `src/lib/presets.ts`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**

```typescript
import { PRESET_THEMES } from './lib/presets';

console.log('Presets:', PRESET_THEMES.length);
console.log('First preset:', PRESET_THEMES[0].metadata.name);
```

**✅ TASK COMPLETE CHECKLIST:**

- [x] All preset categories included
- [x] Each preset has metadata
- [x] Each preset has complete config
- [x] Test shows presets

---

**🎉 CHECKPOINT 2 COMPLETE!**

Verify:

- [ ] All parsers and validators work
- [x] No errors in console
- [ ] All 4 tasks checked off

---

# CHECKPOINT 3: Terminal Preview

**🎯 Checkpoint Goal:** Working terminal with live theme preview

**✅ Checkpoint Complete When:**

- [ ] Terminal renders in UI
- [ ] Format strings display correctly
- [ ] Colors show properly
- [ ] Updates when theme changes

---

## Task 3.1: Create Terminal Preview Component

**⏱️ Estimated Time:** 20 minutes

**📝 PROMPT FOR JULES:**

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

For now, render a simple static prompt. We'll make it dynamic in the next task.

Import 'xterm/css/xterm.css' for styling.
Use Tailwind CSS for the window chrome.
Make the terminal container responsive (fill parent).
```

**💻 YOUR ACTIONS:**

1. Create `src/components/TerminalPreview/index.tsx`
2. Copy Jules' code
3. Save file
4. Update `src/App.tsx`:

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

**🧪 COMPLETION TEST:**

- Visit localhost:5173
- Should see terminal window
- Should see basic prompt

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Terminal window visible
- [ ] macOS-style chrome
- [ ] Static prompt shows
- [ ] No console errors

---

## Task 3.2: Integrate Format Parser

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

```
Update the TerminalPreview component to use the format parser.

Changes needed:

1. Import parseFormatString from '../../lib/format-parser'
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

**💻 YOUR ACTIONS:**

1. Replace contents of `src/components/TerminalPreview/index.tsx`
2. Copy Jules' updated code
3. Save file

**🧪 COMPLETION TEST:**

- Terminal should show colorful prompt
- Should see multiple scenarios
- Try changing a color in the store and watch update

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Prompt shows colors
- [ ] ANSI codes rendering
- [ ] Multiple scenarios visible
- [ ] Live updates work

---

## Task 3.3: Add Mock Data System

**⏱️ Estimated Time:** 20 minutes

**📝 PROMPT FOR JULES:**

```
Create a mock data system in lib/mock-data.ts that provides realistic values for terminal preview scenarios.

Create different scenarios:

1. Clean State:
   - directory: ~/projects/my-app
   - git: clean, on branch main
   - no language context

2. Development State:
   - directory: ~/work/api-server
   - git: 3 modified files, on branch feature/auth
   - nodejs: v18.0.0
   - package: api-server@1.2.3

3. Multi-Language State:
   - directory: ~/dev/full-stack
   - git: ahead 2, behind 1
   - nodejs, python, rust all active

4. DevOps State:
   - directory: ~/infra/k8s-cluster
   - git: clean, on branch production
   - docker: my-app:latest
   - kubernetes: prod-cluster

5. Error State:
   - directory: ~/broken-project
   - git: merge conflict, 5 conflicted files
   - error indicator

Each scenario should return a complete set of module values that can be used by the format parser.

Export as:
export const MOCK_SCENARIOS: Record<string, MockScenario>
export interface MockScenario {
  name: string;
  description: string;
  values: Record<string, string>;
}
```

**💻 YOUR ACTIONS:**

1. Create `src/lib/mock-data.ts`
2. Copy Jules' code
3. Update TerminalPreview to use scenarios
4. Save files

**🧪 COMPLETION TEST:**

- Terminal should cycle through different scenarios
- Each scenario should look realistic
- All module types should be represented

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Mock scenarios created
- [ ] Terminal uses scenarios
- [ ] Scenarios look realistic
- [ ] Cycling works smoothly

---

**🎉 CHECKPOINT 3 COMPLETE!**

Verify:

- [ ] Terminal preview looks professional
- [ ] Colors render correctly
- [ ] Multiple scenarios show
- [ ] All 3 tasks checked off

---

# CHECKPOINT 4: Main Layout

**🎯 Checkpoint Goal:** Professional three-column layout

**✅ Checkpoint Complete When:**

- [ ] Three-column layout working
- [ ] Header with controls
- [ ] Responsive design
- [ ] Clean, professional appearance

---

## Task 4.1: Build Main App Layout

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

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
   - "Modules" section with placeholder
   - "Colors" section with placeholder
   - "Settings" section with placeholder

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

**💻 YOUR ACTIONS:**

1. Replace `src/App.tsx` with Jules' code
2. Save file

**🧪 COMPLETION TEST:**

- Visit localhost:5173
- Should see three-column layout
- Terminal in center
- Sidebars on left/right
- Header at top

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Layout visible
- [ ] Three columns work
- [ ] Terminal in center
- [ ] Header has controls
- [ ] Responsive (test by resizing)

---

**🎉 CHECKPOINT 4 COMPLETE!**

Verify:

- [ ] Professional layout
- [ ] All sections visible
- [ ] Task checked off

---

# CHECKPOINT 5: Module Management

**🎯 Checkpoint Goal:** Drag-and-drop module builder working

**✅ Checkpoint Complete When:**

- [ ] Module list displays
- [ ] Drag to reorder works
- [ ] Toggle modules on/off
- [ ] Format string updates

---

## Task 5.1: Create Module Builder

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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
- Update the format string automatically when modules are reordered or toggled
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

**💻 YOUR ACTIONS:**

1. Create `src/components/ModuleBuilder/index.tsx`
2. Copy Jules' code
3. Update `src/App.tsx` left sidebar:

   ```typescript
   import { ModuleBuilder } from './components/ModuleBuilder';

   // In left sidebar:
   <section className="p-4">
     <h2 className="font-semibold mb-3">Modules</h2>
     <ModuleBuilder />
   </section>
   ```

4. Save files

**🧪 COMPLETION TEST:**

- Module list should appear in left sidebar
- Try dragging modules
- Toggle checkboxes
- Watch terminal update

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Module list visible
- [ ] Drag and drop works
- [ ] Toggles work
- [ ] Terminal updates
- [ ] Smooth animations

---

## Task 5.2: Create Module List Constants

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

```
Create a comprehensive module list in lib/module-definitions.ts with metadata for each Starship module.

For each module, include:
- id: string (module name)
- name: string (display name)
- description: string (what it does)
- category: 'core' | 'vcs' | 'languages' | 'tools' | 'cloud' | 'system'
- icon: string (emoji or symbol)
- defaultEnabled: boolean
- requiresNerdFont: boolean
- expensive: boolean (affects performance)

Categories:
- Core: character, directory, line_break
- VCS: git_branch, git_status, git_state, git_commit, hg_branch
- Languages: nodejs, python, rust, golang, java, php, ruby, etc.
- Tools: docker_context, kubernetes, terraform, package, cmake
- Cloud: aws, gcloud, azure, openstack
- System: battery, time, username, hostname, cmd_duration, jobs, memory_usage, shell, os

Export as:
export const MODULE_DEFINITIONS: ModuleDefinition[]
export const MODULE_CATEGORIES: string[]
```

**💻 YOUR ACTIONS:**

1. Create `src/lib/module-definitions.ts`
2. Copy Jules' code
3. Update ModuleBuilder to use definitions
4. Save files

**🧪 COMPLETION TEST:**

- Modules should show with categories
- Icons/emojis visible
- Descriptions appear on hover

**✅ TASK COMPLETE CHECKLIST:**

- [ ] All modules defined
- [ ] Categories work
- [ ] Metadata complete
- [ ] Used in ModuleBuilder

---

**🎉 CHECKPOINT 5 COMPLETE!**

Verify:

- [ ] Module management fully functional
- [ ] Drag and drop smooth
- [ ] All 2 tasks checked off

---

# CHECKPOINT 6: Color Systems

**🎯 Checkpoint Goal:** Color picker and image palette working

**✅ Checkpoint Complete When:**

- [ ] Color picker functional
- [ ] Can select from presets
- [ ] Image upload extracts colors
- [ ] Colors apply to theme

---

## Task 6.1: Create Color Picker Component

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/ColorPicker/index.tsx`
2. Copy Jules' code
3. Save file

**🧪 COMPLETION TEST:**
Test in App.tsx:

```typescript
import { ColorPicker } from './components/ColorPicker';
const [testColor, setTestColor] = useState('#3b82f6');

<ColorPicker
  color={testColor}
  onChange={setTestColor}
  label="Test Color"
  showPalettes={true}
/>
```

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Color picker works
- [ ] Tabs switch
- [ ] Presets show
- [ ] Colors apply
- [ ] Contrast checker works

---

## Task 6.2: Create Image Palette Component

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/ImagePalette/index.tsx`
2. Copy Jules' code
3. Add to App.tsx left sidebar:

   ```typescript
   import { ImagePalette } from './components/ImagePalette';

   <section className="p-4">
     <h2 className="font-semibold mb-3">Color from Image</h2>
     <ImagePalette />
   </section>
   ```

4. Save files

**🧪 COMPLETION TEST:**

- Upload a colorful image
- Watch colors extract
- Click "Apply Palette"
- See theme colors change

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Upload works
- [ ] Preview shows
- [ ] Colors extract
- [ ] Palette applies
- [ ] Theme updates

---

**🎉 CHECKPOINT 6 COMPLETE!**

Verify:

- [ ] Color systems fully functional
- [ ] Image to palette works
- [ ] All 2 tasks checked off

---

# CHECKPOINT 7: Module Configuration

**🎯 Checkpoint Goal:** Configure individual module settings

**✅ Checkpoint Complete When:**

- [ ] Config panel shows module settings
- [ ] Symbol picker works
- [ ] Changes update theme
- [ ] All major modules configurable

---

## Task 7.1: Create Module Config Panel

**⏱️ Estimated Time:** 35 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/ModuleConfigPanel/index.tsx`
2. Copy Jules' code
3. Update App.tsx to show panel when module selected
4. Save files

**🧪 COMPLETION TEST:**

- Click "Configure" on a module
- Config panel appears in right sidebar
- Change values
- Watch terminal update

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Panel renders
- [ ] Module-specific inputs show
- [ ] Changes save
- [ ] Terminal updates
- [ ] Reset works

---

## Task 7.2: Create Icon Browser

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/IconBrowser/index.tsx`
2. Copy Jules' code
3. Integrate with ModuleConfigPanel symbol inputs
4. Save files

**🧪 COMPLETION TEST:**

- Click to open icon browser
- Search for symbols
- Select a symbol
- Symbol appears in input

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Browser opens
- [ ] Categories work
- [ ] Search works
- [ ] Selection works
- [ ] Closes properly

---

**🎉 CHECKPOINT 7 COMPLETE!**

Verify:

- [ ] Module configuration fully functional
- [ ] Symbol picker works
- [ ] All 2 tasks checked off

---

# CHECKPOINT 8: Import/Export

**🎯 Checkpoint Goal:** Full import/export functionality

**✅ Checkpoint Complete When:**

- [ ] Can export to .toml file
- [ ] Can copy to clipboard
- [ ] Can import .toml files
- [ ] Share URLs work

---

## Task 8.1: Create Export/Import Component

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/ExportImport/index.tsx`
2. Copy Jules' code
3. Add to App.tsx (in a modal or sidebar section)
4. Save files

**🧪 COMPLETION TEST:**

- Download a .toml file
- Copy to clipboard
- Upload file back
- Verify theme loads correctly

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Download works
- [ ] Copy works
- [ ] Upload works
- [ ] Validation works
- [ ] Share URL generates

---

**🎉 CHECKPOINT 8 COMPLETE!**

Verify:

- [ ] All import/export methods work
- [ ] Task checked off

---

# CHECKPOINT 9: Theme Management

**🎯 Checkpoint Goal:** Theme gallery and preset system

**✅ Checkpoint Complete When:**

- [ ] Can save themes
- [ ] Gallery shows saved themes
- [ ] Presets available
- [ ] Can load/delete themes

---

## Task 9.1: Create Theme Gallery

**⏱️ Estimated Time:** 35 minutes

**📝 PROMPT FOR JULES:**

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

5. Create thumbnail:
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

Import PRESET_THEMES from lib/presets.
Use useThemeStore for saved themes.

Export as ThemeGallery component.
```

**💻 YOUR ACTIONS:**

1. Create `src/components/ThemeGallery/index.tsx`
2. Copy Jules' code
3. Add gallery to app (button in header to open modal)
4. Save files

**🧪 COMPLETION TEST:**

- Open gallery
- View presets
- Save a theme
- Load a theme
- Delete a theme

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Gallery displays
- [ ] Presets show
- [ ] Can save themes
- [ ] Can load themes
- [ ] Delete works

---

## Task 9.2: Add Theme Actions to Header

**⏱️ Estimated Time:** 15 minutes

**📝 PROMPT FOR JULES:**

```
Update the App.tsx header to include functional theme action buttons:

1. New Theme button:
   - Confirms before clearing
   - Resets to default config

2. Save Theme button:
   - Opens save dialog
   - Prompts for theme name/description
   - Saves to store

3. Gallery button:
   - Opens ThemeGallery modal

4. Export button:
   - Opens ExportImport modal to export tab

5. Import button:
   - Opens ExportImport modal to import tab

Add keyboard shortcuts:
- Cmd/Ctrl + N: New theme
- Cmd/Ctrl + S: Save theme
- Cmd/Ctrl + O: Open gallery
- Cmd/Ctrl + E: Export
- Cmd/Ctrl + I: Import

Show confirmation dialogs before destructive actions.
Use modals for Save, Gallery, Export/Import.

Update the header section in App.tsx with these functional buttons and keyboard shortcuts.
```

**💻 YOUR ACTIONS:**

1. Update `src/App.tsx`
2. Copy Jules' code for header section
3. Save file

**🧪 COMPLETION TEST:**

- Click each button
- Test keyboard shortcuts
- Verify modals open
- Test save flow

**✅ TASK COMPLETE CHECKLIST:**

- [ ] All buttons work
- [ ] Shortcuts work
- [ ] Modals open
- [ ] Save flow works

---

**🎉 CHECKPOINT 9 COMPLETE!**

Verify:

- [ ] Theme management fully functional
- [ ] Gallery works
- [ ] All 2 tasks checked off

---

# CHECKPOINT 10: Advanced Features

**🎯 Checkpoint Goal:** Comparison, suggestions, and wizard

**✅ Checkpoint Complete When:**

- [ ] Comparison view works
- [ ] Suggestions show
- [ ] Welcome wizard functional

---

## Task 10.1: Create Comparison View

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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
```

**💻 YOUR ACTIONS:**

1. Install html2canvas: `npm install html2canvas`
2. Create `src/components/ComparisonView/index.tsx`
3. Copy Jules' code
4. Add button to open comparison view
5. Save files

**🧪 COMPLETION TEST:**

- Open comparison
- Select two themes
- View differences
- Export screenshot

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Side-by-side view works
- [ ] Diff shows
- [ ] Export works
- [ ] Swapping works

---

## Task 10.2: Create Suggestion Panel

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

```
Create a SuggestionPanel component in components/SuggestionPanel/index.tsx that displays smart suggestions.

Features:

1. Use SuggestionEngine to generate suggestions
2. Show suggestions by priority:
   - High priority (red icon)
   - Medium priority (yellow icon)
   - Low priority (blue icon)

3. Each suggestion shows:
   - Icon based on type
   - Title
   - Description
   - "Apply" button (if action available)
   - "Dismiss" button

4. Suggestion categories:
   - Module suggestions (enable relevant modules)
   - Performance optimizations
   - Visual improvements
   - Compatibility fixes

5. Auto-apply functionality:
   - Some suggestions have auto-apply
   - Clicking "Apply" executes the action
   - Updates theme automatically

6. Dismissible:
   - Can dismiss suggestions
   - Stays dismissed (localStorage)
   - "Show dismissed" toggle

Layout:
- Card-based design
- Priority sorting
- Clear CTAs
- Collapsible sections

Styling:
- Tailwind CSS
- Icon from lucide-react
- Color coding by priority

Export as SuggestionPanel component.
```

**💻 YOUR ACTIONS:**

1. Create `src/components/SuggestionPanel/index.tsx`
2. Copy Jules' code
3. Add to App.tsx left sidebar
4. Save files

**🧪 COMPLETION TEST:**

- View suggestions
- Click "Apply" on a suggestion
- Dismiss a suggestion
- Verify theme updates

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Suggestions display
- [ ] Priority sorting works
- [ ] Apply works
- [ ] Dismiss works

---

## Task 10.3: Create Welcome Wizard

**⏱️ Estimated Time:** 35 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create `src/components/WelcomeWizard/index.tsx`
2. Copy Jules' code
3. Show wizard on first visit (check localStorage)
4. Save files

**🧪 COMPLETION TEST:**

- Clear localStorage to trigger wizard
- Go through all steps
- Complete wizard
- Verify theme created

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Wizard opens on first visit
- [ ] All steps work
- [ ] Navigation works
- [ ] Completion creates theme
- [ ] Don't show again works

---

**🎉 CHECKPOINT 10 COMPLETE!**

Verify:

- [ ] All advanced features working
- [ ] All 3 tasks checked off

---

# CHECKPOINT 11: Polish & UX

**🎯 Checkpoint Goal:** Professional polish and user experience

**✅ Checkpoint Complete When:**

- [ ] Error handling in place
- [ ] Keyboard shortcuts work
- [ ] Accessibility features added
- [ ] Smooth animations

---

## Task 11.1: Add Error Handling & Toasts

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

```
Add comprehensive error handling and toast notification system.

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
   - Auto-dismiss (configurable)
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

**💻 YOUR ACTIONS:**

1. Create error handling components
2. Create toast system
3. Wrap App in ErrorBoundary
4. Add loading states
5. Replace alert() calls with toasts
6. Save files

**🧪 COMPLETION TEST:**

- Trigger an error (invalid TOML)
- See error toast
- Test loading states
- Verify error boundary

**✅ TASK COMPLETE CHECKLIST:**

- [ ] ErrorBoundary works
- [ ] Toasts display
- [ ] Loading states show
- [ ] Errors handled gracefully

---

## Task 11.2: Add Keyboard Shortcuts

**⏱️ Estimated Time:** 25 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create keyboard shortcuts hook
2. Create CommandPalette
3. Create KeyboardShortcutsHelp
4. Integrate into App.tsx
5. Save files

**🧪 COMPLETION TEST:**

- Try Cmd/Ctrl + S
- Open command palette
- View shortcuts help
- Test all shortcuts

**✅ TASK COMPLETE CHECKLIST:**

- [ ] All shortcuts work
- [ ] Command palette functional
- [ ] Help modal shows
- [ ] Keyboard navigation works

---

## Task 11.3: Improve Accessibility

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Create accessibility context
2. Update components with ARIA
3. Add focus indicators
4. Test with keyboard only
5. Save files

**🧪 COMPLETION TEST:**

- Navigate with keyboard only
- Check focus indicators
- Test with screen reader if possible
- Verify ARIA labels

**✅ TASK COMPLETE CHECKLIST:**

- [ ] ARIA labels added
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly

---

## Task 11.4: Add Animations & Polish

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

```
Add final polish and animations.

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

5. Visual polish:
   - Better spacing and alignment
   - Consistent button styles
   - Improved color scheme
   - Professional typography
   - Smooth animations

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

Provide a final polish checklist.
```

**💻 YOUR ACTIONS:**

1. Add animations
2. Create tooltip component
3. Implement undo/redo
4. Add autosave
5. Final visual tweaks
6. Save files

**🧪 COMPLETION TEST:**

- All animations smooth
- Tooltips appear
- Undo/redo works
- Autosave restores drafts

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Animations added
- [ ] Tooltips work
- [ ] Undo/redo functional
- [ ] Autosave works
- [ ] Visually polished

---

**🎉 CHECKPOINT 11 COMPLETE!**

Verify:

- [ ] App feels professional
- [ ] UX is smooth
- [ ] All 4 tasks checked off

---

# CHECKPOINT 12: Testing & Documentation

**🎯 Checkpoint Goal:** Tests and documentation complete

**✅ Checkpoint Complete When:**

- [ ] Unit tests passing
- [ ] Component tests passing
- [ ] Documentation written
- [ ] README complete

---

## Task 12.1: Add Tests

**⏱️ Estimated Time:** 60 minutes

**📝 PROMPT FOR JULES:**

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
```

**💻 YOUR ACTIONS:**

1. Install test dependencies:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```
2. Create test files
3. Run tests: `npm test`
4. Check coverage
5. Save files

**🧪 COMPLETION TEST:**

```bash
npm test
npm run coverage
```

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Unit tests passing
- [ ] Component tests passing
- [ ] Integration tests passing
- [ ] Coverage >70%

---

## Task 12.2: Create Documentation

**⏱️ Estimated Time:** 45 minutes

**📝 PROMPT FOR JULES:**

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

4. CONTRIBUTING.md:
   - How to contribute
   - Code of conduct
   - Pull request process
   - Issue templates

5. CHANGELOG.md:
   - Version history
   - Release notes
   - Breaking changes

Also create:
- Component documentation comments (JSDoc)
- Inline code comments
- Type documentation

Make docs clear, comprehensive, and beginner-friendly.
Include code examples and screenshots where helpful.
```

**💻 YOUR ACTIONS:**

1. Create documentation files
2. Add JSDoc comments
3. Take screenshots
4. Review and refine
5. Save files

**🧪 COMPLETION TEST:**

- Read through each doc
- Verify accuracy
- Test examples work

**✅ TASK COMPLETE CHECKLIST:**

- [ ] README complete
- [ ] User guide written
- [ ] Developer guide written
- [ ] Contributing guide ready
- [ ] Code commented

---

**🎉 CHECKPOINT 12 COMPLETE!**

Verify:

- [ ] All tests passing
- [ ] Documentation complete
- [ ] All 2 tasks checked off

---

# CHECKPOINT 13: Deployment

**🎯 Checkpoint Goal:** App deployed and live

**✅ Checkpoint Complete When:**

- [ ] Production build works
- [ ] Deployed to hosting
- [ ] Site accessible
- [ ] All features work in production

---

## Task 13.1: Prepare for Production

**⏱️ Estimated Time:** 30 minutes

**📝 PROMPT FOR JULES:**

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

**💻 YOUR ACTIONS:**

1. Update vite.config.ts
2. Add meta tags to index.html
3. Create deployment configs
4. Test production build:
   ```bash
   npm run build
   npm run preview
   ```
5. Save files

**🧪 COMPLETION TEST:**

```bash
npm run build
npm run preview
# Visit localhost:4173
# Test all features
```

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Build succeeds
- [ ] Preview works
- [ ] Meta tags added
- [ ] Performance optimized
- [ ] Ready for deployment

---

## Task 13.2: Deploy

**⏱️ Estimated Time:** 15 minutes

**Choose deployment platform:**

**Option A: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Your app is live!
```

**Option B: Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Follow prompts
# Your app is live!
```

**Option C: GitHub Pages**

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/starship-theme-creator",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Install
npm install gh-pages --save-dev

# Deploy
npm run deploy

# Enable in repo settings
```

**✅ TASK COMPLETE CHECKLIST:**

- [ ] Deployed successfully
- [ ] Site accessible
- [ ] All features work
- [ ] No console errors
- [ ] Mobile responsive

---

**Post-Deployment Checklist:**

- [ ] Test on multiple devices
- [ ] Test all features in production
- [ ] Verify analytics tracking
- [ ] Test share URLs
- [ ] Check mobile responsiveness
- [ ] Test with Lighthouse
- [ ] Verify external links work
- [ ] Monitor error logs

**Share Your Project:**

- [ ] Post on Product Hunt
- [ ] Share on Reddit
- [ ] Tweet about it
- [ ] Post on Hacker News
- [ ] Share on Dev.to
- [ ] Add to Starship community

---

**🎉 CHECKPOINT 13 COMPLETE!**
**🎉 ALL CHECKPOINTS COMPLETE!**

---

# 🎊 Congratulations!

You've successfully built a complete Starship Theme Creator!

## What You've Accomplished:

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

## Next Steps:

1. **Gather user feedback** and iterate
2. **Add requested features** from community
3. **Fix bugs** as they're reported
4. **Optimize performance** based on usage
5. **Expand preset library**
6. **Add backend** for cloud storage (optional)
7. **Create video tutorials**
8. **Build community**

## Keep Improving:

- Monitor error rates
- Track popular features
- Listen to user requests
- Stay updated with Starship changes
- Add new modules as Starship adds them

---

**You did it! 🚀**

Remember to refer to:

- **Master Manual** for deep technical details
- **Quick Reference** for code snippets
- **Roadmap** for future feature ideas
