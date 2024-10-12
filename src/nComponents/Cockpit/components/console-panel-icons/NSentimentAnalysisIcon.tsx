import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NSentimentAnalysisIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NSentimentAnalysisIcon: React.FC<NSentimentAnalysisIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nSentimentAnalysisWorking } = workingState;

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
      animate={nSentimentAnalysisWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#3cff3c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M8 15s1.5 2 4 2 4-2 4-2"
        stroke="#3cff3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.circle cx="9" cy="10" r="1" fill="#3cff3c" variants={circleVariants} />
      <motion.circle cx="15" cy="10" r="1" fill="#3cff3c" variants={circleVariants} />
    </motion.svg>
  );
};