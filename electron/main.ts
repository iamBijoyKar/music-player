import { app, BrowserWindow, ipcMain, protocol } from "electron"
import path from "node:path"
// import {Howl, Howler} from 'howler'

import { getFiles } from "./finder"

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist")
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public")

const isDev = process.env.NODE_ENV !== "production"

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"]

function createWindow() {
  win = new BrowserWindow({
    autoHideMenuBar: true,
    title: "Momo Player",
    icon: path.join(process.env.PUBLIC, "peach.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  // DevTools for debug
  if (isDev) {
    win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"))
  }
}

app.on("ready", async () => {
  protocol.registerFileProtocol("my-magic-protocol", (request, callback) => {
    const url = request.url.replace("my-magic-protocol://getMediaFile/", "")
    try {
      return callback(url)
    } catch (error) {
      console.error(error)
      return callback("404")
    }
  })
})

ipcMain.on("load:done", (e: unknown) => {
  const files = getFiles("D:/Music", [".mp3"])
  win?.webContents.send("path:done", files)
  console.log(files)
})

ipcMain.on("music:play", async (e: unknown, data) => {
  console.log(data)
  // const sound = new Howl({
  //   src:[data]
  // })
  // sound.play()
})

app.on("window-all-closed", () => {
  win = null
  if (process.platform !== "darwin") app.quit()
})

app.whenReady().then(createWindow)
