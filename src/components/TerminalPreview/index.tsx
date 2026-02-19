import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useThemeStore } from '../../stores/theme-store';
import { parseFormatString } from '../../lib/format-parser';
import { MOCK_SCENARIOS, MockScenario } from '../../lib/mock-data';
import { cn } from '../../lib/utils';
import { Play, ChevronDown } from 'lucide-react';

interface TerminalPreviewProps {
  className?: string;
}

export function TerminalPreview({ className }: TerminalPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  const { currentTheme } = useThemeStore();
  const [currentScenario, setCurrentScenario] = useState<MockScenario>(
    MOCK_SCENARIOS.clean,
  );
  const [isScenarioMenuOpen, setIsScenarioMenuOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize terminal
  useEffect(() => {
    if (!containerRef.current || terminalRef.current) return;

    try {
      console.log('Initializing Terminal...');
      const term = new Terminal({
        fontFamily: '"Fira Code", monospace',
        fontSize: 14,
        theme: {
          background: '#1a1b26',
          foreground: '#a9b1d6',
          cursor: '#c0caf5',
          selectionBackground: '#33467C',
        },
        cursorBlink: true,
        allowProposedApi: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      term.open(containerRef.current);
      console.log('Terminal opened');

      // Defer fit to ensure layout is ready
      setTimeout(() => {
        try {
          fitAddon.fit();
          console.log('Terminal fitted');
        } catch (e) {
          console.error('Fit failed:', e);
        }
      }, 100);

      terminalRef.current = term;
      fitAddonRef.current = fitAddon;

      // Handle resize
      const handleResize = () => fitAddon.fit();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        term.dispose();
        terminalRef.current = null;
      };
    } catch (err) {
      console.error('Terminal initialization error:', err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  // Update prompt when theme or scenario changes
  useEffect(() => {
    if (!terminalRef.current) return;

    try {
      const term = terminalRef.current;
      term.clear();

      // Render multiple lines to show context
      term.writeln('\x1b[2m# Terminal Preview\x1b[0m');
      term.writeln('');

      // Render previous command
      term.write(
        parseFormatString(
          currentTheme.config.format || '',
          currentTheme.config,
          currentScenario,
        ),
      );
      term.writeln('ls -la');

      // Render output simulation
      term.writeln(
        '\x1b[2mdrwxr-xr-x  5 user  staff   160 Feb 18 10:00 .\x1b[0m',
      );
      term.writeln(
        '\x1b[2mdrwxr-xr-x  3 user  staff    96 Feb 18 09:00 ..\x1b[0m',
      );
      term.writeln(
        '\x1b[2m-rw-r--r--  1 user  staff  1234 Feb 18 10:00 README.md\x1b[0m',
      );

      // Render current prompt
      term.write(
        parseFormatString(
          currentTheme.config.format || '',
          currentTheme.config,
          currentScenario,
        ),
      );

      // Re-fit on content change just in case
      setTimeout(() => fitAddonRef.current?.fit(), 0);
    } catch (err) {
      console.error('Terminal update error:', err);
    }
  }, [currentTheme, currentScenario]);

  // Demo mode: Cycle through scenarios
  useEffect(() => {
    if (!isDemoMode) return;

    const scenarios = Object.values(MOCK_SCENARIOS);
    let currentIndex = scenarios.indexOf(currentScenario);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % scenarios.length;
      setCurrentScenario(scenarios[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isDemoMode, currentScenario]);

  if (error) {
    return (
      <div
        className={cn(
          'rounded border border-red-800 bg-red-900/50 p-4 text-red-200',
          className,
        )}
      >
        <h3 className="font-bold">Terminal Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-[#1a1b26] shadow-2xl',
        className,
      )}
    >
      {/* Window Chrome */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-gray-800 bg-[#1f2335] px-4">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80 transition-colors hover:bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500/80 transition-colors hover:bg-green-500" />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-gray-400">
          {currentScenario.name}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={cn(
              'rounded p-1.5 transition-colors hover:bg-white/10',
              isDemoMode ? 'bg-white/5 text-green-400' : 'text-gray-400',
            )}
            title={isDemoMode ? 'Stop Demo' : 'Start Demo'}
          >
            <Play className="h-4 w-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsScenarioMenuOpen(!isScenarioMenuOpen)}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              Scenarios <ChevronDown className="h-3 w-3" />
            </button>

            {isScenarioMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsScenarioMenuOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-gray-700 bg-gray-900 py-1 shadow-xl">
                  {Object.values(MOCK_SCENARIOS).map((scenario) => (
                    <button
                      key={scenario.name}
                      onClick={() => {
                        setCurrentScenario(scenario);
                        setIsScenarioMenuOpen(false);
                        setIsDemoMode(false);
                      }}
                      className={cn(
                        'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-800',
                        currentScenario.name === scenario.name
                          ? 'bg-blue-400/10 text-blue-400'
                          : 'text-gray-300',
                      )}
                    >
                      {scenario.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Terminal Area */}
      <div className="relative min-h-0 flex-1 bg-[#1a1b26] p-2">
        <div ref={containerRef} className="absolute inset-2" />
      </div>
    </div>
  );
}
