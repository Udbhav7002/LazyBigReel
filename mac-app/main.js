const { app, BrowserWindow } = require('electron');
const path = require('path');
const { appEvents } = require('./server.js');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 320,
        height: 480,
        resizable: false,
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#000000',
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

appEvents.on('connected', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        setTimeout(() => {
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.hide(); // Hide the window so it doesn't obstruct the user
            }
        }, 1000);
    }
});

appEvents.on('disconnected', () => {
    if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
        mainWindow.show(); // Show it again if connection lost
    }
});
