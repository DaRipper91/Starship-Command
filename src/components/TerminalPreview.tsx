import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { useThemeStore } from '../stores/theme-store';
import { parseFormatString } from '../lib/format-parser';
import { MOCK_SCENARIOS } from '../lib/mock-data';
import { cn } from '../lib/utils';

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
    const resizeObserver = new ResizeObserver(() => {
      // We wrap fit in a requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
      // and ensure the DOM has updated layout.
      requestAnimationFrame(() => {
        try {
          fitAddon.fit();
        } catch (e) {
          // Ignore fit errors on resize (can happen if container is hidden)
        }
      });
    });

    resizeObserver.observe(terminalRef.current);
    resizeObserverRef.current = resizeObserver;

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
      resizeObserverRef.current = null;
    };
  }, []);

  // Effect to update content when theme changes
  useEffect(() => {
    const term = xtermRef.current;
    if (!term) return;

    // Clear terminal
    term.reset();

    // Parse format
    const format = currentTheme.config.format || '';

    // Use the 'clean' scenario by default
    // In a real app, we might want to let the user select the scenario via props or store
    const output = parseFormatString(
      format,
      currentTheme.config,
      MOCK_SCENARIOS.clean,
    );

    // Write output
    term.write(output);
  }, [currentTheme]);

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
          Starship Preview
        </div>
      </div>

      {/* Terminal Container */}
      <div className="relative min-h-[200px] flex-1 bg-[#1e1e1e] p-1">
        <div ref={terminalRef} className="absolute inset-0" />
      </div>
    </div>
  );
};
