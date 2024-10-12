import { Key } from 'react';
import React from 'react';

interface TabPanelProps {
  tabKey: Key;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ tabKey, children }) => {
  const { activeTabId } = useTabs();

  if (tabKey !== activeTabId) {
    return null;
  }

  return <div>{children}</div>;
};
