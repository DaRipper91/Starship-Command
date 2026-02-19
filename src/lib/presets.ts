import { Theme } from '../types/starship.types';
import { TomlParser } from './toml-parser';
import { ColorUtils } from './color-utils';

export const PRESET_THEMES: Theme[] = [
  {
    metadata: {
      id: 'preset-clean',
      name: 'Clean',
      description: 'Minimalist theme with just the essentials',
      author: 'Starship Team',
      tags: ['minimal', 'clean'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      format: '$directory$git_branch$character',
      directory: {
        truncation_length: 3,
        style: 'bold cyan',
      },
      git_branch: {
        style: 'bold purple',
        symbol: '🌱 ',
      },
      character: {
        success_symbol: '[❯](bold green)',
        error_symbol: '[❯](bold red)',
      },
    },
  },
  {
    metadata: {
      id: 'preset-oneline',
      name: 'One Line',
      description: 'Compact single-line prompt',
      author: 'Starship Team',
      tags: ['minimal', 'compact'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      add_newline: false,
      format: '$username@$hostname $directory $git_branch $character',
      username: {
        style_user: 'white bold',
        show_always: true,
      },
      hostname: {
        ssh_only: false,
        style: 'white dimmed',
      },
      directory: {
        style: 'blue',
      },
    },
  },
  {
    metadata: {
      id: 'preset-dev',
      name: 'Full Stack',
      description: 'Shows all language versions',
      author: 'Dev Community',
      tags: ['developer', 'languages'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      nodejs: { disabled: false },
      rust: { disabled: false },
      python: { disabled: false },
      golang: { disabled: false },
      java: { disabled: false },
      php: { disabled: false },
      docker_context: { disabled: false },
    },
  },
  {
    metadata: {
      id: 'preset-nord',
      name: 'Nord',
      description: 'Nord color scheme based theme',
      author: 'Arctic Ice Studio',
      tags: ['aesthetic', 'dark'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Nord.primary },
      git_branch: { style: ColorUtils.presets.Nord.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.Nord.success})`,
        error_symbol: `[➜](${ColorUtils.presets.Nord.error})`,
      },
    },
  },
  {
    metadata: {
      id: 'preset-dracula',
      name: 'Dracula',
      description: 'Dracula color scheme',
      author: 'Dracula Theme',
      tags: ['aesthetic', 'dark', 'vampire'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Dracula.primary },
      git_branch: { style: ColorUtils.presets.Dracula.secondary },
      character: {
        success_symbol: `[⚡](${ColorUtils.presets.Dracula.success})`,
        error_symbol: `[⚡](${ColorUtils.presets.Dracula.error})`,
      },
    },
  },
];
