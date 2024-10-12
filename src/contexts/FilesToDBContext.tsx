import React, { createContext, useContext, useState } from 'react';
import { FileMetadata } from '@/types/FileMetadata';

interface FileSystemSyncContextType {
  files: FileMetadata[];
  setFiles: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  supabaseData: FileMetadata[];
  setSupabaseData: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
}

const FileSystemSyncContext = createContext<FileSystemSyncContextType | undefined>(undefined);

export const FileSystemSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [supabaseData, setSupabaseData] = useState<FileMetadata[]>([]);

  return (
    <FileSystemSyncContext.Provider value={{
      files, setFiles, isLoading, setIsLoading, error, setError, supabaseData, setSupabaseData
    }}>
      {children}
    </FileSystemSyncContext.Provider>
  );
};

export const useFileSystemSync = () => {
  const context = useContext(FileSystemSyncContext);
  if (context === undefined) {
    throw new Error('useFileSystemSync must be used within a FileSystemSyncProvider');
  }
  return context;
};