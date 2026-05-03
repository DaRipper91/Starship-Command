import { ChevronDown, Download, Info } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { logger } from '../lib/logger';
import { cn } from '../lib/utils';
import { Modal } from './ui/Modal';

interface FontSelectorProps {
  currentFont: string;
  onSelectFont: (fontName: string) => void;
}

const NERD_FONT_FAMILIES = [
  'FiraCode NF',
  'JetBrainsMono NF',
  'Hack NF',
  'RobotoMono NF',
  'MesloLGS NF',
];

const fontDownloadUrls: Record<string, string> = {
  'FiraCode NF':
    'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/FiraCode.zip',
  'JetBrainsMono NF':
    'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/JetBrainsMono.zip',
  'Hack NF':
    'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/Hack.zip',
  'RobotoMono NF':
    'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/RobotoMono.zip',
  'MesloLGS NF':
    'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/Meslo.zip',
};

const fontPreviewUrls: Record<string, string> = {
  'FiraCode NF':
    'https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@latest/patched-fonts/FiraCode/Regular/complete/Fira%20Code%20Regular%20Nerd%20Font%20Complete.ttf',
  'JetBrainsMono NF':
    'https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@latest/patched-fonts/JetBrainsMono/Regular/complete/JetBrains%20Mono%20Nerd%20Font%20Complete.ttf',
  'Hack NF':
    'https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@latest/patched-fonts/Hack/Regular/complete/Hack%20Nerd%20Font%20Complete.ttf',
  'RobotoMono NF':
    'https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@latest/patched-fonts/RobotoMono/Regular/complete/Roboto%20Mono%20Nerd%20Font%20Complete.ttf',
  'MesloLGS NF':
    'https://cdn.jsdelivr.net/gh/ryanoasis/nerd-fonts@latest/patched-fonts/Meslo/M/Regular/complete/Meslo%20LGS%20NF%20Regular.ttf',
};

export function FontSelector({ currentFont, onSelectFont }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInstallInstructions, setShowInstallInstructions] = useState(false);

  useEffect(() => {
    // Dynamically load selected font when component mounts or font changes
    const loadFont = async () => {
      if (currentFont && fontPreviewUrls[currentFont]) {
        const fontFace = new FontFace(
          currentFont,
          `url(${fontPreviewUrls[currentFont]})`,
        );
        await fontFace.load();
        document.fonts.add(fontFace);
        logger.warn(`Font ${currentFont} loaded.`);
      }
    };
    loadFont();
  }, [currentFont]);

  const handleDownload = useCallback(() => {
    const downloadUrl = fontDownloadUrls[currentFont];
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${currentFont.replace(/ /g, '')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowInstallInstructions(true);
    } else {
      logger.error('No download URL found for this font.');
    }
  }, [currentFont]);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 shadow-sm transition-colors hover:bg-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span style={{ fontFamily: currentFont }}>{currentFont}</span>
        <ChevronDown
          size={16}
          className={cn(
            'transform transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-700 bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {NERD_FONT_FAMILIES.map((font) => (
            <li
              key={font}
              className="cursor-pointer select-none px-3 py-2 text-sm text-gray-200 hover:bg-gray-700"
              onClick={() => {
                onSelectFont(font);
                setIsOpen(false);
              }}
              style={{ fontFamily: font }}
            >
              {font}
            </li>
          ))}
          <li className="mt-1 border-t border-gray-700 pt-1">
            <button
              aria-label="Download and Install Font"
              onClick={handleDownload}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:bg-gray-700"
            >
              <Download size={16} /> Download & Install "{currentFont}"
            </button>
          </li>
        </ul>
      )}

      <Modal
        isOpen={showInstallInstructions}
        onClose={() => setShowInstallInstructions(false)}
        title={`Install ${currentFont}`}
      >
        <div className="space-y-4 text-gray-300">
          <p>
            Your font has been downloaded! Now, follow these steps to install
            it:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>1. Locate the downloaded .zip file:</strong> Check your
              browser's downloads (e.g., `~/Downloads/$
              {currentFont.replace(/ /g, '')}.zip`).
            </li>
            <li>
              <strong>2. Extract the fonts:</strong> Unzip the downloaded file.
              You'll find several `.ttf` or `.otf` font files inside.
            </li>
            <li>
              <strong>3. Install the fonts:</strong>
              <ul className="ml-4 list-inside list-disc space-y-1 text-sm text-gray-400">
                <li>
                  <strong>Windows:</strong> Select all font files, right-click,
                  and choose "Install" or "Install for all users."
                </li>
                <li>
                  <strong>macOS:</strong> Select all font files, double-click,
                  and in the Font Book window, click "Install Font."
                </li>
                <li>
                  <strong>Linux:</strong> Copy the font files to
                  `~/.local/share/fonts/` (for your user) or `/usr/share/fonts/`
                  (system-wide) and then run `fc-cache -fv` in your terminal.
                </li>
              </ul>
            </li>
            <li>
              <strong>4. Configure your terminal:</strong> Open your terminal's
              settings (e.g., Alacritty, iTerm2, Konsole, GNOME Terminal) and
              set the font family to `{currentFont}`.
            </li>
            <li>
              <strong>5. Restart your terminal:</strong> Close and reopen your
              terminal application to apply the new font.
            </li>
          </ul>
          <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p>
              <strong>Note:</strong> Starship itself does not install fonts.
              This action helps you get the font onto your system, but you must
              configure your terminal emulator to use it.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
