import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useThemeStore } from '../../stores/theme-store';
import { parseFormatString } from '../../lib/format-parser';
import { MOCK_SCENARIOS, MockScenario } from '../../lib/mock-data';

export const TerminalPreview = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const { currentTheme } = useThemeStore();
  const [scenarioIndex, setScenarioIndex] = useState(0);

  // Initialize Terminal
  useEffect(() => {
    // Only initialize if we have a ref
    if (xtermRef.current || !terminalRef.current) return;

    const term = new Terminal({
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
      fontSize: 14,
      cursorBlink: true,
      cursorStyle: 'block',
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selectionBackground: 'rgba(255, 255, 255, 0.3)',
      },
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    // Initial fit
    setTimeout(() => {
        try { fitAddon.fit(); } catch(e) { console.warn('Fit error:', e); }
    }, 50);

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const handleResize = () => {
        try { fitAddonRef.current?.fit(); } catch(e) {}
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (xtermRef.current) {
        xtermRef.current.dispose();
        xtermRef.current = null;
      }
    };
  }, []);

  // Cycle scenarios
  useEffect(() => {
    const scenarios = Object.keys(MOCK_SCENARIOS);
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarios.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Render Prompt when Theme or Scenario changes
  useEffect(() => {
    const term = xtermRef.current;
    if (!term) return;

    // We can't clear efficiently without flicker, so we just write new lines or reset
    // Reset clears scrollback too which is cleaner for a preview
    term.reset();

    const scenarioKeys = Object.keys(MOCK_SCENARIOS);
    const currentKey = scenarioKeys[scenarioIndex];
    const scenario = MOCK_SCENARIOS[currentKey];

    // Write Header/Context
    term.writeln('\x1b[1;30m# ' + scenario.name + ': ' + scenario.description + '\x1b[0m');
    term.writeln(''); // Spacer

    // Parse and render prompt
    const prompt = parseFormatString(
        currentTheme.config.format || '',
        currentTheme.config,
        scenario
    );

    // Simulate previous commands based on scenario to give context
    if (currentKey === 'clean') {
        term.write(prompt);
        term.writeln('ls -la');
        term.writeln('total 42');
        term.writeln('drwxr-xr-x  2 user  staff   64 Jan 1 12:00 .');
        term.writeln('drwxr-xr-x  4 user  staff  128 Jan 1 12:00 ..');
        term.writeln('-rw-r--r--  1 user  staff  256 Jan 1 12:00 README.md');
        term.writeln('');
    } else if (currentKey === 'dev') {
        term.write(prompt);
        term.writeln('git status');
        term.writeln('On branch feature/auth-flow');
        term.writeln('Changes not staged for commit:');
        term.writeln('  modified:   src/App.tsx');
        term.writeln('');
    } else if (currentKey === 'error') {
        term.write(prompt);
        term.writeln('npm test');
        term.writeln('\x1b[31mFAIL\x1b[0m src/App.test.tsx');
        term.writeln('  ● renders learn react link');
        term.writeln('');
    }

    // Write the active, waiting prompt
    term.write(prompt);

  }, [currentTheme, scenarioIndex]);

  const currentScenario = Object.values(MOCK_SCENARIOS)[scenarioIndex];

  // Safe access for title
  const title = currentScenario
    ? `${currentScenario.values.username}@${currentScenario.values.hostname}: ${currentScenario.values.directory}`
    : 'Terminal Preview';

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-800 transition-all duration-300">
      {/* Window Chrome */}
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-gray-800 select-none">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4036] transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffad14] transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#1db333] transition-colors shadow-sm" />
        </div>
        <div className="flex-1 text-center text-xs text-gray-400 font-medium font-sans truncate px-2">
          {title}
        </div>
        <div className="w-14" />
      </div>

      {/* Terminal Area */}
      <div className="flex-1 p-1 bg-[#1e1e1e] relative min-h-[400px]">
        <div ref={terminalRef} className="absolute inset-0" />
      </div>
    </div>
  );
};
