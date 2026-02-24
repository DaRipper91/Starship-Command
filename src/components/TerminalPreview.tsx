import 'xterm/css/xterm.css';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { parseFormatString } from '../lib/format-parser';
import { MOCK_SCENARIOS } from '../lib/mock-data';
import { cn } from '../lib/utils';
import { useThemeStore } from '../stores/theme-store';

interface TerminalPreviewProps {
  className?: string;
}

export const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  className,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const { currentTheme } = useThemeStore();
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const scenarioKeys = Object.keys(MOCK_SCENARIOS);

  useEffect(() => {
    // Cycle through scenarios every 3 seconds
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarioKeys.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [scenarioKeys.length]);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize xterm
    const term = new Terminal({
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.2,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selectionBackground: 'rgba(255, 255, 255, 0.3)',
      },
      cursorBlink: true,
      allowProposedApi: true,
      convertEol: true, // Ensure \n is treated as \r\n
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);

    // Initial fit
    try {
      fitAddon.fit();
    } catch (e) {
      console.warn('Initial fit failed:', e);
    }

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Handle resize
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          try {
            fitAddon.fit();
          } catch (e) {
            // Ignore fit errors on resize
          }
        });
      });

      resizeObserver.observe(terminalRef.current);
      resizeObserverRef.current = resizeObserver;
    }

    // Cleanup
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
      resizeObserverRef.current = null;
    };
  }, []);

  // Memoize the output to avoid re-parsing on metadata changes
  const output = useMemo(() => {
    // Parse format
    const format = currentTheme.config.format || '';
    const currentScenarioKey = scenarioKeys[scenarioIndex];
    const scenario = MOCK_SCENARIOS[currentScenarioKey];

    return parseFormatString(format, currentTheme.config, scenario);
  }, [currentTheme.config, scenarioIndex, scenarioKeys]);

  // Effect to update content when output changes
  useEffect(() => {
    const term = xtermRef.current;
    if (!term) return;

    // Clear terminal
    term.reset();

    // Write output
    term.write(output);
  }, [output]);

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-[#1e1e1e] shadow-2xl',
        className,
      )}
    >
      {/* MacOS-like Header */}
      <div className="flex shrink-0 items-center gap-2 border-b border-gray-700 bg-[#2d2d2d] px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" /> {/* Red */}
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" /> {/* Yellow */}
        <div className="h-3 w-3 rounded-full bg-[#27c93f]" /> {/* Green */}
        <div className="ml-4 select-none text-xs font-medium text-gray-400">
          Terminal Preview ({MOCK_SCENARIOS[scenarioKeys[scenarioIndex]].name})
        </div>
      </div>

      {/* Terminal Container */}
      <div className="relative min-h-[200px] flex-1 bg-[#1e1e1e] p-1">
        <div ref={terminalRef} className="absolute inset-0" />
      </div>
    </div>
  );
};
