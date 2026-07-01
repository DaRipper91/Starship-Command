
export interface FontData {
  id: string;
  name: string;
  family: string;
  category:
    | 'Gold Standard'
    | 'Aesthetic'
    | 'Bitmap & Retro'
    | 'High-Density'
    | 'Handwritten';
  description: string;
  ligatures: boolean;
}

export const NERD_FONT_VAULT: FontData[] = [
  // Gold Standard
  {
    id: 'fira-code',
    name: 'FiraCode Nerd Font',
    family: '"FiraCode Nerd Font", monospace',
    category: 'Gold Standard',
    description: 'The absolute classic. Excellent ligatures.',
    ligatures: true,
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrainsMono Nerd Font',
    family: '"JetBrainsMono Nerd Font", monospace',
    category: 'Gold Standard',
    description: 'Tall, readable, and perfectly balanced.',
    ligatures: true,
  },
  {
    id: 'hack',
    name: 'Hack Nerd Font',
    family: '"Hack Nerd Font", monospace',
    category: 'Gold Standard',
    description: 'A workhorse font designed for source code.',
    ligatures: false,
  },
  {
    id: 'source-code-pro',
    name: 'SauceCodePro Nerd Font',
    family: '"SauceCodePro Nerd Font", monospace',
    category: 'Gold Standard',
    description: 'Adobe’s open source monospace champion.',
    ligatures: false,
  },
  {
    id: 'meslo',
    name: 'MesloLGS Nerd Font',
    family: '"MesloLGS Nerd Font", monospace',
    category: 'Gold Standard',
    description: 'The recommended font for powerlevel10k.',
    ligatures: false,
  },

  // Aesthetic
  {
    id: 'cascadia-code',
    name: 'CaskaydiaCove Nerd Font',
    family: '"CaskaydiaCove Nerd Font", monospace',
    category: 'Aesthetic',
    description: 'Microsoft’s modern, playful terminal font.',
    ligatures: true,
  },
  {
    id: 'victor-mono',
    name: 'VictorMono Nerd Font',
    family: '"VictorMono Nerd Font", monospace',
    category: 'Aesthetic',
    description: 'Clean, crisp, and features semi-connected cursive italics.',
    ligatures: true,
  },
  {
    id: 'dank-mono',
    name: 'DankMono Nerd Font',
    family: '"DankMono Nerd Font", monospace',
    category: 'Aesthetic',
    description: 'A font designed for aesthetes with beautiful italics.',
    ligatures: true,
  },
  {
    id: 'space-mono',
    name: 'SpaceMono Nerd Font',
    family: '"SpaceMono Nerd Font", monospace',
    category: 'Aesthetic',
    description: 'A geometric, retro-futuristic monospace font.',
    ligatures: false,
  },
  {
    id: 'fantasque-sans-mono',
    name: 'FantasqueSansMono Nerd Font',
    family: '"FantasqueSansMono Nerd Font", monospace',
    category: 'Aesthetic',
    description: 'A font with a handwriting-like fuzziness.',
    ligatures: false,
  },

  // Bitmap & Retro
  {
    id: 'terminus',
    name: 'TerminessTTF Nerd Font',
    family: '"TerminessTTF Nerd Font", monospace',
    category: 'Bitmap & Retro',
    description: 'A crisp, clean, bitmapped programming font.',
    ligatures: false,
  },
  {
    id: '3270',
    name: '3270 Nerd Font',
    family: '"3270 Nerd Font", monospace',
    category: 'Bitmap & Retro',
    description: 'Derived from the IBM 3270 terminal.',
    ligatures: false,
  },
  {
    id: 'gohu',
    name: 'GohuFont Nerd Font',
    family: '"GohuFont Nerd Font", monospace',
    category: 'Bitmap & Retro',
    description: 'A highly legible bitmap font.',
    ligatures: false,
  },
  {
    id: 'proggy-clean',
    name: 'ProggyClean Nerd Font',
    family: '"ProggyClean Nerd Font", monospace',
    category: 'Bitmap & Retro',
    description: 'A classic bitmap programming font.',
    ligatures: false,
  },

  // High-Density
  {
    id: 'iosevka',
    name: 'Iosevka Nerd Font',
    family: '"Iosevka Nerd Font", monospace',
    category: 'High-Density',
    description: 'Slender typeface for max horizontal density.',
    ligatures: true,
  },
  {
    id: 'agave',
    name: 'Agave Nerd Font',
    family: '"Agave Nerd Font", monospace',
    category: 'High-Density',
    description: 'A monospaced outline typeface, very crisp.',
    ligatures: false,
  },
  {
    id: 'inconsolata',
    name: 'Inconsolata Nerd Font',
    family: '"Inconsolata Nerd Font", monospace',
    category: 'High-Density',
    description: 'Inspired by humanist sans-serifs, slightly condensed.',
    ligatures: false,
  },
  {
    id: 'ubuntu-mono',
    name: 'UbuntuMono Nerd Font',
    family: '"UbuntuMono Nerd Font", monospace',
    category: 'High-Density',
    description: 'The default monospace font for Ubuntu.',
    ligatures: false,
  },

  // Handwritten
  {
    id: 'monofur',
    name: 'Monofur Nerd Font',
    family: '"Monofur Nerd Font", monospace',
    category: 'Handwritten',
    description: 'A quirky, rounded monospaced font.',
    ligatures: false,
  },
  {
    id: 'comic-shanns',
    name: 'ComicShannsMono Nerd Font',
    family: '"ComicShannsMono Nerd Font", monospace',
    category: 'Handwritten',
    description: 'Because sometimes you need Comic Sans in your terminal.',
    ligatures: false,
  },
  {
    id: 'go-mono',
    name: 'GoMono Nerd Font',
    family: '"GoMono Nerd Font", monospace',
    category: 'Handwritten',
    description:
      'Slightly rounded, humanist look designed by Bigelow & Holmes.',
    ligatures: false,
  },
];
