import { useState, useEffect, useCallback } from 'react';
import { FileMetadata } from '@/types/FileMetadata';

export const useFileSystem = () => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (window.electronAPI && typeof window.electronAPI.getFiles === 'function') {
        const result = await window.electronAPI.getFiles();
        if (result.status === 'success') {
          setFiles(result.data);
          return result.data;
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error('ElectronAPI not available or getFiles is not a function');
      }
    } catch (err) {
      // Error handling...
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    isLoading,
    error,
    refreshFiles: fetchFiles
  };
};