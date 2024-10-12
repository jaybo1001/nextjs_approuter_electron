import { contextBridge, ipcRenderer } from "electron";

// Create a handler for IPC communication
const handler = {
  send(channel, value) {
    ipcRenderer.send(channel, value);
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

// Expose the IPC handler
contextBridge.exposeInMainWorld('ipc', handler);

// Add new exposed functionality for ngrok URL
contextBridge.exposeInMainWorld('electron', {
  receiveNgrokUrl: (callback) => ipcRenderer.on('ngrok-url', (_event, value) => callback(value)),
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

// Expose new methods for session and cookie handling
contextBridge.exposeInMainWorld('electronAPI', {
  getSession: (key) => ipcRenderer.invoke('get-session', key),
  setSession: (key, value) => ipcRenderer.invoke('set-session', key, value),
  setCookie: (cookieData) => ipcRenderer.invoke('set-cookie', cookieData),
  getCookie: (cookieData) => ipcRenderer.invoke('get-cookie', cookieData),
  readDirectoryStructure: (dirPath) => ipcRenderer.invoke('read-directory-structure', dirPath),
  getFiles: (dir: string) => ipcRenderer.invoke('get-files', dir),
  getFileCode: (filePath) => {
    console.log(`Preload: Invoking get-file-code for ${filePath}`);
    return ipcRenderer.invoke('get-file-code', filePath);
  },
  getNgrokUrl: () => ipcRenderer.invoke('get-ngrok-url'),
});
