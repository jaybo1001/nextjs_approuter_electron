'use client';
import React from 'react';
import { useWorkingState } from '@/contexts/WorkingStateContext';
import { N3DModelGenerationIcon } from '@/nComponents/Cockpit/components/console-panel-icons/N3DModelGenerationIcon';


const N3DModelGeneration: React.FC = () => {
  const { workingState } = useWorkingState();
  const { n3DModelGenerationWorking } = workingState;

  return (
    <div className="n3DModelGeneration flex flex-col h-full w-full bg-black text-white p-4">
      <div className="flex items-start mb-4">
        <div className="mr-4">
          <div className="rounded-full bg-gray-800 p-2 flex items-center justify-center">
            <N3DModelGenerationIcon
              className="w-16 h-16" // Slightly reduced size to fit inside the circle
              size={70}
              scale={1}
              nWorking={n3DModelGenerationWorking}
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold mt-4">3D Model Generation</h1>
      </div>
      <div className="flex-grow">
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default N3DModelGeneration;

// import { N3DModelGenerationIcon } from '@/nComponents/icons/N3DModelGenerationIcon';