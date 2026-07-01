import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { app, BrowserWindow, ipcMain } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 1200,
    height: 800,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// --- Starship Config IPC Handlers ---

const STARSHIP_CONFIG_PATH = path.join(os.homedir(), '.config', 'starship.toml')

ipcMain.handle('read-starship-config', async () => {
  try {
    if (fs.existsSync(STARSHIP_CONFIG_PATH)) {
      return fs.readFileSync(STARSHIP_CONFIG_PATH, 'utf-8')
    }
    return '' // Return empty if file doesn't exist
  } catch (error) {
    console.error('Error reading starship config:', error)
    throw error
  }
})

ipcMain.handle('save-starship-config', async (event, content: string) => {
  try {
    const dir = path.dirname(STARSHIP_CONFIG_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(STARSHIP_CONFIG_PATH, content, 'utf-8')
    return { success: true }
  } catch (error) {
    console.error('Error saving starship config:', error)
    throw error
  }
})

ipcMain.handle('get-home-dir', () => os.homedir())
