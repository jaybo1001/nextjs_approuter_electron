import React, { createContext, useContext, useState } from "react";

interface CleoPanelContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const CleoPanelContext = createContext<CleoPanelContextProps | undefined>(undefined);

export const CleoPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CleoPanelContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CleoPanelContext.Provider>
  );
};

export const useCleoPanel = () => {
  const context = useContext(CleoPanelContext);
  if (!context) {
    throw new Error("useCleoPanel must be used within a CleoPanelProvider");
  }
  return context;
};