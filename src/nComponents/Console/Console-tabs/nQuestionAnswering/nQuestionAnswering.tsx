'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

const NQuestionAnswering: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nQuestionAnsweringWorking } = workingState;

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
    <div className="nQuestionAnswering flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Question Answering</h2>
      <motion.img
        src="/QuestionAnswering_concept.svg"
        alt="Question Answering Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nQuestionAnsweringWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NQuestionAnswering;