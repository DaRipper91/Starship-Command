import { StarshipConfig, Theme } from '../types/starship.types';
import { ColorUtils } from './color-utils';

const HEX_COLOR_REGEX = /#[0-9a-fA-F]{6}/;

export interface ValidationIssue {
  type: 'config' | 'visual' | 'performance' | 'compatibility';
  severity: 'error' | 'warning';
  message: string;
  fix?: string;
  module?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  suggestions: string[];
  estimatedRenderTime: number; // In milliseconds
}

export class ThemeValidator {
  /**
   * Validates a complete theme
   */
  static validateTheme(theme: Theme): ValidationResult {
    const result = this.validateConfig(theme.config);

    // Add metadata checks
    if (!theme.metadata.name) {
      result.warnings.push({
        type: 'config',
        severity: 'warning',
        message: 'Theme has no name',
        fix: 'Add a name in the theme settings',
      });
    }

    return result;
  }

  /**
   * Validates a Starship configuration
   */
  static validateConfig(
    config: StarshipConfig | null | undefined,
  ): ValidationResult {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];
    const suggestions: string[] = [];

    // 1. Basic Config Checks
    if (!config) {
      errors.push({
        type: 'config',
        severity: 'error',
        message: 'Configuration is empty or invalid',
      });
      return {
        valid: false,
        errors,
        warnings,
        suggestions,
        estimatedRenderTime: 0,
      };
    }

    // 2. Visual Checks (Contrast)
    const contrastIssues = this.checkColorContrast(config);
    warnings.push(...contrastIssues);

    // 3. Performance Checks
    const renderTime = this.estimateRenderTime(config);
    if (renderTime > 200) {
      warnings.push({
        type: 'performance',
        severity: 'warning',
        message: `Estimated render time is high (${renderTime}ms)`,
        fix: 'Disable expensive modules like git_status or kubernetes',
      });
    }

    // 4. Compatibility Checks
    // Example: Check for Nerd Fonts usage if likely needed
    const usesSymbols = JSON.stringify(config).includes('symbol');
    if (usesSymbols) {
      suggestions.push(
        'Make sure you have a Nerd Font installed to see all symbols correctly',
      );
    }

    // 5. Structure Checks
    if (config.format && !config.format.includes('$character')) {
      warnings.push({
        type: 'config',
        severity: 'warning',
        message: 'Format string is missing the character module',
        fix: 'Add $character to the end of your format string',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      estimatedRenderTime: renderTime,
    };
  }

  /**
   * Checks for color contrast issues in the config
   */
  static checkColorContrast(config: StarshipConfig): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check specific modules
    if (config.directory?.style) {
      const issue = this.checkStyle(config.directory.style, 'directory module');
      if (issue) issues.push(issue);
    }
    if (config.git_branch?.style) {
      const issue = this.checkStyle(
        config.git_branch.style,
        'git_branch module',
      );
      if (issue) issues.push(issue);
    }

    return issues;
  }

  // Helper to check a style string
  private static checkStyle(
    style: string,
    source: string,
  ): ValidationIssue | undefined {
    // This is a simplified check. A real one would parse all styles.
    // We assume a dark background for now as that's standard for terminals.
    const defaultBg = '#000000';

    if (!style) return;
    // Extract hex colors
    const hexMatch = style.match(HEX_COLOR_REGEX);
    if (hexMatch) {
      const fg = hexMatch[0];
      const contrast = ColorUtils.checkContrast(fg, defaultBg);
      if (!contrast.AA) {
        return {
          type: 'visual',
          severity: 'warning',
          message: `Low contrast color ${fg} in ${source}`,
          fix: 'Choose a lighter color for better readability on dark backgrounds',
        };
      }
    }
  }

  /**
   * Estimates render time based on active modules
   */
  static estimateRenderTime(config: StarshipConfig): number {
    let time = 10; // Base overhead

    // Expensive modules
    if (config.git_status && !config.git_status.disabled) time += 50;
    if (config.kubernetes && !config.kubernetes.disabled) time += 40;
    if (config.docker_context && !config.docker_context.disabled) time += 20;
    if (config.gcloud && !config.gcloud.disabled) time += 30;
    if (config.aws && !config.aws.disabled) time += 30;

    // Moderate modules
    if (config.nodejs && !config.nodejs.disabled) time += 10;
    if (config.python && !config.python.disabled) time += 10;
    if (config.rust && !config.rust.disabled) time += 10;

    // Count total modules in format string
    if (config.format) {
      const moduleCount = (config.format.match(/\$/g) || []).length;
      time += moduleCount * 2;
    }

    return time;
  }
}
