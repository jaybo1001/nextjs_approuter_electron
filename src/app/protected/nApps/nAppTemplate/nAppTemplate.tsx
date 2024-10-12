import React, { lazy, Suspense } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import GlowCardTemplate from './components/GlowCardTemplate';

// Type definitions
type TabVariant = 'solid' | 'bordered' | 'light' | 'underlined';
type TabColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

// Constants
const TABS_VARIANT: TabVariant = 'underlined';
const TABS_COLOR: TabColor = 'primary'; // You can change this to any of the defined colors

// Lazy load the tab components
const Tab1Content = lazy(() => import('./tab1/tab1'));
const Tab2Content = lazy(() => import('./tab2/tab2'));
const Tab3Content = lazy(() => import('./tab3/tab3'));

// Placeholder data object for dynamic tab rendering
const tabsData = [
  {
    id: "tab1",
    label: "Tab 1",
    content: Tab1Content
  },
  {
    id: "tab2",
    label: "Tab 2",
    content: Tab2Content
  },
  {
    id: "tab3",
    label: "Tab 3",
    content: Tab3Content
  },
  {
    id: "help",
    label: "Help",
    content: "Need assistance? This help section is also part of the dynamic tab system."
  }
];

const nAppTemplate = () => {
  return (
    <div className="h-full w-full flex flex-col p-0 flex-grow">
      <Tabs 
        aria-label="nApp Template Tabs" 
        variant={TABS_VARIANT}
        color={TABS_COLOR}
        fullWidth 
        className="flex flex-col h-full overflow-auto"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider pl-4 sm:pl-6 md:pl-8", // Added left padding
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary"
        }}
      >
        {tabsData.map((item) => (
          <Tab key={item.id} title={item.label}>
            <div className="flex-grow flex flex-col h-full ">
            <GlowCardTemplate
              id={item.id}
              name={`${item.label} Tab`}
              description={`Content for ${item.label} tab`}
              usage="Tab content in nApp Template"
              componentName="GlowCardBK"
              componentPath="@/nComponents/GlowCardBK/GlowCardBK"
              application="nApp Template"
            >
              <div className="overflow-auto">
                {typeof item.content === 'string' ? (
                  <p>{item.content}</p>
                ) : (
                  <Suspense fallback={<div>Loading...</div>}>
                    <item.content />
                  </Suspense>
                )}
              </div>
            </GlowCardTemplate>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default nAppTemplate;