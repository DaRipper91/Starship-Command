import { describe, expect, it } from 'vitest';

import { StarshipConfig } from '../types/starship.types';
import { parseFormatString, renderModule, styleToAnsi } from './format-parser';
import { MOCK_SCENARIOS } from './mock-data';

describe('styleToAnsi', () => {
  it('should return empty string for empty style', () => {
    expect(styleToAnsi('')).toBe('');
  });

  it('should handle basic colors', () => {
    expect(styleToAnsi('red')).toBe('\x1b[31m');
    expect(styleToAnsi('green')).toBe('\x1b[32m');
    expect(styleToAnsi('blue')).toBe('\x1b[34m');
  });

  it('should handle bright colors', () => {
    expect(styleToAnsi('bright-red')).toBe('\x1b[91m');
    expect(styleToAnsi('bright-green')).toBe('\x1b[92m');
  });

  it('should handle modifiers', () => {
    expect(styleToAnsi('bold')).toBe('\x1b[1m');
    expect(styleToAnsi('italic')).toBe('\x1b[3m');
    expect(styleToAnsi('underline')).toBe('\x1b[4m');
  });

  it('should handle background colors', () => {
    expect(styleToAnsi('bg:blue')).toBe('\x1b[44m');
    expect(styleToAnsi('bg:bright-red')).toBe('\x1b[101m');
  });

  it('should handle combined styles', () => {
    // Note: styleToAnsi splits by space and processes parts.
    // The order in the output depends on the order in the input and how codes are pushed.
    // bold red -> codes [1, 31] -> \x1b[1;31m
    expect(styleToAnsi('bold red')).toBe('\x1b[1;31m');
    // Implementation order: modifiers, then fg, then bg
    // bg:blue (44), white (37), bold (1) -> [1, 37, 44]
    expect(styleToAnsi('bg:blue white bold')).toBe('\x1b[1;37;44m');
  });

  it('should handle fg: prefix', () => {
    expect(styleToAnsi('fg:red')).toBe('\x1b[31m');
  });

  it('should ignore unknown styles', () => {
    expect(styleToAnsi('unknown')).toBe('');
    expect(styleToAnsi('bold unknown')).toBe('\x1b[1m');
  });
});

describe('renderModule', () => {
  const mockConfig: StarshipConfig = {
    directory: {
      style: 'cyan bold',
    },
    git_branch: {
      symbol: '🌿 ',
      style: 'purple bold',
    },
    character: {
      success_symbol: '[❯](bold green)',
      error_symbol: '[❯](bold red)',
    },
    custom: {
      test: {
        command: 'echo hi',
        format: '[$symbol $output]($style)',
        symbol: 'T',
        style: 'yellow',
      },
    },
  };

  it('should render directory module', () => {
    const scenario = MOCK_SCENARIOS.clean;
    const result = renderModule('directory', mockConfig, scenario);
    // directory module returns [value](style)
    expect(result).toBe(`[${scenario.values.directory}](cyan bold) `);
  });

  it('should render git_branch module', () => {
    const scenario = MOCK_SCENARIOS.clean;
    const result = renderModule('git_branch', mockConfig, scenario);
    expect(result).toBe(`[🌿 ${scenario.values.git_branch}](purple bold) `);
  });

  it('should render character module (success)', () => {
    const scenario = MOCK_SCENARIOS.clean;
    const result = renderModule('character', mockConfig, scenario);
    expect(result).toBe(`[${scenario.values.character}](bold green) `);
  });

  it('should render character module (error)', () => {
    const scenario = MOCK_SCENARIOS.error;
    const result = renderModule('character', mockConfig, scenario);
    expect(result).toBe(`[${scenario.values.character}](bold red) `);
  });

  it('should render custom module', () => {
    const scenario = {
      ...MOCK_SCENARIOS.clean,
      values: { ...MOCK_SCENARIOS.clean.values, test: 'custom value' },
    };
    const result = renderModule('test', mockConfig, scenario);
    expect(result).toBe('[T custom value](yellow)');
  });

  it('should return empty string if module is disabled', () => {
    const configWithDisabled = {
      ...mockConfig,
      directory: { ...mockConfig.directory, disabled: true },
    };
    const result = renderModule(
      'directory',
      configWithDisabled,
      MOCK_SCENARIOS.clean,
    );
    expect(result).toBe('');
  });

  it('should return empty string if no value in scenario', () => {
    const scenario = { ...MOCK_SCENARIOS.clean, values: {} };
    const result = renderModule('directory', mockConfig, scenario);
    expect(result).toBe('');
  });
});

describe('parseFormatString', () => {
  const mockConfig: StarshipConfig = {
    directory: {
      style: 'cyan bold',
    },
    character: {
      success_symbol: '[❯](bold green)',
    },
  };

  it('should return empty string for empty format', () => {
    expect(parseFormatString('', mockConfig)).toBe('');
  });

  it('should pass through plain text', () => {
    expect(parseFormatString('hello world', mockConfig)).toBe('hello world');
  });

  it('should replace module variables', () => {
    const scenario = MOCK_SCENARIOS.clean;
    const result = parseFormatString('$directory', mockConfig, scenario);
    // renderModule('directory', ...) returns "[path](cyan bold) "
    // parseFormatString then replaces [path](cyan bold) with ANSI codes
    const expectedPath = scenario.values.directory;
    const ansiCyanBold = '\x1b[1;36m';
    const ansiReset = '\x1b[0m';
    expect(result).toBe(`${ansiCyanBold}${expectedPath}${ansiReset} `);
  });

  it('should handle styled groups', () => {
    const result = parseFormatString('[text](bold red)', mockConfig);
    const ansiBoldRed = '\x1b[1;31m';
    const ansiReset = '\x1b[0m';
    expect(result).toBe(`${ansiBoldRed}text${ansiReset}`);
  });

  it('should handle nested styled groups', () => {
    // Current implementation uses a loop to handle nesting
    const result = parseFormatString('[[inner](blue) outer](red)', mockConfig);
    const ansiRed = '\x1b[31m';
    const ansiBlue = '\x1b[34m';
    const ansiReset = '\x1b[0m';

    // First iteration: [[inner](blue) outer](red) -> [\x1b[34minner\x1b[0m outer](red)
    // Second iteration: -> \x1b[31m\x1b[34minner\x1b[0m outer\x1b[0m
    expect(result).toBe(
      `${ansiRed}${ansiBlue}inner${ansiReset} outer${ansiReset}`,
    );
  });

  it('should handle newlines', () => {
    expect(parseFormatString('line1\\nline2', mockConfig)).toBe('line1\nline2');
  });

  it('should handle multiple modules and styles', () => {
    const scenario = MOCK_SCENARIOS.clean;
    const format = '[$directory](bg:blue)at $character';
    const result = parseFormatString(format, mockConfig, scenario);

    const expectedPath = scenario.values.directory;
    const expectedChar = scenario.values.character;

    // [$directory](bg:blue)
    // renderModule('directory') -> [path](cyan bold)
    // format becomes [[path](cyan bold) ](bg:blue)at $character
    // replace $character -> [[path](cyan bold) ](bg:blue)at [❯](bold green)
    // handle styles:
    // 1. [[path](cyan bold) ](bg:blue)at [❯](bold green)
    //    -> [\x1b[1;36mpath\x1b[0m ](bg:blue)at \x1b[1;32m❯\x1b[0m
    // 2. -> \x1b[44m\x1b[1;36mpath\x1b[0m \x1b[0m at \x1b[1;32m❯\x1b[0m

    const ansiBgBlue = '\x1b[44m';
    const ansiCyanBold = '\x1b[1;36m';
    const ansiGreenBold = '\x1b[1;32m';
    const ansiReset = '\x1b[0m';

    expect(result).toContain(
      `${ansiBgBlue}${ansiCyanBold}${expectedPath}${ansiReset} ${ansiReset}at ${ansiGreenBold}${expectedChar}${ansiReset} `,
    );
  });
});
