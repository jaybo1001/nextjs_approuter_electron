"use client"

import React, { useCallback, useEffect } from 'react';
import { Card, CardBody } from "@nextui-org/react";
import Image from 'next/image';
import { Reorder } from "framer-motion";
import neucleosLogo from '@/nComponents/icons/neucleosLogo.svg';
import GlowCardBK from '@/nComponents/GlowCard/GlowCardBK';
import { useTabs } from '@/contexts/AppTabsContext';
import dynamic from 'next/dynamic';
import { App } from '@/types/AppTypes';

// Temporary placeholder component
const PlaceholderComponent = () => (
  <div className="p-4 bg-gray-100 rounded-lg">
    <p className="text-lg font-semibold">Component Under Refactoring</p>
    <p>This component is currently being refactored and is temporarily unavailable.</p>
  </div>
);

const componentCache = {};

const loadComponent = (componentName: string) => {
  if (!componentCache[componentName]) {
    // Temporarily return the placeholder component instead of loading the actual component
    componentCache[componentName] = PlaceholderComponent;
    
    // Commented out actual component loading
    /*
    componentCache[componentName] = dynamic(
      () => import(`@/app/protected/nApps/${componentName}/${componentName}`),
      {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }
    );
    */
  }
  return componentCache[componentName];
};

const TabItem = ({ tab, isActive, onActivate, onClose }) => {
  return (
    <Reorder.Item value={tab} id={tab.id}>
      <div 
        className={`cursor-move px-2 py-1 rounded-t-lg ${isActive ? 'bg-gray-700' : 'bg-gray-800'} hover:bg-gray-600 flex items-center`}
        onClick={() => onActivate(tab.id)}
      >
        {tab.IconSVG && (
          <div className="mr-2 w-4 h-4" dangerouslySetInnerHTML={{ __html: tab.IconSVG }} />
        )}
        <span>{tab.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab.id);
          }}
          className="ml-2 text-gray-400 hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </Reorder.Item>
  );
};

export default function AppTabs() {
  const { tabs, activeTabId, closeTab, activateTab, setTabs } = useTabs();

  useEffect(() => {
    if (tabs.length > 0 && !activeTabId) {
      activateTab(tabs[0].id);
    }
  }, [tabs, activeTabId, activateTab]);

  const handleReorder = useCallback((newOrder) => {
    setTabs(newOrder);
  }, [setTabs]);

  return (
    <div className="flex w-full h-full flex-col">
      <div className="fixed top-0 left-0 flex items-center bg-black z-10 w-full h-12">
        <div className="flex items-center h-full px-2 pl-3">
          <Image
            src={neucleosLogo}
            alt="Neucleos Logo"
            width={186}
            height={34}
            className="mr-4"
            priority
          />
        </div>
        <div className="flex-1 overflow-x-auto">
          <Reorder.Group as="div" axis="x" values={tabs} onReorder={handleReorder} className="flex h-full">
            {tabs.map((tab) => (
              <TabItem
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                onActivate={activateTab}
                onClose={closeTab}
              />
            ))}
          </Reorder.Group>
        </div>
      </div>
      
      <div className="flex mt-8 mb-8 w-full h-[calc(100%-64px)] ">
        <GlowCardBK 
          id="dashboard" 
          name="Dashboard" 
          description="View your dashboard" 
          usage="Use this to view your dashboard" 
          componentName="Dashboard" 
          componentPath="app/protected/Cockpit/App/Dashboard/page.tsx" 
          application="Cockpit" 
          backgroundTransparency={0.5} 
          blurEffect="blur-lg"
        >
          <Card className="w-full h-full">
            <CardBody>
              {tabs.map(tab => {
                if (tab.ComponentName) {
                  const Component = loadComponent(tab.ComponentName);
                  return (
                    <div
                      key={tab.id}
                      style={{ display: tab.id === activeTabId ? 'block' : 'none' }}
                    >
                      <Component />
                    </div>
                  );
                }
                return null;
              })}
            </CardBody>
          </Card>
        </GlowCardBK>
      </div>
    </div>  
  );
}

// Add this style to your global CSS file or a styled-jsx block
const styles = `
  .nextui-tabs li::marker {
    content: none;
  }
`;
