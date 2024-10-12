"use client";

import Image from "next/image";
import { Tabs } from "@/components/GlowUI/GlowTabs1";
import { useColors } from "@/contexts/ColorContext";
import GlowCard from '@/components/GlowUI/GlowCard';
import Dashboard from './tabs/Dashboard/Dashboard';
import Template from './tabs/Template/Template';
import Playground from './tabs/Playground/Playground';
import FilesToDB from './tabs/FilesToDB/FilesToDB.';
import Neurons from './tabs/Neurons/Neurons';
import NeuronCard from './tabs/NeuronCard/NeuronCard';
import Synapse from './tabs/Synapse/Synapse'; // Add this import
import NeuronConstruct from './tabs/NeuronConstruct/NeuronConstruct'; // Add this import
import NUniverseViewer from './tabs/nUniverseViewer/nUniverseViewer';
import CoreProcesses from './tabs/CoreProcesses/CoreProcesses'; // Add this import
import NeuroCoder from './tabs/NeuroCoder/index'; // Add this import

export default function nUniverse() {
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
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="h-full overflow-auto">
              <Dashboard />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "nUniverse Viewer",
      value: "nuniverse-viewer",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="8" 
            name="nUniverse Viewer" 
            description="View and interact with the nUniverse" 
            usage="Explore the nUniverse structure" 
            componentName="NUniverseViewer" 
            componentPath="NUniverseViewer" 
            application="CodebaseManager"
            fullWidth
            fullHeight
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
            <NUniverseViewer />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "Neurons",
      value: "neurons",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="2" 
            name="Neurons" 
            description="Manage your neurons" 
            usage="Use this to manage your neurons" 
            componentName="Neurons" 
            componentPath="Neurons" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <Neurons />
            </div>
          </GlowCard>
        </div>
      ),
    },
    {
      title: "Neuron Neural Code",
      value: "neuronneuralcode",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="3" 
            name="Neuron Neural Code" 
            description="View and manage neuron neural code" 
            usage="Interact with neuron neural code" 
            componentName="NeuronCard" 
            componentPath="NeuronCard" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <NeuronCard />
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
    // Add new tab for Synapse
    {
      title: "Synapse",
      value: "synapse",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="6" 
            name="Synapse" 
            description="Synapse Module" 
            usage="Interact with Synapse functionality" 
            componentName="Synapse" 
            componentPath="Synapse" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <Synapse />
            </div>
          </GlowCard>
        </div>
      ),
    },
    // Add new tab for Neuron Construct
    {
      title: "Neuron Construct",
      value: "neuron-construct",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="7" 
            name="Neuron Construct" 
            description="Neuron Construct Module" 
            usage="Build and manage Neuron constructs" 
            componentName="NeuronConstruct" 
            componentPath="NeuronConstruct" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <NeuronConstruct />
            </div>
          </GlowCard>
        </div>
      ),
    },
    // Add new tab for Core Processes
    {
      title: "Core Processes",
      value: "core-processes",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-0">
          <GlowCard 
            id="9" 
            name="Core Processes" 
            description="Manage core processes of the nUniverse" 
            usage="View and interact with core nUniverse processes" 
            componentName="CoreProcesses" 
            componentPath="CoreProcesses" 
            application="CodebaseManager"
            paddingX="10"
            paddingY="10"
            bottomPadding="6"
          >
            <div className="w-full h-full overflow-auto">
              <CoreProcesses />
            </div>
          </GlowCard>
        </div>
      ),
    },
    // Update the NeuroCoder tab content
    {
      title: "NeuroCoder",
      value: "neurocoder",
      content: (
        <div className="w-full h-full overflow-hidden relative rounded-2xl p-4">
          <div className="flex flex-col w-full h-full">
            <NeuroCoder />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full h-full px-0 mt-2 ">
      {(() => {
        return (
          <div className="h-full [perspective:1000px] relative flex flex-col mx-auto items-start justify-start">
            <Tabs tabs={tabs} />
          </div>
        );
      })()}
    </div>
  );
}


