import { Theme } from '../types/starship.types';
import { ColorUtils } from './color-utils';
import { TomlParser } from './toml-parser';

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
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Nord.primary}) `,
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
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Dracula.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-gruvbox',
      name: 'Gruvbox',
      description: 'Retro groove color scheme',
      author: 'morhetz',
      tags: ['retro', 'warm', 'dark'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Gruvbox.primary },
      git_branch: { style: ColorUtils.presets.Gruvbox.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.Gruvbox.success})`,
        error_symbol: `[➜](${ColorUtils.presets.Gruvbox.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Gruvbox.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-catppuccin',
      name: 'Catppuccin',
      description: 'Soothing pastel theme',
      author: 'Catppuccin',
      tags: ['pastel', 'aesthetic'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Catppuccin.primary },
      git_branch: { style: ColorUtils.presets.Catppuccin.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.Catppuccin.success})`,
        error_symbol: `[➜](${ColorUtils.presets.Catppuccin.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Catppuccin.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-tokyonight',
      name: 'Tokyo Night',
      description: 'A clean, dark Visual Studio Code theme',
      author: 'enkia',
      tags: ['night', 'dark', 'vscode'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.TokyoNight.primary },
      git_branch: { style: ColorUtils.presets.TokyoNight.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.TokyoNight.success})`,
        error_symbol: `[➜](${ColorUtils.presets.TokyoNight.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.TokyoNight.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-onedark',
      name: 'One Dark',
      description: 'Atom One Dark theme',
      author: 'Atom',
      tags: ['dark', 'atom'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.OneDark.primary },
      git_branch: { style: ColorUtils.presets.OneDark.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.OneDark.success})`,
        error_symbol: `[➜](${ColorUtils.presets.OneDark.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.OneDark.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-monokai',
      name: 'Monokai',
      description: 'The classic Monokai theme',
      author: 'Monokai',
      tags: ['classic', 'high-contrast'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Monokai.primary },
      git_branch: { style: ColorUtils.presets.Monokai.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.Monokai.success})`,
        error_symbol: `[➜](${ColorUtils.presets.Monokai.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Monokai.primary}) `,
      },
    },
  },
  {
    metadata: {
      id: 'preset-solarized',
      name: 'Solarized Dark',
      description: 'Precision colors for machines and people',
      author: 'Ethan Schoonover',
      tags: ['classic', 'solarized'],
      created: new Date('2024-01-01'),
      updated: new Date('2024-01-01'),
      isPreset: true,
    },
    config: {
      ...TomlParser.getDefaultConfig(),
      directory: { style: ColorUtils.presets.Solarized.primary },
      git_branch: { style: ColorUtils.presets.Solarized.secondary },
      character: {
        success_symbol: `[➜](${ColorUtils.presets.Solarized.success})`,
        error_symbol: `[➜](${ColorUtils.presets.Solarized.error})`,
      },
      nodejs: {
        format: `via [⬢ $version](${ColorUtils.presets.Solarized.primary}) `,
      },
    },
  },
];
