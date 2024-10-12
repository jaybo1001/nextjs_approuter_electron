import React from 'react';
import Image from 'next/image';
import { useAppState } from '@/contexts/AppStateContext';
import neucleosLogo from '@/nComponents/ui/icons/neucleosLogo.svg';
import triangleLogo from '@/nComponents/ui/icons/triangle-logo-purple-yellow.svg';

const CockpitLeftHeaderModule: React.FC = () => {
  const { appState } = useAppState();
  const { panelSizes } = appState;

  const isNarrow = panelSizes.leftPanel <= 3; // Adjusted to match the minSize in ResizablePanel

  return (
    <div className="flex items-center p-4 bg-transparent">
      <Image
        src={isNarrow ? triangleLogo : neucleosLogo}
        alt="Neucleos Logo"
        width={isNarrow ? 20 : 150}
        height={isNarrow ? 40 : 60}
        className="mr-auto"
      />
    </div>
  );
};

export default CockpitLeftHeaderModule;
