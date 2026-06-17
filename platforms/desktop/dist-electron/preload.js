import { contextBridge as e, ipcRenderer as t } from "electron";
//#region electron/preload.ts
e.exposeInMainWorld("electronAPI", {
	readConfig: () => t.invoke("read-starship-config"),
	saveConfig: (e) => t.invoke("save-starship-config", e),
	getHomeDir: () => t.invoke("get-home-dir"),
	onMainProcessMessage: (e) => {
		t.on("main-process-message", (t, n) => e(n));
	}
});
//#endregion
