import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';

import { ColorUtils } from './color-utils';

// Mock node-vibrant
const mockGetPalette = vi.fn().mockResolvedValue({
  Vibrant: { hex: '#ff0000' },
  LightVibrant: { hex: '#00ff00' },
  DarkVibrant: { hex: '#0000ff' },
  DarkMuted: { hex: '#000000' },
  LightMuted: { hex: '#ffffff' },
});

const mockVibrantFrom = vi.fn().mockReturnValue({
  getPalette: mockGetPalette,
});

vi.mock('node-vibrant/browser', () => ({
  default: {
    from: mockVibrantFrom,
  },
}));

vi.mock('colorthief', () => ({
  default: class {
    getPalette() {
      return [
        [0, 0, 0],
        [255, 255, 255],
      ];
    }
  },
}));

describe('ColorUtils Optimization', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock URL.createObjectURL and revokeObjectURL
    // We need to cast to any because these might not be writable in some envs, but in JSDOM/Node they usually are or can be defined
    if (!global.URL.createObjectURL) {
      Object.defineProperty(global.URL, 'createObjectURL', { value: vi.fn() });
    } else {
      global.URL.createObjectURL = vi.fn();
    }

    if (!global.URL.revokeObjectURL) {
      Object.defineProperty(global.URL, 'revokeObjectURL', { value: vi.fn() });
    } else {
      global.URL.revokeObjectURL = vi.fn();
    }

    (global.URL.createObjectURL as Mock).mockReturnValue('blob:test');

    // Mock Image
    const originalImage = global.Image;
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: ((e: Event | string) => void) | null = null;
      src = '';
      crossOrigin = '';
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 50);
      }
    } as unknown as typeof Image;

    return () => {
      global.Image = originalImage;
    };
  });

  it('should lazy load node-vibrant and extract palette', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });

    const palette = await ColorUtils.extractPaletteFromImage(file);

    expect(palette).toBeDefined();
    expect(palette.primary).toBe('#ff0000');

    // Verify Vibrant was used
    const { default: Vibrant } = await import('node-vibrant/browser');
    expect(Vibrant.from).toHaveBeenCalledWith('blob:test');
    expect(mockGetPalette).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:test');
  });
});
