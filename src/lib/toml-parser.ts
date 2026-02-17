import TOML from '@iarna/toml';
import { StarshipConfig } from '../types/starship.types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Utility class for parsing and manipulating Starship TOML configurations
 */
export class TomlParser {
  /**
   * Parses a TOML string into a StarshipConfig object
   * @param tomlString - The TOML configuration string
   * @returns Parsed configuration object
   */
  static parse(tomlString: string): StarshipConfig {
    try {
      // @iarna/toml returns a Record<string, any>, which maps to our StarshipConfig
      return TOML.parse(tomlString) as unknown as StarshipConfig;
    } catch (error) {
      console.error('Failed to parse TOML:', error);
      throw new Error(`Invalid TOML syntax: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Converts a StarshipConfig object back to a TOML string
   * @param config - The configuration object
   * @returns TOML string
   */
  static stringify(config: StarshipConfig): string {
    try {
      // Create a clean object without undefined values before stringifying
      // as some TOML stringifiers might struggle with undefined
      const cleanConfig = JSON.parse(JSON.stringify(config));
      return TOML.stringify(cleanConfig as unknown as TOML.JsonMap);
    } catch (error) {
      console.error('Failed to stringify config:', error);
      throw new Error('Failed to generate TOML');
    }
  }

  /**
   * Returns a default configuration with sensible defaults
   * @returns Default StarshipConfig
   */
  static getDefaultConfig(): StarshipConfig {
    return {
      // Common defaults
      add_newline: true,
      // Minimal format to start with
      format: "$username$hostname$directory$git_branch$git_state$git_status$cmd_duration$line_break$character",

      character: {
        success_symbol: "[➜](bold green)",
        error_symbol: "[➜](bold red)",
      },

      directory: {
        truncation_length: 3,
        truncate_to_repo: false,
      },

      git_branch: {
        symbol: "🌱 ",
        truncation_length: 24,
      },

      git_status: {
        conflicted: "🏳",
        ahead: "🏎💨",
        behind: "😰",
        diverged: "😵",
        up_to_date: "✓",
        untracked: "🤷",
        stashed: "📦",
        modified: "📝",
        staged: "[++\(\)](green)",
        renamed: "👅",
        deleted: "🗑",
      },

      nodejs: {
        format: "via [⬢ $version](bold green) ",
      }
    };
  }

  /**
   * Validates a Starship configuration object
   * @param config - Configuration to validate
   * @returns Validation result
   */
  static validate(config: StarshipConfig): ValidationResult {
    const errors: string[] = [];

    // Check for invalid types or required fields
    if (typeof config !== 'object' || config === null) {
      return { valid: false, errors: ['Configuration must be an object'] };
    }

    // Example validation: Check if format is a string if present
    if (config.format !== undefined && typeof config.format !== 'string') {
      errors.push('Format must be a string');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Merges two configurations
   * @param base - Base configuration
   * @param override - Override configuration
   * @returns Merged configuration
   */
  static merge(base: any, override: any): any {
    if (!override) return base;
    if (!base) return override;

    const result = { ...base };

    Object.keys(override).forEach(key => {
      if (
        typeof override[key] === 'object' &&
        override[key] !== null &&
        !Array.isArray(override[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        // Recursive merge for objects
        result[key] = TomlParser.merge(result[key], override[key]);
      } else {
        // Direct overwrite for primitives or arrays
        result[key] = override[key];
      }
    });

    return result;
  }
}
