"use client";

import React, { useEffect } from 'react';
import { Tabs, Tab } from './index';
import { useTabs } from '@/contexts/AppTabsContext';
import dynamic from 'next/dynamic';
import { Reorder } from 'framer-motion';

const componentCache: Record<string, React.ComponentType<any>> = {};

const loadComponent = (componentName: string) => {
  if (!componentCache[componentName]) {
    componentCache[componentName] = dynamic(
      () => import(`@/app/protected/nApps/${componentName}/${componentName}`),
      {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }
    );
  }
  return componentCache[componentName];
};

export default function App() {
  const { tabs, setTabs, activeTabId, activateTab, closeTab } = useTabs();

  useEffect(() => {
    if (tabs.length > 0 && !activeTabId) {
      activateTab(tabs[0].id);
    }
  }, [tabs, activeTabId, activateTab]);

  const handleSelectionChange = (key: React.Key) => {
    activateTab(key);
  };

  const handleReorder = (newOrder: typeof tabs) => {
    setTabs(newOrder);
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="fixed top-0 left-0 flex items-center bg-black z-10 w-full h-12">
        <div className="flex items-center h-full px-2">
          {/* ... Logo component here ... */}
        </div>
        <Tabs
          selectedKey={activeTabId}
          onSelectionChange={handleSelectionChange}
          classNames={{
            tabList: 'flex h-full',
            tab: 'cursor-pointer px-2 py-1 rounded-t-lg flex items-center',
            // Customize other classNames as needed
          }}
        >
          <Reorder.Group
            axis="x"
            onReorder={handleReorder}
            values={tabs}
            className="flex"
          >
            {tabs.map((tab) => (
              <Reorder.Item
                key={tab.id}
                value={tab}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
              >
                <Tab
                  key={tab.id}
                  className="draggable-tab"
                  title={
                    <>
                      {tab.IconSVG && (
                        <div
                          className="mr-2 w-4 h-4"
                          dangerouslySetInnerHTML={{ __html: tab.IconSVG }}
                        />
                      )}
                      <span>{tab.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}
                        className="ml-2 text-gray-400 hover:text-gray-200"
                      >
                        &times;
                      </button>
                    </>
                  }
                >
                  {/* Content will be rendered in TabPanel */}
                </Tab>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </Tabs>
      </div>

      <div className="flex mt-12 h-[calc(100%-64px)] w-full">
        {tabs.map((tab) => {
          if (tab.ComponentName) {
            const Component = loadComponent(tab.ComponentName);
            return (
              <TabPanel key={tab.id} tabKey={tab.id}>
                <Component />
              </TabPanel>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
