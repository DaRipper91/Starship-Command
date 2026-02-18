export interface MockScenario {
  name: string;
  description: string;
  values: Record<string, string>;
}

export const MOCK_SCENARIOS: Record<string, MockScenario> = {
  clean: {
    name: 'Clean State',
    description: 'Clean git repository on main branch',
    values: {
      username: 'jules',
      hostname: 'macbook-pro',
      directory: '~/projects/starship-theme-creator',
      git_branch: 'main',
      git_state: '',
      git_status: '',
      git_metrics: '',
      nodejs: '',
      rust: '',
      python: '',
      docker_context: '',
      kubernetes: '',
      package: 'v1.0.0',
      cmd_duration: '2s',
      character: '❯',
    }
  },
  dev: {
    name: 'Development State',
    description: 'Active development with modified files',
    values: {
      username: 'jules',
      hostname: 'dev-server',
      directory: '~/work/api-service',
      git_branch: 'feature/auth-flow',
      git_state: '',
      git_status: '[3~](yellow) [+1](green)', // Modified, Staged
      git_metrics: '+120 -45',
      nodejs: 'v18.16.0',
      rust: '',
      python: '',
      docker_context: 'dev-context',
      kubernetes: '',
      package: 'v0.5.2',
      cmd_duration: '500ms',
      character: '❯',
    }
  },
  multilang: {
    name: 'Multi-Language',
    description: 'Project using multiple languages',
    values: {
      username: 'jules',
      hostname: 'polyglot',
      directory: '~/code/fullstack-app',
      git_branch: 'develop',
      git_state: '',
      git_status: '⇡2 ⇣1', // Ahead/Behind
      git_metrics: '',
      nodejs: 'v20.2.0',
      rust: 'v1.70.0',
      python: 'v3.11.4',
      docker_context: '',
      kubernetes: '',
      package: 'v2.0.0-beta',
      cmd_duration: '12s',
      character: '❯',
    }
  },
  devops: {
    name: 'DevOps Context',
    description: 'Cloud and container context',
    values: {
      username: 'ops',
      hostname: 'bastion',
      directory: '~/infra/k8s-prod',
      git_branch: 'production',
      git_state: '',
      git_status: '',
      git_metrics: '',
      nodejs: '',
      rust: '',
      python: '',
      docker_context: 'registry.example.com',
      kubernetes: 'prod-cluster-us-east',
      aws: 'us-west-2',
      gcloud: 'my-project',
      azure: 'subscription-1',
      package: '',
      cmd_duration: '',
      character: '#',
    }
  },
  error: {
    name: 'Error State',
    description: 'Failed command and git conflicts',
    values: {
      username: 'jules',
      hostname: 'macbook-pro',
      directory: '~/projects/broken-build',
      git_branch: 'fix/urgent-bug',
      git_state: 'MERGING',
      git_status: 'x5 !2', // Conflicted, Modified
      git_metrics: '',
      nodejs: 'v14.0.0', // Old version
      rust: '',
      python: '',
      docker_context: '',
      kubernetes: '',
      package: 'v0.0.1',
      cmd_duration: '1m 30s',
      character: '✖', // Error symbol
    }
  }
};
