import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Tab = 'CleoWorkflow' | 'nAbilities' | 'nKnowledge' | 'nLogic' | 'nTerm';

interface NCommandContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NCommandContext = createContext<NCommandContextType | undefined>(undefined);

export const useNCommand = () => {
  const context = useContext(NCommandContext);
  if (!context) {
    throw new Error('useNCommand must be used within an NCommandProvider');
  }
  return context;
};

interface NCommandProviderProps {
  children: ReactNode;
}

export const NCommandProvider: React.FC<NCommandProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<Tab>('CleoWorkflow');

  return (
    <NCommandContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NCommandContext.Provider>
  );
};
