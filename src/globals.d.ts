
export {};

declare global {
  interface Window {
    global: typeof globalThis;
  }
  const global: typeof globalThis;
}
