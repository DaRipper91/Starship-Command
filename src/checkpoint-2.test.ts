import { describe, expect, it } from 'vitest';

import { parseFormatString } from './lib/format-parser';
import { MOCK_SCENARIOS } from './lib/mock-data';
import { SuggestionEngine } from './lib/suggestion-engine';
import { ThemeValidator } from './lib/theme-validator';
import { TomlParser } from './lib/toml-parser';

describe('Checkpoint 2: Core Systems', () => {
  const defaultConfig = TomlParser.getDefaultConfig();

  it('FormatParser: should parse basic format', () => {
    const format = '[$directory](cyan bold) ';
    // Note: ansi codes for cyan bold are \x1b[36m\x1b[1m
    const result = parseFormatString(
      format,
      defaultConfig,
      MOCK_SCENARIOS.clean,
    );
    expect(result).toContain('\x1b');
    expect(result).toContain('~/projects/starship-theme-creator');
  });

  it('FormatParser: should handle modules variables', () => {
    const format = '$character';
    const result = parseFormatString(
      format,
      defaultConfig,
      MOCK_SCENARIOS.clean,
    );
    expect(result).toContain('❯');
  });

  it('ThemeValidator: should validate default config', () => {
    const result = ThemeValidator.validateConfig(defaultConfig);
    expect(result.valid).toBe(true);
    expect(result.estimatedRenderTime).toBeGreaterThan(0);
  });

  it('ThemeValidator: should detect empty config', () => {
    const result = ThemeValidator.validateConfig(null);
    expect(result.valid).toBe(false);
  });

  it('SuggestionEngine: should detect environment', async () => {
    const env = await SuggestionEngine.detectEnvironment();
    expect(env.os).toBeDefined();
    expect(env.installedTools).toContain('git');
  });

  it('SuggestionEngine: should suggest modules', async () => {
    const env = await SuggestionEngine.detectEnvironment();
    const modules = SuggestionEngine.suggestModules(env);
    expect(modules).toContain('directory');
    expect(modules).toContain('git_branch');
  });
});
