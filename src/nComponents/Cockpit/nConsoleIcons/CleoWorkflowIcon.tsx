import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext'; // Add this import

type CleoWorkflowIconProps = {
  size?: number;
  className?: string;
};

export const CleoWorkflowIcon: React.FC<CleoWorkflowIconProps> = ({ size = 24, className }) => {
  const { workingState } = useWorkingState(); // Add this line
  const { CleoWorkflowWorking } = workingState; // And this line

  const circleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial="initial"
      animate={CleoWorkflowWorking ? "animate" : undefined} // Modify this line
      whileHover="animate"
    >
      <motion.circle
        cx="12" cy="12" r="10"
        stroke="#3cefff" strokeWidth="3" strokeLinecap="round" strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.circle
        cx="12" cy="12" r="6"
        stroke="#3cefff" strokeWidth="3" strokeLinecap="round" strokeDasharray="9.5 28.5"
        variants={circleVariants}
      />
      <motion.circle
        cx="12" cy="12" r="2"
        stroke="#3cefff" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 9"
        variants={circleVariants}
      />
    </motion.svg>
  );
};