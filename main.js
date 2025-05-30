const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const https = require('https');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // In sviluppo, carica Vite server. In produzione, carica build.
  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('open-magnet', async (_event, magnetUrl) => {
  await shell.openExternal(magnetUrl);
});

ipcMain.handle('fetch-feed', async () => {
  const FEED_URL = "https://smal82.netsons.org/feed/distros/";
  return new Promise((resolve, reject) => {
    https.get(FEED_URL, (res) => {
      let data = "";
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err.message));
  });
});