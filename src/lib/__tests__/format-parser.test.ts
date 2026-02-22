// import { describe, it, expect } from 'vitest';
// import { parseFormatString, styleToAnsi, renderModule } from '../format-parser';
// import { TomlParser } from '../toml-parser';
// import { MOCK_SCENARIOS } from '../mock-data';

// describe('Format Parser', () => {
//   const config = {
//     ...TomlParser.getDefaultConfig(),
//     palettes: {
//       global: {
//         test_red: '#FF0000',
//         test_blue: '#0000FF',
//       },
//     },
//   };

//   it('should parse basic modules', () => {
//     const format = '[$directory]';
//     const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
//     // It should replace $directory with the mock data value
//     expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
//   });

//   it('should convert styles to ANSI codes', () => {
//     expect(styleToAnsi('bold red', config)).toContain('\x1b[1m');
//     expect(styleToAnsi('bold red', config)).toContain('\x1b[31m');
//     expect(styleToAnsi('bg:blue', config)).toContain('\x1b[44m');
//     expect(styleToAnsi('test_red', config)).toContain('\x1b[38;2;255;0;0m'); // Test global color
//   });

//   it('should render git_status with custom symbols', () => {
//     const gitStatusConfig = {
//       conflicted: '💥',
//       ahead: '⬆️',
//       style: 'bold yellow',
//     };
//     const testConfig = {
//       ...config,
//       git_status: gitStatusConfig,
//     };
//     const result = renderModule(
//       'git_status',
//       testConfig,
//       MOCK_SCENARIOS.dev, // Scenario with some git changes
//     );
//     expect(result).toContain('💥'); // Should contain conflicted symbol
//     expect(result).toContain('⬆️'); // Should contain ahead symbol
//     expect(result).toContain('\x1b[1m\x1b[33m'); // bold yellow ANSI
//   });

//   it('should render custom modules', () => {
//     const customModuleConfig = {
//       command: 'echo "custom output" ',
//       symbol: '💡',
//       style: 'bold blue',
//       format: '[$symbol $output]($style)',
//     };
//     const testConfig = {
//       ...config,
//       custom: {
//         my_custom_module: customModuleConfig,
//       },
//     };
//     const result = renderModule(
//       'my_custom_module',
//       testConfig,
//       MOCK_SCENARIOS.clean,
//     );
//     expect(result).toContain('💡');
//     expect(result).toContain('custom output');
//     expect(result).toContain('\x1b[1m\x1b[34m'); // bold blue ANSI
//   });

//   it('should handle complex formatting brackets', () => {
//     const format = '[$directory](bold cyan)';
//     const result = parseFormatString(format, config, MOCK_SCENARIOS.clean);
//     expect(result).toContain('\x1b[1m');
//     expect(result).toContain('\x1b[36m');
//     expect(result).toContain(MOCK_SCENARIOS.clean.values.directory);
//     expect(result).toContain('\x1b[0m'); // Reset code
//   });
// });
