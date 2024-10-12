import React, { useState } from 'react';
import GlowCard from '@/components/GlowUI/GlowCard';
import { useFileSystemSupabase } from '@/hooks/useFileSystemSupabase';
import { useSupabaseInsert } from '@/hooks/UseSupabaseInsert';
import { useFileSystemToSupabaseMapper } from '@/hooks/useFileSystemToSupabaseMapper';
import { useFileSystemSync } from '@/contexts/FilesToDBContext';
import { useFileSystemChangelog } from '@/hooks/useFileSystemChangelog';
import { useColors } from '@/contexts/ColorContext';

const ConnectingLine: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%) translateY(-100%)',
      width: '4px',
      height: '30px',
      backgroundColor: color,
      zIndex: 70,
    }}
  />
);

const FilesToDBOverlay: React.FC = () => {
  const { files, setFiles, isLoading, setIsLoading, error, setError, supabaseData, setSupabaseData } = useFileSystemSync();
  const { refreshFiles } = useFileSystemSupabase();
  const { insertRecords, isInserting, insertError } = useSupabaseInsert();
  const { mapFilesToSupabaseFormat } = useFileSystemToSupabaseMapper();
  const { fetchLastVersion, updateChangelog } = useFileSystemChangelog();
  const { colorSets, activeColorSet } = useColors();
  const activeColors = colorSets[activeColorSet];

  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState<('idle' | 'loading' | 'success' | 'error')[]>(
    Array(5).fill('idle')
  );
  const [newVersion, setNewVersion] = useState<number | null>(null);

  const updateStepStatus = (step: number, status: 'idle' | 'loading' | 'success' | 'error') => {
    setStepStatus(prev => {
      const newStatus = [...prev];
      newStatus[step] = status;
      return newStatus;
    });
  };

  const handleNextStep = async () => {
    setCurrentStep(prev => prev + 1);
    updateStepStatus(currentStep, 'loading');

    try {
      switch (currentStep) {
        case 0: // Refresh local file system data
          setIsLoading(true);
          if (typeof refreshFiles === 'function') {
            const refreshedFiles = await refreshFiles();
            setFiles(refreshedFiles);
          } else {
            throw new Error('refreshFiles is not a function');
          }
          updateStepStatus(0, 'success');
          break;
        case 1: // Fetch last version
          const lastVersion = await fetchLastVersion();
          if (lastVersion === null) {
            throw new Error('Failed to fetch last version');
          }
          setNewVersion(lastVersion);
          updateStepStatus(1, 'success');
          break;
        case 2: // Map files to Supabase format
          if (newVersion === null) {
            throw new Error('New version is not set');
          }
          const mappedData = mapFilesToSupabaseFormat(files, newVersion);
          setSupabaseData(mappedData);
          updateStepStatus(2, 'success');
          break;
        case 3: // Insert new records into Supabase
          await insertRecords(supabaseData);
          updateStepStatus(3, 'success');
          break;
        case 4: // Update changelog
          if (newVersion === null) {
            throw new Error('New version is not set');
          }
          await updateChangelog(files.length, newVersion);
          updateStepStatus(4, 'success');
          break;
      }
    } catch (err) {
      console.error(`Error at step ${currentStep}:`, err);
      setError(err instanceof Error ? err : new Error(String(err)));
      updateStepStatus(currentStep, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepStatus = (step: number) => {
    const status = stepStatus[step];
    switch (status) {
      case 'idle':
        return '⚪ Waiting';
      case 'loading':
        return '🔄 In Progress';
      case 'success':
        return '✅ Completed';
      case 'error':
        return '❌ Error';
    }
  };

  return (
    <div className="flex flex-row w-full h-full bg-transparent p-4">
      <div className="flex flex-col w-[500px] mr-4">
        <h1 className="text-2xl font-bold mb-4">Files to DB Sync</h1>
        <div className="space-y-4 relative">
          <GlowCard
            id="step-1"
            name="Step 1"
            description="Refresh local file system data"
            usage="Fetches the latest file system data"
            componentName="FilesToDBStep"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p>Step 1: Refresh Local File System Data</p>
            <p>Status: {renderStepStatus(0)}</p>
            {currentStep === 0 && (
              <button onClick={handleNextStep} disabled={isLoading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Start Refresh
              </button>
            )}
          </GlowCard>

          <div style={{ position: 'relative', height: '0px' }}>
            <ConnectingLine color={activeColors.COLOR3} />
          </div>

          <GlowCard
            id="step-2"
            name="Step 2"
            description="Fetch last version"
            usage="Gets the last refresh version from changelog"
            componentName="FilesToDBStep"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p>Step 2: Fetch Last Version</p>
            <p>Status: {renderStepStatus(1)}</p>
            {currentStep === 1 && (
              <button onClick={handleNextStep} disabled={isLoading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Fetch Version
              </button>
            )}
          </GlowCard>

          <div style={{ position: 'relative', height: '0px' }}>
            <ConnectingLine color={activeColors.COLOR3} />
          </div>

          <GlowCard
            id="step-3"
            name="Step 3"
            description="Map files to Supabase format"
            usage="Converts local file data to Supabase schema"
            componentName="FilesToDBStep"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p>Step 3: Map Files to Supabase Format</p>
            <p>Status: {renderStepStatus(2)}</p>
            {currentStep === 2 && (
              <button onClick={handleNextStep} disabled={isLoading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Start Mapping
              </button>
            )}
          </GlowCard>

          <div style={{ position: 'relative', height: '0px' }}>
            <ConnectingLine color={activeColors.COLOR3} />
          </div>

          <GlowCard
            id="step-4"
            name="Step 4"
            description="Insert new records into Supabase"
            usage="Adds the mapped file data to Supabase"
            componentName="FilesToDBStep"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p>Step 4: Insert New Records into Supabase</p>
            <p>Status: {renderStepStatus(3)}</p>
            {currentStep === 3 && (
              <button onClick={handleNextStep} disabled={isLoading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Start Insertion
              </button>
            )}
          </GlowCard>

          <div style={{ position: 'relative', height: '0px' }}>
            <ConnectingLine color={activeColors.COLOR3} />
          </div>

          <GlowCard
            id="step-5"
            name="Step 5"
            description="Update changelog"
            usage="Updates the file system changelog"
            componentName="FilesToDBStep"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p>Step 5: Update Changelog</p>
            <p>Status: {renderStepStatus(4)}</p>
            {currentStep === 4 && (
              <button onClick={handleNextStep} disabled={isLoading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Update Changelog
              </button>
            )}
          </GlowCard>
        </div>

        {error && (
          <GlowCard
            id="error-card"
            name="Error"
            description="Error details"
            usage="Displays any errors that occurred during the sync process"
            componentName="FilesToDBError"
            componentPath="/protected/nApps/CodebaseManager/tabs/FilesToDB/FilesToDB.tsx"
            application="CodebaseManager"
            colorNestLevel="L3"
            width="100%"
            draggable={false}
            colorCombo={2}
            centerContent={true}
          >
            <p className="text-red-500">Error: {error.message}</p>
          </GlowCard>
        )}
      </div>

      
    </div>
  );
};

export default FilesToDBOverlay;
