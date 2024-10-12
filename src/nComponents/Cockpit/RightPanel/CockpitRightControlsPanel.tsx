"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/nComponents/ui/sidebar";
import {
  IconCode,
  IconBrain,
} from "@tabler/icons-react";
import { cn } from "@/utils/tailwind-merge";
import Codebase from "./RightControlsTabs/Codebase/Codebase";
import Knowledge from "./RightControlsTabs/Knowledge/Knowledge";
import { useRightPanel } from "@/contexts/RightPanelContext";

export function CockpitRightControlsPanel() {
  const links = [
    {
      label: "Codebase",
      href: "#codebase",
      icon: (
        <IconCode className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Knowledge",
      href: "#knowledge",
      icon: (
        <IconBrain className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("codebase");
  const { setActiveApp } = useRightPanel();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveApp(tab.charAt(0).toUpperCase() + tab.slice(1));
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row-reverse bg-gray-100 dark:bg-transparent w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-full"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} position="right" animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  onClick={() => handleTabChange(link.href.slice(1))}
                />
              ))}
            </div>
          </div>
          <div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="w-full h-full">
            {activeTab === "codebase" && <Codebase />}
            {activeTab === "knowledge" && <Knowledge />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, index) => (
            <div
              key={`first-array-${index}`}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, index) => (
            <div
              key={`second-array-${index}`}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
