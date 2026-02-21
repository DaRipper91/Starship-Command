import { describe, it, expect } from 'vitest';
import { SuggestionEngine, Environment } from './suggestion-engine';
import { StarshipConfig } from '../types/starship.types';

describe('SuggestionEngine', () => {
  describe('suggestOptimizations', () => {
    // Helper to create a base environment
    const createEnv = (overrides?: Partial<Environment>): Environment => ({
      os: 'linux',
      shell: 'bash',
      terminal: 'xterm',
      hasNerdFont: true,
      installedTools: ['git'],
      ...overrides,
    });

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
