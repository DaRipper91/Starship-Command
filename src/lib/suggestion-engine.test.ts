import { describe, expect, it } from 'vitest';
import { Environment, SuggestionEngine } from './suggestion-engine';
import { StarshipConfig } from '../types/starship.types';

describe('SuggestionEngine', () => {
  // Helper to create a base environment
  const createEnv = (overrides: Partial<Environment> = {}): Environment => ({
    os: 'linux',
    shell: 'bash',
    terminal: 'xterm',
    hasNerdFont: true,
    installedTools: [],
    ...overrides,
  });

  describe('suggestModules', () => {
    it('should return basic modules by default', () => {
      const env = createEnv();
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('directory');
      expect(modules).toContain('character');
      expect(modules).toContain('line_break');
    });

    it('should include git modules when git is installed', () => {
      const env = createEnv({ installedTools: ['git'] });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('git_branch');
      expect(modules).toContain('git_status');
    });

    it('should include docker module when docker is installed', () => {
      const env = createEnv({ installedTools: ['docker'] });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('docker_context');
    });

    it('should include nodejs module when node is installed', () => {
      const env = createEnv({ installedTools: ['node'] });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('nodejs');
    });

    it('should include battery module on macOS', () => {
      const env = createEnv({ os: 'macos' });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('battery');
    });

    it('should not include battery module on non-macOS', () => {
      const env = createEnv({ os: 'linux' });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).not.toContain('battery');
    });

    it('should handle combined scenarios', () => {
      const env = createEnv({
        os: 'macos',
        installedTools: ['git', 'docker', 'node'],
      });
      const modules = SuggestionEngine.suggestModules(env);

      expect(modules).toContain('directory');
      expect(modules).toContain('character');
      expect(modules).toContain('line_break');
      expect(modules).toContain('git_branch');
      expect(modules).toContain('git_status');
      expect(modules).toContain('docker_context');
      expect(modules).toContain('nodejs');
      expect(modules).toContain('battery');
    });

    it('should have directory as the first module', () => {
      const env = createEnv();
      const modules = SuggestionEngine.suggestModules(env);
      expect(modules[0]).toBe('directory');
    });
  });

  describe('suggestOptimizations', () => {
    it('should return no suggestions for a safe config and nerd font', () => {
      const config: StarshipConfig = {
        // Only 1 slow module
        git_status: { disabled: false },
      };
      const env = createEnv({ hasNerdFont: true });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);
      expect(suggestions).toHaveLength(0);
    });

    it('should suggest performance optimization when > 2 slow modules are enabled', () => {
      const config: StarshipConfig = {
        git_status: { disabled: false },
        kubernetes: { disabled: false },
        aws: { disabled: false },
      };
      const env = createEnv({ hasNerdFont: true });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]).toMatchObject({
        type: 'performance',
        title: 'Optimize Render Speed',
        priority: 'medium',
      });
      expect(suggestions[0].description).toContain('3 slow modules enabled');
    });

    it('should not suggest performance optimization if slow modules are disabled', () => {
      const config: StarshipConfig = {
        git_status: { disabled: false },
        kubernetes: { disabled: true }, // Disabled
        aws: { disabled: false },
      };
      const env = createEnv({ hasNerdFont: true });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);
      expect(suggestions).toHaveLength(0);
    });

    it('should consider modules active if disabled property is missing', () => {
      const config: StarshipConfig = {
        git_status: {}, // disabled is undefined, should be active
        kubernetes: {}, // disabled is undefined, should be active
        aws: {}, // disabled is undefined, should be active
      };
      const env = createEnv({ hasNerdFont: true });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);

      expect(suggestions).toHaveLength(1);
    });

    it('should suggest compatibility warning when nerd font is missing', () => {
      const config: StarshipConfig = {};
      const env = createEnv({ hasNerdFont: false });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]).toMatchObject({
        type: 'compatibility',
        title: 'Nerd Font Required',
        priority: 'high',
      });
    });

    it('should return multiple suggestions when both conditions are met', () => {
      const config: StarshipConfig = {
        git_status: { disabled: false },
        kubernetes: { disabled: false },
        aws: { disabled: false },
        gcloud: { disabled: false },
      };
      const env = createEnv({ hasNerdFont: false });
      const suggestions = SuggestionEngine.suggestOptimizations(config, env);

      expect(suggestions).toHaveLength(2);
      expect(suggestions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'performance' }),
          expect.objectContaining({ type: 'compatibility' }),
        ]),
      );
    });
  });
});
