import React, { createContext, useContext, useState, useEffect } from 'react';

interface FileCodeDetails {
  [filePath: string]: string;
}

interface FileCodeContextType {
  fileCodeDetails: FileCodeDetails;
  setFileCode: (filePath: string, code: string) => void;
}

const FileCodeContext = createContext<FileCodeContextType | undefined>(undefined);

export const FileCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileCodeDetails, setFileCodeDetails] = useState<FileCodeDetails>({});

  useEffect(() => {
    // Load from localStorage on initial render
    const savedFileCodeDetails = localStorage.getItem('fileCodeDetails');
    if (savedFileCodeDetails) {
      setFileCodeDetails(JSON.parse(savedFileCodeDetails));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever fileCodeDetails changes
    localStorage.setItem('fileCodeDetails', JSON.stringify(fileCodeDetails));
  }, [fileCodeDetails]);

  const setFileCode = (filePath: string, code: string) => {
    setFileCodeDetails(prev => ({ ...prev, [filePath]: code }));
  };

  return (
    <FileCodeContext.Provider value={{ fileCodeDetails, setFileCode }}>
      {children}
    </FileCodeContext.Provider>
  );
};

export const useFileCode = () => {
  const context = useContext(FileCodeContext);
  if (context === undefined) {
    throw new Error('useFileCode must be used within a FileCodeProvider');
  }
  return context;
};
