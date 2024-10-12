"use client";

import Image from "next/image";
import { Tabs } from "@/components/GlowUI/GlowTabs1";
import { useColors } from "@/contexts/ColorContext";
import TableComponent from './tabs/Files/CodebaseManagerCode';
import GlowCard from '@/components/GlowUI/GlowCard';
import Dashboard from './tabs/Dashboard/Dashboard';
import Template from './tabs/Template/Template';
import Playground from './tabs/Playground/Playground';
import FilesToDB from './tabs/FilesToDB/FilesToDB';

export default function CodebaseManager() {
  const { colorSets, activeColorSet } = useColors();
  const currentColors = colorSets[activeColorSet];

  const tabs = [
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="1" 
            name="Dashboard" 
            description="Codebase Manager Dashboard" 
            usage="Overview of your codebase" 
            componentName="Dashboard" 
            componentPath="Dashboard" 
            application="CodebaseManager"
            fullWidth
            fullHeight
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <Dashboard />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "Files",
      value: "files",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="2" 
            name="Codebase Manager" 
            description="Manage your codebases" 
            usage="Use this to manage your codebases" 
            componentName="CodebaseManager" 
            componentPath="CodebaseManager" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <TableComponent />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "Template",
      value: "template",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="3" 
            name="Template" 
            description="Codebase Manager Template" 
            usage="Template for codebase management" 
            componentName="Template" 
            componentPath="Template" 
            application="CodebaseManager"
            fullWidth
            fullHeight
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <Template />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-0">
          <GlowCard 
            id="4" 
            name="Playground" 
            description="Codebase Manager Playground" 
            usage="Experimental area for codebase management" 
            componentName="Playground" 
            componentPath="Playground" 
            application="CodebaseManager"
            fullWidth
            fullHeight
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <Playground />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "FilesToDB",
      value: "filestodb",
      content: (
        <div className="w-full h-full overflow-auto relative rounded-2xl p-0">
          <GlowCard
            id="5"
            name="FilesToDB"
            description="Add files to the database"
            usage="Manage files and sync to the database"
            componentName="FilesToDB"
            componentPath="FilesToDB"
            application="CodebaseManager"
            fullWidth
            fullHeight
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <FilesToDB />
            </div>
          </GlowCard>
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full h-full px-0 mt-2">
      {(() => {
        return (
          <div className="h-full [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start">
            <Tabs tabs={tabs} />
          </div>
        );
      })()}
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
