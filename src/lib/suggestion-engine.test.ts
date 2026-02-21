import { describe, it, expect } from 'vitest';
import { SuggestionEngine, Environment } from './suggestion-engine';

describe('SuggestionEngine', () => {
  describe('suggestModules', () => {
    // Helper to create a base environment
    const createEnv = (overrides: Partial<Environment> = {}): Environment => ({
      os: 'linux',
      shell: 'bash',
      terminal: 'xterm',
      hasNerdFont: true,
      installedTools: [],
      ...overrides,
    });

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
});
