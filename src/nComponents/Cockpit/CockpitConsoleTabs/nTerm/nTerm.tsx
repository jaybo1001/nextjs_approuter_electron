import React from 'react';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const NTerm: React.FC = () => {
  return (
    <div className="nTerm flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">nTerm</h2>
      <p>This is the placeholder for the nTerm component. Add your terminal functionality here.</p>
    </div>
  );
};

export default NTerm;
