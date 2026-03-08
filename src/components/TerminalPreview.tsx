import 'xterm/css/xterm.css';

import html2canvas from 'html2canvas';
import { ChevronUp, Copy, Download, Type } from 'lucide-react';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { useToast } from '../contexts/ToastContext';
import { ColorUtils } from '../lib/color-utils';
import { parseFormattedString } from '../lib/format-parser';
import { MOCK_SCENARIOS } from '../lib/mock-data';
import { translateThemeToXterm } from '../lib/theme-to-xterm';
import { cn } from '../lib/utils';
import { useThemeStore } from '../stores/theme-store';
import { StarshipConfig } from '../types/starship.types';

const FONT_STORAGE_KEY = 'starship-font-settings';

function styleToAnsi(style: string, config: StarshipConfig): string {
  if (!style) return '';

  const paletteName = config.palette || 'global';
  const customPalette = config.palettes?.[paletteName] || {};
  const parts = style.split(/\s+/);
  const codes: string[] = [];

  parts.forEach((part) => {
    if (part === 'bold') codes.push('1');
    else if (part === 'italic') codes.push('3');
    else if (part === 'underline') codes.push('4');
    else if (part === 'dimmed') codes.push('2');
    else if (part.startsWith('bg:')) {
      const color = ColorUtils.resolveColor(part.substring(3), customPalette);
      const rgb = ColorUtils.hexToRgb(color);
      if (rgb) codes.push(`48;2;${rgb.r};${rgb.g};${rgb.b}`);
    } else {
      const color = ColorUtils.resolveColor(part, customPalette);
      const rgb = ColorUtils.hexToRgb(color);
      if (rgb) codes.push(`38;2;${rgb.r};${rgb.g};${rgb.b}`);
    }
  });

  if (codes.length === 0) return '';
  return `\x1b[${codes.join(';')}m`;
}

interface StoredFontSettings {
  url: string;
  family: string;
}

interface TerminalPreviewProps {
  className?: string;
  fontFamily?: string;
  id?: string;
}

export const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  className,
  fontFamily,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const { currentTheme } = useThemeStore();
  const { addToast } = useToast();
  const [scenarioIndex, setScenarioIndex] = useState(0);

  // Font loader state
  const [showFontLoader, setShowFontLoader] = useState(false);
  const [fontUrl, setFontUrl] = useState('');
  const [fontFamilyInput, setFontFamilyInput] = useState('');
  const [isLoadingFont, setIsLoadingFont] = useState(false);
  const [customFontFamily, setCustomFontFamily] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(FONT_STORAGE_KEY);
      if (stored) {
        const parsed: StoredFontSettings = JSON.parse(stored);
        return parsed.family || '';
      }
    } catch {
      /* ignore */
    }
    return '';
  });

  // Pre-load stored font on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FONT_STORAGE_KEY);
      if (stored) {
        const { url, family }: StoredFontSettings = JSON.parse(stored);
        if (url && family) {
          setFontUrl(url);
          setFontFamilyInput(family);
          const face = new FontFace(family, `url(${url})`);
          face
            .load()
            .then((loaded) => {
              document.fonts.add(loaded);
            })
            .catch(() => {
              /* silent — old stored font may be gone */
            });
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const effectiveFontFamily =
    customFontFamily ||
    fontFamily ||
    '"FiraCode NF", Menlo, Monaco, "Courier New", monospace';

  const scenarioKeys = Object.keys(MOCK_SCENARIOS);

  useEffect(() => {
    const interval = setInterval(() => {
      setScenarioIndex((prev) => (prev + 1) % scenarioKeys.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [scenarioKeys.length]);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const term = new Terminal({
      fontFamily: effectiveFontFamily,
      fontSize: 14,
      lineHeight: 1.2,
      cursorBlink: true,
      allowProposedApi: true,
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    try {
      fitAddon.fit();
    } catch (e) {
      console.warn('Initial fit failed:', e);
    }

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch {
        /* ignore */
      }
    });
    resizeObserver.observe(terminalRef.current);
    resizeObserverRef.current = resizeObserver;

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
    };
  }, [effectiveFontFamily]); // Re-create terminal when font changes

  const segments = useMemo(() => {
    const format = currentTheme.config.format || '';
    const currentScenarioKey = scenarioKeys[scenarioIndex];
    const scenario = MOCK_SCENARIOS[currentScenarioKey];
    return parseFormattedString(format, currentTheme.config, scenario);
  }, [currentTheme.config, scenarioIndex, scenarioKeys]);

  useEffect(() => {
    const term = xtermRef.current;
    if (!term) return;

    const xtermTheme = translateThemeToXterm(currentTheme.config);
    term.options.theme = xtermTheme;

    term.reset();
    segments.forEach((segment) => {
      const ansi = styleToAnsi(segment.style, currentTheme.config);
      term.write(ansi + segment.text + (ansi ? '\x1b[0m' : ''));
    });
  }, [segments, currentTheme.config]);

  const terminalBg = useMemo(() => {
    return translateThemeToXterm(currentTheme.config).background || '#1e1e1e';
  }, [currentTheme.config]);

  // Screenshot helpers
  const captureCanvas = useCallback(async () => {
    if (!containerRef.current) return null;
    return html2canvas(containerRef.current, {
      backgroundColor: terminalBg,
      scale: 2,
      useCORS: true,
      logging: false,
    });
  }, [terminalBg]);

  const handleDownload = useCallback(async () => {
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${currentTheme.metadata.name || 'theme'}-preview.png`;
      a.click();
      addToast('Screenshot downloaded!', 'success');
    } catch {
      addToast('Failed to capture screenshot', 'error');
    }
  }, [captureCanvas, currentTheme.metadata.name, addToast]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          addToast('Screenshot copied to clipboard!', 'success');
        } catch {
          addToast('Clipboard write failed — try Download instead', 'error');
        }
      });
    } catch {
      addToast('Failed to capture screenshot', 'error');
    }
  }, [captureCanvas, addToast]);

  const handleApplyFont = useCallback(async () => {
    if (!fontUrl.trim() || !fontFamilyInput.trim()) {
      addToast('Please enter both a font URL and family name', 'error');
      return;
    }
    setIsLoadingFont(true);
    try {
      const face = new FontFace(
        fontFamilyInput.trim(),
        `url(${fontUrl.trim()})`,
      );
      const loaded = await face.load();
      document.fonts.add(loaded);
      const newFamily = fontFamilyInput.trim();
      setCustomFontFamily(newFamily);
      localStorage.setItem(
        FONT_STORAGE_KEY,
        JSON.stringify({ url: fontUrl.trim(), family: newFamily }),
      );
      addToast(`Font "${newFamily}" applied!`, 'success');
      setShowFontLoader(false);
    } catch {
      addToast('Failed to load font. Check the URL and try again.', 'error');
    } finally {
      setIsLoadingFont(false);
    }
  }, [fontUrl, fontFamilyInput, addToast]);

  const handleResetFont = useCallback(() => {
    setCustomFontFamily('');
    localStorage.removeItem(FONT_STORAGE_KEY);
    setFontUrl('');
    setFontFamilyInput('');
    addToast('Font reset to default', 'info');
  }, [addToast]);

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-700 shadow-2xl',
        className,
      )}
      style={{ backgroundColor: terminalBg }}
    >
      {/* macOS-style header bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-gray-700 bg-gray-800/50 px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <div className="ml-4 flex-1 select-none text-xs font-medium text-gray-400">
          Terminal Preview ({MOCK_SCENARIOS[scenarioKeys[scenarioIndex]].name})
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowFontLoader((p) => !p)}
            title="Font settings"
            aria-label="Toggle font settings"
            aria-expanded={showFontLoader}
            className="rounded p-1.5 text-gray-500 hover:bg-gray-700 hover:text-gray-300"
          >
            {showFontLoader ? <ChevronUp size={14} /> : <Type size={14} />}
          </button>
          <button
            onClick={handleCopyToClipboard}
            title="Copy screenshot to clipboard"
            aria-label="Copy screenshot to clipboard"
            className="rounded p-1.5 text-gray-500 hover:bg-gray-700 hover:text-gray-300"
          >
            <Copy size={14} />
          </button>
          <button
            onClick={handleDownload}
            title="Download PNG"
            aria-label="Download PNG screenshot"
            className="rounded p-1.5 text-gray-500 hover:bg-gray-700 hover:text-gray-300"
          >
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* Font Loader Panel */}
      {showFontLoader && (
        <div className="shrink-0 border-b border-gray-700 bg-gray-900/80 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-gray-400">
            Custom Nerd Font
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="url"
              value={fontUrl}
              onChange={(e) => setFontUrl(e.target.value)}
              placeholder="Font URL (.woff2 or .ttf)…"
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={fontFamilyInput}
              onChange={(e) => setFontFamilyInput(e.target.value)}
              placeholder="Font family name (e.g. JetBrainsMono Nerd Font)…"
              className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleApplyFont}
                disabled={isLoadingFont}
                className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-50"
              >
                {isLoadingFont ? 'Loading…' : 'Apply Font'}
              </button>
              {customFontFamily && (
                <button
                  onClick={handleResetFont}
                  className="rounded bg-gray-700 px-3 py-1.5 text-xs text-gray-300 hover:bg-gray-600"
                >
                  Reset to Default
                </button>
              )}
            </div>
            {customFontFamily && (
              <p className="text-xs text-green-400">
                Active: <span className="font-mono">{customFontFamily}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* xterm.js container */}
      <div className="relative min-h-[200px] flex-1 p-1">
        <div ref={terminalRef} className="absolute inset-0" />
      </div>
    </div>
  );
};
