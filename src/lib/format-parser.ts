import {
  StarshipConfig,
  CustomModuleConfig,
  GitStatusConfig,
} from '../types/starship.types';
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
        const ansi = styleToAnsi(style, config);
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

  // Handle custom modules
  if (moduleName in (config.custom || {})) {
    const customModule = config.custom?.[moduleName] as CustomModuleConfig;
    if (customModule) {
      // For now, we'll mock the output of the command.
      // In a real app, this would involve executing the command.
      const customOutput = scenario.values[moduleName] || '(custom output)';
      const customSymbol = customModule.symbol || '';
      const customStyle = customModule.style || 'white';
      const customFormat = customModule.format || '[$symbol $output]($style) ';

      const output = customFormat
        .replace('$symbol', customSymbol)
        .replace('$output', customOutput)
        .replace('$style', customStyle);

      return output;
    }
  }

  // Special handling for common modules
  if (moduleName === 'directory') {
    const style = moduleConfig?.style || 'cyan bold';
    return `[${value}](${style}) `;
  }

  if (moduleName === 'git_branch') {
    const symbol = moduleConfig?.symbol || '🌱 ';
    const style = moduleConfig?.style || 'purple bold';
    return `[${symbol}${value}](${style}) `;
  }

  if (moduleName === 'git_status') {
    const gitStatusConfig = moduleConfig as GitStatusConfig;
    const statusSymbols = [
      gitStatusConfig.conflicted || '🏳', // Conflicted
      gitStatusConfig.ahead || '🏎💨', // Ahead
      gitStatusConfig.behind || '😰', // Behind
      gitStatusConfig.diverged || '😵', // Diverged
      gitStatusConfig.untracked || '🤷', // Untracked
      gitStatusConfig.stashed || '📦', // Stashed
      gitStatusConfig.modified || '📝', // Modified
      gitStatusConfig.staged || '[++()](green)', // Staged
      gitStatusConfig.renamed || '👅', // Renamed
      gitStatusConfig.deleted || '🗑', // Deleted
    ];

    // Combine symbols based on mock scenario status (simplified)
    const activeStatusSymbols = statusSymbols.filter((s) => value.includes(s));
    const displayValue = activeStatusSymbols.join(' ');
    const style = gitStatusConfig.style || 'white';
    const format = gitStatusConfig.format || '($displayValue) ';

    const output = format
      .replace('$displayValue', displayValue)
      .replace('$style', style);

    return output;
  }

  if (moduleName === 'character') {
    // Determine style based on error state from scenario
    const isError = scenario.name.toLowerCase().includes('error');

    // Get style from config if possible
    let style = 'bold green';
    const successSymbol = moduleConfig?.success_symbol || '[❯](bold green)';
    const errorSymbol = moduleConfig?.error_symbol || '[❯](bold red)';
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
