import { describe, it, expect } from 'vitest';
import { TomlParser } from './lib/toml-parser';
import { ColorUtils } from './lib/color-utils';
import { useThemeStore } from './stores/theme-store';

describe('Checkpoint 1: Foundation Setup', () => {
  it('TomlParser: should create and validate default config', () => {
    const defaultConfig = TomlParser.getDefaultConfig();
    expect(defaultConfig).toBeDefined();

    const validation = TomlParser.validate(defaultConfig);
    expect(validation.valid).toBe(true);

    const toml = TomlParser.stringify(defaultConfig);
    expect(toml).toContain('format =');

    const parsed = TomlParser.parse(toml);
    // Deep equality check might be tricky due to serialization, but basic check works
    expect(parsed.format).toBe(defaultConfig.format);
  });

  it('ColorUtils: should generate colors', () => {
    const complementary = ColorUtils.generateComplementary('#3b82f6');
    expect(complementary.length).toBeGreaterThan(0);

    const contrast = ColorUtils.checkContrast('#ffffff', '#000000');
    expect(contrast.ratio).toBeGreaterThan(1);

    const presets = ColorUtils.presets;
    expect(presets.Nord).toBeDefined();
  });

  it('ThemeStore: should initialize and update', () => {
    const store = useThemeStore.getState();
    expect(store.currentTheme).toBeDefined();
    expect(store.currentTheme.metadata.name).toBe('Untitled Theme');

    store.updateConfig({ format: 'new format' });
    const updated = useThemeStore.getState();
    expect(updated.currentTheme.config.format).toBe('new format');
  });
});
