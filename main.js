const { app, BrowserWindow, Tray, Menu, globalShortcut } = require('electron');
const path = require('path');

let tray = null;
let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  });

  win.setMenu(null);

  win.loadFile('index.html');

  win.on('closed', () => {
    win = null;
  });
};

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open app', click: () => { win.show(); } },
    { label: 'Close', click: () => { app.quit(); } }
  ]);
  tray.setToolTip('Translator');
  tray.setContextMenu(contextMenu);
}

function registerGlobalShortcut() {
  globalShortcut.register('CommandOrControl+B', () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });
}

app.on('ready', () => {
  createWindow();
  createTray();
  registerGlobalShortcut();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
