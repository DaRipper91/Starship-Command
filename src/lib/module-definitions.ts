export type ModuleCategory =
  | 'core'
  | 'vcs'
  | 'languages'
  | 'tools'
  | 'cloud'
  | 'system';

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  category: ModuleCategory;
  icon: string;
  defaultEnabled: boolean;
  requiresNerdFont?: boolean;
  expensive?: boolean;
}

export const MODULE_CATEGORIES: ModuleCategory[] = [
  'core',
  'vcs',
  'languages',
  'tools',
  'cloud',
  'system',
];

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  // Core
  {
    id: 'username',
    name: 'Username',
    description: 'Shows current username',
    category: 'core',
    icon: '👤',
    defaultEnabled: true,
  },
  {
    id: 'hostname',
    name: 'Hostname',
    description: 'Shows system hostname',
    category: 'core',
    icon: '💻',
    defaultEnabled: true,
  },
  {
    id: 'directory',
    name: 'Directory',
    description: 'Current working directory',
    category: 'core',
    icon: '📂',
    defaultEnabled: true,
  },
  {
    id: 'character',
    name: 'Character',
    description: 'The prompt character (usually ❯)',
    category: 'core',
    icon: '➜',
    defaultEnabled: true,
  },
  {
    id: 'line_break',
    name: 'Line Break',
    description: 'Splits prompt into two lines',
    category: 'core',
    icon: '↵',
    defaultEnabled: false,
  },
  {
    id: 'cmd_duration',
    name: 'Cmd Duration',
    description: 'Shows how long the last command took',
    category: 'core',
    icon: '⏱️',
    defaultEnabled: true,
  },
  {
    id: 'time',
    name: 'Time',
    description: 'Current time',
    category: 'core',
    icon: '🕒',
    defaultEnabled: false,
  },
  {
    id: 'jobs',
    name: 'Jobs',
    description: 'Number of background jobs',
    category: 'core',
    icon: '⚙️',
    defaultEnabled: true,
  },
  {
    id: 'battery',
    name: 'Battery',
    description: 'Battery status',
    category: 'core',
    icon: '🔋',
    defaultEnabled: true,
  },

  // VCS
  {
    id: 'git_branch',
    name: 'Git Branch',
    description: 'Current git branch',
    category: 'vcs',
    icon: '🌱',
    defaultEnabled: true,
  },
  {
    id: 'git_status',
    name: 'Git Status',
    description: 'Git status symbols',
    category: 'vcs',
    icon: '📊',
    defaultEnabled: true,
    expensive: true,
  },
  {
    id: 'git_state',
    name: 'Git State',
    description: 'Rebase/merge state',
    category: 'vcs',
    icon: '🔄',
    defaultEnabled: true,
  },
  {
    id: 'git_metrics',
    name: 'Git Metrics',
    description: 'Added/deleted lines count',
    category: 'vcs',
    icon: '📈',
    defaultEnabled: false,
  },

  // Languages
  {
    id: 'nodejs',
    name: 'Node.js',
    description: 'Node.js version',
    category: 'languages',
    icon: '⬢',
    defaultEnabled: true,
    requiresNerdFont: true,
  },
  {
    id: 'python',
    name: 'Python',
    description: 'Python version',
    category: 'languages',
    icon: '🐍',
    defaultEnabled: true,
    requiresNerdFont: true,
  },
  {
    id: 'rust',
    name: 'Rust',
    description: 'Rust version',
    category: 'languages',
    icon: '🦀',
    defaultEnabled: true,
  },
  {
    id: 'golang',
    name: 'Go',
    description: 'Go version',
    category: 'languages',
    icon: '🐹',
    defaultEnabled: true,
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Java version',
    category: 'languages',
    icon: '☕',
    defaultEnabled: true,
  },
  {
    id: 'php',
    name: 'PHP',
    description: 'PHP version',
    category: 'languages',
    icon: '🐘',
    defaultEnabled: true,
  },
  {
    id: 'ruby',
    name: 'Ruby',
    description: 'Ruby version',
    category: 'languages',
    icon: '💎',
    defaultEnabled: true,
  },

  // Tools
  {
    id: 'package',
    name: 'Package',
    description: 'Package version (npm, cargo, etc.)',
    category: 'tools',
    icon: '📦',
    defaultEnabled: true,
  },
  {
    id: 'docker_context',
    name: 'Docker',
    description: 'Docker context',
    category: 'tools',
    icon: '🐳',
    defaultEnabled: true,
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Kubernetes context',
    category: 'tools',
    icon: '☸️',
    defaultEnabled: true,
    expensive: true,
  },
  {
    id: 'terraform',
    name: 'Terraform',
    description: 'Terraform workspace',
    category: 'tools',
    icon: '💠',
    defaultEnabled: false,
  },

  // Cloud
  {
    id: 'aws',
    name: 'AWS',
    description: 'AWS profile/region',
    category: 'cloud',
    icon: '☁️',
    defaultEnabled: true,
    expensive: true,
  },
  {
    id: 'gcloud',
    name: 'Google Cloud',
    description: 'GCloud project',
    category: 'cloud',
    icon: '🇬',
    defaultEnabled: false,
    expensive: true,
  },
  {
    id: 'azure',
    name: 'Azure',
    description: 'Azure subscription',
    category: 'cloud',
    icon: '🇦',
    defaultEnabled: false,
  },

  // System
  {
    id: 'memory_usage',
    name: 'Memory',
    description: 'System memory usage',
    category: 'system',
    icon: '💾',
    defaultEnabled: false,
  },
  {
    id: 'env_var',
    name: 'Env Var',
    description: 'Environment variable value',
    category: 'system',
    icon: '💲',
    defaultEnabled: false,
  },
];
