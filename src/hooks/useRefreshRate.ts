import { useEffect } from 'react';

import { useUIStore } from '../stores/ui-store';

/**
 * Hook to auto-detect the hardware refresh rate (Hz) using requestAnimationFrame.
 * This ensures the UI stays frame-perfect on Tensor-based hardware (Pixel 9/10 Pro).
 */
export const useRefreshRate = () => {
  const setRefreshRate = useUIStore((state) => state.setRefreshRate);

  useEffect(() => {
    let frameCount = 0;
    const startTime = performance.now();
    let requestId: number;

    const checkHz = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;

      // Sample over ~500ms for high precision
      if (elapsed >= 500) {
        const hz = Math.round((frameCount * 1000) / elapsed);

        // Normalize to common hardware rates (60, 90, 120, 144)
        const normalizedHz = [60, 90, 120, 144].reduce((prev, curr) =>
          Math.abs(curr - hz) < Math.abs(prev - hz) ? curr : prev,
        );

        setRefreshRate(normalizedHz);
        return; // Success, stop sampling
      }

      requestId = requestAnimationFrame(checkHz);
    };

    requestId = requestAnimationFrame(checkHz);

    return () => cancelAnimationFrame(requestId);
  }, [setRefreshRate]);
};
