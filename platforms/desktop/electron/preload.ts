import { contextBridge, ipcRenderer } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  readConfig: () => ipcRenderer.invoke('read-starship-config'),
  saveConfig: (content: string) => ipcRenderer.invoke('save-starship-config', content),
  getHomeDir: () => ipcRenderer.invoke('get-home-dir'),
  onMainProcessMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message))
  },
})
