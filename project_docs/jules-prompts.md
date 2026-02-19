# Prompts for Jules - Step-by-Step Development Guide

This document contains specific prompts you can give to Jules (Google AI) to build each component of the Starship Theme Creator.

---

## Phase 1: Project Setup

### Prompt 1: Initialize Project

```
I'm building a Starship prompt theme creator. Please:

1. Create a React + TypeScript + Vite project structure
2. Set up Tailwind CSS with a modern configuration
3. Install these core dependencies:
   - @iarna/toml (TOML parsing)
   - xterm and xterm-addon-fit (terminal emulation)
   - zustand (state management)
   - react-colorful (color picker)
   - colord (color manipulation)
   - @dnd-kit/core and @dnd-kit/sortable (drag and drop)

4. Create this folder structure:
   src/
   ├── components/
   ├── lib/
   ├── stores/
   ├── types/
   └── App.tsx

Show me the complete package.json, vite.config.ts, and tailwind.config.js files.
```

---

## Phase 2: Core Utilities

### Prompt 2: TypeScript Types

```
Create comprehensive TypeScript types for Starship configuration in src/types/starship.types.ts

Include types for:
1. StarshipConfig (main config object)
2. All module configs (character, directory, git_branch, git_status, nodejs, python, rust, docker, kubernetes, aws, battery, time, etc.)
3. ThemeMetadata (name, author, description, tags, dates)
4. Theme (metadata + config)
5. ColorPalette

Reference the official Starship docs at https://starship.rs/config/ for accurate module properties.
Make the types as complete as possible with optional fields.
```

### Prompt 3: TOML Parser

```
Create a TOML parser utility in src/lib/toml-parser.ts that:

1. Parses TOML strings to StarshipConfig objects
2. Converts StarshipConfig objects back to TOML strings
3. Provides a default Starship configuration
4. Validates configurations (check for invalid colors, missing required fields)
5. Merges configurations (for applying presets)

Use @iarna/toml library. Include proper error handling and TypeScript types.
```

### Prompt 4: Color Utilities

```
Create a comprehensive color utility library in src/lib/color-utils.ts that:

1. Extracts color palettes from uploaded images using Vibrant.js
2. Generates complementary, analogous, and triadic color schemes
3. Checks WCAG contrast ratios for accessibility
4. Converts colors to ANSI-compatible style strings
5. Includes preset color schemes: Nord, Dracula, Gruvbox, Catppuccin, Tokyo Night

Use colord library with a11y plugin. Return colors in hex format.
```

---

## Phase 3: State Management

### Prompt 5: Theme Store

```
Create a Zustand store in src/stores/theme-store.ts with persistence that manages:

1. currentTheme (active theme being edited)
2. savedThemes (array of saved themes)

Actions needed:
- updateConfig: Update parts of the config
- updateMetadata: Update theme metadata
- loadTheme: Load a theme for editing
- saveTheme: Save current theme to savedThemes
- deleteTheme: Remove a saved theme
- resetTheme: Reset to default config
- exportToml: Convert current theme to TOML string
- importToml: Parse TOML and load as current theme

Use zustand/middleware persist to save to localStorage.
```

---

## Phase 4: Terminal Preview

### Prompt 6: Terminal Preview Component

```
Create a terminal preview component in src/components/TerminalPreview/index.tsx that:

1. Uses xterm.js to render a terminal
2. Displays a mock prompt based on the current theme configuration
3. Shows multiple example scenarios:
   - Clean repository
   - Git status with changes
   - Different directory levels
   - Various programming language contexts

The component should:
- Re-render when theme changes
- Use the FitAddon to properly size the terminal
- Style the terminal window with macOS-style traffic lights
- Parse the format string and render each module with proper colors

Most importantly: Create a format string parser that converts Starship's format syntax (like "$directory$git_branch") into actual rendered text with ANSI colors.
```

### Prompt 7: Format String Parser

```
Create a smart format string parser that:

1. Takes a Starship format string like: "[$directory](bold cyan) on [$git_branch](bold purple)"
2. Parses style definitions like "(bold red)" or "(bg:blue fg:yellow)"
3. Converts styles to ANSI escape codes
4. Handles module variables like $directory, $git_branch, etc.
5. Renders the full prompt with proper colors in xterm.js

The parser should support:
- Foreground/background colors (hex, named, rgb)
- Text styles (bold, italic, underline)
- Module variables and their default symbols
- Conditional formatting

Return a function that takes a format string and config, and returns ANSI-formatted text.
```

---

## Phase 5: Configuration UI

### Prompt 8: Module Builder with Drag & Drop

```
Create a module builder in src/components/ModuleBuilder/index.tsx that:

1. Lists all available Starship modules
2. Allows drag-and-drop reordering using @dnd-kit
3. Toggle modules on/off with checkboxes
4. Updates the format string automatically when modules change
5. Shows enabled modules at the top, disabled at bottom
6. Has a configure button for each module (opens config panel)

Modules to include: character, directory, git_branch, git_status, git_state, nodejs, python, rust, golang, java, php, docker_context, kubernetes, aws, gcloud, battery, time, username, hostname, cmd_duration, package, memory_usage, env_var, and more.

Use clean, modern UI with Tailwind CSS.
```

### Prompt 9: Color Picker Component

```
Create an advanced color picker in src/components/ColorPicker/index.tsx that:

1. Uses react-colorful for the main picker
2. Has two tabs: "Picker" and "Palettes"
3. In Picker tab:
   - Shows hex color picker
   - Displays current color and hex value
   - Shows complementary color suggestions below
4. In Palettes tab:
   - Lists preset color schemes (Nord, Dracula, etc.)
   - Shows all colors in each palette
   - Clicking a color applies it

Make it a dropdown that opens when clicking a color swatch button.
Include contrast ratio checker that warns if foreground/background contrast is poor.
```

### Prompt 10: Image to Palette Tool

```
Create an image-to-palette component in src/components/ImagePalette/index.tsx that:

1. Accepts image file uploads (png, jpg, webp)
2. Shows image preview
3. Extracts dominant colors using Vibrant.js
4. Displays extracted palette with color names (primary, secondary, accent, background, foreground, success, error, warning)
5. Has "Apply Palette to Theme" button that sets all module colors
6. Shows loading state while extracting

Generate intelligent color assignments:
- Primary: for main elements
- Accent: for highlights
- Background/Foreground: for text and backgrounds
- Success/Error/Warning: for git status

Use a clean card-based UI.
```

---

## Phase 6: Module Configuration

### Prompt 11: Module Config Panels

```
Create individual configuration panels for these key modules:

1. Character Module:
   - success_symbol, error_symbol inputs
   - vim mode symbols
   - Preview of each state

2. Directory Module:
   - truncation_length slider
   - truncate_to_repo toggle
   - home_symbol input
   - read_only symbol

3. Git Branch:
   - symbol input
   - truncation_length
   - always_show_remote toggle

4. Git Status:
   - Symbols for each state (ahead, behind, conflicted, etc.)
   - Visual preview of each state

Create a reusable ModuleConfigPanel component that:
- Takes module name and config as props
- Renders appropriate inputs based on module type
- Updates the store when values change
- Shows live preview of the module

Use form inputs, sliders, toggles, and symbol pickers.
```

### Prompt 12: Symbol/Icon Browser

```
Create a Nerd Font symbol browser in src/components/IconBrowser/index.tsx that:

1. Shows a grid of common Nerd Font icons
2. Has categories: Arrows, Git, Languages, Files, etc.
3. Search functionality
4. Click to copy unicode character
5. Shows symbol preview with name
6. Includes popular symbols like:
   - Arrows: →, ←, ↑, ↓, ➜, ⇒
   - Git: , , , ,
   - Languages: , , , , ,
   - Files: , , ,

Make it a modal or sidebar that opens when clicking symbol input fields.
Can also paste custom symbols.
```

---

## Phase 7: Layout & Design

### Prompt 13: Main App Layout

```
Create the main app layout in src/App.tsx with:

1. Header:
   - App title "Starship Theme Creator"
   - Save, Load, Export buttons
   - Theme name input

2. Three-column layout:
   - Left sidebar (300px): Module list and toggles
   - Center (flexible): Terminal preview (large)
   - Right sidebar (300px): Selected module configuration

3. Responsive design:
   - Stack vertically on mobile
   - Collapsible sidebars

4. Modern design:
   - Clean, minimal interface
   - Good contrast
   - Smooth transitions
   - Tailwind CSS styling

Include keyboard shortcuts:
- Cmd/Ctrl + S: Save theme
- Cmd/Ctrl + E: Export TOML
- Cmd/Ctrl + I: Import TOML
```

### Prompt 14: Export/Import UI

```
Create an export/import component in src/components/ExportImport/index.tsx with:

1. Export options:
   - Download .toml file
   - Copy to clipboard
   - Share via URL (base64 encoded)
   - Generate install script
   - Create QR code for mobile

2. Import options:
   - Upload .toml file
   - Paste from clipboard
   - Import from URL
   - Import from GitHub Gist

3. Export format preview:
   - Show the TOML output in a code editor
   - Syntax highlighting
   - Line numbers

Add validation before import - check if TOML is valid and warn about issues.
```

---

## Phase 8: Advanced Features

### Prompt 15: Theme Gallery

```
Create a theme gallery in src/components/ThemeGallery/index.tsx that:

1. Shows grid of saved themes
2. Each card displays:
   - Theme name and author
   - Preview screenshot/thumbnail
   - Tags
   - Like count
   - Last updated date
3. Actions:
   - Load theme (edit)
   - Duplicate theme
   - Delete theme
   - Export theme
4. Filters:
   - Search by name
   - Filter by tags
   - Sort by date/popularity

Include example themes to get started.
Create thumbnail generator that renders the prompt to canvas.
```

### Prompt 16: Preset Themes

```
Create a comprehensive preset library with themes for:

1. Minimal themes:
   - Clean: Just directory and git
   - Simple: Basic info only
   - One Line: Everything on one line

2. Developer themes:
   - Full Stack: All language modules
   - DevOps: Docker, K8s, Cloud
   - Git Focused: Detailed git status

3. Aesthetic themes:
   - Nord
   - Dracula
   - Gruvbox
   - Catppuccin
   - Tokyo Night

Each preset should be a complete working Starship config.
Create a PresetBrowser component with preview and one-click apply.
```

### Prompt 17: Theme Validator

```
Create a theme validator in src/lib/theme-validator.ts that checks:

1. Configuration validity:
   - Valid TOML syntax
   - Valid color formats
   - Required fields present
   - No conflicting options

2. Dependencies:
   - Nerd Fonts installed (warn if symbols won't render)
   - Required binaries (git, node, etc.)
   - Shell compatibility

3. Performance:
   - Estimate prompt render time
   - Warn if too many modules enabled
   - Suggest optimizations

4. Accessibility:
   - Color contrast ratios
   - Visibility of important info

Return detailed report with warnings and suggestions.
Show in a ValidationPanel component.
```

---

## Phase 9: Enhancements

### Prompt 18: Smart Suggestions

```
Create a suggestion engine that:

1. Detects user's environment:
   - Operating system
   - Installed tools (git, docker, node, etc.)
   - Shell type
   - Terminal emulator

2. Recommends relevant modules:
   - If git detected → enable git modules
   - If node detected → enable nodejs/npm
   - If docker detected → enable docker_context

3. Suggests optimizations:
   - Disable unused modules
   - Use simpler symbols if no Nerd Fonts
   - Reduce modules for slow terminals

4. Color scheme suggestions:
   - Match terminal color scheme
   - Suggest high-contrast themes for readability

Create a WelcomeWizard component that guides new users through setup.
```

### Prompt 19: Comparison View

```
Create a before/after comparison tool in src/components/Comparison/index.tsx that:

1. Shows two terminals side-by-side
2. Left: Current theme
3. Right: Preview of changes or different theme
4. Highlights differences
5. Export comparison as image
6. Share comparison via URL

Useful for:
- Testing changes before applying
- Comparing multiple themes
- Showing improvements to others
- A/B testing designs
```

### Prompt 20: Installation Guide

```
Create an installation guide component that:

1. Generates step-by-step instructions based on user's OS
2. Includes shell-specific instructions (bash, zsh, fish, pwsh)
3. Shows how to:
   - Install Starship if not installed
   - Install Nerd Fonts
   - Apply the theme
   - Test the configuration

4. Provides copy-paste commands
5. Links to official docs
6. Troubleshooting section

Make it a modal that opens after exporting a theme.
Include video tutorial links.
```

---

## Phase 10: Polish & Testing

### Prompt 21: Error Handling & Loading States

```
Implement comprehensive error handling:

1. Failed TOML parsing:
   - Show specific error location
   - Suggest fixes
   - Offer to reset to default

2. Image upload errors:
   - File type validation
   - Size limits
   - Color extraction failures

3. Network errors (if using API):
   - Retry logic
   - Offline mode
   - Cache themes locally

Add loading states for:
- Initial app load
- Theme loading
- Image processing
- Export/import operations

Use skeletons, spinners, and progress bars appropriately.
```

### Prompt 22: Keyboard Shortcuts & Accessibility

```
Implement keyboard navigation:

1. Global shortcuts:
   - Cmd/Ctrl + S: Save
   - Cmd/Ctrl + E: Export
   - Cmd/Ctrl + N: New theme
   - Cmd/Ctrl + O: Open theme
   - Cmd/Ctrl + /: Open command palette

2. Navigation:
   - Tab: Move between inputs
   - Arrow keys: Navigate module list
   - Enter: Open module config
   - Escape: Close modals

3. Accessibility:
   - ARIA labels on all interactive elements
   - Screen reader announcements
   - Focus indicators
   - High contrast mode support
   - Keyboard-only usable

Create a CommandPalette component for quick actions.
```

### Prompt 23: Performance Optimization

```
Optimize the app for performance:

1. Code splitting:
   - Lazy load theme gallery
   - Lazy load module config panels
   - Dynamic imports for heavy libraries

2. Memoization:
   - Memoize terminal rendering
   - Memoize color calculations
   - Use React.memo for components

3. Virtual scrolling:
   - For long module lists
   - For theme gallery

4. Debouncing:
   - Color picker changes
   - Search inputs
   - Config updates

5. Web Workers:
   - TOML parsing
   - Image color extraction
   - Theme validation

Measure with React DevTools and Lighthouse.
Target: <100ms interaction latency, <3s initial load.
```

---

## Bonus Features

### Prompt 24: AI-Powered Theme Generator

```
Create an AI theme generator that:

1. Takes user preferences:
   - Preferred colors
   - Complexity level (minimal/moderate/full)
   - Use case (development/sysadmin/general)
   - Style (modern/retro/colorful/monochrome)

2. Generates a complete theme matching preferences
3. Uses Claude API to create creative, unique themes
4. Allows regeneration with tweaked parameters
5. Explains design choices

This could be a premium feature or powered by local rules engine.
```

### Prompt 25: Community Features

```
Add community features (requires backend):

1. User accounts:
   - Sign up/login
   - Profile with avatar
   - Theme collection

2. Theme sharing:
   - Publish themes publicly
   - Private themes
   - Like/favorite themes
   - Comments and ratings

3. Social:
   - Follow users
   - Theme collections/playlists
   - Featured themes
   - Weekly challenges

4. API endpoints needed:
   - POST /themes (create)
   - GET /themes (list with filters)
   - GET /themes/:id
   - PUT /themes/:id (update)
   - DELETE /themes/:id
   - POST /themes/:id/like

Create using Next.js API routes + Supabase or Firebase.
```

---

## Final Integration Prompts

### Prompt 26: Build Production Version

```
Prepare the app for production:

1. Environment configuration:
   - Production API URLs
   - Analytics setup
   - Error tracking (Sentry)
   - Feature flags

2. Build optimization:
   - Minification
   - Tree shaking
   - Asset optimization
   - Bundle analysis

3. SEO:
   - Meta tags
   - Open Graph images
   - Sitemap
   - Structured data

4. PWA features:
   - Service worker
   - Offline support
   - App install prompt
   - App icons

5. Deployment:
   - Vercel/Netlify config
   - CI/CD pipeline
   - Environment variables
   - Domain setup

Generate build scripts and deployment docs.
```

### Prompt 27: Testing Suite

```
Create comprehensive tests:

1. Unit tests (Vitest):
   - TOML parser
   - Color utilities
   - Theme validator
   - Format string parser

2. Component tests (React Testing Library):
   - ColorPicker
   - ModuleBuilder
   - TerminalPreview
   - ExportImport

3. Integration tests:
   - Complete workflow: create → edit → export
   - Import → modify → save
   - Apply preset → customize → export

4. E2E tests (Playwright):
   - User signup → create theme → share
   - Import theme → modify → download
   - Browse gallery → apply theme

Target: >80% code coverage, all critical paths tested.
```

---

## Documentation

### Prompt 28: User Documentation

```
Create comprehensive user documentation:

1. Getting Started Guide:
   - What is Starship
   - How to use the theme creator
   - First theme walkthrough

2. Feature Guides:
   - Using the color picker
   - Module configuration
   - Importing/exporting themes
   - Keyboard shortcuts

3. Advanced Topics:
   - Custom format strings
   - Conditional formatting
   - Performance optimization
   - Shell-specific tips

4. FAQ:
   - Common issues
   - Troubleshooting
   - Best practices

5. Video Tutorials:
   - Script for tutorial videos
   - Screenshot guides

Create as MDX files with interactive examples.
```

### Prompt 29: Developer Documentation

```
Create developer documentation:

1. Architecture overview
2. Component documentation
3. State management guide
4. API reference
5. Contributing guide
6. Code style guide
7. Testing guide
8. Deployment guide

Use TypeDoc for API docs, Storybook for components.
```

---

## Marketing & Launch

### Prompt 30: Launch Materials

```
Create launch materials:

1. Landing page:
   - Hero section with demo
   - Features showcase
   - Testimonials placeholder
   - CTA buttons

2. Product Hunt launch:
   - Product description
   - Screenshots
   - GIF demos
   - First comment

3. Social media:
   - Twitter announcement thread
   - Reddit post for r/commandline
   - Dev.to article
   - Hacker News Show HN post

4. Press kit:
   - Logo variants
   - Screenshots
   - Product description
   - Founder bio

5. Demo video script

Make materials engaging and show real value quickly.
```

---

## Tips for Working with Jules

1. **Be specific**: Give exact file paths, function names, and expected behavior
2. **One feature at a time**: Don't combine multiple complex features in one prompt
3. **Provide context**: Remind Jules of related code from previous prompts
4. **Ask for explanations**: Request comments and documentation in the code
5. **Iterate**: Review output and refine in follow-up prompts
6. **Test frequently**: Ask Jules to suggest test cases for each feature

Example follow-up prompts:

- "The color picker isn't updating the preview correctly. Here's the current code: [paste code]. Fix the issue."
- "Add TypeScript types to this component and ensure all props are properly typed"
- "This component re-renders too often. Optimize it using React.memo and useCallback"
- "Write unit tests for the TOML parser covering these edge cases: [list cases]"

Good luck building your Starship Theme Creator! 🚀
