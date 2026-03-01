import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';

// Extend colord in worker as well
extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

// Helper for histogram extraction
function extractColorsFromBitmap(bitmap: ImageBitmap): string[] {
  // Use OffscreenCanvas available in workers
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  // Draw scaled down to improve performance
  const maxDim = 200;
  let w = bitmap.width;
  let h = bitmap.height;
  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    w = Math.floor(w * ratio);
    h = Math.floor(h * ratio);
  }
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(bitmap, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h).data;
  const colorMap = new Map<string, number>();

  // Simple histogram
  for (let i = 0; i < imageData.length; i += 4 * 10) {
    // skip pixels for speed
    const r = Math.round(imageData[i] / 10) * 10;
    const g = Math.round(imageData[i + 1] / 10) * 10;
    const b = Math.round(imageData[i + 2] / 10) * 10;
    const a = imageData[i + 3];

    if (a < 128) continue; // skip transparent

    const key = `${r},${g},${b}`;
    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  // Sort by frequency
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Take top 10
    .map((entry) => {
      const [r, g, b] = entry[0].split(',').map(Number);
      return colord({ r, g, b }).toHex();
    });

  return sortedColors;
}

self.onmessage = async (e: MessageEvent) => {
  const { imageBitmap } = e.data;

  try {
    const extractedColors = extractColorsFromBitmap(imageBitmap);

    // Sort by brightness to mimic the previous behavior roughly
    const sortedColors = extractedColors.sort((a, b) => {
      const ca = colord(a);
      const cb = colord(b);
      return ca.brightness() - cb.brightness();
    });

    const bg = sortedColors[0] || '#000000';
    const fg = sortedColors[sortedColors.length - 1] || '#ffffff';

    // To fill 16 colors, we can generate variations or repeat
    let colors16 = [...sortedColors];

    // If we don't have enough colors, generate analogous variations
    if (colors16.length < 16) {
      const extraColors: string[] = [];
      for (const c of colors16) {
        const analogous = colord(c)
          .harmonies('analogous')
          .map((x) => x.toHex());
        extraColors.push(...analogous);
      }
      colors16 = [...colors16, ...extraColors];
      // Deduplicate
      colors16 = [...new Set(colors16)];
    }

    // Fill the rest if still needed
    while (colors16.length < 16 && colors16.length > 0) {
      colors16 = [...colors16, ...colors16].slice(0, 16);
    }
    // Fallback if empty
    if (colors16.length === 0) {
      colors16 = Array(16).fill('#888888');
    }

    colors16 = colors16.slice(0, 16);

    const result = {
      primary: colors16[Math.floor(colors16.length / 2)] || '#ffffff',
      secondary: colors16[Math.floor(colors16.length / 3)] || '#eeeeee',
      accent: colors16[Math.floor((colors16.length / 3) * 2)] || '#aaaaaa',
      background: bg,
      foreground: fg,
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
      extracted16: colors16,
      bg,
      fg,
    };

    self.postMessage({ result });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    // Close the bitmap to release memory
    imageBitmap.close();
  }
};
