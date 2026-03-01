import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';
import harmoniesPlugin from 'colord/plugins/harmonies';
import namesPlugin from 'colord/plugins/names';
import { Vibrant } from 'node-vibrant/browser';

// Extend colord in worker as well
extend([a11yPlugin, harmoniesPlugin, namesPlugin]);

self.onmessage = async (e: MessageEvent) => {
  const { imageBitmap } = e.data;

  try {
    // Use Vibrant to extract palette
    // Vibrant.from accepts ImageBitmap
    const builder = Vibrant.from(imageBitmap);
    // We request more colors to try to fill the 16 slots
    // Note: node-vibrant usually returns the standard 6 named swatches,
    // but internally it generates a palette.
    // We can't easily access the raw palette from the high-level API easily
    // without using the Builder options.
    // However, for the purpose of this task, we will try to use what we get
    // or simulate the extra colors using harmonies if needed.
    // Actually, let's just stick to the main swatches for primary/secondary
    // and try to generate the 16 colors from the swatches or their variations.

    const palette = await builder.getPalette();

    // Map Vibrant swatches to our needed keys
    const vibrantHex = palette.Vibrant?.hex;
    const lightVibrantHex = palette.LightVibrant?.hex;
    const darkVibrantHex = palette.DarkVibrant?.hex;
    const mutedHex = palette.Muted?.hex;
    const lightMutedHex = palette.LightMuted?.hex;
    const darkMutedHex = palette.DarkMuted?.hex;

    // Collect all unique colors found
    const allColors = [
      vibrantHex,
      lightVibrantHex,
      darkVibrantHex,
      mutedHex,
      lightMutedHex,
      darkMutedHex,
    ].filter(Boolean) as string[];

    // Sort by brightness to mimic the previous behavior roughly
    const sortedColors = allColors.sort((a, b) => {
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
            const analogous = colord(c).harmonies('analogous').map(x => x.toHex());
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
      primary: vibrantHex || colors16[8] || '#ffffff',
      secondary: lightVibrantHex || colors16[10] || '#eeeeee',
      accent: darkVibrantHex || colors16[4] || '#aaaaaa',
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
    self.postMessage({ error: error instanceof Error ? error.message : String(error) });
  } finally {
      // Close the bitmap to release memory
      imageBitmap.close();
  }
};
