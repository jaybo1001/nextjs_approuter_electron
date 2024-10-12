import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NTextToSpeechIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NTextToSpeechIcon: React.FC<NTextToSpeechIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nTextToSpeechWorking } = workingState;

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
      animate={nTextToSpeechWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ff3c3c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M8 12H12M8 16H16"
        stroke="#ff3c3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.path
        d="M16 8C17.1046 8 18 8.89543 18 10V14C18 15.1046 17.1046 16 16 16"
        stroke="#ff3c3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};