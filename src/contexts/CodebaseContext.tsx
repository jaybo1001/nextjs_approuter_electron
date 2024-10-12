import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  [key: string]: any; // For any additional properties
}

interface CodebaseContextType {
  fileTree: FileData[] | null;
  files: FileData[];
  isLoading: boolean;
  error: string | null;
  refreshCodebase: () => Promise<void>;
  createFileTree: (files: FileData[]) => FileData[];
}

const CodebaseContext = createContext<CodebaseContextType | undefined>(undefined);

export const useCodebase = () => {
  const context = useContext(CodebaseContext);
  if (context === undefined) {
    throw new Error('useCodebase must be used within a CodebaseProvider');
  }
  return context;
};

export const CodebaseProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [fileTree, setFileTree] = useState<FileData[] | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFileTree = useCallback((files: FileData[]) => {
    const root: FileData[] = [];
    const map = new Map<string, FileData>();

    files.forEach(file => {
      const parts = file.path.split('/');
      let currentLevel = root;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;
        const currentPath = parts.slice(0, index + 1).join('/');
        let node = map.get(currentPath);

        if (!node) {
          node = {
            name: part,
            path: currentPath,
            size: isLast ? file.size : 0,
            isDirectory: !isLast || file.isDirectory,
            children: [],
          };
          map.set(currentPath, node);
          currentLevel.push(node);
        }

        if (!isLast) {
          currentLevel = node.children!;
        }
      });
    });

    return root;
  }, []);

  const refreshCodebase = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (window.electronAPI && typeof window.electronAPI.getFiles === 'function') {
        const result = await window.electronAPI.getFiles(process.cwd());
        if (result.status === 'success') {
          const newFiles = result.data as FileData[];
          setFiles(newFiles);
          const newFileTree = createFileTree(newFiles);
          setFileTree(newFileTree);
          
          // Store both files and fileTree in localStorage
          localStorage.setItem('codebaseFiles', JSON.stringify(newFiles));
          localStorage.setItem('codebaseFileTree', JSON.stringify(newFileTree));
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error('ElectronAPI not available or getFiles is not a function');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Failed to fetch file tree:', err);
    } finally {
      setIsLoading(false);
    }
  }, [createFileTree]);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const storedFiles = localStorage.getItem('codebaseFiles');
        const storedFileTree = localStorage.getItem('codebaseFileTree');
        
        if (storedFiles) {
          setFiles(JSON.parse(storedFiles));
        }
        
        if (storedFileTree) {
          setFileTree(JSON.parse(storedFileTree));
        }
      } catch (error) {
        console.error('Failed to parse stored codebase data:', error);
        // Optionally set an error state here
      }
    };

    loadFromLocalStorage();
    refreshCodebase();
  }, [refreshCodebase]);

  return (
    <CodebaseContext.Provider value={{ fileTree, files, isLoading, error, refreshCodebase, createFileTree }}>
      {children}
    </CodebaseContext.Provider>
  );
};
