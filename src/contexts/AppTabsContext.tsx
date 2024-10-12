"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import { App } from '../types/AppTypes';
import { Key } from 'react';

interface TabItem {
  id: Key;
  appId: number;
  title: string;
}

interface TabsContextType {
  tabs: TabItem[];
  setTabs: React.Dispatch<React.SetStateAction<TabItem[]>>;
  activeTabId: Key | null;
  addTab: (app: App) => void;
  closeTab: (tabId: Key) => void;
  activateTab: (tabId: Key) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const AppTabsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<Key | null>(null);

  const addTab = useCallback((app: App) => {
    setTabs((prevTabs) => {
      const existingTab = prevTabs.find((tab) => tab.appId === app.id && !app.MultiInstance);
      if (existingTab) {
        setActiveTabId(existingTab.id);
        return prevTabs;
      } else {
        const newTab: TabItem = {
          id: `${app.id}-${Date.now()}`,
          appId: app.id,
          title: app.AppName,
        };
        setActiveTabId(newTab.id);
        return [...prevTabs, newTab];
      }
    });
  }, []);

  const closeTab = useCallback(
    (tabId: Key) => {
      setTabs((prevTabs) => {
        const newTabs = prevTabs.filter((tab) => tab.id !== tabId);
        if (activeTabId === tabId) {
          setActiveTabId(newTabs[0]?.id || null);
        }
        return newTabs;
      });
    },
    [activeTabId]
  );

  const activateTab = useCallback((tabId: Key) => {
    setActiveTabId(tabId);
  }, []);

  return (
    <TabsContext.Provider
      value={{ tabs, setTabs, activeTabId, addTab, closeTab, activateTab }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within an AppTabsProvider');
  }
  return context;
};