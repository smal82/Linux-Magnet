const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openMagnet: (magnetUrl) => ipcRenderer.invoke("open-magnet", magnetUrl),
  fetchFeed: () => ipcRenderer.invoke("fetch-feed"),
});