import { BaseModuleConfig, StarshipConfig } from '../types/starship.types';
import { MOCK_SCENARIOS, MockScenario } from './mock-data';

export interface FormatSegment {
  text: string;
  style: string;
}

// Standard ANSI 16-color code maps
const FG_COLORS: Record<string, number> = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  purple: 35,
  magenta: 35,
  cyan: 36,
  white: 37,
};
const FG_BRIGHT: Record<string, number> = {
  black: 90,
  red: 91,
  green: 92,
  yellow: 93,
  blue: 94,
  purple: 95,
  magenta: 95,
  cyan: 96,
  white: 97,
};
const BG_COLORS: Record<string, number> = {
  black: 40,
  red: 41,
  green: 42,
  yellow: 43,
  blue: 44,
  purple: 45,
  magenta: 45,
  cyan: 46,
  white: 47,
};
const BG_BRIGHT: Record<string, number> = {
  black: 100,
  red: 101,
  green: 102,
  yellow: 103,
  blue: 104,
  purple: 105,
  magenta: 105,
  cyan: 106,
  white: 107,
};

/**
 * Converts a Starship style string to ANSI escape codes (16-color mode).
 * Modifiers appear first, then foreground colors, then background colors.
 */
export function styleToAnsi(style: string): string {
  if (!style) return '';
  const parts = style.split(/\s+/).filter(Boolean);
  const modifiers: number[] = [];
  const fgCodes: number[] = [];
  const bgCodes: number[] = [];

  for (const part of parts) {
    if (part === 'bold') {
      modifiers.push(1);
      continue;
    }
    if (part === 'dimmed') {
      modifiers.push(2);
      continue;
    }
    if (part === 'italic') {
      modifiers.push(3);
      continue;
    }
    if (part === 'underline') {
      modifiers.push(4);
      continue;
    }
    if (part === 'blink') {
      modifiers.push(5);
      continue;
    }
    if (part === 'inverted') {
      modifiers.push(7);
      continue;
    }

    if (part.startsWith('bg:')) {
      const color = part.slice(3);
      if (color.startsWith('bright-')) {
        const c = color.slice(7);
        if (BG_BRIGHT[c] !== undefined) bgCodes.push(BG_BRIGHT[c]);
      } else if (BG_COLORS[color] !== undefined) {
        bgCodes.push(BG_COLORS[color]);
      }
      continue;
    }

    const fgColor = part.startsWith('fg:') ? part.slice(3) : part;
    if (fgColor.startsWith('bright-')) {
      const c = fgColor.slice(7);
      if (FG_BRIGHT[c] !== undefined) fgCodes.push(FG_BRIGHT[c]);
    } else if (FG_COLORS[fgColor] !== undefined) {
      fgCodes.push(FG_COLORS[fgColor]);
    }
  }

  const codes = [...modifiers, ...fgCodes, ...bgCodes];
  if (codes.length === 0) return '';
  return `\x1b[${codes.join(';')}m`;
}

/**
 * Renders a single Starship module to its intermediate bracket-style string.
 * Returns a string like "[symbol value](style) " for use by parseFormatString.
 */
export function renderModule(
  moduleName: string,
  config: StarshipConfig,
  scenario: MockScenario,
): string {
  const customModules = config.custom as
    | Record<string, BaseModuleConfig>
    | undefined;
  const isCustom = !!customModules?.[moduleName];
  const moduleConfig = isCustom
    ? customModules?.[moduleName]
    : (config[moduleName] as BaseModuleConfig | undefined);

  if (!moduleConfig || moduleConfig.disabled) return '';
  if (!scenario.values[moduleName]) return '';

  const scenarioValue = scenario.values[moduleName];

  // Character module: use success_symbol or error_symbol based on scenario name
  if (moduleName === 'character') {
    const charConfig = moduleConfig as {
      success_symbol?: string;
      error_symbol?: string;
    };
    const isError = scenario.name.toLowerCase().includes('error');
    const symbol = isError
      ? (charConfig.error_symbol ?? '[❯](bold red)')
      : (charConfig.success_symbol ?? '[❯](bold green)');
    const styleMatch = symbol.match(/\]\(([^)]+)\)$/);
    const extractedStyle = styleMatch
      ? styleMatch[1]
      : (moduleConfig.style ?? '');
    return `[${scenarioValue}](${extractedStyle}) `;
  }

  const format = moduleConfig.format ?? '[$symbol$value]($style) ';
  const symbol = moduleConfig.symbol ?? '';
  const style = moduleConfig.style ?? '';

  const subs: Record<string, string> = {
    symbol,
    value: scenarioValue,
    style,
    output: scenarioValue,
  };
  for (const [k, v] of Object.entries(scenario.values)) {
    if (!(k in subs)) subs[k] = v;
  }

  return format.replace(
    /\$([a-zA-Z0-9_]+)/g,
    (_match, varName: string) => subs[varName] ?? '',
  );
}

// Matches [text](style) where text may contain ANSI sequences (\x1b[...m) but not raw [ or ]
// Style may be empty e.g. [value]()
// eslint-disable-next-line no-control-regex
const STYLED_GROUP_RE = /\[((?:[^\][]|\x1b\[[0-9;]*m)*)\]\(([^)]*)\)/g;

/**
 * Converts a Starship format string to a complete ANSI-coded string.
 */
export function parseFormatString(
  format: string,
  config: StarshipConfig,
  scenario: MockScenario = MOCK_SCENARIOS.clean,
): string {
  if (!format) return '';

  let result = format.replace(/\\n/g, '\n');

  // Expand $module_name tokens
  result = result.replace(/\$([a-zA-Z0-9_]+)/g, (_match, moduleName: string) =>
    renderModule(moduleName, config, scenario),
  );

  // Iteratively convert [text](style) → ANSI (handles nesting)
  let prev = '';
  while (prev !== result) {
    prev = result;
    result = result.replace(
      STYLED_GROUP_RE,
      (_match, text: string, style: string) => {
        const ansi = styleToAnsi(style);
        return ansi ? `${ansi}${text}\x1b[0m` : text;
      },
    );
  }

  return result;
}

/**
 * Parses a format string into styled segments for TerminalPreview / xterm.js.
 * Returns raw { text, style } pairs without converting to ANSI codes.
 */
export function parseFormattedString(
  format: string,
  config: StarshipConfig,
  scenario: MockScenario = MOCK_SCENARIOS.clean,
): FormatSegment[] {
  if (!format) return [];

  let expanded = format.replace(/\\n/g, '\n');
  expanded = expanded.replace(
    /\$([a-zA-Z0-9_]+)/g,
    (_match, moduleName: string) => renderModule(moduleName, config, scenario),
  );

  const segments: FormatSegment[] = [];
  // eslint-disable-next-line no-control-regex
  const regex = /\[((?:[^\][]|\x1b\[[0-9;]*m)*)\]\(([^)]*)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(expanded)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: expanded.substring(lastIndex, match.index),
        style: '',
      });
    }
    segments.push({ text: match[1], style: match[2] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < expanded.length) {
    segments.push({ text: expanded.substring(lastIndex), style: '' });
  }

  return segments;
}
