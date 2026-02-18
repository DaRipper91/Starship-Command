# Starship Theme Creator - Quick Reference Cheat Sheet

**Fast lookup guide for common tasks and code snippets**

---

## 🚀 Quick Start Commands

```bash
# Setup
npm create vite@latest starship-theme-creator -- --template react-ts
cd starship-theme-creator
npm install

# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build
npm test                 # Run tests
npm run lint             # Lint code
npm run format           # Format code

# Deploy
vercel --prod            # Deploy to Vercel
netlify deploy --prod    # Deploy to Netlify
```

---

## 📁 File Locations Reference

```
Core Files:
- Types:          src/types/starship.types.ts
- TOML Parser:    src/lib/toml-parser.ts
- Format Parser:  src/lib/format-parser.ts
- Color Utils:    src/lib/color-utils.ts
- Store:          src/stores/theme-store.ts

Components:
- Terminal:       src/components/TerminalPreview/
- Modules:        src/components/ModuleBuilder/
- Colors:         src/components/ColorPicker/
- Config:         src/components/ModuleConfigPanel/
- Gallery:        src/components/ThemeGallery/
- Import/Export:  src/components/ExportImport/
```

---

## 🎯 Common Tasks

### Access Theme Store

```typescript
import { useThemeStore } from '@/stores/theme-store';

// In component
const { currentTheme, updateConfig, saveTheme } = useThemeStore();

// Update config
updateConfig({ 
  directory: { style: 'bold cyan' }
});

// Save theme
saveTheme();

// Export TOML
const toml = exportToml();
```

### Parse TOML

```typescript
import { TomlParser } from '@/lib/toml-parser';

// Parse string to config
const config = TomlParser.parse(tomlString);

// Config to string
const toml = TomlParser.stringify(config);

// Validate
const { valid, errors } = TomlParser.validate(config);

// Get defaults
const defaults = TomlParser.getDefaultConfig();
```

### Work with Colors

```typescript
import { ColorUtils } from '@/lib/color-utils';

// Extract from image
const palette = await ColorUtils.extractPaletteFromImage(file);

// Generate harmony
const colors = ColorUtils.generateComplementary('#3b82f6');
const colors = ColorUtils.generateAnalogous('#3b82f6');
const colors = ColorUtils.generateTriadic('#3b82f6');

// Check contrast
const { ratio, AA, AAA } = ColorUtils.checkContrast('#fff', '#000');

// Use presets
const nord = ColorUtils.presets.nord;
const dracula = ColorUtils.presets.dracula;
```

### Parse Format Strings

```typescript
import { parseFormatString } from '@/lib/format-parser';

// Convert to ANSI
const ansi = parseFormatString(
  '[$directory](bold cyan) on [$git_branch](purple)',
  config
);

// Render in terminal
terminal.write(ansi);
```

### Show Notifications

```typescript
import { useToast } from '@/hooks/useToast';

const { toast } = useToast();

toast.success('Theme saved!');
toast.error('Invalid configuration');
toast.warning('Overwriting theme');
toast.info('Tip: Press Cmd+K');
```

---

## 🎨 Styling Snippets

### Common Button Styles

```tsx
{/* Primary */}
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
  Primary
</button>

{/* Secondary */}
<button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
  Secondary
</button>

{/* Danger */}
<button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
  Delete
</button>

{/* Icon Button */}
<button className="p-2 rounded-full hover:bg-gray-100">
  <Icon />
</button>
```

### Common Input Styles

```tsx
{/* Text Input */}
<input 
  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="text"
/>

{/* Textarea */}
<textarea 
  className="px-3 py-2 border rounded w-full resize-none focus:ring-2 focus:ring-blue-500"
  rows={4}
/>

{/* Select */}
<select className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500">
  <option>Option 1</option>
</select>

{/* Checkbox */}
<input 
  type="checkbox"
  className="w-4 h-4 text-blue-500 rounded focus:ring-2"
/>
```

### Card Layouts

```tsx
{/* Simple Card */}
<div className="p-6 bg-white border rounded-lg shadow-sm">
  Content
</div>

{/* Card with Header */}
<div className="bg-white border rounded-lg overflow-hidden">
  <div className="px-6 py-4 border-b bg-gray-50">
    <h3 className="font-semibold">Header</h3>
  </div>
  <div className="p-6">
    Content
  </div>
</div>

{/* Interactive Card */}
<div className="p-6 bg-white border rounded-lg hover:shadow-md transition cursor-pointer">
  Content
</div>
```

---

## 🔧 Component Patterns

### Basic Component Template

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onSave: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onSave 
}) => {
  const [value, setValue] = React.useState('');

  return (
    <div className="p-4">
      <h2>{title}</h2>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};
```

### Modal Pattern

```typescript
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <button 
          onClick={onClose}
          className="float-right text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
```

### Custom Hook Pattern

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearch = useDebounce(searchTerm, 300);
```

---

## 📊 TypeScript Types Quick Ref

### StarshipConfig Structure

```typescript
interface StarshipConfig {
  // Global
  format?: string;
  right_format?: string;
  scan_timeout?: number;
  add_newline?: boolean;
  
  // Common module structure
  [moduleName]: {
    disabled?: boolean;
    format?: string;
    style?: string;
    symbol?: string;
    // ... module-specific fields
  }
}
```

### Common Module Types

```typescript
// Directory
directory: {
  truncation_length?: number;
  truncate_to_repo?: boolean;
  home_symbol?: string;
  style?: string;
}

// Git Branch
git_branch: {
  symbol?: string;
  truncation_length?: number;
  truncation_symbol?: string;
  style?: string;
}

// Character
character: {
  success_symbol?: string;
  error_symbol?: string;
  vimcmd_symbol?: string;
}
```

---

## 🎹 Keyboard Shortcuts

```typescript
// Implementation pattern
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    const isMod = e.metaKey || e.ctrlKey;
    
    if (isMod && e.key === 's') {
      e.preventDefault();
      saveTheme();
    }
    
    if (isMod && e.key === 'e') {
      e.preventDefault();
      exportTheme();
    }
    
    if (isMod && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    
    if (e.key === 'Escape') {
      closeModals();
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

**Default Shortcuts:**
- `Cmd/Ctrl + S` - Save theme
- `Cmd/Ctrl + E` - Export
- `Cmd/Ctrl + I` - Import
- `Cmd/Ctrl + N` - New theme
- `Cmd/Ctrl + K` - Command palette
- `Cmd/Ctrl + /` - Show shortcuts
- `Escape` - Close modal

---

## 🎨 ANSI Color Codes

```typescript
// Text colors
\x1b[30m  // Black
\x1b[31m  // Red
\x1b[32m  // Green
\x1b[33m  // Yellow
\x1b[34m  // Blue
\x1b[35m  // Magenta
\x1b[36m  // Cyan
\x1b[37m  // White

// Background colors (add 10)
\x1b[40m  // Black background
\x1b[41m  // Red background
// etc.

// Text styles
\x1b[0m   // Reset
\x1b[1m   // Bold
\x1b[2m   // Dim
\x1b[3m   // Italic
\x1b[4m   // Underline

// 256 colors
\x1b[38;5;${n}m  // Foreground color n (0-255)
\x1b[48;5;${n}m  // Background color n (0-255)

// RGB colors
\x1b[38;2;${r};${g};${b}m  // Foreground RGB
\x1b[48;2;${r};${g};${b}m  // Background RGB

// Example
const redBold = '\x1b[1;31mRed Bold Text\x1b[0m';
```

---

## 🔍 Debugging Tips

### React DevTools

```typescript
// Add display name for debugging
MyComponent.displayName = 'MyComponent';

// Log renders
useEffect(() => {
  console.log('Component rendered', { props });
});

// Measure performance
console.time('Operation');
// ... expensive operation
console.timeEnd('Operation');
```

### Store Debugging

```typescript
// Log all state changes
const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ... store
      }),
      { name: 'theme-storage' }
    ),
    { name: 'ThemeStore' }
  )
);
```

### Component Testing

```typescript
// Quickly test component in isolation
import { MyComponent } from './MyComponent';

function TestPage() {
  return (
    <div className="p-8">
      <MyComponent 
        title="Test"
        onSave={() => console.log('saved')}
      />
    </div>
  );
}
```

---

## 🐛 Common Errors & Fixes

### "Cannot find module '@/...'"

**Fix:** Check `tsconfig.json` has paths configured:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

And `vite.config.ts`:
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

### "Module not found: xterm.css"

**Fix:** Import CSS in component:
```typescript
import 'xterm/css/xterm.css';
```

### "localStorage is not defined"

**Fix:** Check for browser environment:
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```

### "React Hook useEffect has missing dependencies"

**Fix:** Add to dependency array or use `useCallback`:
```typescript
// Option 1: Add dependency
useEffect(() => {
  doSomething(value);
}, [value]); // Add value

// Option 2: Use callback
const doSomething = useCallback(() => {
  // ...
}, []);

useEffect(() => {
  doSomething();
}, [doSomething]);
```

---

## 📦 Essential Imports Cheat Sheet

```typescript
// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Store
import { useThemeStore } from '@/stores/theme-store';

// Utilities
import { TomlParser } from '@/lib/toml-parser';
import { ColorUtils } from '@/lib/color-utils';
import { parseFormatString } from '@/lib/format-parser';

// Components
import { TerminalPreview } from '@/components/TerminalPreview';
import { ColorPicker } from '@/components/ColorPicker';
import { ModuleBuilder } from '@/components/ModuleBuilder';

// Hooks
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';

// Icons (lucide-react)
import { Save, Download, Upload, Settings, X } from 'lucide-react';

// Terminal
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

// Color picker
import { HexColorPicker } from 'react-colorful';

// Drag and drop
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
```

---

## 🌈 Preset Color Palettes

```typescript
// Quick access to preset palettes
const palettes = {
  nord: {
    bg: '#2E3440',
    fg: '#ECEFF4',
    primary: '#88C0D0',
    accent: '#B48EAD',
    success: '#A3BE8C',
    error: '#BF616A',
    warning: '#EBCB8B'
  },
  
  dracula: {
    bg: '#282A36',
    fg: '#F8F8F2',
    primary: '#BD93F9',
    accent: '#FF79C6',
    success: '#50FA7B',
    error: '#FF5555',
    warning: '#F1FA8C'
  },
  
  gruvbox: {
    bg: '#282828',
    fg: '#EBDBB2',
    primary: '#FABD2F',
    accent: '#D3869B',
    success: '#B8BB26',
    error: '#FB4934',
    warning: '#FE8019'
  }
};
```

---

## 🔗 Useful Links

**Documentation:**
- Starship: https://starship.rs/config/
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/docs/
- Tailwind: https://tailwindcss.com/docs
- Vite: https://vitejs.dev/guide/

**Libraries:**
- xterm.js: https://xtermjs.org/docs/
- Zustand: https://github.com/pmndrs/zustand
- colord: https://github.com/omgovich/colord
- @dnd-kit: https://docs.dndkit.com/

**Tools:**
- Nerd Fonts: https://www.nerdfonts.com/cheat-sheet
- TOML Spec: https://toml.io/en/

---

## 📝 Git Workflow

```bash
# Start new feature
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create PR, review, merge

# Update main
git checkout main
git pull origin main

# Delete feature branch
git branch -d feature/new-feature
```

---

## 🚢 Deployment Checklist

```bash
# Pre-deployment
[ ] Run tests: npm test
[ ] Build succeeds: npm run build
[ ] No TypeScript errors: npm run type-check
[ ] Lint passes: npm run lint
[ ] Preview works: npm run preview

# Environment
[ ] Set environment variables
[ ] Update API endpoints
[ ] Configure analytics

# Deploy
[ ] Deploy to Vercel/Netlify
[ ] Test production site
[ ] Check all features work
[ ] Verify analytics tracking

# Post-deployment
[ ] Monitor error logs
[ ] Check performance metrics
[ ] Gather user feedback
```

---

## 💡 Performance Tips

```typescript
// 1. Memoize expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);

// 2. Debounce frequent updates
const debouncedValue = useDebounce(value, 300);

// 3. Lazy load components
const Gallery = lazy(() => import('./Gallery'));

// 4. Use React.memo for pure components
export const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// 5. Optimize re-renders
const handleClick = useCallback(() => {
  // handler
}, []);

// 6. Virtual lists for long lists
import { FixedSizeList } from 'react-window';
```

---

## 🎯 Testing Quick Reference

```typescript
// Unit test
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should do something', () => {
    expect(myFunction(input)).toBe(expected);
  });
});

// Component test
import { render, screen } from '@testing-library/react';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

// User interaction
import { fireEvent } from '@testing-library/react';

fireEvent.click(screen.getByRole('button'));
expect(mockFn).toHaveBeenCalled();
```

---

## 🎨 Icon Quick Reference

```typescript
// Common Lucide icons
import { 
  Save,           // Save icon
  Download,       // Download
  Upload,         // Upload
  Settings,       // Settings gear
  X,              // Close/cancel
  Check,          // Checkmark
  Edit,           // Edit pencil
  Trash,          // Delete
  Copy,           // Copy
  ExternalLink,   // External link
  ChevronDown,    // Dropdown arrow
  Search,         // Search
  Plus,           // Add
  Minus,          // Remove
  Eye,            // View
  EyeOff,         // Hide
  Sun,            // Light mode
  Moon,           // Dark mode
} from 'lucide-react';

// Usage
<Save className="w-5 h-5" />
```

---

**End of Quick Reference**

Keep this handy while developing! 🚀
