import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';

// Extend colord
extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

self.onmessage = async (e: MessageEvent) => {
  const { imageBitmap } = e.data;

  try {
    const palette = await extractColors(imageBitmap);
    self.postMessage({ type: 'SUCCESS', payload: palette });
  } catch (error) {
    self.postMessage({ type: 'ERROR', payload: String(error) });
  }
};

async function extractColors(imageBitmap: ImageBitmap) {
  // Use OffscreenCanvas to get pixel data
  const width = 100; // Resize for performance
  const height = 100;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  // Draw and resize
  ctx.drawImage(imageBitmap, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Simple histogram
  const colorCounts: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent
    if (a < 128) continue;

    // Quantize to reduce noise (round to nearest 8)
    const qr = Math.round(r / 8) * 8;
    const qg = Math.round(g / 8) * 8;
    const qb = Math.round(b / 8) * 8;

    const hex = colord({ r: qr, g: qg, b: qb }).toHex();
    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }

  // Sort by frequency
  const sortedColors = Object.entries(colorCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([hex]) => hex);

  // Filter similar colors to get distinct palette
  const distinctColors: string[] = [];
  for (const color of sortedColors) {
    if (distinctColors.length >= 16) break;

    const isDistinct = distinctColors.every(c =>
      colord(c).delta(color) > 0.1 // Delta E difference threshold
    );

    if (isDistinct) {
      distinctColors.push(color);
    }
  }

  // Fill if we don't have enough
  while (distinctColors.length < 16 && distinctColors.length > 0) {
    distinctColors.push(...distinctColors);
  }

  const colors16 = distinctColors.slice(0, 16);

  // Semantic mapping heuristics
  // Sort by saturation/brightness for "Vibrant" equivalents
  const sortedBySaturation = [...colors16].sort((a, b) =>
    colord(b).toHsl().s - colord(a).toHsl().s
  );

  // Primary: Most saturated (Vibrant)
  const primary = sortedBySaturation[0];

  // Secondary: Second most saturated or complementary
  const secondary = sortedBySaturation[1];

  // Background: Darkest color
  const background = [...colors16].sort((a, b) =>
    colord(a).brightness() - colord(b).brightness()
  )[0];

  // Foreground: Lightest color
  const foreground = [...colors16].sort((a, b) =>
    colord(b).brightness() - colord(a).brightness()
  )[0];

  // Accent: Distinct from primary
  const accent = sortedBySaturation.find(c => colord(c).delta(primary) > 0.2) || sortedBySaturation[2];

  return {
    primary,
    secondary,
    accent,
    background,
    foreground,
    success: '#10B981', // Keep standard success/error/warning
    warning: '#F59E0B',
    error: '#EF4444',
    extracted16: colors16,
    bg: background,
    fg: foreground
  };
}
