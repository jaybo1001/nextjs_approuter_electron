'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const NLanguageTranslation: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nLanguageTranslationWorking } = workingState;

  const imageVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="nLanguageTranslation flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Language Translation</h2>
      <motion.img
        src="/LanguageTranslation_concept.svg"
        alt="Language Translation Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nLanguageTranslationWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NLanguageTranslation;