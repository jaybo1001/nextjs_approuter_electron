"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsoleContextType {
  consoleOpen: boolean;
  setConsoleOpen: (state: boolean) => void;
}

const ConsoleContext = createContext<ConsoleContextType | undefined>(undefined);

export const ConsoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [consoleOpen, setConsoleOpen] = useState(false);

  return (
    <ConsoleContext.Provider value={{ consoleOpen, setConsoleOpen }}>
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = (): ConsoleContextType => {
  const context = useContext(ConsoleContext);
  if (!context) {
    throw new Error('useConsole must be used within a ConsoleProvider');
  }
  return context;
};
