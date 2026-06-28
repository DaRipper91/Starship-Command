const { contextBridge, ipcRenderer } = require("electron");

/**
 * Secure bridge between the sandboxed React frontend and the native Electron process.
 * This replaces the insecure 'nodeIntegration: true' pattern.
 */
contextBridge.exposeInMainWorld("electronAPI", {
  // Add specific IPC channels as needed for theme saving/loading
  send: (channel, data) => {
    let validChannels = ["save-theme", "load-theme"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["theme-saved", "backend-status"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
