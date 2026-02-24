import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ColorUtils } from './color-utils';

// Mock Worker
class MockWorker {
  onmessage: ((e: MessageEvent) => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  postMessage(data: any) {
    // Simulate successful extraction
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({
          data: {
            result: {
              primary: '#ff0000',
              secondary: '#00ff00',
              accent: '#0000ff',
              extracted16: ['#ff0000', '#00ff00'],
              background: '#000000',
              foreground: '#ffffff',
            },
          },
        } as MessageEvent);
      }
    }, 10);
  }
  terminate() {}
}

// Mock global Worker
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.Worker = MockWorker as any;

// Mock createImageBitmap
global.createImageBitmap = vi.fn().mockResolvedValue({} as ImageBitmap);

describe('ColorUtils Extraction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use worker to extract palette', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const palette = await ColorUtils.extractPaletteFromImage(file);

    expect(palette).toBeDefined();
    expect(palette.primary).toBe('#ff0000');
    expect(global.createImageBitmap).toHaveBeenCalledWith(file);
  });
});
