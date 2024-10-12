import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RightPanelContextType {
  activeApp: string;
  setActiveApp: (app: string) => void;
  isOpen: boolean;
  togglePanel: () => void;
}

const RightPanelContext = createContext<RightPanelContextType | undefined>(undefined);

export const useRightPanel = () => {
  const context = useContext(RightPanelContext);
  if (!context) {
    throw new Error('useRightPanel must be used within a RightPanelProvider');
  }
  return context;
};

interface RightPanelProviderProps {
  children: ReactNode;
}

export const RightPanelProvider: React.FC<RightPanelProviderProps> = ({ children }) => {
  const [activeApp, setActiveApp] = useState('Codebase');
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <RightPanelContext.Provider value={{ activeApp, setActiveApp, isOpen, togglePanel }}>
      {children}
    </RightPanelContext.Provider>
  );
};
