"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Tab {
  id: string;
  componentName: string;
  label: string;
  iconSVG: string;
}

interface TabContent {
  [tabId: string]: any;
}

interface CockpitTabsContextType {
  tabs: Tab[];
  activeTabId: string | null;
  openTab: (componentName: string, label: string, multiInstance: boolean, iconSVG: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  tabContent: TabContent;
  setTabContent: (tabId: string, content: any) => void;
}

const CockpitTabsContext = createContext<CockpitTabsContextType | undefined>(undefined);

export function CockpitTabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [tabContent, setTabContent] = useState<TabContent>({});

  useEffect(() => {
    // Load data from localStorage only on the client side
    const storedTabs = localStorage.getItem('cockpitTabs');
    if (storedTabs) {
      setTabs(JSON.parse(storedTabs));
    }

    const storedActiveTabId = localStorage.getItem('cockpitActiveTabId');
    if (storedActiveTabId) {
      setActiveTabId(storedActiveTabId);
    }

    const storedContent = localStorage.getItem('cockpitTabContent');
    if (storedContent) {
      setTabContent(JSON.parse(storedContent));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('cockpitTabs', JSON.stringify(tabs));
    localStorage.setItem('cockpitActiveTabId', activeTabId || '');
    localStorage.setItem('cockpitTabContent', JSON.stringify(tabContent));
  }, [tabs, activeTabId, tabContent]);

  const openTab = (componentName: string, label: string, multiInstance: boolean, iconSVG: string) => {
    const existingTab = tabs.find(tab => tab.componentName === componentName);
    if (!multiInstance && existingTab) {
      setActiveTabId(existingTab.id);
    } else {
      const newTab = { id: Date.now().toString(), componentName, label, iconSVG };
      setTabs(prevTabs => [...prevTabs, newTab]);
      setActiveTabId(newTab.id);
    }
  };

  const closeTab = (id: string) => {
    setTabs(prevTabs => prevTabs.filter(tab => tab.id !== id));
    if (activeTabId === id) {
      setActiveTabId(tabs.length > 1 ? tabs[tabs.length - 2].id : null);
    }
    setTabContent(prevContent => {
      const { [id]: removed, ...rest } = prevContent;
      return rest;
    });
  };

  const setActiveTab = (id: string) => {
    setActiveTabId(id);
  };

  const updateTabContent = (tabId: string, content: any) => {
    setTabContent(prevContent => ({
      ...prevContent,
      [tabId]: content
    }));
  };

  return (
    <CockpitTabsContext.Provider value={{ 
      tabs, 
      activeTabId, 
      openTab, 
      closeTab, 
      setActiveTab,
      tabContent,
      setTabContent: updateTabContent
    }}>
      {children}
    </CockpitTabsContext.Provider>
  );
}

export function useCockpitTabs() {
  const context = useContext(CockpitTabsContext);
  if (context === undefined) {
    throw new Error('useCockpitTabs must be used within a CockpitTabsProvider');
  }
  return context;
}
