'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const NTextToSpeech: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nTextToSpeechWorking } = workingState;

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
    <div className="nTextToSpeech flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Text to Speech</h2>
      <motion.img
        src="/TextToSpeech_concept.svg"
        alt="Text to Speech Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nTextToSpeechWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NTextToSpeech;
