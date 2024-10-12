import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NTermIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NTermIcon: React.FC<NTermIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nTermWorking } = workingState;

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
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ scale }}
      initial="initial"
      animate={nTermWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      {/* Outer Circle */}
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
      {/* Middle Circle */}
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
      {/* Inner Circle */}
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
  );
};