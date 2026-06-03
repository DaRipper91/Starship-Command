export interface IElectronAPI {
  readConfig: () => Promise<string>;
  saveConfig: (content: string) => Promise<{ success: boolean }>;
  getHomeDir: () => Promise<string>;
  onMainProcessMessage: (callback: (message: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
