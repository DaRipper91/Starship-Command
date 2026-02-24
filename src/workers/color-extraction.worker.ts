import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';

extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

self.onmessage = async (e: MessageEvent) => {
  const { imageBitmap } = e.data;

  try {
    const palette = extractPalette(imageBitmap);
    self.postMessage({ result: palette });
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};

function extractPalette(imageBitmap: ImageBitmap) {
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(imageBitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const pixelCount = canvas.width * canvas.height;
  // Limit sampling to keep it fast
  const step = Math.max(1, Math.round(pixelCount / 5000));

  const colorMap: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 128) continue; // Skip transparent

    // Simple quantization: round to nearest 16
    const rQ = Math.round(r / 16) * 16;
    const gQ = Math.round(g / 16) * 16;
    const bQ = Math.round(b / 16) * 16;

    const hex = colord({ r: rQ, g: gQ, b: bQ }).toHex();
    colorMap[hex] = (colorMap[hex] || 0) + 1;
  }

  // Sort by frequency
  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .map(([hex]) => hex);

  // Get top 16 distinct colors
  let extracted16 = sortedColors.slice(0, 16);

  // Fill if less than 16
  if (extracted16.length === 0) {
    extracted16 = ['#000000'];
  }
  while (extracted16.length < 16) {
    extracted16 = [...extracted16, ...extracted16].slice(0, 16);
  }

  // Sort by brightness for assigning roles
  const byBrightness = [...extracted16].sort(
    (a, b) => colord(a).brightness() - colord(b).brightness(),
  );

  // Background: Darkest
  // Foreground: Lightest
  const bg = byBrightness[0];
  const fg = byBrightness[byBrightness.length - 1];

  // Find vibrant colors (high saturation) excluding very dark/light if possible
  const validForAccent = extracted16.filter((c) => {
    const b = colord(c).brightness();
    return b > 0.2 && b < 0.8;
  });

  const pool = validForAccent.length > 0 ? validForAccent : extracted16;

  const bySaturation = [...pool].sort(
    (a, b) => colord(b).toHsl().s - colord(a).toHsl().s,
  );

  const primary = bySaturation[0] || extracted16[0];
  const secondary = bySaturation[1] || extracted16[1] || primary;
  const accent = bySaturation[2] || extracted16[2] || secondary;

  return {
    primary,
    secondary,
    accent,
    background: bg,
    foreground: fg,
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    extracted16,
    bg,
    fg,
  };
}
