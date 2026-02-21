# Starship Theme Creator - Master Manual

**Complete Reference Guide for Building and Maintaining Your Starship Theme Creator**

Version 1.0 | Last Updated: 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Development Setup](#development-setup)
5. [Core Systems](#core-systems)
6. [Component Reference](#component-reference)
7. [Utilities & Libraries](#utilities--libraries)
8. [State Management](#state-management)
9. [Styling Guide](#styling-guide)
10. [Testing Strategy](#testing-strategy)
11. [Performance Optimization](#performance-optimization)
12. [Accessibility](#accessibility)
13. [Deployment](#deployment)
14. [Maintenance](#maintenance)
15. [Troubleshooting](#troubleshooting)
16. [FAQ](#faq)

---

## Project Overview

### What is Starship Theme Creator?

Starship Theme Creator is a web-based visual editor for creating, customizing, and sharing Starship prompt themes. It eliminates the need to manually edit TOML configuration files by providing an intuitive drag-and-drop interface with live preview.

### Key Features

**Core Functionality:**

- Visual terminal preview with real-time updates
- Drag-and-drop module builder
- Color picker with preset palettes
- Image-to-palette color extraction
- Export to .toml file
- Import existing configurations
- Theme validation and suggestions

**Advanced Features:**

- Theme gallery with presets
- Before/after comparison view
- Environment detection and smart suggestions
- Keyboard shortcuts and command palette
- Accessibility features
- Performance optimization
- Cloud theme storage (optional)

### Target Users

1. **Beginners**: Users new to Starship who want an easy way to customize
2. **Power Users**: Experienced users who want a faster workflow
3. **Theme Creators**: Users who create and share themes
4. **Developers**: Contributors who want to extend the tool

---

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │  Module    │  │  Terminal   │  │   Config     │ │
│  │  Builder   │  │  Preview    │  │   Panel      │ │
│  └────────────┘  └─────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
    │  State  │     │ Format  │     │  TOML   │
    │  Store  │     │ Parser  │     │ Parser  │
    └─────────┘     └─────────┘     └─────────┘
         │                │                │
         └────────────────┼────────────────┘
                          │
              ┌───────────▼───────────┐
              │   Starship Config     │
              │   (JSON/TOML)         │
              └───────────────────────┘
```

### Application Layers

**1. Presentation Layer (Components)**

- UI components
- User interactions
- Visual feedback
- Responsive layouts

**2. Business Logic Layer (Utilities)**

- Format parsing
- TOML conversion
- Color manipulation
- Theme validation
- Suggestion engine

**3. State Management Layer (Store)**

- Theme state
- User preferences
- Saved themes
- UI state

**4. Data Layer**

- Local storage persistence
- File import/export
- API communication (optional)

### Data Flow

```
User Action → Component → Store Update →
Format Parser → Terminal Render → Visual Update
```

Example: Changing a color

1. User selects color in ColorPicker
2. ColorPicker calls `updateConfig({ directory: { style: 'bold blue' }})`
3. Store updates currentTheme
4. TerminalPreview re-renders
5. FormatParser converts format string with new color
6. Terminal displays updated prompt

---

## Technology Stack

### Frontend Framework

- **React 18.2+**: UI framework
- **TypeScript 5.2+**: Type safety
- **Vite 5.0+**: Build tool and dev server

### UI Libraries

- **Tailwind CSS 3.3+**: Utility-first styling
- **shadcn/ui**: Component library (optional)
- **Lucide React**: Icon library

### Terminal Emulation

- **xterm.js 5.3+**: Terminal rendering
- **xterm-addon-fit**: Auto-sizing

### State Management

- **Zustand 4.4+**: Lightweight state management
- **zustand/middleware/persist**: LocalStorage persistence

### File Handling

- **@iarna/toml**: TOML parsing and stringification
- **FileSaver.js**: File downloads

### Color Manipulation

- **colord**: Color conversions and manipulation
- **colord/plugins/a11y**: Accessibility checking
- **node-vibrant**: Image color extraction
- **react-colorful**: Color picker component

### Drag & Drop

- **@dnd-kit/core**: Drag and drop core
- **@dnd-kit/sortable**: Sortable lists
- **@dnd-kit/utilities**: Helper utilities

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **React Testing Library**: Component testing

---

## Development Setup

### Prerequisites

```bash
# Check Node.js version (18+ required)
node --version

# Check npm version
npm --version

# Install pnpm (optional, faster alternative)
npm install -g pnpm
```

### Initial Setup

```bash
# Create project
npm create vite@latest starship-theme-creator -- --template react-ts

# Navigate to project
cd starship-theme-creator

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Project Structure

```
starship-theme-creator/
├── public/
│   ├── nerd-fonts/              # Font files
│   ├── sample-themes/           # Example .toml files
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                  # Base UI components
│   │   ├── ColorPicker/         # Color selection
│   │   ├── IconBrowser/         # Symbol picker
│   │   ├── ModuleBuilder/       # Module management
│   │   ├── TerminalPreview/     # Live preview
│   │   ├── ThemeGallery/        # Theme browser
│   │   ├── ExportImport/        # Import/export
│   │   ├── ComparisonView/      # Theme comparison
│   │   ├── ModuleConfigPanel/   # Module settings
│   │   ├── WelcomeWizard/       # First-run guide
│   │   ├── ErrorBoundary.tsx    # Error handling
│   │   ├── Toast.tsx            # Notifications
│   │   └── ...
│   ├── lib/
│   │   ├── toml-parser.ts       # TOML handling
│   │   ├── format-parser.ts     # Format string parsing
│   │   ├── color-utils.ts       # Color manipulation
│   │   ├── theme-validator.ts   # Validation logic
│   │   ├── suggestion-engine.ts # Smart suggestions
│   │   └── presets.ts           # Built-in themes
│   ├── stores/
│   │   └── theme-store.ts       # Zustand store
│   ├── hooks/
│   │   ├── useTheme.ts          # Theme hook
│   │   ├── useKeyboard.ts       # Keyboard shortcuts
│   │   ├── useToast.ts          # Notifications
│   │   ├── useDebounce.ts       # Debouncing
│   │   └── useUndo.ts           # Undo/redo
│   ├── types/
│   │   └── starship.types.ts    # TypeScript types
│   ├── contexts/
│   │   └── AccessibilityContext.tsx
│   ├── App.tsx                  # Main app
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── tests/
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # E2E tests (optional)
├── .env.example                 # Environment variables template
├── .eslintrc.js                 # ESLint config
├── .prettierrc                  # Prettier config
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### Environment Variables

Create `.env` file:

```bash
# App Configuration
VITE_APP_NAME="Starship Theme Creator"
VITE_APP_VERSION="1.0.0"

# API Configuration (if using backend)
VITE_API_URL="http://localhost:3000"
VITE_API_KEY="your-api-key"

# Analytics (optional)
VITE_GA_ID="G-XXXXXXXXXX"

# Feature Flags
VITE_ENABLE_CLOUD_SYNC="false"
VITE_ENABLE_AI_SUGGESTIONS="false"
```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Core Systems

### 1. TOML Parser System

**Purpose**: Convert between TOML files and JavaScript objects

**Location**: `src/lib/toml-parser.ts`

**Key Functions**:

```typescript
class TomlParser {
  // Parse TOML string to config object
  static parse(tomlString: string): StarshipConfig;

  // Convert config object to TOML string
  static stringify(config: StarshipConfig): string;

  // Get default Starship configuration
  static getDefaultConfig(): StarshipConfig;

  // Validate configuration
  static validate(config: StarshipConfig): ValidationResult;

  // Merge two configurations
  static merge(
    base: StarshipConfig,
    override: Partial<StarshipConfig>,
  ): StarshipConfig;
}
```

**Usage Example**:

```typescript
import { TomlParser } from '@/lib/toml-parser';

// Parse TOML file
const config = TomlParser.parse(tomlContent);

// Create new theme
const theme = TomlParser.getDefaultConfig();

// Export to TOML
const toml = TomlParser.stringify(config);

// Validate before saving
const { valid, errors } = TomlParser.validate(config);
if (!valid) {
  console.error('Invalid config:', errors);
}
```

**Error Handling**:

- Invalid TOML syntax → Throw error with line number
- Missing required fields → Return validation errors
- Type mismatches → Auto-convert when possible

---

### 2. Format Parser System

**Purpose**: Convert Starship format strings to ANSI-colored terminal output

**Location**: `src/lib/format-parser.ts`

**Format String Syntax**:

```
[$text](style) - Styled text
$module - Module variable
Literal text - Plain text
```

**Style Syntax**:

```
Colors: red, blue, #ff0000, rgb(255,0,0)
Background: bg:blue, bg:#ff0000
Modifiers: bold, italic, underline, dimmed
Combined: "bold red", "italic bg:blue #ffffff"
```

**Key Functions**:

```typescript
// Main parser
function parseFormatString(format: string, config: StarshipConfig): string;

// Convert style to ANSI codes
function styleToAnsi(style: string): string;

// Render individual module
function renderModule(moduleName: string, config: StarshipConfig): string;
```

**Module Rendering**:

```typescript
// Example module values
const mockValues = {
  directory: '~/projects/my-app',
  git_branch: ' main',
  nodejs: ' v18.0.0',
  username: 'john',
  hostname: 'macbook',
  character: '❯',
  time: '14:30:45',
};
```

**ANSI Escape Codes**:

```typescript
const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',

  // Background colors (add 10)
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  // ...

  // 256 colors
  fg256: (n: number) => `\x1b[38;5;${n}m`,
  bg256: (n: number) => `\x1b[48;5;${n}m`,

  // RGB colors
  fgRgb: (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`,
  bgRgb: (r: number, g: number, b: number) => `\x1b[48;2;${r};${g};${b}m`,
};
```

---

### 3. Color System

**Purpose**: Manage colors, palettes, and color manipulation

**Location**: `src/lib/color-utils.ts`

**Core Features**:

1. **Image Color Extraction**

   ```typescript
   // Extract palette from image
   const palette = await ColorUtils.extractPaletteFromImage(file);
   // Returns: { primary, secondary, accent, background, ... }
   ```

2. **Color Harmony**

   ```typescript
   // Generate complementary colors
   const colors = ColorUtils.generateComplementary('#3b82f6');

   // Generate analogous colors
   const colors = ColorUtils.generateAnalogous('#3b82f6');

   // Generate triadic colors
   const colors = ColorUtils.generateTriadic('#3b82f6');
   ```

3. **Accessibility**

   ```typescript
   // Check WCAG contrast ratio
   const { ratio, AA, AAA } = ColorUtils.checkContrast(
     '#ffffff', // foreground
     '#000000', // background
   );
   ```

4. **Preset Palettes**
   ```typescript
   const presets = {
     nord: {
       /* Nord colors */
     },
     dracula: {
       /* Dracula colors */
     },
     gruvbox: {
       /* Gruvbox colors */
     },
     catppuccin: {
       /* Catppuccin colors */
     },
     tokyo: {
       /* Tokyo Night colors */
     },
   };
   ```

**Color Conversion**:

```typescript
import { colord } from 'colord';

// Convert between formats
const color = colord('#3b82f6');
color.toHex(); // '#3b82f6'
color.toRgb(); // { r: 59, g: 130, b: 246 }
color.toHsl(); // { h: 217, s: 91, l: 60 }

// Manipulate colors
color.lighten(0.1); // 10% lighter
color.darken(0.1); // 10% darker
color.saturate(0.2); // 20% more saturated
color.rotate(180); // Rotate hue 180°

// Mix colors
colord('#ff0000').mix('#0000ff', 0.5); // Purple
```

---

### 4. Theme Validation System

**Purpose**: Validate theme configurations and provide suggestions

**Location**: `src/lib/theme-validator.ts`

**Validation Checks**:

1. **Configuration Validity**
   - Valid TOML syntax
   - Valid color formats
   - Type correctness
   - No unknown modules
   - Required fields present

2. **Visual Issues**
   - Poor color contrast
   - Missing Nerd Font symbols
   - Duplicate modules
   - Empty format string

3. **Performance**
   - Too many modules (>15)
   - Expensive modules (git_status, kubernetes)
   - Estimated render time

4. **Compatibility**
   - Shell-specific features
   - OS-specific symbols
   - Terminal requirements

**Validation Result**:

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[]; // Critical
  warnings: ValidationIssue[]; // Non-critical
  suggestions: string[]; // Improvements
  estimatedRenderTime: number; // ms
}

interface ValidationIssue {
  type: 'config' | 'visual' | 'performance' | 'compatibility';
  severity: 'error' | 'warning';
  message: string;
  fix?: string;
  module?: string;
}
```

**Usage**:

```typescript
import { ThemeValidator } from '@/lib/theme-validator';

const result = ThemeValidator.validateTheme(theme);

if (!result.valid) {
  result.errors.forEach((error) => {
    console.error(error.message);
    if (error.fix) {
      console.log('Suggested fix:', error.fix);
    }
  });
}

result.warnings.forEach((warning) => {
  console.warn(warning.message);
});
```

---

### 5. Suggestion Engine

**Purpose**: Provide intelligent recommendations based on environment and usage

**Location**: `src/lib/suggestion-engine.ts`

**Environment Detection**:

```typescript
interface Environment {
  os: 'windows' | 'macos' | 'linux' | 'unknown';
  shell: 'bash' | 'zsh' | 'fish' | 'pwsh' | 'unknown';
  terminal: string;
  hasNerdFont: boolean;
  installedTools: string[];
}

// Detect environment
const env = await SuggestionEngine.detectEnvironment();
```

**Module Suggestions**:

```typescript
// Suggest modules based on detected tools
const modules = SuggestionEngine.suggestModules(env);

// Example output:
// If git installed → ['git_branch', 'git_status']
// If node installed → ['nodejs', 'package']
// If docker installed → ['docker_context']
```

**Optimization Suggestions**:

```typescript
interface Suggestion {
  type: 'module' | 'performance' | 'visual' | 'compatibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: () => void; // Auto-apply function
}

// Get suggestions
const suggestions = SuggestionEngine.suggestOptimizations(config, env);
```

**Color Scheme Suggestions**:

```typescript
// Suggest color schemes
const palettes = SuggestionEngine.suggestColorScheme();

// Considers:
// - Terminal background (light/dark)
// - Terminal capabilities (256 colors, true color)
// - Accessibility needs
// - User preferences
```

---

## Component Reference

### Core Components

#### TerminalPreview

**Purpose**: Render live terminal preview with current theme

**Location**: `src/components/TerminalPreview/index.tsx`

**Props**: None (uses store)

**Features**:

- xterm.js terminal emulation
- Real-time theme updates
- Multiple example scenarios
- Responsive sizing
- macOS-style window chrome

**Implementation**:

```typescript
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { useThemeStore } from '@/stores/theme-store';
import { parseFormatString } from '@/lib/format-parser';

export const TerminalPreview: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    // Initialize terminal
    const terminal = new Terminal({
      theme: { background: '#1a1a1a' },
      fontFamily: 'Fira Code, monospace',
      fontSize: 14
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current!);
    fitAddon.fit();

    xtermRef.current = terminal;

    return () => terminal.dispose();
  }, []);

  useEffect(() => {
    // Re-render on theme change
    if (xtermRef.current) {
      renderPrompt(xtermRef.current, currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="terminal-window">
      <div ref={terminalRef} />
    </div>
  );
};
```

**Scenarios to Show**:

1. Clean git repository
2. Git with changes (modified, staged, ahead/behind)
3. Different directories
4. Language contexts (node, python, rust)
5. Error state
6. Battery status
7. Time display

---

#### ModuleBuilder

**Purpose**: Drag-and-drop interface for managing modules

**Location**: `src/components/ModuleBuilder/index.tsx`

**Features**:

- List all available modules
- Drag to reorder
- Toggle on/off
- Configure individual modules
- Update format string

**Implementation**:

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

export const ModuleBuilder: React.FC = () => {
  const { currentTheme, updateConfig } = useThemeStore();
  const [modules, setModules] = useState(AVAILABLE_MODULES);

  const handleDragEnd = (event: DragEndEvent) => {
    // Reorder modules
    // Update format string
    updateConfig({ format: newFormat });
  };

  const toggleModule = (module: string) => {
    // Enable/disable module
    updateConfig({
      [module]: { disabled: !currentTheme.config[module]?.disabled }
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={modules}>
        {modules.map(module => (
          <ModuleItem
            key={module}
            id={module}
            enabled={!currentTheme.config[module]?.disabled}
            onToggle={() => toggleModule(module)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
```

**Available Modules**:

```typescript
const AVAILABLE_MODULES = [
  // Core
  'character',
  'directory',
  'line_break',

  // Version Control
  'git_branch',
  'git_status',
  'git_state',
  'git_commit',
  'git_metrics',
  'hg_branch',

  // Languages
  'nodejs',
  'python',
  'rust',
  'golang',
  'java',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'julia',
  'lua',
  'perl',
  'erlang',
  'elixir',
  'nim',
  'crystal',
  'dart',

  // Tools
  'docker_context',
  'kubernetes',
  'terraform',
  'package',
  'cmake',
  'gradle',
  'maven',

  // Cloud
  'aws',
  'gcloud',
  'azure',
  'openstack',

  // System
  'battery',
  'time',
  'username',
  'hostname',
  'cmd_duration',
  'jobs',
  'memory_usage',
  'shell',
  'shlvl',
  'status',
  'sudo',
  'os',

  // Other
  'env_var',
  'custom',
];
```

---

#### ColorPicker

**Purpose**: Select and manage colors

**Location**: `src/components/ColorPicker/index.tsx`

**Props**:

```typescript
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  showPalettes?: boolean;
}
```

**Features**:

- HexColorPicker (react-colorful)
- Preset palettes
- Color suggestions
- Contrast checker
- Format support (hex, rgb, named)

**Tabs**:

1. **Picker**: Interactive color picker
2. **Palettes**: Preset color schemes

**Accessibility**:

- Shows contrast ratio
- Warns if poor contrast (< 4.5:1)
- Suggests alternatives

---

#### ImagePalette

**Purpose**: Extract color palette from images

**Location**: `src/components/ImagePalette/index.tsx`

**Features**:

- Image upload
- Color extraction (node-vibrant)
- Palette display
- Apply to theme

**Extracted Colors**:

- Primary (most vibrant)
- Secondary (muted)
- Accent (light vibrant)
- Background (dark muted)
- Foreground (light muted)
- Success, Error, Warning (calculated)

**Color Application**:

```typescript
// Map palette to module colors
const applyPalette = (palette: ColorPalette) => {
  updateConfig({
    directory: { style: `bold ${palette.primary}` },
    git_branch: { style: palette.secondary },
    character: {
      success_symbol: `[➜](bold ${palette.success})`,
      error_symbol: `[✗](bold ${palette.error})`,
    },
    // ... other modules
  });
};
```

---

#### ModuleConfigPanel

**Purpose**: Configure individual module settings

**Location**: `src/components/ModuleConfigPanel/index.tsx`

**Props**:

```typescript
interface ModuleConfigPanelProps {
  moduleName: string;
  config: ModuleConfig;
  onChange: (config: ModuleConfig) => void;
}
```

**Common Fields**:

- Symbol input
- Style (color picker)
- Format string
- Disabled toggle

**Module-Specific Fields**:

**Directory**:

- truncation_length (slider)
- truncate_to_repo (toggle)
- home_symbol
- read_only

**Git Branch**:

- truncation_length
- truncation_symbol
- always_show_remote
- only_attached

**Git Status**:

- Symbol for each state
- Format customization

**Character**:

- success_symbol
- error_symbol
- Vim mode symbols

---

#### ThemeGallery

**Purpose**: Browse and manage saved themes

**Location**: `src/components/ThemeGallery/index.tsx`

**Features**:

- Grid/list view
- Search and filter
- Sort options
- Preset themes
- Saved themes
- Theme cards with actions

**Theme Card**:

- Name and author
- Description
- Preview thumbnail
- Tags
- Stats (downloads, likes)
- Actions (load, duplicate, export, delete)

**Built-in Presets**:

- Minimal themes (Clean, Simple, One Line)
- Developer themes (Full Stack, DevOps)
- Aesthetic themes (Nord, Dracula, Gruvbox, etc.)

---

#### ExportImport

**Purpose**: Export and import theme configurations

**Location**: `src/components/ExportImport/index.tsx`

**Export Options**:

1. Download .toml file
2. Copy to clipboard
3. Share via URL
4. Generate install script
5. Preview TOML code

**Import Options**:

1. Upload file
2. Paste TOML
3. Import from URL
4. Import from GitHub Gist

**Validation**:

- Check TOML syntax before import
- Warn about overwriting current theme
- Show helpful error messages

---

#### WelcomeWizard

**Purpose**: Guide new users through initial setup

**Location**: `src/components/WelcomeWizard/index.tsx`

**Steps**:

1. Welcome & Introduction
2. Choose starting point
3. Environment detection
4. Color selection
5. Finalize & export

**Features**:

- Progress indicator
- Skip option
- Save progress
- Don't show again

---

### Utility Components

#### Toast

**Purpose**: Show notifications

**Location**: `src/components/Toast.tsx`

**Types**:

- Success (green)
- Error (red)
- Warning (yellow)
- Info (blue)

**Features**:

- Auto-dismiss (configurable)
- Stack multiple toasts
- Swipe to dismiss
- Pause on hover

**Usage**:

```typescript
import { useToast } from '@/hooks/useToast';

const { toast } = useToast();

toast.success('Theme saved!');
toast.error('Invalid TOML format');
toast.warning('This will overwrite your current theme');
toast.info('Tip: Press Cmd+K for command palette');
```

---

#### ErrorBoundary

**Purpose**: Catch and handle React errors

**Location**: `src/components/ErrorBoundary.tsx`

**Features**:

- Catch component errors
- Show friendly error page
- Reset button
- Error reporting

**Usage**:

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## State Management

### Theme Store (Zustand)

**Location**: `src/stores/theme-store.ts`

**State**:

```typescript
interface ThemeStore {
  // State
  currentTheme: Theme;
  savedThemes: Theme[];

  // Actions
  updateConfig: (config: Partial<StarshipConfig>) => void;
  updateMetadata: (metadata: Partial<ThemeMetadata>) => void;
  loadTheme: (theme: Theme) => void;
  saveTheme: () => void;
  deleteTheme: (id: string) => void;
  resetTheme: () => void;
  exportToml: () => string;
  importToml: (toml: string) => void;
}
```

**Persistence**:

```typescript
import { persist } from 'zustand/middleware';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // ... store implementation
    }),
    {
      name: 'starship-theme-storage',
      // Optionally customize what to persist
      partialize: (state) => ({
        savedThemes: state.savedThemes,
      }),
    },
  ),
);
```

**Usage in Components**:

```typescript
import { useThemeStore } from '@/stores/theme-store';

function MyComponent() {
  // Select specific state
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const updateConfig = useThemeStore((state) => state.updateConfig);

  // Or destructure
  const { currentTheme, updateConfig } = useThemeStore();

  // Update config
  updateConfig({
    directory: { style: 'bold cyan' },
  });
}
```

---

## Styling Guide

### Tailwind CSS Setup

**Configuration** (`tailwind.config.js`):

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

### Design System

**Colors**:

```css
/* Primary Actions */
bg-blue-500      /* Primary buttons */
bg-blue-600      /* Hover state */

/* Destructive Actions */
bg-red-500       /* Delete, remove */
bg-red-600       /* Hover */

/* Success */
bg-green-500     /* Success messages */

/* Neutral */
bg-gray-100      /* Backgrounds */
bg-gray-200      /* Borders */
bg-gray-800      /* Dark backgrounds */
```

**Typography**:

```css
text-sm          /* 0.875rem - Small text */
text-base        /* 1rem - Body text */
text-lg          /* 1.125rem - Large text */
text-xl          /* 1.25rem - Headings */
text-2xl         /* 1.5rem - Large headings */

font-normal      /* 400 - Body text */
font-medium      /* 500 - Emphasis */
font-semibold    /* 600 - Headings */
font-bold        /* 700 - Strong emphasis */
```

**Spacing**:

```css
p-2    /* 0.5rem */
p-4    /* 1rem */
p-6    /* 1.5rem */
p-8    /* 2rem */

m-2    /* 0.5rem margin */
gap-4  /* 1rem gap */
```

**Components**:

Button:

```tsx
<button className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
  Click Me
</button>
```

Input:

```tsx
<input className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

Card:

```tsx
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
  Content
</div>
```

---

## Testing Strategy

### Unit Tests (Vitest)

**Test Utilities**:

```typescript
// src/lib/__tests__/toml-parser.test.ts
import { describe, it, expect } from 'vitest';
import { TomlParser } from '../toml-parser';

describe('TomlParser', () => {
  it('should parse valid TOML', () => {
    const toml = '[character]\nsuccess_symbol = "[➜](bold green)"';
    const config = TomlParser.parse(toml);
    expect(config.character?.success_symbol).toBe('[➜](bold green)');
  });

  it('should stringify config to TOML', () => {
    const config = { character: { success_symbol: '[➜](bold green)' } };
    const toml = TomlParser.stringify(config);
    expect(toml).toContain('success_symbol');
  });

  it('should validate config', () => {
    const config = { character: { style: 'invalid-color' } };
    const { valid, errors } = TomlParser.validate(config);
    expect(valid).toBe(false);
    expect(errors).toHaveLength(1);
  });
});
```

### Component Tests

```typescript
// src/components/__tests__/ColorPicker.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from '../ColorPicker';

describe('ColorPicker', () => {
  it('should render with current color', () => {
    render(
      <ColorPicker color="#3b82f6" onChange={() => {}} />
    );
    expect(screen.getByText('#3b82f6')).toBeInTheDocument();
  });

  it('should call onChange when color selected', () => {
    const onChange = vi.fn();
    render(
      <ColorPicker color="#3b82f6" onChange={onChange} />
    );

    fireEvent.click(screen.getByRole('button'));
    // ... select new color
    expect(onChange).toHaveBeenCalled();
  });
});
```

### Integration Tests

```typescript
// src/__tests__/integration/theme-workflow.test.tsx
describe('Complete Theme Workflow', () => {
  it('should create, edit, and export theme', () => {
    // 1. Create new theme
    // 2. Add modules
    // 3. Change colors
    // 4. Export TOML
    // 5. Verify output
  });
});
```

---

## Performance Optimization

### Code Splitting

```typescript
// Lazy load heavy components
const ThemeGallery = lazy(() => import('@/components/ThemeGallery'));
const WelcomeWizard = lazy(() => import('@/components/WelcomeWizard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ThemeGallery />
    </Suspense>
  );
}
```

### Memoization

```typescript
// Memoize expensive calculations
const parsedFormat = useMemo(
  () => parseFormatString(format, config),
  [format, config],
);

// Memoize callbacks
const handleColorChange = useCallback(
  (color: string) => {
    updateConfig({ directory: { style: `bold ${color}` } });
  },
  [updateConfig],
);

// Memoize components
export const ColorPicker = React.memo(({ color, onChange }) => {
  // ...
});
```

### Debouncing

```typescript
import { useDebounce } from '@/hooks/useDebounce';

function ColorPicker({ onChange }) {
  const [color, setColor] = useState('#3b82f6');
  const debouncedColor = useDebounce(color, 300);

  useEffect(() => {
    onChange(debouncedColor);
  }, [debouncedColor]);

  return <HexColorPicker color={color} onChange={setColor} />;
}
```

---

## Accessibility

### ARIA Labels

```tsx
<button aria-label="Save theme">
  <SaveIcon />
</button>

<input
  aria-labelledby="directory-label"
  aria-describedby="directory-help"
/>
```

### Keyboard Navigation

```typescript
// Handle keyboard shortcuts
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      saveTheme();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

### Screen Reader Support

```tsx
<div role="status" aria-live="polite">
  {isLoading && 'Loading theme...'}
</div>
```

---

## Deployment

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## Maintenance

### Regular Updates

- **Weekly**: Check for dependency updates
- **Monthly**: Review and fix reported bugs
- **Quarterly**: Update Starship module support
- **Yearly**: Major version updates

### Monitoring

- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Lighthouse CI)
- User feedback (GitHub issues)

---

## Troubleshooting

### Common Issues

**Terminal not rendering**:

- Check xterm.js initialization
- Verify ANSI code generation
- Check terminal theme

**Colors not applying**:

- Verify color format (hex, rgb, named)
- Check format string syntax
- Validate ANSI conversion

**Import fails**:

- Check TOML syntax
- Verify file encoding (UTF-8)
- Check for unsupported modules

**Performance issues**:

- Too many modules enabled
- Expensive modules (git_status)
- Large format strings
- Unoptimized re-renders

---

## FAQ

**Q: How do I add support for a new Starship module?**
A: Add the module to AVAILABLE_MODULES, update TypeScript types, and create configuration panel.

**Q: Can users share themes?**
A: Yes, via share URL (base64 encoded) or by exporting .toml files.

**Q: Does it work offline?**
A: Yes, with PWA support and service worker caching.

**Q: How do I add a new preset theme?**
A: Add to presets.ts with complete configuration and metadata.

**Q: Can I use this with other prompt frameworks?**
A: Not directly, but the architecture could be adapted.

---

## Appendix

### Starship Documentation

- Official docs: https://starship.rs/
- Config reference: https://starship.rs/config/
- Advanced config: https://starship.rs/advanced-config/

### Resources

- React docs: https://react.dev/
- TypeScript docs: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/
- xterm.js: https://xtermjs.org/
- Zustand: https://github.com/pmndrs/zustand

---

**End of Master Manual**

This manual is a living document. Update as the project evolves.

For questions or contributions, see CONTRIBUTING.md
