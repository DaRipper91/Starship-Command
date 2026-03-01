export type ColorExtractMessage = {
  id: string;
  imageBitmap: ImageBitmap;
};

export type ColorExtractResponse = {
  id: string;
  palette?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    success: string;
    error: string;
    warning: string;
    extracted16: string[];
    bg: string;
    fg: string;
  };
  error?: string;
};

// Simple RGB to Hex converter
function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

self.onmessage = async (e: MessageEvent<ColorExtractMessage>) => {
  const { id, imageBitmap } = e.data;

  try {
    // 1. Draw image to offscreen canvas
    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2d context');
    }

    ctx.drawImage(imageBitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 2. Quantize colors (very basic median cut or histogram approach)
    // We'll use a simplified binning approach for performance
    const colorMap = new Map<string, { r: number; g: number; b: number; count: number }>();

    // Step size to speed up processing (skip pixels)
    const step = 4 * Math.max(1, Math.floor((canvas.width * canvas.height) / 10000));

    for (let i = 0; i < data.length; i += step) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Ignore transparent pixels
      if (a < 128) continue;

      // Bin colors (reduce precision to group similar colors)
      const binSize = 32;
      const rBin = Math.floor(r / binSize) * binSize + binSize / 2;
      const gBin = Math.floor(g / binSize) * binSize + binSize / 2;
      const bBin = Math.floor(b / binSize) * binSize + binSize / 2;

      const key = `${rBin},${gBin},${bBin}`;
      const existing = colorMap.get(key);
      if (existing) {
        existing.count++;
      } else {
        colorMap.set(key, { r: rBin, g: gBin, b: bBin, count: 1 });
      }
    }

    // 3. Sort by frequency
    const sortedColors = Array.from(colorMap.values()).sort((a, b) => b.count - a.count);

    // Ensure we have at least 16 colors
    let palette16 = sortedColors.slice(0, 16);
    while (palette16.length < 16 && palette16.length > 0) {
      palette16 = [...palette16, ...palette16].slice(0, 16);
    }

    if (palette16.length === 0) {
       // fallback
       palette16 = Array(16).fill({r: 255, g: 255, b: 255, count: 0});
    }

    // Sort by brightness for bg/fg assignments
    const sortedByBrightness = [...palette16].sort((a, b) => {
      const bA = a.r * 0.299 + a.g * 0.587 + a.b * 0.114;
      const bB = b.r * 0.299 + b.g * 0.587 + b.b * 0.114;
      return bA - bB;
    });

    const hexColors = palette16.map(c => rgbToHex(c.r, c.g, c.b));
    const sortedHex = sortedByBrightness.map(c => rgbToHex(c.r, c.g, c.b));

    const bg = sortedHex[0];
    const fg = sortedHex[sortedHex.length - 1];

    const primary = hexColors[0];
    const secondary = hexColors[1] || '#eeeeee';
    const accent = hexColors[2] || '#aaaaaa';

    const response: ColorExtractResponse = {
      id,
      palette: {
        primary,
        secondary,
        accent,
        background: bg,
        foreground: fg,
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        extracted16: hexColors,
        bg,
        fg,
      }
    };

    // Cleanup
    imageBitmap.close();
    self.postMessage(response);

  } catch (error) {
    self.postMessage({ id, error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
