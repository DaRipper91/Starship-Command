import { describe, expect, it } from 'vitest';

import { StarshipConfig } from '../types/starship.types';
import { TomlParser } from './toml-parser';

describe('TomlParser Validation', () => {
  it('should validate a valid config', () => {
    const config: StarshipConfig = {
      format: '$all',
      add_newline: true,
      character: {
        success_symbol: '[➜](bold green)',
      },
    };
    const result = TomlParser.validate(config);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should detect invalid types', () => {
    const config = {
      format: 123, // should be string
    } as unknown as StarshipConfig;
    const result = TomlParser.validate(config);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Format must be a string');
  });

  it('should detect unknown modules as warnings', () => {
    const config = {
      unknown_module: {
        some_prop: 'val',
      },
    } as unknown as StarshipConfig;
    const result = TomlParser.validate(config);
    expect(result.valid).toBe(true);
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain(
      "Unknown module or setting: 'unknown_module'",
    );
  });

  it('should validate module structure', () => {
    const config = {
      git_branch: 'invalid', // should be object
    } as unknown as StarshipConfig;
    const result = TomlParser.validate(config);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Module 'git_branch' must be a table (object)",
    );
  });

  it('should allow custom modules in custom block', () => {
    const config: StarshipConfig = {
      custom: {
        my_module: {
          command: 'echo hello',
        },
      },
    };
    const result = TomlParser.validate(config);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });
});
