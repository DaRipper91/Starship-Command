import { BrowserWindow as e, app as t, ipcMain as n } from "electron";
import r from "node:path";
import { fileURLToPath as i } from "node:url";
import a from "node:fs";
import o from "node:os";
//#region electron/main.ts
var s = r.dirname(i(import.meta.url));
((process.env.DIST = r.join(s, "../dist")),
  (process.env.VITE_PUBLIC = t.isPackaged
    ? process.env.DIST
    : r.join(process.env.DIST, "../public")));
var c;
function l() {
  ((c = new e({
    icon: r.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: { preload: r.join(s, "preload.js") },
    width: 1200,
    height: 800,
  })),
    c.webContents.on("did-finish-load", () => {
      c?.webContents.send(
        "main-process-message",
        /* @__PURE__ */ new Date().toLocaleString(),
      );
    }),
    process.env.VITE_DEV_SERVER_URL
      ? c.loadURL(process.env.VITE_DEV_SERVER_URL)
      : c.loadFile(r.join(process.env.DIST, "index.html")));
}
(t.on("window-all-closed", () => {
  process.platform !== "darwin" && (t.quit(), (c = null));
}),
  t.on("activate", () => {
    e.getAllWindows().length === 0 && l();
  }),
  t.whenReady().then(l));
var u = r.join(o.homedir(), ".config", "starship.toml");
(n.handle("read-starship-config", async () => {
  try {
    return a.existsSync(u) ? a.readFileSync(u, "utf-8") : "";
  } catch (e) {
    throw (console.error("Error reading starship config:", e), e);
  }
}),
  n.handle("save-starship-config", async (e, t) => {
    try {
      let e = r.dirname(u);
      return (
        a.existsSync(e) || a.mkdirSync(e, { recursive: !0 }),
        a.writeFileSync(u, t, "utf-8"),
        { success: !0 }
      );
    } catch (e) {
      throw (console.error("Error saving starship config:", e), e);
    }
  }),
  n.handle("get-home-dir", () => o.homedir()));
//#endregion
