import { StarshipConfig } from '../types/starship.types';
import { MOCK_SCENARIOS, MockScenario } from './mock-data';

/**
 * Parses a Starship format string and renders it with ANSI escape codes
 * @param format - The format string (e.g. "[$directory](bold cyan)")
 * @param config - The Starship configuration
 * @param scenario - The mock scenario to use for values (default: clean)
 * @returns Rendered string with ANSI codes
 */
export function parseFormatString(
  format: string,
  config: StarshipConfig,
  scenario: MockScenario = MOCK_SCENARIOS.clean,
): string {
  if (!format) return '';

  let processed = format;

  // Replace module variables ($directory)
  processed = processed.replace(/\$([a-zA-Z0-9_]+)/g, (_match, moduleName) => {
    return renderModule(moduleName, config, scenario);
  });

  // Replace styled groups ([text](style))
  // Iterate to handle nested brackets (limited depth)
  let prevProcessed = '';
  let iterations = 0;
  while (processed !== prevProcessed && iterations < 5) {
    prevProcessed = processed;
    processed = processed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_match, text, style) => {
        const ansi = styleToAnsi(style);
        // ANSI reset code is \x1b[0m
        return `${ansi}${text}\x1b[0m`;
      },
    );
    iterations++;
  }

  // Handle newlines
  processed = processed.replace(/\\n/g, '\n');

  return processed;
}

/**
 * Renders a specific module based on config and mock data
 * @param moduleName - Name of the module (e.g. "directory")
 * @param config - Starship configuration
 * @param scenario - Mock data scenario
 * @returns Rendered string (plain text, styles applied by parent)
 */
export function renderModule(
  moduleName: string,
  config: StarshipConfig,
  scenario: MockScenario,
): string {
  // Get value from scenario
  const value = scenario.values[moduleName];

  // If no value defined or empty, return empty string (module is hidden)
  if (!value) return '';

  // Get module config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moduleConfig = config[moduleName] as any;

  // Check if disabled
  if (moduleConfig?.disabled === true) return '';

  // Special handling for common modules
  if (moduleName === 'directory') {
    const style = moduleConfig?.style || 'cyan bold';
    // Simplified rendering
    return `[${value}](${style}) `;
  }

  if (moduleName === 'git_branch') {
    const symbol = moduleConfig?.symbol || '🌱 ';
    const style = moduleConfig?.style || 'purple bold';
    return `[${symbol}${value}](${style}) `;
  }

  if (moduleName === 'character') {
    // Determine style based on error state from scenario
    const isError = scenario.name.toLowerCase().includes('error');

    // Get style from config if possible
    let style = 'bold green';
    const successSymbol = moduleConfig?.success_symbol || '[➜](bold green)';
    const errorSymbol = moduleConfig?.error_symbol || '[➜](bold red)';
    const symbolConfig = isError ? errorSymbol : successSymbol;

    // Try to extract style from config format string like [x](y)
    if (symbolConfig.includes('](')) {
      const match = symbolConfig.match(/\]\((.*?)\)/);
      if (match) style = match[1];
    }

    // Use the value from mock data (e.g. ❯) with the style
    return `[${value}](${style}) `;
  }

  // Generic fallback for other modules
  const style = moduleConfig?.style || 'white';
  const symbol = moduleConfig?.symbol || '';
  // Note: We use a simplified default format here for the MVP
  const format = moduleConfig?.format || 'via [$symbol$version]($style) ';

  const output = format
    .replace('$symbol', symbol)
    .replace('$version', value)
    .replace('$style', style);

  return output;
}

/**
 * Converts a Starship style string to ANSI escape codes
 * @param style - Style string (e.g. "bold red", "bg:blue")
 * @returns ANSI escape sequence
 */
export function styleToAnsi(style: string): string {
  if (!style) return '';

  // Starship styles can be complex: "bold red", "bg:blue", "#ff0000", "fg:123"
  const parts = style.split(/\s+/);
  let ansi = '';

  parts.forEach((part) => {
    // Modifiers
    if (part === 'bold') ansi += '\x1b[1m';
    else if (part === 'dimmed') ansi += '\x1b[2m';
    else if (part === 'italic') ansi += '\x1b[3m';
    else if (part === 'underline') ansi += '\x1b[4m';
    else if (part === 'inverted') ansi += '\x1b[7m';
    // Background colors
    else if (part.startsWith('bg:')) {
      const color = part.substring(3);
      ansi += colorToAnsi(color, true);
    }

    // Foreground colors (default)
    else {
      ansi += colorToAnsi(part, false);
    }
  });

  return ansi;
}

/**
 * Helper to convert a color value to ANSI
 * @param color - Color name or hex
 * @param isBackground - Boolean
 */
function colorToAnsi(color: string, isBackground: boolean): string {
  // Named colors
  const namedColors: Record<string, number> = {
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    purple: 5,
    cyan: 6,
    white: 7,
  };

  if (namedColors[color] !== undefined) {
    const code = namedColors[color] + (isBackground ? 40 : 30);
    return `\x1b[${code}m`;
  }

  // Hex colors (TrueColor)
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `\x1b[${isBackground ? 48 : 38};2;${r};${g};${b}m`;
  }

  return '';
}
