'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingStates {
  cleoWorkflow: boolean;
  nAbilities: boolean;
  nTerm: boolean;
  nKnowledge: boolean;
  nLogic: boolean;
}

interface LoadingContextType {
  loadingStates: LoadingStates;
  setLoadingState: (key: keyof LoadingStates, state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    cleoWorkflow: false,
    nAbilities: false,
    nTerm: false,
    nKnowledge: false,
    nLogic: false,
  });

  const setLoadingState = (key: keyof LoadingStates, state: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: state }));
  };

  return (
    <LoadingContext.Provider value={{ loadingStates, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};