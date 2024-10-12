"use client";

import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/nComponents/ui/resizable"
import CockpitTabControls from "../CockpitTabControls";
import CockpitTabContent from "../CockpitTabContent";
import { cn } from "@/utils/tailwind-merge";
import { useAppState } from '@/contexts/AppStateContext';
import ConsolePanel2 from "./ConsolePanel2";
const CockpitMainPanelModule: React.FC = () => {
  const { appState, updateCockpitMainPanelSizes } = useAppState();
  const { cockpitMainPanelSizes } = appState;

  const handleResizeEnd = (sizes: number[]) => {
    updateCockpitMainPanelSizes({ mainPanelInternal: sizes[0] });
  };

  return (
    <div className={cn(
      "flex flex-col h-full",
      "bg-white dark:bg-transparent",
      "border border-neutral-200 dark:border-transparent border-t-0",
      "rounded-md overflow-hidden"
    )}>
      <CockpitTabControls />
      <ResizablePanelGroup 
        direction="vertical" 
        className="flex-grow"
        onLayout={handleResizeEnd}
      >
        <ResizablePanel defaultSize={cockpitMainPanelSizes.mainPanelInternal}>
          <CockpitTabContent />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className={cn(
            "CockpitConsole",
            "h-full",
            "p-0",
            "bg-gray-50 dark:bg-transparent",
            "overflow-y-auto"
          )}>
            <ConsolePanel2 consolePosition={cockpitMainPanelSizes.mainPanelInternal} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CockpitMainPanelModule;
