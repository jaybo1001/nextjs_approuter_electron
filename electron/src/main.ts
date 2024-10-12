import { is } from "@electron-toolkit/utils";
import { app, BrowserWindow, ipcMain } from "electron";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import { join } from "path";
import ngrok from '@ngrok/ngrok';
import fs from 'fs';
import yaml from 'js-yaml';
import * as path from 'path';

let ngrokListener = null;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.on("ready-to-show", () => mainWindow.show());

  const loadURL = async () => {
    if (is.dev) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      try {
        const port = await startNextJSServer();
        console.log("Next.js server started on port:", port);
        mainWindow.loadURL(`http://localhost:${port}`);
      } catch (error) {
        console.error("Error starting Next.js server:", error);
      }
    }
  };

  loadURL();
  return mainWindow;
};

const startNextJSServer = async () => {
  try {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
    const webDir = join(app.getAppPath(), "app");

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: "localhost",
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    });

    return nextJSPort;
  } catch (error) {
    console.error("Error starting Next.js server:", error);
    throw error;
  }
};

async function startNgrok() {
  try {
    const configPath = join(__dirname, '../ngrok.yml');
    const configFile = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(configFile);

    const listener = await ngrok.connect({
      addr: config.tunnels.your_tunnel_name.addr,
      authtoken: config.authtoken,
      domain: config.tunnels.your_tunnel_name.hostname,
    });

    console.log(`ngrok tunnel created: ${listener.url()}`);
    return listener;
  } catch (error) {
    console.error('Error starting ngrok:', error);
    return null;
  }
}

app.whenReady().then(async () => {
  const mainWindow = createWindow();

  try {
    console.log('Starting ngrok...');
    ngrokListener = await startNgrok();
    const ngrokUrl = ngrokListener ? ngrokListener.url() : null;
    console.log('ngrok URL:', ngrokUrl);

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('ngrok-url', ngrokUrl);
    });
  } catch (error) {
    console.error('Error in main process:', error);
  }

  ipcMain.on("ping", () => console.log("pong"));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('applicationSupportsSecureRestorableState', () => {
    return true;
  });

  ipcMain.handle('get-files', async (event, dir: string) => {
    try {
      const files = readDirectoryStructure(dir);
      return { status: 'success', data: files };
    } catch (error) {
      console.error('Error in get-files handler:', error);
      return { status: 'error', message: error.message };
    }
  });
});

app.on("window-all-closed", () => {
  if (ngrokListener) {
    ngrokListener.close();
  }
  if (process.platform !== "darwin") app.quit();
});

interface FileData {
  name: string;
  path: string;
  size: number;
  isDirectory: boolean;
  created: Date;
  modified: Date;
  accessed: Date;
  mode: number;
  uid: number;
  gid: number;
  lastAuthor: string;
  lastEmail: string;
  lastModified: string;
  lastCommitMessage: string;
  children?: FileData[];
}

function readDirectoryStructure(dir: string): FileData[] {
  try {
    const files = fs.readdirSync(dir);
    return files.map(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      const fileData: FileData = {
        name: file,
        path: filePath,
        size: stats.size,
        isDirectory: stats.isDirectory(),
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime,
        mode: stats.mode,
        uid: stats.uid,
        gid: stats.gid,
        lastAuthor: '',
        lastEmail: '',
        lastModified: stats.mtime.toISOString(),
        lastCommitMessage: '',
      };
      if (fileData.isDirectory) {
        fileData.children = readDirectoryStructure(filePath);
      }
      return fileData;
    });
  } catch (error) {
    console.error('Error reading directory structure:', error);
    throw error;
  }
}
