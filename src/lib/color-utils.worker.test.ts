import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ColorUtils } from './color-utils';

// We mock the global Worker and createImageBitmap to test the extraction wrapper
describe('ColorUtils.extractPaletteFromImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should resolve with the color palette when the worker posts a successful message', async () => {
    // Mock createImageBitmap
    const mockImageBitmap = {} as ImageBitmap;
    global.createImageBitmap = vi.fn().mockResolvedValue(mockImageBitmap);

    // Mock Worker
    const mockPostMessage = vi.fn();
    const mockTerminate = vi.fn();

    let onMessageHandler: ((e: MessageEvent) => void) | null = null;

    class MockWorker {
      onmessage: ((e: MessageEvent) => void) | null = null;
      onerror: ((e: ErrorEvent) => void) | null = null;

      constructor(stringUrl: string | URL, options?: WorkerOptions) {
        // Nothing here
      }

      postMessage(message: any) {
        mockPostMessage(message);
        const { id } = message;
        // Simulate worker response
        setTimeout(() => {
          if (this.onmessage) {
            this.onmessage({
              data: {
                id,
                palette: { primary: '#ff0000', secondary: '#00ff00' },
              },
            } as MessageEvent);
          }
        }, 0);
      }

      terminate() {
        mockTerminate();
      }
    }

    global.Worker = MockWorker as any;

    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    const palette = await ColorUtils.extractPaletteFromImage(mockFile);

    expect(palette.primary).toBe('#ff0000');
    expect(palette.secondary).toBe('#00ff00');
    expect(mockPostMessage).toHaveBeenCalled();
    expect(mockTerminate).toHaveBeenCalled();
  });

  it('should reject with an error when the worker posts an error message', async () => {
    const mockImageBitmap = {} as ImageBitmap;
    global.createImageBitmap = vi.fn().mockResolvedValue(mockImageBitmap);

    const mockTerminate = vi.fn();

    class MockWorkerError {
      onmessage: ((e: MessageEvent) => void) | null = null;
      onerror: ((e: ErrorEvent) => void) | null = null;

      constructor(stringUrl: string | URL, options?: WorkerOptions) {
        // Nothing here
      }

      postMessage(message: any) {
        const { id } = message;
        setTimeout(() => {
          if (this.onmessage) {
            this.onmessage({
              data: {
                id,
                error: 'Worker failed to extract',
              },
            } as MessageEvent);
          }
        }, 0);
      }

      terminate() {
        mockTerminate();
      }
    }

    global.Worker = MockWorkerError as any;

    const mockFile = new File([''], 'test.png', { type: 'image/png' });
    await expect(ColorUtils.extractPaletteFromImage(mockFile)).rejects.toThrow('Worker failed to extract');
    expect(mockTerminate).toHaveBeenCalled();
  });
});
