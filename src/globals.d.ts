/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    global: typeof globalThis;
  }
  const global: typeof globalThis;
}
