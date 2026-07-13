import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pythonProcess = null;

// GFX Optimization for high-refresh displays
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-zero-copy");
app.commandLine.appendSwitch("ignore-gpu-blocklist");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "assets/icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    backgroundColor: "#0d1117",
    title: "Starship Command Enhanced",
  });

  // In production, we load the built React files
  win.loadFile(path.join(__dirname, "dist/index.html"));

  // Hide default menu
  win.setMenuBarVisibility(false);
}

// Start the Python backend
function startBackend() {
  // Production: Try to find python in PATH, fallback to /usr/bin/python
  const pythonPath =
    process.env.NODE_ENV === "development"
      ? "python"
      : process.platform === "win32"
        ? "python"
        : "python3";

  const serverPath = path.join(__dirname, "server/app.py");

  pythonProcess = spawn(pythonPath, [serverPath], {
    stdio: "inherit",
    env: { ...process.env, FLASK_ENV: "production" },
  });

  pythonProcess.on("error", (err) => {
    console.error("Failed to start python backend:", err);
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (pythonProcess) pythonProcess.kill();
  if (process.platform !== "darwin") app.quit();
});
