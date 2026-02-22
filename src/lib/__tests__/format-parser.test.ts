import { describe, it, expect } from 'vitest';
import { parseFormatString, styleToAnsi } from '../format-parser';
import { TomlParser } from '../toml-parser';
import { MOCK_SCENARIOS } from '../mock-data';

describe('Format Parser', () => {
  const config = TomlParser.getDefaultConfig();

  it('should parse basic modules', () => {
    const format = '[$directory]';
    const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
    // It should replace $directory with the mock data value
    expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
  });

  it('should convert styles to ANSI codes', () => {
    expect(styleToAnsi('bold red')).toContain('\x1b[1m');
    expect(styleToAnsi('bold red')).toContain('\x1b[31m');
    expect(styleToAnsi('bg:blue')).toContain('\x1b[44m');
  });

  it('should handle complex formatting brackets', () => {
    const format = '[$directory](bold cyan)';
    const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
    expect(result).toContain('\x1b[1m');
    expect(result).toContain('\x1b[36m');
    expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
    expect(result).toContain('\x1b[0m'); // Reset code
  });
});
