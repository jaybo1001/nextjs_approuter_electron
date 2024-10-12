import React from 'react';
import { GlowButtonMovingBorder } from '@/nComponents/GlowUI/GlowButtonMovingBorder';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const CleoWorkflow: React.FC = () => {
  const { workingState, setWorkingState } = useWorkingState();

  const toggleCleoWorkflowWorking = () => {
    setWorkingState(prevState => ({
      ...prevState,
      CleoWorkflowWorking: !prevState.CleoWorkflowWorking
    }));
  };

  return (
    <div className="flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Cleo Workflow</h2>
      <div className="flex items-center space-x-4">
        <GlowButtonMovingBorder
          onClick={toggleCleoWorkflowWorking}
          className="px-4 py-2 text-sm"
          highlightColor="#00FFFF"
          movingEffectColor="#00FFFF"
        >
          {workingState.CleoWorkflowWorking ? 'Stop Workflow' : 'Start Workflow'}
        </GlowButtonMovingBorder>
        <span className="text-lg">
          Status: {workingState.CleoWorkflowWorking ? 'Working' : 'Idle'}
        </span>
      </div>
    </div>
  );
};

export default CleoWorkflow;
