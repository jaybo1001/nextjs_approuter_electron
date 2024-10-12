"use client";
import React from 'react';
import GlowCard from '@/components/GlowUI/GlowCard';

const NeuroCoderActiveTabContent: React.FC = () => {
  return (
    <div className="flex w-full h-full">
      <GlowCard
        id="neurocoder-active-tab"
        name="NeuroCoderActiveTab"
        description="Active tab content for NeuroCoder"
        usage="Display active tab content in NeuroCoder"
        componentName="NeuroCoderActiveTabContent"
        componentPath="/protected/nApps/nUniverse/tabs/NeuroCoder/components/NeuroCoderActiveTabContent"
        application="nUniverse"
        colorGroup={2}
        colorNestLevel="L3"
        borderRadius="lg"
        heading="Active Tab Content"
        draggable={false}
        className="w-full h-full"
      >
        <h1 className="text-2xl font-bold mb-4">Welcome to NeuroCoder</h1>
        <p>This is a placeholder for the active tab content. You can customize this component to display different content based on the selected tab or other application state.</p>
      </GlowCard>
    </div>
  );
};

export default NeuroCoderActiveTabContent;
