/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'colorthief' {
  export default class ColorThief {
    getColor(sourceImage: HTMLImageElement | null, quality?: number): number[];
    getPalette(
      sourceImage: HTMLImageElement | null,
      colorCount?: number,
      quality?: number,
    ): number[][];
  }
}
