"use client"

import React, { useMemo } from 'react';
import { cn } from "@/utils/tailwind-merge";
import { useCockpitTabs } from '@/contexts/CockpitTabsContext';
import nColors from './nColors';

const processIconSVG = (iconSVG: string) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(iconSVG, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  svgElement.removeAttribute('width');
  svgElement.removeAttribute('height');

  if (!svgElement.getAttribute('viewBox')) {
    const width = svgElement.getAttribute('width') || '24';
    const height = svgElement.getAttribute('height') || '24';
    svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }

  svgElement.setAttribute('class', 'w-5 h-5');

  return svgElement.outerHTML;
};

const CockpitTabControls: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useCockpitTabs();

  const processedIcons = useMemo(() => {
    return tabs.reduce((acc, tab) => {
      acc[tab.id] = processIconSVG(tab.iconSVG);
      return acc;
    }, {} as Record<string, string>);
  }, [tabs]);

  return (
    <div className={cn(
      "CockpitTabsControls",
      "border-b border-neutral-200 dark:border-neutral-900 bg-white dark:bg-transparent",
      "flex items-center overflow-x-auto"
    )}>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          className={cn(
            "flex items-center",
            "px-3 py-2 cursor-pointer",
            "hover:bg-gray-200 dark:hover:bg-neutral-700",
            activeTabId === tab.id 
              ? "bg-white dark:bg-neutral-900"
              : "bg-gray-100 dark:bg-neutral-800",
            index === 0 ? "ml-0" : "ml-[2px]",
            "min-w-[120px] max-w-[200px]",
            "flex-shrink-0"
          )}
          style={{ 
            borderColor: nColors.Color1,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
            borderLeft: activeTabId === tab.id ? `2px solid ${nColors.Color1}` : `1px solid ${nColors.Color1}`,
            borderRight: activeTabId === tab.id ? `2px solid ${nColors.Color1}` : `1px solid ${nColors.Color1}`,
            borderBottom: activeTabId === tab.id ? `2px solid ${nColors.Color1}` : `1px solid ${nColors.Color1}`,
            borderTop: 'none'
          }}
          onClick={() => setActiveTab(tab.id)}
        >
          <div className="flex items-center flex-grow min-w-0">
            <div className="w-5 h-5 mr-2 flex-shrink-0" dangerouslySetInnerHTML={{ __html: processedIcons[tab.id] }} />
            <span className="truncate">{tab.label}</span>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0 ml-2"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default CockpitTabControls;