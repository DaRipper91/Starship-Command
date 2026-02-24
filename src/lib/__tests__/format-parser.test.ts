import { describe, it, expect } from 'vitest';
import { parseFormatString, styleToAnsi, renderModule } from '../format-parser';
import { TomlParser } from '../toml-parser';
import { MOCK_SCENARIOS } from '../mock-data';

describe('Format Parser', () => {
  const config = {
    ...TomlParser.getDefaultConfig(),
    palettes: {
      global: {
        test_red: '#FF0000',
        test_blue: '#0000FF',
      },
    },
  };

  it('should parse basic modules', () => {
    const format = '[$directory]';
    const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
    // It should replace $directory with the mock data value
    expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
  });

  it('should convert styles to ANSI codes', () => {
    // Expect joined codes: 1 (bold) + 31 (red) -> 1;31
    expect(styleToAnsi('bold red', config)).toBe('\x1b[1;31m');
    expect(styleToAnsi('bg:blue', config)).toBe('\x1b[44m');
  });

  it('should render git_status with custom symbols', () => {
    const gitStatusConfig = {
      conflicted: '💥',
      ahead: '⬆️',
      style: 'bold yellow',
      format: '[$displayValue]($style)', // Explicit format to include style
    };
    const testConfig = {
      ...config,
      git_status: gitStatusConfig,
    };

    const customScenario = {
      ...MOCK_SCENARIOS.dev,
      values: {
        ...MOCK_SCENARIOS.dev.values,
        git_status: '💥 ⬆️',
      },
    };

    const result = renderModule('git_status', testConfig, customScenario);

    expect(result).toContain('💥');
    expect(result).toContain('⬆️');
    // renderModule returns the Starship format string, not ANSI
    expect(result).toContain('(bold yellow)');
  });

  it('should render custom modules', () => {
    const customModuleConfig = {
      command: 'echo "custom output" ',
      symbol: '💡',
      style: 'bold blue',
      format: '[$symbol $output]($style)',
    };
    const testConfig = {
      ...config,
      custom: {
        my_custom_module: customModuleConfig,
      },
    };

    const customScenario = {
      ...MOCK_SCENARIOS.clean,
      values: {
        ...MOCK_SCENARIOS.clean.values,
        my_custom_module: 'custom output',
      },
    };

    const result = renderModule('my_custom_module', testConfig, customScenario);

    expect(result).toContain('💡');
    expect(result).toContain('custom output');
    // renderModule returns the Starship format string
    expect(result).toContain('(bold blue)');
  });

  it('should handle complex formatting brackets', () => {
    const format = '[$directory](bold cyan)';
    // parseFormatString DOES return ANSI
    const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
    expect(result).toContain('\x1b[1;36m');
    expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
    expect(result).toContain('\x1b[0m'); // Reset code
  });
});
