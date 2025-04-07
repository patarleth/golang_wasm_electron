const { app, BrowserWindow, nativeImage, ipcMain } = require('electron')
const path = require('path')
const fs = require('node:fs');

/*
    On index.html load out/main.wasm and send the binary to the web view using webContents.send()

    That's it... this demo does almost nothing in the node half ;)
*/
const env = process.env.NODE_ENV || 'prod';

if (env === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 800,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'renderer.js'),
            nodeintegration: true,
            contextIsolation: false
        }
    })
    global.win = win

    win.loadFile('index.html').then(() => {
        const wasmBinary = fs.readFileSync('out/main.wasm');
        win.webContents.send("wasm_load", wasmBinary)
    })

    if (env === 'development') {
        win.webContents.openDevTools()
    }
}

app.on('before-quit', () => {
    console.log("BYE!")
})

app.whenReady().then(() => {
    createWindow()
})
