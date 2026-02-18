import { StarshipConfig } from '../types/starship.types';
import { ColorUtils } from './color-utils';

export interface Environment {
  os: string; // 'windows' | 'macos' | 'linux' | 'unknown'
  shell: string; // 'bash' | 'zsh' | 'fish' | 'pwsh' | 'unknown'
  terminal: string;
  hasNerdFont: boolean;
  installedTools: string[]; // git, docker, node, etc.
}

export interface Suggestion {
  type: 'module' | 'performance' | 'visual' | 'compatibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: () => void; // Auto-apply function
}

export class SuggestionEngine {
  /**
   * Detects the user's environment
   * Note: In a browser, this is limited. We'll use UA sniffing and defaults.
   */
  static async detectEnvironment(): Promise<Environment> {
    // Check if running in a browser environment
    if (typeof navigator === 'undefined') {
      return {
        os: 'unknown',
        shell: 'unknown',
        terminal: 'unknown',
        hasNerdFont: true,
        installedTools: ['git'],
      };
    }

    const ua = navigator.userAgent.toLowerCase();
    let os = 'unknown';
    if (ua.includes('win')) os = 'windows';
    else if (ua.includes('mac')) os = 'macos';
    else if (ua.includes('linux')) os = 'linux';

    // We can't really detect shell or installed tools from browser
    // But we can guess based on OS
    const installedTools = ['git']; // Assume git is present
    if (os !== 'windows') installedTools.push('bash');

    return {
      os,
      shell: 'unknown',
      terminal: 'unknown',
      hasNerdFont: true, // Optimistic default
      installedTools,
    };
  }

  /**
   * Suggests modules based on environment
   */
  static suggestModules(env: Environment): string[] {
    const modules = ['directory', 'character', 'line_break'];

    if (env.installedTools.includes('git')) {
      modules.push('git_branch', 'git_status');
    }

    if (env.installedTools.includes('docker')) {
      modules.push('docker_context');
    }

    if (env.installedTools.includes('node')) {
      modules.push('nodejs');
    }

    // OS specific
    if (env.os === 'macos') {
      modules.push('battery'); // Laptops usually
    }

    return modules;
  }

  /**
   * Suggests optimizations for the current configuration
   */
  static suggestOptimizations(
    config: StarshipConfig,
    env: Environment,
  ): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Performance suggestion
    const slowModules = ['git_status', 'kubernetes', 'aws', 'gcloud'];
    // Check if modules are enabled (exist and not disabled)
    const activeSlowModules = slowModules.filter((m) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mod = config[m] as any;
      return mod && !mod.disabled;
    });

    if (activeSlowModules.length > 2) {
      suggestions.push({
        type: 'performance',
        priority: 'medium',
        title: 'Optimize Render Speed',
        description: `You have ${activeSlowModules.length} slow modules enabled. Consider disabling some or increasing scan timeout.`,
      });
    }

    // Nerd Font check
    if (!env.hasNerdFont) {
      suggestions.push({
        type: 'compatibility',
        priority: 'high',
        title: 'Nerd Font Required',
        description:
          'Your theme uses symbols that require a Nerd Font. Install one to see icons correctly.',
      });
    }

    return suggestions;
  }

  /**
   * Suggests color schemes based on environment/preferences
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static suggestColorScheme(_env: Environment) {
    // Return presets
    return ColorUtils.presets;
  }
}
