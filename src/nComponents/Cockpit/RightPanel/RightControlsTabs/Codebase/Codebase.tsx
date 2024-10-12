'use client';

import React, { useEffect } from 'react';
import { FilesystemItemAnimated } from '@/nComponents/GlowUI/GlowFileTreeRecursive';
import GlowCard from '@/nComponents/GlowUI/GlowCard';
import { IconContext } from 'react-icons';
import { useCodebase } from '@/contexts/CodebaseContext';
import { useRefreshCodebase } from '@/hooks/refreshCodebaseContext';

const CodebaseManager: React.FC = () => {
  const { fileTree } = useCodebase();
  const refreshCodebase = useRefreshCodebase();

  useEffect(() => {
    refreshCodebase();
  }, []); // Empty dependency array

  const convertToNodeStructure = (tree: any): any[] => {
    if (!tree || typeof tree !== 'object') {
      return [];
    }
    return Object.entries(tree)
      .map(([key, value]) => ({
        name: key,
        nodes: typeof value === 'object' ? convertToNodeStructure(value) : undefined
      }))
      .sort((a, b) => {
        if ((a.nodes && b.nodes) || (!a.nodes && !b.nodes)) {
          return a.name.localeCompare(b.name);
        }
        return a.nodes ? -1 : 1;
      });
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 140px)', width: 'full' }}>
      <GlowCard
        id="codebase-manager"
        name="Codebase Manager"
        description="Displays the file structure of the codebase"
        usage="Used in the Cockpit to navigate and manage the project's codebase"
        componentName="CodebaseManager"
        componentPath="/protected/Cockpit/CockpitPanels/RightControlsTabs/Codebase/Codebase.tsx"
        application="CleoCX"
        fullWidth
        fullHeight
        colorGroup={2}
        colorNestLevel="L1"
        bottomPadding={0}
      >
        <div className="p-1">
          {fileTree && (
            <IconContext.Provider value={{ size: "10px" }}>
              <ul className="pl-1 text-xs" style={{ fontSize: '10px' }}>
                {convertToNodeStructure(fileTree).map((node) => (
                  <FilesystemItemAnimated key={node.name} node={node} />
                ))}
              </ul>
            </IconContext.Provider>
          )}
        </div>
      </GlowCard>
    </div>
  );
};

export default CodebaseManager;
