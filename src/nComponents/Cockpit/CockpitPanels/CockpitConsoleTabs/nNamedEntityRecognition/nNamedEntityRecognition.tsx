'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '../../../../../@/contexts/WorkingStateContext';

const NNamedEntityRecognition: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nNamedEntityRecognitionWorking } = workingState;

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
    <div className="nNamedEntityRecognition flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Named Entity Recognition</h2>
      <motion.img
        src="/NamedEntityRecognition_concept.svg"
        alt="Named Entity Recognition Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nNamedEntityRecognitionWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NNamedEntityRecognition;