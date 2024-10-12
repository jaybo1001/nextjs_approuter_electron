import React from 'react';
import { motion } from 'framer-motion';

const NLogic: React.FC = () => {
  const circleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="nLogic flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">nLogic</h2>
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        initial="initial"
        whileHover="animate"
        className="mb-4"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="#3cefff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="16 48"
          variants={circleVariants}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="6"
          stroke="#3cefff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="9.5 28.5"
          variants={circleVariants}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="2"
          stroke="#3cefff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 9"
          variants={circleVariants}
        />
      </motion.svg>
      <p>This is the placeholder for the nLogic component. Implement your logic-related features here.</p>
    </div>
  );
};

export default NLogic;
