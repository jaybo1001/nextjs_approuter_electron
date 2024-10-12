"use client"

import React, { Suspense, lazy, useEffect } from 'react';
import { cn } from "@/utils/tailwind-merge";
import { useCockpitTabs } from '@/contexts/CockpitTabsContext';

const CockpitTabContent: React.FC = () => {
  const { tabs, activeTabId, tabContent, setTabContent } = useCockpitTabs();
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const DynamicComponent = activeTab
    ? lazy(() => import(`@/app/protected/nApps/${activeTab.componentName}/${activeTab.componentName}`))
    : null;

  const handleContentChange = (newContent: any) => {
    if (activeTabId) {
      setTabContent(activeTabId, newContent);
    }
  };

  return (
    <div className={cn(
      "CockpitTabContent",
      "h-full",
      "p-0",
      "bg-white dark:bg-transparent",
      "overflow-y-auto"
    )}>
      {activeTab ? (
        <Suspense fallback={<div>Loading...</div>}>
          {DynamicComponent && activeTabId && (
            <DynamicComponent 
              content={tabContent[activeTabId] ?? null} 
              onContentChange={handleContentChange} 
            />
          )}
        </Suspense>
      ) : (
        <p>No active tab</p>
      )}
    </div>
  );
};

export default CockpitTabContent;