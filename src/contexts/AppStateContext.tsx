"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppState {
  windowSize: { width: number; height: number };
  panelSizes: { 
    leftPanel: number;
    mainPanel: number;
    rightPanel: number;
  };
  cockpitConsolePosition: number;
  lastLoginEmail: string;
  cockpitMainPanelSizes: { mainPanelInternal: number };
  rightPanelLastOpenSize: number;
}

interface AppStateContextType {
  appState: AppState;
  setWindowSize: (size: { width: number; height: number }) => void;
  setPanelSize: (panelId: keyof AppState['panelSizes'], size: number) => void;
  setCockpitConsolePosition: (position: number) => void;
  setLastLoginEmail: (email: string) => void;
  updateCockpitMainPanelSizes: (sizes: { mainPanelInternal: number }) => void;
  setRightPanelLastOpenSize: (size: number) => void;
}

export const defaultState: AppState = {
  windowSize: { width: 1000, height: 600 },
  panelSizes: { leftPanel: 15, mainPanel: 70, rightPanel: 15 },
  cockpitConsolePosition: 75,
  lastLoginEmail: '',
  cockpitMainPanelSizes: { mainPanelInternal: 75 },
  rightPanelLastOpenSize: 15,
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('appState');
      console.log('Loaded appState from localStorage:', savedState);
      return savedState ? JSON.parse(savedState) : defaultState;
    }
    return defaultState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appState', JSON.stringify(appState));
      console.log('Updated appState in localStorage:', appState);
    }
  }, [appState]);

  const setWindowSize = (size: { width: number; height: number }) => {
    setAppState(prev => ({ ...prev, windowSize: size }));
  };

  const setPanelSize = (panelId: keyof AppState['panelSizes'], size: number) => {
    setAppState(prev => ({
      ...prev,
      panelSizes: { ...prev.panelSizes, [panelId]: size },
    }));
  };

  const setCockpitConsolePosition = (position: number) => {
    setAppState(prev => ({
      ...prev,
      cockpitConsolePosition: position,
    }));
  };

  const setLastLoginEmail = (email: string) => {
    setAppState(prev => ({
      ...prev,
      lastLoginEmail: email,
    }));
  };

  const updateCockpitMainPanelSizes = (sizes: { mainPanelInternal: number }) => {
    setAppState(prev => ({
      ...prev,
      cockpitMainPanelSizes: sizes,
    }));
  };

  const setRightPanelLastOpenSize = (size: number) => {
    setAppState(prev => ({
      ...prev,
      rightPanelLastOpenSize: size,
    }));
  };

  return (
    <AppStateContext.Provider value={{ 
      appState, 
      setWindowSize, 
      setPanelSize, 
      setCockpitConsolePosition,
      setLastLoginEmail,
      updateCockpitMainPanelSizes,
      setRightPanelLastOpenSize
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};