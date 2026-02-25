export interface ThemeMetadata {
  id: string;
  name: string;
  author?: string;
  description?: string;
  tags?: string[];
  created: Date;
  updated: Date;
  thumbnail?: string;
  isPreset?: boolean;
}

export interface Theme {
  metadata: ThemeMetadata;
  config: StarshipConfig;
}

export interface StarshipConfig {
  format?: string;
  right_format?: string;
  continuation_prompt?: string;
  scan_timeout?: number;
  command_timeout?: number;
  add_newline?: boolean;
  palette?: string;
  palettes?: {
    global?: Record<string, string>;
    [key: string]: Record<string, string> | undefined;
  };

  // Core Modules
  character?: CharacterConfig;
  directory?: DirectoryConfig;
  line_break?: LineBreakConfig;

  // VCS Modules
  git_branch?: GitBranchConfig;
  git_commit?: GitCommitConfig;
  git_state?: GitStateConfig;
  git_metrics?: GitMetricsConfig;
  git_status?: GitStatusConfig;
  hg_branch?: HgBranchConfig;
  pijul_channel?: PijulChannelConfig;
  fossil_branch?: FossilBranchConfig;

  // Language Modules
  aws?: AwsConfig;
  azure?: AzureConfig;
  battery?: BatteryConfig;
  buf?: BufConfig;
  c?: CConfig;
  cmake?: CmakeConfig;
  cmd_duration?: CmdDurationConfig;
  cobol?: CobolConfig;
  conda?: CondaConfig;
  container?: ContainerConfig;
  crystal?: CrystalConfig;
  daml?: DamlConfig;
  dart?: DartConfig;
  deno?: DenoConfig;
  docker_context?: DockerContextConfig;
  dotnet?: DotnetConfig;
  elixir?: ElixirConfig;
  elm?: ElmConfig;
  env_var?: Record<string, EnvVarConfig>;
  erlang?: ErlangConfig;
  gcloud?: GcloudConfig;
  golang?: GolangConfig;
  haskell?: HaskellConfig;
  helm?: HelmConfig;
  hostname?: HostnameConfig;
  java?: JavaConfig;
  jobs?: JobsConfig;
  julia?: JuliaConfig;
  kotlin?: KotlinConfig;
  kubernetes?: KubernetesConfig;
  localip?: LocalIpConfig;
  lua?: LuaConfig;
  memory_usage?: MemoryUsageConfig;
  meson?: MesonConfig;
  nim?: NimConfig;
  nix_shell?: NixShellConfig;
  nodejs?: NodejsConfig;
  ocaml?: OcamlConfig;
  openstack?: OpenstackConfig;
  package?: PackageConfig;
  perl?: PerlConfig;
  php?: PhpConfig;
  pulumi?: PulumiConfig;
  python?: PythonConfig;
  raku?: RakuConfig;
  red?: RedConfig;
  rlang?: RlangConfig;
  ruby?: RubyConfig;
  rust?: RustConfig;
  scala?: ScalaConfig;
  shell?: ShellConfig;
  shlvl?: ShlvlConfig;
  singularity?: SingularityConfig;
  spack?: SpackConfig;
  status?: StatusConfig;
  sudo?: SudoConfig;
  swift?: SwiftConfig;
  terraform?: TerraformConfig;
  time?: TimeConfig;
  username?: UsernameConfig;
  vagrant?: VagrantConfig;
  vlang?: VlangConfig;
  zig?: ZigConfig;

  // Custom Modules
  custom?: Record<string, CustomModuleConfig>;

  // Allow other keys (modules or top-level settings)
  [key: string]:
    | string
    | number
    | boolean
    | BaseModuleConfig
    | Record<string, unknown>
    | undefined;
}

// Base interface for all modules
export interface BaseModuleConfig {
  disabled?: boolean;
  format?: string;
  style?: string;
  symbol?: string;
}

export interface CharacterConfig extends BaseModuleConfig {
  success_symbol?: string;
  error_symbol?: string;
  vimcmd_symbol?: string;
  vimcmd_replace_one_symbol?: string;
  vimcmd_replace_symbol?: string;
  vimcmd_visual_symbol?: string;
}

export interface DirectoryConfig extends BaseModuleConfig {
  truncation_length?: number;
  truncate_to_repo?: boolean;
  fish_style_pwd_dir_length?: number;
  use_logical_path?: boolean;
  home_symbol?: string;
  read_only?: string;
  read_only_style?: string;
  truncation_symbol?: string;
  repo_root_style?: string;
  repo_root_format?: string;
  before_repo_root_style?: string;
  after_repo_root_style?: string;
}

export interface LineBreakConfig extends BaseModuleConfig {}

export interface GitBranchConfig extends BaseModuleConfig {
  truncation_length?: number;
  truncation_symbol?: string;
  only_attached?: boolean;
  always_show_remote?: boolean;
  ignore_branches?: string[];
}

export interface GitCommitConfig extends BaseModuleConfig {
  commit_hash_length?: number;
  only_detached?: boolean;
  tag_symbol?: string;
  tag_disabled?: boolean;
}

export interface GitStateConfig extends BaseModuleConfig {
  rebase?: string;
  merge?: string;
  revert?: string;
  cherry_pick?: string;
  bisect?: string;
  am?: string;
  am_or_rebase?: string;
}

export interface GitMetricsConfig extends BaseModuleConfig {
  added_style?: string;
  deleted_style?: string;
  only_nonzero_diffs?: boolean;
}

export interface GitStatusConfig extends BaseModuleConfig {
  stashed?: string;
  ahead?: string;
  behind?: string;
  up_to_date?: string;
  diverged?: string;
  conflicted?: string;
  deleted?: string;
  renamed?: string;
  modified?: string;
  staged?: string;
  untracked?: string;
  ignore_submodules?: boolean;
}

export interface HgBranchConfig extends BaseModuleConfig {
  truncation_length?: number;
  truncation_symbol?: string;
}

export interface PijulChannelConfig extends BaseModuleConfig {}
export interface FossilBranchConfig extends BaseModuleConfig {}

// Language & Tool Configs
export interface NodejsConfig extends BaseModuleConfig {
  version_format?: string;
  detect_extensions?: string[];
  detect_files?: string[];
  detect_folders?: string[];
}

// Most language modules share the same structure
export interface PythonConfig extends NodejsConfig {
  python_binary?: string[];
}
export interface RustConfig extends NodejsConfig {}
export interface GolangConfig extends NodejsConfig {}
export interface JavaConfig extends NodejsConfig {}
export interface PhpConfig extends NodejsConfig {}
export interface RubyConfig extends NodejsConfig {}
export interface SwiftConfig extends NodejsConfig {}
export interface TerraformConfig extends NodejsConfig {}
export interface KotlinConfig extends NodejsConfig {}
export interface JuliaConfig extends NodejsConfig {}
export interface LuaConfig extends NodejsConfig {}
export interface PerlConfig extends NodejsConfig {}
export interface ErlangConfig extends NodejsConfig {}
export interface ElixirConfig extends NodejsConfig {}
export interface NimConfig extends NodejsConfig {}
export interface CrystalConfig extends NodejsConfig {}
export interface DartConfig extends NodejsConfig {}
export interface ScalaConfig extends NodejsConfig {}
export interface HelmConfig extends NodejsConfig {}
export interface CmakeConfig extends NodejsConfig {}
export interface BufConfig extends NodejsConfig {}
export interface CConfig extends NodejsConfig {}
export interface CobolConfig extends NodejsConfig {}
export interface CondaConfig extends NodejsConfig {}
export interface DamlConfig extends NodejsConfig {}
export interface DenoConfig extends NodejsConfig {}
export interface DotnetConfig extends NodejsConfig {}
export interface ElmConfig extends NodejsConfig {}
export interface HaskellConfig extends NodejsConfig {}
export interface MesonConfig extends NodejsConfig {}
export interface OcamlConfig extends NodejsConfig {}
export interface PulumiConfig extends NodejsConfig {}
export interface RakuConfig extends NodejsConfig {}
export interface RedConfig extends NodejsConfig {}
export interface RlangConfig extends NodejsConfig {}
export interface SpackConfig extends NodejsConfig {}
export interface VagrantConfig extends NodejsConfig {}
export interface VlangConfig extends NodejsConfig {}
export interface ZigConfig extends NodejsConfig {}

// Cloud & Containers
export interface DockerContextConfig extends BaseModuleConfig {
  only_with_files?: boolean;
  detect_files?: string[];
}

export interface KubernetesConfig extends BaseModuleConfig {
  detect_files?: string[];
  detect_folders?: string[];
  detect_extensions?: string[];
  contexts?: Record<string, string>; // Context aliases
  context_alias?: string;
}

export interface AwsConfig extends BaseModuleConfig {
  expiration_symbol?: string;
  force_display?: boolean;
}

export interface GcloudConfig extends BaseModuleConfig {}
export interface AzureConfig extends BaseModuleConfig {}
export interface OpenstackConfig extends BaseModuleConfig {}
export interface ContainerConfig extends BaseModuleConfig {}
export interface SingularityConfig extends BaseModuleConfig {}

// System
export interface BatteryConfig extends BaseModuleConfig {
  full_symbol?: string;
  charging_symbol?: string;
  discharging_symbol?: string;
  unknown_symbol?: string;
  empty_symbol?: string;
  display?: {
    threshold: number;
    style: string;
  }[];
}

export interface TimeConfig extends BaseModuleConfig {
  use_12hr?: boolean;
  time_format?: string;
  utc_time_offset?: string;
  time_range?: string;
}

export interface UsernameConfig extends BaseModuleConfig {
  show_always?: boolean;
  style_user?: string;
  style_root?: string;
  aliases?: Record<string, string>;
}

export interface HostnameConfig extends BaseModuleConfig {
  ssh_only?: boolean;
  trim_at?: string;
  ssh_symbol?: string;
}

export interface CmdDurationConfig extends BaseModuleConfig {
  min_time?: number;
  show_milliseconds?: boolean;
  show_notifications?: boolean;
  min_time_to_notify?: number;
}

export interface JobsConfig extends BaseModuleConfig {
  threshold?: number;
  symbol_threshold?: number;
}

export interface MemoryUsageConfig extends BaseModuleConfig {
  threshold?: number;
}

export interface ShellConfig extends BaseModuleConfig {}
export interface ShlvlConfig extends BaseModuleConfig {
  threshold?: number;
}

export interface StatusConfig extends BaseModuleConfig {
  map_symbol?: boolean;
  pipestatus?: boolean;
  pipestatus_separator?: string;
  pipestatus_format?: string;
  recognize_signal_code?: boolean;
  success_symbol?: string;
  not_executable_symbol?: string;
  not_found_symbol?: string;
  sigint_symbol?: string;
  signal_symbol?: string;
}

export interface SudoConfig extends BaseModuleConfig {
  allow_sudo?: boolean;
}

export interface PackageConfig extends BaseModuleConfig {
  display_private?: boolean;
}

export interface LocalIpConfig extends BaseModuleConfig {
  ssh_only?: boolean;
}

export interface NixShellConfig extends BaseModuleConfig {
  impure_msg?: string;
  pure_msg?: string;
  unknown_msg?: string;
}

export interface EnvVarConfig extends BaseModuleConfig {
  variable?: string;
  default?: string;
}

export interface CustomModuleConfig extends BaseModuleConfig {
  command?: string;
  when?: string;
  shell?: string[];
  description?: string;
  os?: string;
  files?: string[];
  extensions?: string[];
  directories?: string[];
  detect_files?: string[];
  detect_extensions?: string[];
  detect_folders?: string[];
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  success: string;
  error: string;
  warning: string;
}
