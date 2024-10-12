'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const NImageToText: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nImageToTextWorking } = workingState;

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
    <div className="nImageToText flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Image to Text</h2>
      <motion.img
        src="/ImageToText_concept.svg"
        alt="Image to Text Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nImageToTextWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NImageToText;
